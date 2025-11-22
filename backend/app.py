# app.py
from flask import Flask, request, jsonify
from config import Config
from models import db, User, Bug
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from flask_cors import CORS
import bcrypt


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    jwt = JWTManager(app)

    @app.route("/api/register", methods=["POST"])
    def register():
        data = request.json
        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"msg": "Email already exists"}), 400

        pw_hash = bcrypt.hashpw(
            data["password"].encode(), bcrypt.gensalt()
        ).decode()

        user = User(
            name=data.get("name"),
            email=data["email"],
            password_hash=pw_hash,
            role=data.get("role", "developer"),
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "User created"}), 201

    @app.route("/api/login", methods=["POST"])
    def login():
        data = request.json
        user = User.query.filter_by(email=data["email"]).first()
        if not user or not bcrypt.checkpw(
            data["password"].encode(), user.password_hash.encode()
        ):
            return jsonify({"msg": "Bad credentials"}), 401

        access = create_access_token(
            identity={
                "id": user.id,
                "email": user.email,
                "role": user.role,
            }
        )

        return jsonify(
            {
                "access_token": access,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                },
            }
        )

    @app.route("/api/bugs", methods=["GET"])
    @jwt_required()
    def list_bugs():
        args = request.args
        status = args.get("status")
        q = Bug.query
        if status:
            q = q.filter_by(status=status)
        bugs = q.order_by(Bug.created_at.desc()).all()

        result = []
        for b in bugs:
            result.append(
                {
                    "id": b.id,
                    "title": b.title,
                    "description": b.description,
                    "status": b.status,
                    "priority": b.priority,
                    "reporter": b.reporter.name if b.reporter else None,
                    "assignee": b.assignee.name if b.assignee else None,
                    "created_at": b.created_at.isoformat()
                    if b.created_at
                    else None,
                    "updated_at": b.updated_at.isoformat()
                    if b.updated_at
                    else None,
                }
            )
        return jsonify(result)

    @app.route("/api/bugs", methods=["POST"])
    @jwt_required()
    def create_bug():
        identity = get_jwt_identity()
        data = request.json
        bug = Bug(
            title=data["title"],
            description=data.get("description", ""),
            priority=data.get("priority", "Medium"),
            reporter_id=identity["id"],
        )
        db.session.add(bug)
        db.session.commit()
        return jsonify({"msg": "Bug created", "id": bug.id}), 201

    @app.route("/api/bugs/<int:bid>", methods=["PUT"])
    @jwt_required()
    def update_bug(bid):
        data = request.json
        bug = Bug.query.get_or_404(bid)

        if "title" in data:
            bug.title = data["title"]
        if "description" in data:
            bug.description = data["description"]
        if "status" in data:
            bug.status = data["status"]
        if "priority" in data:
            bug.priority = data["priority"]
        if "assignee_id" in data:
            bug.assignee_id = data["assignee_id"]

        db.session.commit()
        return jsonify({"msg": "Bug updated"})

    @app.route("/api/bugs/<int:bid>", methods=["DELETE"])
    @jwt_required()
    def delete_bug(bid):
        bug = Bug.query.get_or_404(bid)
        db.session.delete(bug)
        db.session.commit()
        return jsonify({"msg": "Bug deleted"})

    @app.route("/api/users", methods=["GET"])
    @jwt_required()
    def list_users():
        users = User.query.all()
        return jsonify(
            [
                {
                    "id": u.id,
                    "name": u.name,
                    "email": u.email,
                    "role": u.role,
                }
                for u in users
            ]
        )

    return app


# Expose a module-level `app` for gunicorn: `gunicorn app:app`
app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)

