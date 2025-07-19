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

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Customer Feedback Analyzer</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Product:{' '}
            <select value={product} onChange={e => setProduct(e.target.value)}>
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
        />
        <button type="submit" disabled={loading} style={{ marginLeft: 10, minWidth: 110 }}>
          Submit
          {loading && <span style={spinnerStyle}></span>}
        </button>
      </form>

      {response && (
        <div className="result">
          <h2>Thanks!✨</h2>
          <p><strong>✅Your feedback is submitted! We really appreciate it!🎉</strong> </p>
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
