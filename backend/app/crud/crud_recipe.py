from sqlalchemy.orm import Session
from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate, RecipeUpdate

def get_recipe(db: Session, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()

def get_recipes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Recipe).offset(skip).limit(limit).all()

def create_recipe(db: Session, recipe: RecipeCreate):
    db_recipe = Recipe(**recipe.dict())
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def update_recipe(db: Session, recipe_id: int, recipe: RecipeUpdate):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if db_recipe:
        update_data = recipe.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_recipe, key, value)
        db.commit()
        db.refresh(db_recipe)
    return db_recipe

def delete_recipe(db: Session, recipe_id: int):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if db_recipe:
        db.delete(db_recipe)
        db.commit()
    return db_recipe
