import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok && data.token) {
      actions.setToken(data.token,email);
      navigate("/private");
    } else {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary" style={{ fontFamily: 'Georgia, serif', fontSize: '50px', letterSpacing: '2px' }}>Enrique Lopez4G</h1>
      <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '30px', color: '#333' }}>Bienvenido al portal</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="form-label" style={{ fontSize: '18px', color: '#555' }}>Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '15px', fontSize: '18px' }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label" style={{ fontSize: '18px', color: '#555' }}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '15px', fontSize: '18px' }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary btn-lg" style={{ padding: '15px 40px', fontSize: '18px' }}>Login</button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="btn btn-success btn-lg"
            style={{ padding: '15px 40px', fontSize: '18px' }}
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
