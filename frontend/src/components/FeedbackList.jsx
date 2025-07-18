import React, { useEffect, useState } from 'react';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/feedbacks")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("❌ Error fetching feedbacks:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📋 Feedback History</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Text</th>
            <th className="border px-2 py-1">Language</th>
            <th className="border px-2 py-1">Sentiment</th>
            <th className="border px-2 py-1">Product</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <tr key={fb.id}>
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{fb.text}</td>
              <td className="border px-2 py-1">{fb.language}</td>
              <td className="border px-2 py-1">{fb.sentiment}</td>
              <td className="border px-2 py-1">{fb.product || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
