import React, { useEffect, useState } from 'react';

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

  return (
    <div className="admin-feedbacks-container" style={{ padding: 32, fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24, color: '#4545a6' }}>All Feedbacks (Admin View)</h1>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {/* Product Filter */}
        <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
          {products.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        {/* Language Filter */}
        <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
          {languageOptions.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        {/* Sentiment Filter */}
        <select value={selectedSentiment} onChange={e => setSelectedSentiment(e.target.value)}>
          {sentimentOptions.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <table className="admin-feedbacks-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Language</th>
            <th>Sentiment</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0
            ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>No feedbacks found.</td></tr>
            : feedbacks.map(f => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.product}</td>
                  <td>{f.language}</td>
                  <td>{f.sentiment}</td>
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
