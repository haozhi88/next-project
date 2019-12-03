from flask import Flask
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from flask_api.util.response import *
from models.user import User
from models.event import Event
from models.lesson import Lesson

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

        # Get lesson
        lesson = Lesson.get_or_none(Lesson.id == lesson_id)
        if lesson:
            event = Event(lesson = lesson_id , user= user_id, owner=lesson.owner_id, start_datetime = start_datetime, status='pending')
            if event.save():
                data = {
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'lesson_title': event.lesson.title,
                    'user_id': event.user_id,
                    'user_name': event.user.name,
                    'owner_id': event.owner_id,
                    'owner_name': event.owner.name,
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
            return error_401('Lesson not found in database!')
    else:
       return error_401('User not found in database!')

@events_api_blueprint.route('/', methods=['GET'])
def index():
    # Retrieve all events
    data = [
        {
            'id': event.id,
            'lesson_id': event.lesson_id,
            'lesson_title': event.lesson.title,
            'user_id': event.user_id,
            'user_name': event.user.name,
            'owner_id': event.owner_id,
            'owner_name': event.owner.name,
            'status': event.status,
            'start_datetime': event.start_datetime,
            'rating': event.rating,
            'recommend': event.recommend,
            'comment': event.comment
        } for event in Event.select()
    ]
    return success_201("List of all events", data)

@events_api_blueprint.route('/my', methods=['GET'])
# @jwt_required
def my_events():
    # Retrieve data from json
    data = request.args.getlist('status[]')

    # Check if user exists and signed in
    # jwt_identity = get_jwt_identity()
    jwt_identity = request.args.get('user_name')

    user = User.get_or_none(User.name == jwt_identity)
    if user:
        applicant = []
        owner = []
        for status in data:
            applicant_events = Event.select().where(Event.user_id == user.id, Event.status == status).order_by(Event.start_datetime)
            for event in applicant_events:
                applicant.append({
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'lesson_title': event.lesson.title,
                    'user_id': event.user_id,
                    'user_name': event.user.name,
                    'owner_id': event.owner_id,
                    'owner_name': event.owner.name,
                    'status': event.status,
                    'start_datetime': event.start_datetime,
                    'rating': event.rating,
                    'recommend': event.recommend,
                    'comment': event.comment
                })
            
            owner_events = Event.select().where(Event.owner_id == user.id, Event.status == status).order_by(Event.start_datetime)
            for event in owner_events:
                owner.append({
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'lesson_title': event.lesson.title,
                    'user_id': event.user_id,
                    'user_name': event.user.name,
                    'owner_id': event.owner_id,
                    'owner_name': event.owner.name,
                    'status': event.status,
                    'start_datetime': event.start_datetime,
                    'rating': event.rating,
                    'recommend': event.recommend,
                    'comment': event.comment
                })

        data = {
            'applicant': applicant,
            'owner': owner
        }
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
            'lesson_title': event.lesson.title,
            'user_id': event.user_id,
            'user_name': event.user.name,
            'owner_id': event.owner_id,
            'owner_name': event.owner.name,
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
                    'lesson_title': event.lesson.title,
                    'user_id': event.user_id,
                    'user_name': event.user.name,
                    'owner_id': event.owner_id,
                    'owner_name': event.owner.name,
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
                    'lesson_title': event.lesson.title,
                    'user_id': event.user_id,
                    'user_name': event.user.name,
                    'owner_id': event.owner_id,
                    'owner_name': event.owner.name,
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
            query = Event.update(rating=rating, recommend=recommend, comment=comment, status="reviewed").where(Event.id == event_id)
            if query.execute():
                data = {
                    'id': event.id,
                    'lesson_id': event.lesson_id,
                    'lesson_title': event.lesson.title,
                    'user_id': event.user_id,
                    'user_name': event.user.name,
                    'owner_id': event.owner_id,
                    'owner_name': event.owner.name,
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

@events_api_blueprint.route('/exists', methods=['GET'])
@jwt_required
def check_for_event():

    # Check if user exists and signed in
    jwt_identity = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_identity)

    if not user:
        return error_401('Unauthorized action!')

    lesson = request.args['lesson_id']
    event_query = Event.get_or_none((Event.user_id == user.id) and (Event.lesson_id == lesson))
    if event_query:
        data=True
    else:
        data=False
    return success_200(data)
