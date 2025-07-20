import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import logo from '../assets/logo.png';

// Simple CSS spinner (add this to your CSS, or use a component library)
const spinnerStyle = {
  width: 18,
  height: 18,
  border: '3px solid #e0e0e0',
  borderTop: '3px solid #2596be',
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
  const [product, setProduct] = useState('Valeo Vision System'); // Default to first Valeo product
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Valeo software products list
  const products = [
    "Valeo Vision System",
    "Valeo Parking Assistant", 
    "Valeo Climate Control",
    "Valeo Engine Management",
    "Valeo Safety Systems"
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
    navigate('/');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ margin: 0, color: '#567384', alignItems: 'center' }}>Customer Feedback</h1>
        </div>
        <button
          onClick={handleBack}
          style={{
            padding: '8px 16px',
            fontSize: '0.9rem',
            background: '#567384',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
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

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div style={{ 
          marginBottom: 20, 
          textAlign: 'center',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(37, 150, 190, 0.1) 0%, rgba(135, 228, 11, 0.1) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(37, 150, 190, 0.2)'
        }}>
          <label style={{ 
            color: '#567384', 
            fontWeight: 600, 
            fontSize: '1.1rem',
            display: 'block',
            marginBottom: '12px'
          }}>
            🚗 Select a Product:
          </label>
          <select 
            value={product} 
            onChange={e => setProduct(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '2px solid #2596be',
              fontSize: '1rem',
              background: '#ffffff',
              color: '#567384',
              fontWeight: 500,
              cursor: 'pointer',
              minWidth: '200px',
              boxShadow: '0 2px 8px rgba(37, 150, 190, 0.1)',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#87e40b';
              e.target.style.boxShadow = '0 0 0 3px rgba(135, 228, 11, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#2596be';
              e.target.style.boxShadow = '0 2px 8px rgba(37, 150, 190, 0.1)';
            }}
          >
            {products.map(p => (
              <option key={p} value={p} style={{ padding: '8px' }}>{p}</option>
            ))}
          </select>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label style={{ 
            color: '#567384', 
            fontWeight: 600, 
            fontSize: '1.1rem',
            display: 'block',
            marginBottom: '12px'
          }}>
            💬 Your Feedback:
          </label>
        </div>
        <textarea
          placeholder="Please share your experience with our Valeo software product... (You can write in any language!)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
          style={{
            width: '90%',
            padding: '16px',
            borderRadius: '10px',
            border: '2px solid #2596be',
            fontSize: '1rem',
            resize: 'none',
            marginLeft: '10px',
            marginRight: '10px',
            marginTop: '10px',
            marginBottom: '10px',
            background: '#ffffff',
            color: '#567384',
            fontFamily: 'Nunito, sans-serif',
            boxShadow: '0 2px 8px rgba(37, 150, 190, 0.1)',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#87e40b';
            e.target.style.boxShadow = '0 0 0 3px rgba(135, 228, 11, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#2596be';
            e.target.style.boxShadow = '0 2px 8px rgba(37, 150, 190, 0.1)';
          }}
        />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              padding: '14px 32px',
              borderRadius: '10px',
              background: '#2596be',
              color: '#fff',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(37, 150, 190, 0.3)',
              minWidth: '160px'
            }}
            onMouseOver={(e) => !loading && (e.target.style.background = '#87e40b')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#2596be')}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
            {loading && <span style={spinnerStyle}></span>}
          </button>
        </div>
      </form>

      {response && (
        <div className="result">
          <h2 style={{ color: '#567384' }}>Thanks!✨</h2>
          <p style={{ color: '#567384' }}><strong>✅Your feedback is submitted! We really appreciate it!🎉</strong> </p>
          {/* Add these lines if you want to show thew analysis result to the customer
            <p><strong>Language:</strong> {response.language}</p>
            <p><strong>Sentiment:</strong> {response.sentiment}</p>
            <p><strong>Translation:</strong> {response.translated_text}</p>
          */}
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
