import React from "react";
import FeedbackForm from "./components/FeedbackForm.jsx";
import FeedbackList from "./components/FeedbackList.jsx";

function App() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧠 Multilingual Feedback Analyzer</h1>
      <FeedbackForm />
      <hr className="my-8" />
      <FeedbackList />
    </div>
  );
}

export default App;
