import json
import asyncio
import httpx
import asyncpg

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

from database import engine
from models import Base, FeedbackDB
from sqlalchemy.future import select
from models import FeedbackDB  # make sure this is defined in models.py
# ✅ DB config
DATABASE_URL = "postgresql://postgres:postgres@db:5432/feedbackdb"
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# ✅ Gemini config
GEMINI_API_KEY = 'AIzaSyBPVAKIi3pH-RtJcLMMwHvwpfC4TBwaQxw'
prompt = """
The previous line is a feedback from a customer about a product. analyze this customer feedback:
1. Detect the language.
2. Translate to English.
3. Classify sentiment as 'positive', 'negative', 'neutral' or 'NA'.

Return JSON only in a dict format to be handled by python in this format:
if the feedback is not a feedback like Good morning or any other sentence or unknown text, return NA for all fields.

[
    "language": "...",
    "translated_text": "...",
    "sentiment": "..."
]
"""

# ✅ FastAPI init
app = FastAPI()

# ✅ Allow React dev server access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify exact origin like "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],  # Allow POST, OPTIONS, etc.
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "🎉 Backend is running!"}


# ✅ Database check and creation
async def wait_for_db(max_retries=30, delay=2):
    for i in range(max_retries):
        try:
            conn = await asyncpg.connect(DATABASE_URL)
            await conn.close()
            print("✅ Database is ready.")
            return
        except Exception as e:
            print(f"⏳ Attempt {i+1}/{max_retries}: Database not ready yet — {str(e)}")
            await asyncio.sleep(delay)
    raise Exception("❌ Database not ready after retries!")

async def init_db():
    await wait_for_db()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event("startup")
async def startup():
    await init_db()


# ✅ Request model
class Feedback(BaseModel):
    text: str
    product: str = None


# ✅ Helper to parse Gemini JSON
def parse_gemini_output(json_string):
    try:
        data = json.loads(json_string)
        return data
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}


# ✅ Main API endpoint
@app.post("/api/feedback")
async def create_feedback(feedback: Feedback):
    print(f"📥 Received feedback: {feedback.text}")

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": feedback.text + "\n" + prompt,
                    }
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            json=payload,
            headers=headers
        )

        if response.status_code != 200:
            print(f"❌ Gemini API error: {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Error with Gemini API")

        data = response.json()
        raw = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        print(f"📤 Gemini raw output:\n{raw}")

        # Clean and parse the response
        json_string = raw.replace("```json", "").replace("```", "").strip()
        parsed = parse_gemini_output(json_string)
        print(f"✅ Parsed Gemini result: {parsed}")

        if "error" in parsed:
            raise HTTPException(status_code=500, detail="Gemini response was invalid")

        # ✅ Save to database
        async with async_session() as session:
            new_feedback = FeedbackDB(
                text=feedback.text,
                product=feedback.product,
                sentiment=parsed["sentiment"],
                language=parsed["language"]
            )
            session.add(new_feedback)
            await session.commit()
            print("✅ Feedback saved to database")

        return {
            "message": "Feedback received and stored",
            "original": feedback.text,
            "product": feedback.product,
            "sentiment": parsed["sentiment"],
            "translated_text": parsed["translated_text"],
            "language": parsed["language"]
        }

@app.get("/api/feedbacks")
async def get_feedbacks(product: str = Query(None)):
    print(f"📥 Fetching feedbacks. Filter by product: {product}")
    async with async_session() as session:
        stmt = select(FeedbackDB)
        if product:
            stmt = stmt.where(FeedbackDB.product == product)
        result = await session.execute(stmt)
        feedbacks = result.scalars().all()
        return [f.__dict__ for f in feedbacks]


@app.get("/api/products")
def get_products():
    return ["Smart Watch", "AI Assistant", "Mobile App", "Laptop", "Headphones"]