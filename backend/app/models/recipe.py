from sqlalchemy import Column, Integer, JSON, String, Float, Text, DateTime
from datetime import datetime

from sqlalchemy.dialects.postgresql import JSONB
from app.database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)

    cuisine = Column(String)
    title = Column(String)

    rating = Column(Float, nullable=True)

    prep_time = Column(Integer, nullable=True)
    cook_time = Column(Integer, nullable=True)
    total_time = Column(Integer, nullable=True)
    ingredients = Column(JSON)
    instructions = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    description = Column(Text)

    nutrients = Column(JSONB)

    serves = Column(String)
