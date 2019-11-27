from flask import Flask
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from flask_api.util.response import *
from models.user import User
from models.event import Event

import datetime

events_api_blueprint = Blueprint('events_api', __name__)

@events_api_blueprint.route('/create', methods=['POST'])
@jwt_required
def create():

    if not request.is_json:
        return error_401('Request is not JSON!')

    jwt_identity = get_jwt_identity()
    user = User.get_or_none(jwt_identity == User.name)

    if user: 

        event_info = request.get_json()
        lesson_id = event_info['lesson_id']
        user_id = event_info['user_id']
        start_datetime = event_info['start_datetime']

        query = Event(lesson = lesson_id , user= user_id, start_datetime = start_datetime, status='Pending')

        if query.save():
            data = {
                'lesson_id': lesson_id,
                'user_id': user.id,
                'start_datetime': start_datetime
            }
           

            return success_201('Event created successfully!', data)
        
        else:
           return error_401('Error when creating event')
    else:
       return error_401('User not found in database!')


@events_api_blueprint.route('/', methods=['GET'])
@jwt_required
def index():
    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)

    data = [
        {
            'id': event.id,
            'lesson_id': event.lesson_id,
            'user_id': user.id,
            'status': event.status,
            'start_datetime': event.start_datetime,
            'rating': event.rating,
            'comment': event.comment
        } for event in Event.select().where(Event.user_id == user.id)
    ]

    return success_201("List of all current user's events", data)

@events_api_blueprint.route('/<event_id>', methods=['GET'])
@jwt_required
def show(event_id):

    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)
    if user: 
        event = Event.get_or_none(Event.id == event_id)
        
        data ={
            'id': event.id,
            'lesson_id': event.lesson_id,
            'user_id': user.id,
            'status': event.status,
            'start_datetime': event.start_datetime,
            'rating': event.rating,
            'comment': event.comment
        }

        return success_201(f'Returned data about event {event_id}', data)
    
    else:
        return error_401('User not found!')



@events_api_blueprint.route('/<event_id>/datetime', methods=['POST'])
@jwt_required
def update_datetime(event_id):
    if not request.is_json:
        return error_401('Response is not JSON!')

    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)
    if user:
        user_update = request.get_json()
        new_datetime = user_update['start_datetime'] 
        event = Event.get_or_none(event_id == Event.id)
        query = Event.update(start_datetime = new_datetime).where(Event.id == event_id)
        if query.execute():
            data = {
                'id': event.id,
                'lesson_id': event.lesson_id,
                'user_id': user.id,
                'status': event.status,
                'start_datetime': event.start_datetime,
                'rating': event.rating,
                'comment': event.comment
            }
            return success_201(f'start_datetime of event {event.id} updated succesfully', data)
        else:
            return error_401('Error when updating datetime of event')
    else:
        return error_401('User not found!')
    

@events_api_blueprint.route('/<event_id>/status', methods=['POST'])
@jwt_required
def update_status(event_id):
    if not request.is_json:
        return error_401('Response is not JSON!')

    jwt_identity = get_jwt_identity()

    user = User.get_or_none(User.name == jwt_identity)
    if user:

        user_update = request.get_json()
        new_status = user_update['status'] 
        event = Event.get_or_none(event_id == Event.id)

        query = Event.update(status = new_status).where(Event.id == event_id)
        if query.execute():
            data = {
                'id': event.id,
                'lesson_id': event.lesson_id,
                'user_id': user.id,
                'status': event.status,
                'start_datetime': event.start_datetime,
                'rating': event.rating,
                'comment': event.comment
            }
            return success_201(f'status of event {event.id} updated succesfully', data)
        else:
            return error_401('Error when updating status of event')
    else:
        return error_401('User not found!')

@events_api_blueprint.route('/<event_id>/review', methods=['POST'])
@jwt_required
def update_review(event_id):
    if not request.is_json:
        return error_401('Response is not JSON!')

    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)
    if user:
        user_update = request.get_json()
        new_rating = user_update['rating']
        if (str(user_update['recommend']) == "True"):
            new_recommend = True
        elif (str(user_update['recommend']) == "False"):
            new_recommend = False        
        new_comment = user_update['comment']
        event = Event.get_or_none(event_id == Event.id)
        query = Event.update(rating = new_rating, comment=new_comment).where(Event.id == event_id)
        if query.execute():
            data = {
                'id': event.id,
                'lesson_id': event.lesson_id,
                'user_id': user.id,
                'status': event.status,
                'start_datetime': event.start_datetime,
                'rating': event.rating,
                'comment': event.comment,
                'comment': event.recommend
            }
            return success_201(f'Rating and comment of event {event.id} updated succesfully', data)
        else:
            return error_401('Error when updating rating and comment of event')
    else:
        return error_401('User not found!')


