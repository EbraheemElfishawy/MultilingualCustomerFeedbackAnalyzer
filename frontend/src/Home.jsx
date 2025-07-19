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
      background: '#f9fafd'
    }}>
      <img src={logo} alt="Logo" style={{ width: 150, marginBottom: 5 }} />
      <h1 style={{ 
        fontWeight: 700, 
        fontSize: '2rem', 
        color: '#4545a6', 
        textAlign: 'center', 
        marginBottom: 32, 
        fontFamily: 'Inter, Arial, sans-serif' }}
        >
          Welcome to Customer Feedback</h1>
      <div style={{ display: 'flex', gap: 15 }}>
        <button
          onClick={() => navigate('/feedback')}
          style={{
            padding: '18px 40px',
            fontSize: '1.1rem',
            background: '#37c3ef',
            color: '#fff',
            border: 'none',
            borderRadius: 0,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)', 
            fontFamily: 'Inter, Arial, sans-serif'
          }}
        >
          Customer
        </button>
        <button
          onClick={() => navigate('/admin-login')}
          style={{
            padding: '18px 40px',
            fontSize: '1.1rem',
            background: '#007cf0',
            color: '#fff',
            border: 'none',
            borderRadius: 0,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)', 
            fontFamily: 'Inter, Arial, sans-serif'
          }}
        >
          Admin🔒
        </button>
      </div>
    </div>
  );
};

export default Home;
