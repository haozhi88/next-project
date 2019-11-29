from flask import Blueprint, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from flask_api.util.response import *
from models.user import User
from werkzeug.security import check_password_hash, generate_password_hash

users_api_blueprint = Blueprint('users_api', __name__)

@users_api_blueprint.route('/signup', methods=['POST'])
def new():
    # Check for valid json
    if not request.is_json:
        return error_401('Response is not JSON!')

    # Retrieve data from json
    data = request.get_json()

    name = data['name']
    email = data['email']
    password = data['password']

    # Create new user in database
    if name and email and password:
        # Check if user or email already exist in database
        check_name = User.get_or_none(User.name == name) 
        check_email = User.get_or_none(User.email == email)
        if check_name or check_email:
            return error_401('This username or email had been used!')
            
        # Hash password and save user to database
        hashed_password = generate_password_hash(password)
        user = User(name =name, email=email, password=hashed_password)
        if user.save():            
            # Generate an access token(JWT) with identity as user's name
            access_token = create_access_token(identity = name)
            data = {
                "id": user.id,
                "profile_picture": user.profile_picture,
                "name": user.name,
                'email': user.email,
                "access_token": access_token
            }            
            return success_201('Created account successfully', data)
        else:
            return error_401('Create account failed!')
    else:
        return error_401('Invalid input!')

@users_api_blueprint.route('/', methods=['GET'])
def index():
    # Return list of users' details
    users = [ 
        {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'profile_picture': user.profile_picture
        } for user in User.select()
    ]
    return success_200(users)

@users_api_blueprint.route('/<user_id>', methods=['GET'])
def show(user_id):
    # Return user details
    user = User.get_or_none(User.id == user_id) 
    data = {
        'id': user.id, 
        'name': user.name,
        'email': user.email,
        'profile_picture': user.profile_picture
    } 
    return success_201(f"Returned details of user with id: {data['id']}", data)

@users_api_blueprint.route('/<user_id>', methods=['POST'])
@jwt_required
def update(user_id):
    # Check for valid json
    if not request.is_json:
        return error_401('Response is not JSON!')

    # Check if user exists
    user = User.get_or_none(User.id == user_id)

    if not user:
        return error_401('User not found!')

    # Check whether user signed in matched with user_id
    jwt_user = get_jwt_identity()

    if not jwt_user == user.name:
        return error_401('Unauthorized user!')

    # Retrieve data from json
    data = request.get_json()

    name = data['name']
    email = data['email']
    password = data['password']

    # Update user details in database
    if name and email and password:
        hashed_password = generate_password_hash(password)
        query = User.update(name=name, email=email, password=hashed_password).where(User.id == user.id)
        if query.execute():            
            data = {
                'id': user.id,
                'name': name,
                'email': email,
                'profile_picture': user.profile_picture
            }        
            return success_201('Updated user details successfully!', data)
        else:
            return error_401('Update user details failed!')
    else:
        return error_401('User details cannot be empty!')

# @users_api_blueprint.route('/<user_id>', methods=['POST'])
# @jwt_required
# def update_profile_picture(user_id):
    
#     jwt_user = get_jwt_identity()
#     user = User.get_or_none(User.name == jwt_user)

#     if user:
#         image_file = request.files

#         if image_file:
#             x = User.update(User.profile_picture = image_file.name).where(User.id == user.id) 

#             if x.execute():

#                 data = {
#                 'id': user.id,
#                 'name': user.name,
#                 'email': user.email,
#                 'profile_picture': user.profile_picture
#                 }

#                 success_201('Profile image successfully updated', data)

#             else:
#                 error_401('Invalid file input!')            

#     else:
#         error_401('User not found!')

    



