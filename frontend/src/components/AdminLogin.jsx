import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USERNAME = "";
const ADMIN_PASSWORD = ""; // ⚠️ For demo only. Move to backend for production.

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError("");
      setAttempts(0);
      navigate("/admin");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError("❌ Wrong username or password!");

      if (newAttempts >= 3) {
        setError("⛔️ Too many failed attempts. Please try again later.");
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const isLocked = attempts >= 3;

  return (
    <div style={{
      maxWidth: 400, 
      margin: "80px auto", 
      padding: 32, 
      borderRadius: 10, 
      background: "#ffffff",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: "#567384" }}>Admin Login</h2>
        <button
          onClick={handleBack}
          style={{
            padding: '6px 12px',
            fontSize: '0.8rem',
            background: '#567384',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#87e40b'}
          onMouseOut={(e) => e.target.style.background = '#567384'}
        >
          ← Back
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 18 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            disabled={isLocked}
            onChange={e => setUsername(e.target.value)}
            style={{ 
              width: "100%", 
              padding: 10, 
              fontSize: 16, 
              borderRadius: 10, 
              border: "2px solid #2596be",
              background: '#efeef3'
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={isLocked}
            onChange={e => setPassword(e.target.value)}
            style={{ 
              width: "100%", 
              padding: 10, 
              fontSize: 16, 
              borderRadius: 10, 
              border: "2px solid #2596be",
              background: '#efeef3'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLocked}
          style={{
            width: "100%", 
            padding: 10, 
            background: "#2596be", 
            color: "#fff", 
            fontSize: 16,
            border: "none", 
            borderRadius: 10, 
            cursor: isLocked ? "not-allowed" : "pointer",
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => !isLocked && (e.target.style.background = '#87e40b')}
          onMouseOut={(e) => !isLocked && (e.target.style.background = '#2596be')}
        >
          Login
        </button>
        {error && (
          <div style={{ color: "red", marginTop: 16, textAlign: "center" }}>{error}</div>
        )}
        {!isLocked && attempts > 0 && (
          <div style={{ color: "#ff9800", marginTop: 8, textAlign: "center" }}>
            {3 - attempts} attempts left
          </div>
        )}
      </form>
    </div>
  );
}

export default AdminLogin;
