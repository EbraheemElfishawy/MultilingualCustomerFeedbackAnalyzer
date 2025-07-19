import React, { useState, useEffect } from 'react';
import '../index.css';
import logo from '../assets/logo.png';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/products');
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, []);

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
      console.error('Submit failed', err);
      setResponse({ message: 'Error submitting feedback' });
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Customer Feedback Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            {products.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <textarea
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
        <button type="submit">Analyze</button>
      </form>


    </div>
  );
}

export default FeedbackForm;
