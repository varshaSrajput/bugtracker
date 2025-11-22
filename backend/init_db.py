# backend/init_db.py
from app import create_app
from models import db, User
import bcrypt

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    # create sample admin
    pw = bcrypt.hashpw("adminpass".encode(), bcrypt.gensalt()).decode()
    admin = User(name="Admin", email="admin@example.com", password_hash=pw, role="admin")
    db.session.add(admin)
    db.session.commit()
    print("Database created successfully (instance/bugtracker.db). Sample admin: admin@example.com / adminpass")
