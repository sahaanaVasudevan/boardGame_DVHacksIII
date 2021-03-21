import os
from flask import Flask, render_template,url_for,redirect,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

@app.route('/')
def game_redirect():
    return redirect(url_for('index'))

@app.route('/index')
def index():
    return render_template("homePage.html")



@app.route('/funSpree')
def funSpree():
    dice_number=random.randint(1,6)
    dice_number=str(dice_number)
    url_path='static'+'/'+dice_number+'.jpg'
    return render_template("boardGame.html",dice_number=dice_number,url_path=url_path)

@app.route('/funSpreeGameRules')
def funSpreeGameRules():
    return render_template("funSpreeGameRules.html")

@app.route('/rules')
def rules_redirect():
    return redirect(url_for('rules'))

@app.route('/game/rules')
def rules():
    return render_template("rules.html")

if __name__ == "__main__":
    app.run()
