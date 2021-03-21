import os
from flask import Flask, render_template,url_for,redirect,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'svgames')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Migrate(app,db)


basedir = os.path.abspath(os.path.dirname(__file__))

#DB model for User - Register and Login
class Users(db.Model):
  __tablename__ = 'users'
  username = db.Column(db.Text,primary_key=True)
  fullname = db.Column(db.Text)
  password = db.Column(db.Text)
  userType=db.Column(db.Text)

  def __init__(self,username, fullname, password, userType):
      self.username = username
      self.fullname = fullname
      self.password = password
      self.userType=userType

  def __repr__(self):
      return f"User name: {self.username} {self.fullname} {self.userType}"
#db.drop_all()
db.create_all()
@app.route('/') #By default go to index page
def game_redirect():
    return redirect(url_for('index'))

@app.route('/index')
def index():
    return render_template("homePage.html")



@app.route('/funSpree')
def funSpree():
    level=request.args.get("level")
    print(level)
    if level is None: #by default go to level 1
        level = "1"
    if level == "1":
        return render_template("boardGame.html")
    elif level == "2":
        return render_template("boardGameLevel2.html")
    else:
        return render_template("boardGame.html")

@app.route('/funSpreeGameRules')
def funSpreeGameRules():
    return render_template("funSpreeGameRules.html")

@app.route('/game/rules')
def rules():
    return render_template("rules.html")

#View registration page
@app.route('/signup', methods=['GET'])
def sign_up():
    return render_template('register.html')

#Registeration page - create user
@app.route('/signup', methods=['POST'])
def sign_up_post():
    #Get from Form
    fullname=request.form.get('fullname')
    email=request.form.get("email")
    pwd=request.form.get("pwd")
    user=Users(email,fullname,pwd,'U') # 'U' - User type
    user_email=Users.query.get(email) #Check same email already exists
    fail=False
    if user_email is None:
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    else: #registration error
        fail=True
        error_message="Username already exists"
        return render_template('register.html',error_message=error_message,fail=fail)

#Render login page
@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')

#Validate user login
@app.route('/login', methods=['POST'])
def val():
    email=request.form.get("email2")
    pwd=request.form.get("pwd2")
    print(email)
    print(pwd)
    user = Users.query.get(email) #Check user exists
    if(user is not None and user.password == pwd and user.userType=='U'):
        fail=False
        print('success')
        return redirect(url_for('funSpree'))
    else:
        fail=True
        print('fail')
        return render_template('login.html', fail=fail)

#Sign out from application
@app.route('/sign-out', methods=['GET','POST'])
def sign_out():
    return render_template('sign_out.html')

if __name__ == "__main__":
    app.run()
