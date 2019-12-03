from flask import Blueprint
from flask_api.util.response import *

versions_api_blueprint = Blueprint('versions_api', __name__)

@versions_api_blueprint.route('/', methods=['GET'])
def index():
    version = 8
    return success_200(version)
