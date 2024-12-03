from flask_sqlalchemy import SQLAlchemy
import hashlib

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
    def set_password(self, password):
        """Encripta la contraseña usando SHA-256 y la trunca a 80 caracteres."""
        sha256_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()  # Hash de 64 caracteres
        self.password = sha256_hash[:80]  # Asegurarnos de que no sobrepase los 80 caracteres


    # Método para verificar si la contraseña ingresada es correcta
    def check_password(self, password):
        """Verifica si la contraseña ingresada es correcta comparándola con la encriptada."""
        # Genera el hash de la contraseña ingresada
        sha256_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        # Compara el hash generado con el almacenado en la base de datos
        return self.password == sha256_hash[:80]  # Asegurarnos de comparar solo los primeros 80 caracteres