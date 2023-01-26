from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
DATABASE_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "secretBlaKey-345"
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DATABASE_NAME}'
    db.init_app(app)

        
    from .public import public
    app.register_blueprint(public, url_prefix ='/')
    from .auth import auth
    app.register_blueprint(auth, url_prefix ='/')


    with app.app_context():
        # db.drop_all()
        db.create_all()

    from .model import User
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app
