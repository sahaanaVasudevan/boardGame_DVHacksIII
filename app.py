import os
from flask import Flask, render_template,url_for,redirect,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random
