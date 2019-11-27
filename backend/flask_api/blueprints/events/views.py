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
    # Check for valid json
    if not request.is_json:
        return error_401('Request is not JSON!')

    # Check if user exists and signed in
    jwt_identity = get_jwt_identity()
    user = User.get_or_none(jwt_identity == User.name)

    if user: 
        # Retrieve data from json
        data = request.get_json()

        lesson_id = data['lesson_id']
        user_id = data['user_id']
        start_datetime = data['start_datetime']

        event = Event(lesson = lesson_id , user= user_id, start_datetime = start_datetime, status='Pending')
        if event.save():
            data = {
                'id': event.id,
                'lesson_id': event.lesson_id,
                'user_id': event.user_id,
                'status': event.status,
                'start_datetime': event.start_datetime,
                'rating': event.rating,
                'recommend': event.recommend,
                'comment': event.comment
            }
            return success_201('Event created successfully!', data)
        else:
           return error_401('Error when creating event')
    else:
       return error_401('User not found in database!')


@events_api_blueprint.route('/', methods=['GET'])
@jwt_required
def index():
    # Check if user exists and signed in
    jwt_identity = get_jwt_identity()

    user = User.get_or_none(User.name == jwt_identity)
    if user:
        # Retrieve events that belong to user from database
        data = [
            {
                'id': event.id,
                'lesson_id': event.lesson_id,
                'user_id': event.user_id,
                'status': event.status,
                'start_datetime': event.start_datetime,
                'rating': event.rating,
                'recommend': event.recommend,
                'comment': event.comment
            } for event in Event.select().where(Event.user_id == user.id)
        ]
        return success_201("List of all current user's events", data)
    else:
        return error_401('User not found in database!')

@events_api_blueprint.route('/<event_id>', methods=['GET'])
def show(event_id):
    event = Event.get_or_none(Event.id == event_id)    
    if event:
        data = {
            'id': event.id,
            'lesson_id': event.lesson_id,
            'user_id': event.user_id,
            'status': event.status,
            'start_datetime': event.start_datetime,
            'rating': event.rating,
            'recommend': event.recommend,
            'comment': event.comment
        }
        return success_201(f'Returned data about event {event_id}', data)
    else:
        return error_401('Event not found in database!')


@events_api_blueprint.route('/<event_id>/datetime', methods=['POST'])
@jwt_required
def update_datetime(event_id):
    # Check for valid json
    if not request.is_json:
        return error_401('Response is not JSON!')

    # Check if user exists and signed in
    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)
    if user:
        # Retrieve data from json
        data = request.get_json()
        start_datetime = data['start_datetime'] 

        # Retrieve event from database
        event = Event.get_or_none(event_id == Event.id)
        if event:
            query = Event.update(start_datetime = start_datetime).where(Event.id == event_id)
            if query.execute():
                data = {
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'user_id': event.user_id,
                    'status': event.status,
                    'start_datetime': event.start_datetime,
                    'rating': event.rating,
                    'recommend': event.recommend,
                    'comment': event.comment
                }
                return success_201(f'start_datetime of event {event.id} updated succesfully', data)
            else:
                return error_401('Error when updating datetime of event')
        else:
            return error_401('Event not found!')
    else:
        return error_401('User not found!')
    

@events_api_blueprint.route('/<event_id>/status', methods=['POST'])
@jwt_required
def update_status(event_id):
    # Check for valid json
    if not request.is_json:
        return error_401('Response is not JSON!')

    # Check if user exists and signed in
    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)
    if user:
        # Retrieve data from json
        data = request.get_json()
        status = data['status']

        # Retrieve event from database
        event = Event.get_or_none(event_id == Event.id)
        if event:
            query = Event.update(status = status).where(Event.id == event_id)
            if query.execute():
                data = {
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'user_id': event.user_id,
                    'status': event.status,
                    'start_datetime': event.start_datetime,
                    'rating': event.rating,
                    'recommend': event.recommend,
                    'comment': event.comment
                }
                return success_201(f'status of event {event.id} updated succesfully', data)
            else:
                return error_401('Error when updating status of event')
        else:
            return error_401('Event not found!')
    else:
        return error_401('User not found!')

@events_api_blueprint.route('/<event_id>/review', methods=['POST'])
@jwt_required
def update_review(event_id):
    # Check for valid json
    if not request.is_json:
        return error_401('Response is not JSON!')

    # Check if user exists and signed in
    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)
    if user:
        # Retrieve data from json
        data = request.get_json()
        rating = data['rating']
        if (str(data['recommend']) == "True"):
            recommend = True
        elif (str(data['recommend']) == "False"):
            recommend = False        
        comment = data['comment']

        # Retrieve event from database
        event = Event.get_or_none(event_id == Event.id)
        if event:
            query = Event.update(rating=rating, recommend=recommend, comment=comment).where(Event.id == event_id)
            if query.execute():
                data = {
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'user_id': event.user_id,
                    'status': event.status,
                    'start_datetime': event.start_datetime,
                    'rating': event.rating,
                    'recommend': event.recommend,
                    'comment': event.comment
                }
                return success_201(f'Review of event {event.id} updated succesfully', data)
            else:
                return error_401('Error when updating review of event')
        else:
            return error_401('Event not found!')
    else:
        return error_401('User not found!')

