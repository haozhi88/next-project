from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_api.util.response import *
from models.user import User
from models.lesson import Lesson
from models.bookmark import Bookmark

bookmarks_api_blueprint = Blueprint('bookmarks_api', __name__)


@bookmarks_api_blueprint.route('/create', methods=['POST'])
@jwt_required
def create():
    if not request.is_json:
        return error_401("Reponse is not JSON")

    # Check if user exists and signed in
    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user) 

    if not user:
        return error_401("Unauthorized action")

    bookmark_data = request.get_json()
    lesson = bookmark_data['lesson_id']

    if Bookmark.create(owner = user.id, lesson = lesson):
        data = {
            'lesson_id': lesson,
            'user_id': user.id
        }
        return success_201('Bookmark saved!', data)

@bookmarks_api_blueprint.route('/', methods=['GET'])
@jwt_required
def index():

    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user) 

    if not user:
        return error_401("Unauthorized action")

    user_bookmarks = Lesson.select().join(Bookmark, on=(Bookmark.lesson == Lesson.id)).where(Bookmark.owner == user.id)

    data = [
        {
            'id': lesson.id,
            'title': lesson.title,
            'description': lesson.description,
            'rating': lesson.rating,
            'teach': lesson.teach,
            'owner_id': lesson.owner_id,
            'owner_name': lesson.owner.name,
            'skill_id': lesson.skill_id,
            'skill_name': lesson.skill.name,
            'image_url': lesson.image_url
        } for lesson in user_bookmarks
    ]

    return success_201("Returned list of the current user's bookmarks", data)

@bookmarks_api_blueprint.route('/delete', methods=['POST'])
@jwt_required
def delete():

    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user) 

    if not user:
        return error_401('Unauthorzied action!')
    
    if not request.is_json:
        return error_401('Request is not JSON!')

    data = request.get_json()
    lesson_id = data['lesson_id']

    query = Bookmark.delete().where((Bookmark.owner_id == user.id) and (Bookmark.lesson_id == lesson_id)) 
    
    if query.execute():
        data = f'Bookmark belonging to user: {user.id} and lesson: {lesson_id} has been deleted'
        return success_201('Bookmark succesfully removed!', data)
    
@bookmarks_api_blueprint.route('/<lessonID>', methods=['GET'])
@jwt_required
def show(lessonID):
    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user) 

    if not user:
        return error_401('Unauthorzied action!')

    bookmark_test = Bookmark.get_or_none((Bookmark.owner_id == user.id) and (Bookmark.lesson_id == lessonID))

    if bookmark_test:
        data = True    
    else:
        data = False
        

    return success_201('Bookmark checked', data)