# models.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(String(20), default="user")
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    feedback = relationship("Feedback", back_populates="user")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    feedback = relationship("Feedback", back_populates="product")


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    
    original_text = Column(Text, nullable=False)
    language_code = Column(String(10))
    translated_text = Column(Text)
    sentiment = Column(String(20))  # e.g. positive, neutral, negative
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="feedback")
    product = relationship("Product", back_populates="feedback")


class Language(Base):
    __tablename__ = "languages"

    code = Column(String(10), primary_key=True)
    name = Column(String(50))
