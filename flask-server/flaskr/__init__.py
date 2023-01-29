from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os


db = SQLAlchemy()
DATABASE_NAME = "database.db"

def create_app():
    app = Flask(__name__, static_folder="../client/build", static_url_path="/")
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    print(os.getenv('SECRET_KEY'), "ENV")
    # app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DATABASE_NAME}'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join('../../../') + f'{DATABASE_NAME}'
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
