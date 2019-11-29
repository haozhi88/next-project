from config import Config
from flask_login import UserMixin
from models.base_model import BaseModel
import peewee as pw


class User(BaseModel, UserMixin):
    name = pw.CharField(unique=False, null=False)
    email = pw.CharField(unique=True, null=False)
    password = pw.CharField(null=False)
    profile_picture = pw.CharField(default='https://www.medaid.co.uk/wp-content/uploads/2019/04/default.jpg')
    latitude = pw.DecimalField(default=3.1424113)
    longtitude = pw.DecimalField(default=101.6271656)


