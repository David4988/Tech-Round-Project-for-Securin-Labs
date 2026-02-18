from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime


class RecipeBase(BaseModel):
    cuisine: str
    title: str
    rating: Optional[float]
    prep_time: Optional[int]
    cook_time: Optional[int]
    total_time: Optional[int]
    description: str
    nutrients: Dict
    serves: str
    ingredients: Optional[List[str]] = None
    instructions: Optional[List[str]] = None
    created_at: Optional[datetime | None] = None



class RecipeCreate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int

    class Config:
        from_attributes = True
