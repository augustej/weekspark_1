from . import db 
from flask_login import UserMixin
from sqlalchemy.sql import func

groupMembers = db.Table('groupMembers',
    db.Column('id', db.Integer, primary_key = True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group', db.Integer, db.ForeignKey('group.id'))
)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(150))  

class Invitation(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
    status = db.Column(db.String(100))

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(10000))
    duration = db.Column(db.Integer)
    activity_type_id = db.Column(db.Integer, db.ForeignKey('activity_type.id'))
    activity_price = db.Column(db.Integer)
    transportation_price = db.Column(db.Integer)
    destination = db.Column(db.String(10000))
    description = db.Column(db.String(100000))
    usefull_links= db.Column(db.String(100000))
    images= db.Column(db.String(100000))
    distance = db.Column(db.Integer)
    ascend = db.Column(db.Integer)
    descend = db.Column(db.Integer)
    lng=db.Column(db.Integer)
    lat=db.Column(db.Integer)

class Suggested_activities(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))
    votes = db.Column(db.Integer)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
    creator = db.Column(db.Integer, db.ForeignKey('user.id'))

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))

class Winner(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))

class Group(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    membersList = db.relationship('User', secondary=groupMembers, lazy=True)

class Activity_type(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(10000))
