# config.py
import os
from dotenv import load_dotenv

# load .env from same folder (or parent)
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'change-me')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-change-me')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///bugtracker.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
