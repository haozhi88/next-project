from config import Config
from models.base_model import BaseModel
from models.user import User
import peewee as pw

class Skill(BaseModel):
    name = pw.CharField(null=False)