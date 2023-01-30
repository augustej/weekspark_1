from flask import render_template, Blueprint, request, Response, flash, url_for, redirect
from .model import User, Group, groupMembers
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_required, login_user, current_user, logout_user
from . import db


auth = Blueprint('auth', __name__)


@auth.route('/api/is-user-logged-in', methods=['GET'])
def isLoggedin():
    try:
        hasname = current_user.name
        if hasname:
            return "true"
    except:
        return "false"

@auth.route('/api/login', methods=['POST'])
def login(): 
 
    data = request.get_json()
    typed_email=data['email']
    typed_pass = data['pass']
    user = User.query.filter_by(email=typed_email).first()
    if user:
        if check_password_hash(user.password, typed_pass):
            login_user(user, remember=True)
            response = {'Success':''}
        else:
            response = {'Error':'wrong password'}
    else:
        response = {'Error':'wrong email'}

    return response
    

@auth.route('/api/logout', methods=["POST"])
@login_required
def logout():
    logout_user()
    return redirect(request.referrer)

@auth.route('/api/register', methods=['POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password1 = request.form.get('pass1')
        new_user = User(email=email, name=name, password=generate_password_hash(password1) )
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)

        # create new group on registration
        newgroup = Group()
        db.session.add(newgroup)
        db.session.commit()
        insertStatement = groupMembers.insert().values(group=newgroup.id, user_id=current_user.id)
        db.session.execute(insertStatement)
        db.session.commit()

        return redirect(request.referrer)
    

@auth.route('/api/email-check', methods=['GET'])
def emailCheck():
    if request.method == 'GET':
        emailToCheck = request.args.get("email")
        user = User.query.filter_by(email=emailToCheck).first()
        if user:   
            return "false"
        return "true"       