import React, { useState } from 'react';
import '../index.css';
import logo from '../assets/logo.png';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [product, setProduct] = useState('Smart Watch');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Customer Feedback to our products</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="product">Select a Product:  </label>
        <select
          id="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          <option value="Smart Watch">Smart Watch</option>
          <option value="AI Assistant">AI Assistant</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Customer Portal">Customer Portal</option>
        </select>

        <textarea
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
        <button type="submit">Analyze</button>
      </form>

      {response && (
        <div className="result">
          <h2>Analysis Result</h2>
          <p><strong>Language:</strong> {response.language}</p>
          <p><strong>Sentiment:</strong> {response.sentiment}</p>
          <p><strong>Translation:</strong> {response.translated_text}</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
