from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_api.util.s3 import *
from flask_api.util.response import *
from models.user import User
from models.lesson import Lesson
from models.skill import Skill
from models.bookmark import Bookmark
from werkzeug.utils import secure_filename

lessons_api_blueprint = Blueprint('lessons_api', __name__)

@lessons_api_blueprint.route('/create', methods=['POST'])
@jwt_required
def create():
    # Check if user exists and signed in
    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user)
    if not user:
        return error_401("Unauthorized action")

    # Retrieve data from json
    title = request.form.get("title")
    description = request.form.get("description")
    if (str(request.form.get("teach")) == "true"):
        teach = True
    elif (str(request.form.get("teach")) == "false"):
        teach = False
    else:
        return error_401("Invalid teach input")
    skill = request.form.get("skill")

    # Retrieve image from json 
    image_valid = False
    if "image" in request.files:
        image_file = request.files['image']
        if image_file and allowed_file(image_file.filename):
            image_file.filename = secure_filename(image_file.filename)
            output   	  = upload_file_to_s3(image_file)
            image_valid = True

    # Check title and description and then create new lesson
    if title and description:
        if image_valid:
            lesson = Lesson(title=title, description=description, teach=teach, owner=user, skill=skill, image=image_file.filename)
        else:
            lesson = Lesson(title=title, description=description, teach=teach, owner=user, skill=skill)
        if lesson.save():
            lesson = {
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
            }
            return success_201("New lesson created successfully", lesson) 
        else:
            return error_401("Create lesson failed")    
    else:
        return error_401("Invalid title or description")

@lessons_api_blueprint.route('/', methods=['GET'])
def index():
    # Retrieve lessons from database
    lessons = [ 
        {
            'id': lesson.id,
            'title': lesson.title,
            'description': lesson.description,
            'rating': lesson.rating,
            'owner_id': lesson.owner_id,
            'owner_name': lesson.owner.name,
            'teach': lesson.teach,
            'skill_id': lesson.skill_id,
            'skill_name': lesson.skill.name,
            'image_url': lesson.image_url
        } for lesson in Lesson.select()
    ]
    return success_200(lessons)

@lessons_api_blueprint.route('/filter', methods=['GET'])
def index_with_filter():
    # Retrieve arguments
    teach = request.args.get('teach')
    if (teach == "true"):
        teach_option = True
    elif (teach == "false"):
        teach_option = False
    else:
        return error_401("Invalid teach input")

    # Retrieve lessons from database
    lessons = [ 
        {
            'id': lesson.id,
            'title': lesson.title,
            'description': lesson.description,
            'rating': lesson.rating,
            'owner_id': lesson.owner_id,
            'owner_name': lesson.owner.name,
            'teach': lesson.teach,
            'skill_id': lesson.skill_id,
            'skill_name': lesson.skill.name,
            'image_url': lesson.image_url
        } for lesson in Lesson.select().where(Lesson.teach == teach_option)
    ]
    return success_200(lessons)

@lessons_api_blueprint.route('/<lesson_id>', methods=['GET'])
def show(lesson_id):
    # Retrieve particular lesson from database
    lesson = Lesson.get_or_none(Lesson.id == lesson_id)

    if lesson:
        data = {
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
        }
        return success_200(data)
    else:
        return error_404("Lesson does not exist")

@lessons_api_blueprint.route('/<lesson_id>', methods=['POST'])
@jwt_required
def update(lesson_id):
    # Check for valid json
    if not request.is_json:
        return error_401("Reponse is not JSON")

    # Check if user exists and signed in
    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user) 

    if not user:
        return error_401("Unauthorized action")

    # Retrieve data from json
    data = request.get_json()
    title = data['title']
    description = data['description']

    # Check title and description and then create new lesson
    if title and description:
        lesson = Lesson.update(title=title, description=description).where(Lesson.id==lesson_id).execute()
        if lesson:
            return success_201("Update lesson successfully", lesson)
        else:
            return error_401("Update lesson failed")    
    else:
        return error_401("Invalid title or description")

@lessons_api_blueprint.route('/search_lessons', methods=['GET'])
def search_lessons():

    search_value = request.args['search_value']

    teach_arg = request.args['teach']
    if str(teach_arg) == 'true':
        teach=True
    else:
        teach=False

    list_of_skills = []
    final_lessons_list = []
    
    split_search_value = search_value.lower().split(" ") #This is a list []

    for word in split_search_value: #loop through the split search string
        for lesson in Lesson.select().where(Lesson.teach == teach): #loop through all rows in Lesson
            if (word in lesson.title.lower()) or (word in lesson.skill.name.lower()) or (word in lesson.description.lower()): #if a word from the split search string is part of the lesson title, append it to a list
                final_lessons_list.append(lesson)

                    
    if len(final_lessons_list) > 0:
        
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
            } for lesson in final_lessons_list
        ]

        return success_201('success testing', data)
    else:
        return success_201('No lessons matched the search query', [])
    
@lessons_api_blueprint.route('/add_image', methods=['POST'])
@jwt_required
def add_image():
    jwt_user = get_jwt_identity()
    user = User.get_or_none(User.name == jwt_user) 

    if user:
        image_file = request.files.get('image')
        request_data = request.get_json()
        if request_data:
            lesson_id = request_data.lesson_id
            query = Lesson.update(image = image_file.filename).where(Lesson.id == lesson_id)
            if query.execute() and upload_file_to_s3(image_file):
                return success_201('Image successfully saved and uploaded!')
            else:
                return error_401('Error when saving image to S3 or database!')
        else:
            return error_401('Requested data is not JSON or not found!')
    else:
        error_401('User not found!')



    



