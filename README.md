# Multilingual Customer Feedback Analyzer v1.0

## 🚀 Project Summary
A full-stack web application that collects customer feedback in any language, analyzes it using Google Gemini Studio (detects language, translates to English, and classifies sentiment), and displays trends and feedback data for admins. Data is stored in PostgreSQL. The app is fully containerized with Docker Compose.

---

## 🛠️ Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional for dev) Python 3.9+, Node.js 16+

### Clone the Repository
```bash
git clone <your-repo-url>
cd feedback-analyzer
```

---

## ▶️ How to Run

### **With Docker Compose (Recommended)**
```bash
# From the project root
./build.sh
# Or, manually:
docker compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

### **Without Docker (Dev Mode)**
**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Routes and Usage

### **POST `/api/feedback`**
- **Description:** Submit customer feedback for analysis.
- **Body:**  
  ```json
  {
    "text": "Your feedback here",
    "product": "Product Name"
  }
  ```
- **Response:**  
  ```json
  {
    "message": "Feedback received and stored",
    "original": "...",
    "product": "...",
    "sentiment": "positive|negative|neutral|NA",
    "translated_text": "...",
    "language": "English|French|..."
  }
  ```

### **GET `/api/feedbacks`**
- **Description:** Retrieve all feedbacks (optionally filter by product, language, sentiment).
- **Query params:** `product`, `language`, `sentiment`
- **Response:**  
  ```json
  [
    {
      "id": 1,
      "text": "...",
      "product": "...",
      "sentiment": "...",
      "language": "..."
    },
    ...
  ]
  ```

### **GET `/api/products`**
- **Description:** List available products.

---

## 🖥️ Frontend + Backend Overview

- **Frontend:**  
  - Built with React (Vite)
  - Features: Feedback form, admin login, feedback dashboard, filtering
  - Communicates with backend via REST API

- **Backend:**  
  - FastAPI (Python)
  - Handles feedback submission, analysis (via Gemini), and data storage
  - Async PostgreSQL with SQLAlchemy

- **Admin:**  
  - Simple login (demo: `admin`/`admin`)
  - View and filter feedbacks

---

## 🗃️ Data Schema

**Table: `feedback`**

| Field      | Type    | Description                |
|------------|---------|----------------------------|
| id         | int     | Primary key                |
| text       | text    | Original feedback          |
| product    | string  | Product name               |
| sentiment  | string  | Sentiment (positive/...)   |
| language   | string  | Detected language          |

---

## 🤖 Gemini Studio Integration

- Uses Google Gemini API (`generateContent`) to:
  - Detect feedback language
  - Translate to English
  - Classify sentiment
- API key is required (set in backend)
- Handles API errors and invalid responses

---

## ⚠️ Limitations / Known Issues

- **Admin login** is for demo only (credentials are hardcoded in frontend)
- **Gemini API key** is stored in backend code (move to environment variable for production)
- No user authentication for feedback submission
- No pagination for large feedback datasets (can be added)
- Error handling can be improved for edge cases
- Only supports PostgreSQL (MongoDB support can be added)
- UI/UX is basic; can be enhanced for production

---

## 📄 License

MIT (or your chosen license)

---
