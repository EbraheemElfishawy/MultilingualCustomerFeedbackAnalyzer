import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import AdminFeedbacks from './components/AdminFeedbacks';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav style={{margin: 20}}>
        <Link to="/">User Feedback</Link> | {' '}
        <Link to="/admin">Admin Feedbacks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<><FeedbackForm /><FeedbackList /></>} />
        <Route path="/admin" element={<AdminFeedbacks />} />
      </Routes>
    </Router>
  );
}
export default App;
