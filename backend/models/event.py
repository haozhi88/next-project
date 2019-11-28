from config import Config
from flask_login import UserMixin
from models.base_model import BaseModel
from models.lesson import Lesson
from models.user import User
import peewee as pw

class Event(BaseModel):
    lesson = pw.ForeignKeyField(Lesson, backref='events', on_delete='CASCADE')
    user = pw.ForeignKeyField(User, backref='events', on_delete='CASCADE')
    status = pw.CharField(default='pending')
    rating = pw.IntegerField(default=0)
    start_datetime = pw.DateTimeField(null=False)
    comment = pw.CharField(null=True)
    recommend = pw.BooleanField(default = False)