from flask import Flask, jsonify, Blueprint,request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from flask_api.util.response import *
from models.user import User
from models.skill import Skill
from models.lesson import Lesson
from werkzeug.security import check_password_hash

sessions_api_blueprint = Blueprint('sessions_api', __name__)

@sessions_api_blueprint.route('/signin', methods=['POST'])
def create():
    # Check for valid json
    if not request.is_json:
        return error_401("Reponse is not JSON")
    
    # Retrieve data from json
    data = request.get_json()

    name = data['userSignIn']['name']
    password = data['userSignIn']['password']
    latitude = data['latitude']
    longtitude = data['longtitude']
    
    # Check for valid name and password
    if name and password:
        user = User.get_or_none(User.name == name)
        if user and check_password_hash(user.password, password):
            query = User.update(latitude = latitude, longtitude = longtitude).where(User.id == user.id)
            if query.execute():
                # Generate an access token(JWT) with identity as user's name
                access_token = create_access_token(identity = name)

                # Get user skills
                user_skills = Skill.select().join(Lesson, on=(Skill.id == Lesson.skill)).where((Lesson.owner_id == user.id) and (Lesson.teach == True))
                skills = []
                for user_skill in user_skills:
                    exist = False
                    for skill in skills:
                        if (user_skill.name == skill):
                            exist = True
                            break
                    if exist:
                        continue
                    else:
                        skills.append(user_skill.name)

                # Concatenate string for skills
                string = ""
                for index, skill  in enumerate(skills):
                    if index > 0:
                        string += ", "
                    string += str(skill)

                data =  {
                    "id": user.id,
                    "profile_picture": user.profile_picture,
                    "name": user.name,
                    'email': user.email,
                    "access_token": access_token,
                    "latitude": user.latitude,
                    "longtitude": user.longtitude,
                    "skills": string
                }
                return success_201('User credentials are verified for sign in!', data)
            else:
                return error_401('Error when updating location!')
        else:
            return error_401('Invalid username or password!')
    else:
        return error_401('Invalid input!')

