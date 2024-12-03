import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ViewContext = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary" style={{ fontFamily: 'Georgia, serif', fontSize: '40px', letterSpacing: '2px', marginBottom: '30px' }}>
        Demo del context en mi APP
      </h1>

      {/* Mostrar email y token */}
      <div className="mt-4" style={{ fontSize: '20px', color: '#333' }}>
        <p><strong>Email:</strong> {store.email || "No disponible"}</p>
        <div 
          style={{
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: '20px',
            fontSize: '14px',
            color: '#333',
            wordBreak: 'break-word',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
          <strong>Token:</strong>
          <p>{store.token || "No disponible"}</p>
        </div>
      </div>

      <br />
      <Link to="/">
        <button
          className="btn btn-primary mt-4"
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          Back home
        </button>
      </Link>
    </div>
  );
};
