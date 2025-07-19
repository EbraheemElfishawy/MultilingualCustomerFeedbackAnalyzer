// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from "./components/AdminLogin";
import Home from './Home';
import FeedbackForm from './components/FeedbackForm';
import AdminFeedBacks from './components/AdminFeedbacks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminFeedBacks />} />
      </Routes>
    </Router>
  );
}

export default App;
