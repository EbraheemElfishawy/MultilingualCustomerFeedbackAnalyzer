// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 32,
      background: '#efeef3'
    }}>
      <img src={logo} alt="Logo" style={{ width: 150, marginBottom: 5 }} />
      <h1 style={{ 
        fontWeight: 700, 
        fontSize: '2rem', 
        color: '#567384', 
        textAlign: 'center', 
        marginBottom: 32, 
        fontFamily: 'Inter, Arial, sans-serif' }}
        >
        Welcome to Valeo Customer Feedback System</h1>
      <div style={{ display: 'flex', gap: 15 }}>
        <button
          onClick={() => navigate('/feedback')}
          style={{
            padding: '18px 40px',
            fontSize: '1.1rem',
            background: '#2596be',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)', 
            fontFamily: 'Inter, Arial, sans-serif',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#87e40b'}
          onMouseOut={(e) => e.target.style.background = '#2596be'}
        >
          Customer
        </button>
        <button
          onClick={() => navigate('/admin-login')}
          style={{
            padding: '18px 40px',
            fontSize: '1.1rem',
            background: '#567384',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)', 
            fontFamily: 'Inter, Arial, sans-serif',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#87e40b'}
          onMouseOut={(e) => e.target.style.background = '#567384'}
        >
          Admin🔒
        </button>
      </div>
    </div>
  );
};

export default Home;
