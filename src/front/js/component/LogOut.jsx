import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const LogOut = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>¡Vas a cerrar sesión?</h2>
      <p>Gracias por usar nuestra aplicación.</p>
      <button className="btn btn-danger btn-lg" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default LogOut;
