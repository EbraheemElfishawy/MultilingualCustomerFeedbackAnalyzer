import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const languageOptions = [
  { label: 'All Languages', value: '' },
  { label: 'English', value: 'English' },
  { label: 'Arabic', value: 'Arabic' },
  { label: 'Unknown', value: 'Unknown' },
  { label: 'en', value: 'en' }, // In case you have lowercase stored
];

const sentimentOptions = [
  { label: 'All Sentiments', value: '' },
  { label: 'Positive', value: 'positive' },
  { label: 'Negative', value: 'negative' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'NA', value: 'NA' },
];

function AdminFeedBacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [products, setProducts] = useState([{ label: 'All Products', value: '' }]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('');

  const navigate = useNavigate();

  // Fetch product list
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts([{ label: 'All Products', value: '' }, ...data.map(p => ({ label: p, value: p }))]);
      });
  }, []);

  // Fetch feedbacks with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedProduct) params.append('product', selectedProduct);
    if (selectedLanguage) params.append('language', selectedLanguage);
    if (selectedSentiment) params.append('sentiment', selectedSentiment);

    fetch(`/api/feedbacks?${params.toString()}`)
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, [selectedProduct, selectedLanguage, selectedSentiment]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="admin-feedbacks-container" style={{ 
      padding: 32, 
      fontFamily: 'Inter, Arial, sans-serif',
      background: '#efeef3',
      minHeight: '100vh'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '2rem', color: '#567384', margin: 0 }}>All Feedbacks (Admin View)</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
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
          ↩️ Logout
        </button>
      </div>
      
      <p style={{ marginBottom: 24, color: '#567384' }}>Filter feedbacks by product, language, or sentiment:</p>

      <div style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 32,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Product Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ 
            color: '#567384', 
            fontWeight: 600, 
            fontSize: '0.9rem',
            marginBottom: '8px'
          }}>
            🚗 Product
          </label>
          <select 
            value={selectedProduct} 
            onChange={e => setSelectedProduct(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '2px solid #2596be',
              fontSize: '0.95rem',
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
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        
        {/* Language Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ 
            color: '#567384', 
            fontWeight: 600, 
            fontSize: '0.9rem',
            marginBottom: '8px'
          }}>
            🌍 Language
          </label>
          <select 
            value={selectedLanguage} 
            onChange={e => setSelectedLanguage(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '2px solid #2596be',
              fontSize: '0.95rem',
              background: '#ffffff',
              color: '#567384',
              fontWeight: 500,
              cursor: 'pointer',
              minWidth: '160px',
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
            {languageOptions.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
        
        {/* Sentiment Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ 
            color: '#567384', 
            fontWeight: 600, 
            fontSize: '0.9rem',
            marginBottom: '8px'
          }}>
            🎭 Sentiment
          </label>
          <select 
            value={selectedSentiment} 
            onChange={e => setSelectedSentiment(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '2px solid #2596be',
              fontSize: '0.95rem',
              background: '#ffffff',
              color: '#567384',
              fontWeight: 500,
              cursor: 'pointer',
              minWidth: '140px',
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
            {sentimentOptions.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <table className="admin-feedbacks-table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Product Name</th>
            <th>Language</th>
            <th>Sentiment</th>
            <th>Original Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0
            ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24, color: '#567384' }}>No feedbacks found.</td></tr>
            : feedbacks.map(f => (
                <tr key={f.id}>
                  <td style={{ color: '#2596be', fontWeight: 600 }}>{f.id}</td>
                  <td>{f.product}</td>
                  <td>{f.language}</td>
                  <td style={{
                    padding: '4px 8px',
                    borderRadius: 10,
                    background: f.sentiment === 'positive' ? '#87e40b' : 
                               f.sentiment === 'negative' ? '#dc3545' : 
                               f.sentiment === 'neutral' ? '#567384' : '#ffc107',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>{f.sentiment}</td>
                  <td>{f.text}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AdminFeedBacks;
