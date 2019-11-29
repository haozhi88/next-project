from app import app
from flask_cors import CORS

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

## API Routes ##
from flask_api.blueprints.users.views import users_api_blueprint
from flask_api.blueprints.sessions.views import sessions_api_blueprint
from flask_api.blueprints.lessons.views import lessons_api_blueprint
from flask_api.blueprints.events.views import events_api_blueprint
from flask_api.blueprints.skills.views import skills_api_blueprint
from flask_api.blueprints.versions.views import versions_api_blueprint

app.register_blueprint(users_api_blueprint, url_prefix='/api/v1/users')
app.register_blueprint(sessions_api_blueprint, url_prefix='/api/v1/sessions')
app.register_blueprint(lessons_api_blueprint, url_prefix='/api/v1/lessons')
app.register_blueprint(events_api_blueprint, url_prefix='/api/v1/events')
app.register_blueprint(skills_api_blueprint, url_prefix='/api/v1/skills')
app.register_blueprint(versions_api_blueprint, url_prefix='/api/v1/versions')



