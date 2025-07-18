from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class FeedbackDB(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    product = Column(String(100), nullable=True)
    sentiment = Column(String(20))
    language = Column(String(50))
