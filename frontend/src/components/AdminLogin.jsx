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

  return (
    <div style={{
      maxWidth: 400, margin: "80px auto", padding: 32, borderRadius: 12, background: "#fff",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)"
    }}>
      <h2 style={{ marginBottom: 24, color: "#35409b" }}>Admin Login</h2>
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
    </div>
  );
}

export default AdminLogin;
