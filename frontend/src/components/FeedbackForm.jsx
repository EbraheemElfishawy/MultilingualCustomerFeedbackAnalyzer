import React, { useState } from 'react';
import '../index.css';
import logo from '../assets/logo.png';

// Simple CSS spinner (add this to your CSS, or use a component library)
const spinnerStyle = {
  width: 18,
  height: 18,
  border: '3px solid #e0e0e0',
  borderTop: '3px solid #09d3c8',
  borderRadius: '50%',
  display: 'inline-block',
  animation: 'spin 1s linear infinite',
  marginLeft: 8,
  verticalAlign: 'middle'
};
// Add this keyframes to your index.css:
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [product, setProduct] = useState('Smart Watch'); // Or default to first product
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Example products list (replace with real list if you fetch from backend)
  const products = [
    "Smart Watch",
    "AI Assistant",
    "Mobile App",
    "Laptop",
    "Headphones"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: feedback, product }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ message: 'Error submitting feedback' });
    }
    setLoading(false);
  };

  const handleBack = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      maxWidth: 420,
      margin: '80px auto',
      padding: 36,
      borderRadius: 18,
      background: '#fff',
      boxShadow: '0 8px 32px rgba(80,120,180,0.10), 0 1.5px 2px rgba(120,140,160,0.03)',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      minHeight: 420
    }}>
      <img src={logo} alt="Logo" style={{ width: 120, height: 'auto', display: 'block', margin: '0 auto 16px auto' }} />
      <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: 26, color: '#35409b', letterSpacing: 1, marginBottom: 18 }}>Customer Feedback</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Choose a Product:{' '}
            <select value={product} onChange={e => setProduct(e.target.value)} style={{ width: '100%' }}>
              {products.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
        </div>
        <textarea
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: 16, resize: 'vertical' }}
        />
        <button type="submit" disabled={loading} style={{ marginLeft: 10, minWidth: 110 }}>
          Submit
          {loading && <span style={spinnerStyle}></span>}
        </button>
      </form>

      {response && (
        <div className="result" style={{ textAlign: 'center', marginTop: 16 }}>
          <h2>Thanks!✨</h2>
          <p><strong>✅Your feedback is submitted! We really appreciate it!🎉</strong> </p>
          {/* Add these lines if you want to show the analysis result to the customer
            <p><strong>Language:</strong> {response.language}</p>
            <p><strong>Sentiment:</strong> {response.sentiment}</p>
            <p><strong>Translation:</strong> {response.translated_text}</p>
          */}
        </div>
      )}
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

export default FeedbackForm;
