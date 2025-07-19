import React from "react";
import FeedbackForm from "./components/FeedbackForm.jsx";
import FeedbackList from "./components/FeedbackList.jsx";

function App() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <FeedbackForm />
      <hr className="my-8" />
      <FeedbackList />
    </div>
  );
}

export default App;
