import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Button } from 'react-bootstrap';

const Private = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.BACKEND_URL + "/api/listall", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${store.token}` // Suponiendo que el token se almacena en el store
        }
      });

      const result = await response.json();
      if (response.ok) {
        setData(result); // Guardar los datos obtenidos de la API
      } else {
        alert('Error al cargar los datos');
      }
    };

    if (store.token) {
      fetchData(); // Solo ejecuta si el token está presente
    } else {
      navigate('/login'); // Redirige al login si no hay token
    }
  }, [store.token, navigate]);

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary" style={{ fontFamily: 'Georgia, serif', fontSize: '60px', letterSpacing: '2px', marginBottom: '20px' }}>
        Bienvenido a tu área privada
      </h1>
      <h2 className="text-dark" style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', marginBottom: '30px' }}>
        ¡Aquí están tus datos!
      </h2>

      <div className="mt-4">
        {data.length > 0 ? (
          <ul style={{ fontSize: '20px', color: '#333' }}>
            {data.map((item, index) => (
              <li key={index} style={{ marginBottom: '15px' }}>
                {item.name || 'Sin nombre'} {/* Ajusta según los campos de la respuesta de la API */}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '18px', color: '#555' }}>No hay datos disponibles.</p>
        )}
      </div>

      <Button
        variant="secondary"
        size="lg"
        onClick={() => navigate('/')}
        className="mt-4"
        style={{
          padding: '15px 40px',
          fontSize: '18px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        Volver a la página principal
      </Button>
    </div>
  );
};

export default Private;
