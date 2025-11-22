# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default="developer")

    reported_bugs = db.relationship(
        'Bug', backref='reporter', foreign_keys='Bug.reporter_id'
    )
    assigned_bugs = db.relationship(
        'Bug', backref='assignee', foreign_keys='Bug.assignee_id'
    )

class Bug(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default="Open")
    priority = db.Column(db.String(50), default="Medium")

    reporter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    assignee_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
