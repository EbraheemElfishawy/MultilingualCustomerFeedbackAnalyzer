import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin"; // ⚠️ For demo only. Move to backend for production.

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
      // On successful login:
      localStorage.setItem("isAdmin", "true");

    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError("❌ Wrong username or password!");

      if (newAttempts >= 3) {
        setError("⛔️ Too many failed attempts. Please try again later.");
      }
    }
  };

  const isLocked = attempts >= 3;

  // Handler for back button
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: "80px auto",
      padding: 36,
      borderRadius: 18,
      background: "#fff",
      boxShadow: "0 8px 32px rgba(80,120,180,0.10), 0 1.5px 2px rgba(120,140,160,0.03)",
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 420
    }}>
      <h2 style={{ marginBottom: 24, color: "#35409b", fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 18 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            disabled={isLocked}
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16, borderRadius: 0, border: "1px solid #bdbdbd" }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={isLocked}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16, borderRadius: 0, border: "1px solid #bdbdbd" }}
          />
        </div>
        <button
          type="submit"
          disabled={isLocked}
          style={{
            width: "100%", padding: 10, background: "#26c6da", color: "#fff", fontSize: 16,
            border: "none", borderRadius: 0, cursor: isLocked ? "not-allowed" : "pointer"
          }}
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
      {/* Back button at card bottom left */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          left: 24,
          bottom: 24,
          background: 'linear-gradient(90deg, #e0e0e0 60%, #f5fcff 100%)',
          color: '#35409b',
          border: 'none',
          borderRadius: 8,
          padding: '10px 22px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(60,160,200,0.08)',
          transition: 'background 0.18s',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#d0e6f6'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #e0e0e0 60%, #f5fcff 100%)'}
      >
        ← Back
      </button>
    </div>
  );
}

export default AdminLogin;
