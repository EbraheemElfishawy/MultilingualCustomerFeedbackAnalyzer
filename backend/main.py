import httpx
from fastapi import FastAPI, HTTPException
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from database import engine
from database import engine
from models import Base
import asyncio
import asyncpg
# ✅ Define this early at the top
DATABASE_URL = "postgresql://postgres:postgres@db:5432/feedbackdb"
app = FastAPI()
@app.get("/")
async def root():
    return {"message": "🎉 Backend is running!"}
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




app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # ✅ React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_db()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Pydantic model for feedback
class Feedback(BaseModel):
    text: str
    product: str = None  # Optional field for product

# Your Gemini API key (replace this with your actual key)
GEMINI_API_KEY = 'AIzaSyBPVAKIi3pH-RtJcLMMwHvwpfC4TBwaQxw'  # Replace with your actual Gemini API key
prompt = f"""
The previous line is a feedback from a customer about a product. analyze this customer feedback:
1. Detect the language.
2. Translate to English.
3. Classify sentiment as 'positive', 'negative', or 'neutral'.

Return JSON only in a dict format to be handled by python in this format:

[
    "language": "...",
    "translated_text": "...",
    "sentiment": "..."
]
"""
def parse_gemini_output(json_string):
    try:
        data = json.loads(json_string)
        return data
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}
@app.post("/api/feedback")
async def create_feedback(feedback: Feedback):
    # Prepare the payload for Gemini Studio API
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": feedback.text + "\n" + prompt,  # Send the feedback text to Gemini
                    }
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY  # Use your API key for authorization
    }

    # Make the request to Gemini Studio API
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            json=payload,
            headers=headers
        )

        # Check if the request was successful
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error with Gemini API")

        # Process the response from Gemini
        data = response.json()
        jsonData = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No sentiment found")
        language = "Detected"  # Since Gemini is handling language detection
        # Remove the ```json and ``` markers
        json_string = jsonData.replace("```json", "").replace("```", "").strip()
        parsed_data = parse_gemini_output(json_string)
        print(jsonData)
        print(parsed_data)
        return {
            "message": "Feedback received and processed",
            "feedback": feedback.dict(),
            "sentiment": parsed_data["sentiment"],
            "translated_text": parsed_data["translated_text"],
            "language": parsed_data["language"]
        }

