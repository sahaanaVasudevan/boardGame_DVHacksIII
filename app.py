import os
from flask import Flask, render_template,url_for,redirect,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

@app.route('/')
def home():
    return render_template('boardGame.html')

if __name__ == "__main__":
    app.run()
