# 🧠 Multilingual Customer Feedback Analyzer v1.0

An AI-powered full-stack web app that analyzes customer feedback using **Gemini API**, detects language, translates to English, classifies sentiment, and stores results in a **PostgreSQL** database via a **FastAPI** backend.

---

## 📂 Folder Structure

```
feedback-analyzer/
├── backend/
│   ├── main.py              # FastAPI backend entry point
│   ├── models.py            # SQLAlchemy feedback model
│   ├── database.py          # Async DB engine setup
│   ├── requirements.txt     # Backend dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React app
│   │   ├── FeedbackForm.jsx # Feedback submission form
│   │   └── main.jsx         # Entry point (Vite)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

## ✅ Features

- 🌍 Multilingual feedback support
- 🧠 Gemini AI sentiment + language analysis
- 📤 Feedback submission from a React frontend
- 🧠 FastAPI backend processes and saves data
- 🗄️ PostgreSQL database (via async SQLAlchemy)
- 📦 Dockerized deployment for frontend, backend, and DB

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/feedback-analyzer.git
cd feedback-analyzer
```

### 2. Configure Gemini API Key

Edit `main.py` and replace:
```python
GEMINI_API_KEY = 'YOUR_KEY_HERE'
```

---

### 3. Run the App with Docker

```bash
docker-compose up --build
```
 Build frontend only 
```bash
docker compose build frontend
docker compose up -d frontend
```
This will start:
- React app on [`http://localhost:5174`](http://localhost:5174)
- FastAPI backend on [`http://localhost:8000`](http://localhost:8000)
- PostgreSQL DB on port `5432`

---

## 🧪 How to Test End-to-End

### 🖼️ Frontend → API → Database

1. Open your browser and go to:  
   [`http://localhost:5174`](http://localhost:5174)

2. Enter feedback like:
   ```
   Text: هذا المنتج ممتاز جدًا
   Product: AI Assistant
   ```

3. Submit — you should see a message like:
   ```
   Sentiment: positive
   Language: Arabic
   Translation: "This product is very excellent"
   ```

---

### 🐘 Check Stored Feedback in PostgreSQL

```bash
docker exec -it feedback-analyzer-db-1 psql -U postgres -d feedbackdb
```

Then run:

```sql
SELECT * FROM feedback;
```

You should see your feedback text, sentiment, language, and product fields correctly stored.

---

## 🚧 Troubleshooting

- If `product` column errors occur, manually drop & recreate the table or enable Alembic for migrations.
- If Gemini response is malformed, double-check the `prompt` or wrap JSON parsing with a try/except.

---

## 📌 Next Steps

- [ ] Add `/api/feedbacks` GET endpoint
- [ ] Feedback listing dashboard in React
- [ ] Data filtering, charts, and CSV export

---

## 🧑‍💻 Contributors

- AI Backend: FastAPI + Gemini API
- Frontend: React (Vite)
- Database: PostgreSQL (Async SQLAlchemy)

---
