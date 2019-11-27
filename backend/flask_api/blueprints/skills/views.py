from flask import Flask, jsonify, Blueprint,request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_api.util.response import *
from models.skill import Skill

skills_api_blueprint = Blueprint('skills_api', __name__)

@skills_api_blueprint.route('/create', methods=['POST'])
def create():
    # Check for valid json
    if not request.is_json:
        return error_401("Reponse is not JSON")
    
    # Retrieve data from json
    data = request.get_json()
    skill = data['skill']

    # Check for valid name and password
    if skill:
        new_skill = Skill(name=skill)
        if new_skill.save():
            data = {
                "skill": skill
            }            
            return success_201('Created skill successfully', data)            
        else:
            return error_401('Create skill failed!')
    else:
        return error_401('Invalid input!')

@skills_api_blueprint.route('/', methods=['GET'])
def index():
    # Return list of skills
    skills = [ 
        {
            'id': skill.id,
            'skill': skill.name
        } for skill in Skill.select()
    ]
    return success_200(skills)