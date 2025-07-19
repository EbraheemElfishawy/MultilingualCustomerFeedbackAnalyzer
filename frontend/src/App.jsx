// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from "./components/AdminLogin";
import Home from './Home';
import FeedbackForm from './components/FeedbackForm';
import AdminFeedBacks from './components/AdminFeedbacks';
import { Navigate } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          localStorage.getItem("isAdmin") === "true"? <AdminFeedBacks />: <Navigate to="/admin-login" />
          } />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminFeedBacks />} />
      </Routes>
    </Router>
  );
}

export default App;
