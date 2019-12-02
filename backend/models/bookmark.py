from models.base_model import BaseModel
from models.lesson import Lesson
from models.user import User
import peewee as pw

class Bookmark(BaseModel):
    owner = pw.ForeignKeyField(User, backref='bookmarks', on_delete='CASCADE')
    lesson = pw.ForeignKeyField(Lesson, backref='bookmarks', on_delete='CASCADE')
