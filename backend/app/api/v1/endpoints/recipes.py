from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import SessionLocal
from app.schemas.recipe import Recipe, RecipeCreate, RecipeUpdate
from app.crud import crud_recipe

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Recipe)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    return crud_recipe.create_recipe(db=db, recipe=recipe)

@router.get("/", response_model=List[Recipe])
def read_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = crud_recipe.get_recipes(db, skip=skip, limit=limit)
    return recipes

@router.get("/{recipe_id}", response_model=Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud_recipe.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe

@router.put("/{recipe_id}", response_model=Recipe)
def update_recipe(recipe_id: int, recipe: RecipeUpdate, db: Session = Depends(get_db)):
    db_recipe = crud_recipe.update_recipe(db, recipe_id=recipe_id, recipe=recipe)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe

@router.delete("/{recipe_id}", response_model=Recipe)
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud_recipe.delete_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe
