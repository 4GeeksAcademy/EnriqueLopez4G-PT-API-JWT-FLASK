import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleLogin = () => {
    navigate("/login"); // Redirige a la página de Login
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirige a la página de SignUp
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary" style={{ fontFamily: 'Georgia, serif', fontSize: '60px', letterSpacing: '2px', marginBottom: '20px' }}>
        Enrique Lopez4G
      </h1>
      <h2 className="text-dark" style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', marginBottom: '30px' }}>
        ¡Bienvenido a nuestra aplicación!
      </h2>
      <p style={{ fontSize: '20px', color: '#555', marginBottom: '40px' }}>
        Por favor, elige una opción para continuar:
      </p>
      <div className="mt-4 d-flex justify-content-center">
        <Button
          variant="primary"
          size="lg"
          onClick={handleLogin}
          className="mx-3"
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={handleSignUp}
          className="mx-3"
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          Registrarse
        </Button>
      </div>
    </div>
  );
};

export default Home;
