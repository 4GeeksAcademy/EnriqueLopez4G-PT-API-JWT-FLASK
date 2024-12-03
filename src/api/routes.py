"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, JWTManager
from datetime import timedelta

from flask_cors import CORS


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Inicializar el manejador de JWT


# ------------------------------- Rutas -------------------------------
@api.route('/signup', methods=['POST'])
def signup():
    print("Iniciando signup...")
    data = request.get_json()
    
    
    print(data)


    email = data.get('email')
    password = data.get('password')
    is_active = data.get('is_active', False)  # Si no se proporciona, se establece a False
    if not email or not password:
         return jsonify({"error": "Email y contraseña requeridos"}), 400

    if User.query.filter_by(email=email).first():
         return jsonify({"error": "El usuario ya existe"}), 400

    new_user = User(email=email,is_active=is_active)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado con éxito"}), 201

#---------------------------------------------------------------------
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    # Generar tokens de acceso
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    print(access_token)
    return jsonify({
        "message": "Inicio de sesión exitoso",
        "token": access_token
    }), 200

#---------------------------------------------------------------------

#---------------------------------------------------------------------

@api.route('/listall', methods=['GET'])
def list_all_users():
    users = User.query.all()
    response = [
        {
            "id": user.id,
            "email": user.email,
            "password": user.password  # Contraseña PENDIENTE encriptada
        }
        for user in users
    ]
    return jsonify(response), 200

#--------------------------------


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
