from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import cast, Integer

from app.database import get_db
from app.models.recipe import Recipe
from app.schemas import Recipe as RecipeSchema, RecipeCreate

import re

def parse_filter(value: str):
    match = re.match(r"(<=|>=|=|<|>)(\d+\.?\d*)", value)
    if match:
        op, num = match.groups()
        return op, float(num)
    return None, None


router = APIRouter()


# CREATE
@router.post("/", response_model=RecipeSchema)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = Recipe(**recipe.dict())
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


# GET ALL (Pagination + Sorting)
@router.get("/", response_model=dict)
@router.get("/", response_model=dict)
def get_recipes(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    offset = (page - 1) * limit

    total = db.query(Recipe).count()

    recipes = (
        db.query(Recipe)
        .order_by(Recipe.rating.desc().nullslast())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": [RecipeSchema.model_validate(r) for r in recipes]
    }




@router.get("/search", response_model=dict)
@router.get("/search", response_model=dict)
def search_recipes(
    title: str = None,
    cuisine: str = None,
    rating: str = None,
    total_time: str = None,
    calories: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Recipe)

    # 🔥 Remove incomplete data
    query = query.filter(
        Recipe.title != None,
        
        # Recipe.ingredients != None,
        # Recipe.instructions != None
    )

    # 🔍 Title (partial match)
    if title:
        query = query.filter(Recipe.title.ilike(f"%{title}%"))

    # 🍽 Cuisine
    if cuisine:
        query = query.filter(Recipe.cuisine == cuisine)

    # ⭐ Rating filter
    if rating:
        op, val = parse_filter(rating)
        if op == ">=":
            query = query.filter(Recipe.rating >= val)
        elif op == "<=":
            query = query.filter(Recipe.rating <= val)
        elif op == ">":
            query = query.filter(Recipe.rating > val)
        elif op == "<":
            query = query.filter(Recipe.rating < val)
        elif op == "=":
            query = query.filter(Recipe.rating == val)

    # ⏱ Total time
    if total_time:
        op, val = parse_filter(total_time)
        if op == ">=":
            query = query.filter(Recipe.total_time >= val)
        elif op == "<=":
            query = query.filter(Recipe.total_time <= val)
        elif op == ">":
            query = query.filter(Recipe.total_time > val)
        elif op == "<":
            query = query.filter(Recipe.total_time < val)
        elif op == "=":
            query = query.filter(Recipe.total_time == val)

    # 🔥 Calories
    if calories:
        op, val = parse_filter(calories)
        cal_expr = cast(
            func.coalesce(Recipe.nutrients["calories"].astext, "0"), Integer
            )

        if op == ">=":
            query = query.filter(cal_expr >= val)
        elif op == "<=":
            query = query.filter(cal_expr <= val)
        elif op == ">":
            query = query.filter(cal_expr > val)
        elif op == "<":
            query = query.filter(cal_expr < val)
        elif op == "=":
            query = query.filter(cal_expr == val)

    # 🔥 ORDER + LIMIT (important for suggestions)
    results = (
        query
        .order_by(Recipe.rating.desc().nullslast())
        .limit(10)
        .all()
    )

    return {
        "count": len(results),
        "data": [RecipeSchema.model_validate(r) for r in results]
    }
# GET ONE
@router.get("/{recipe_id}", response_model=RecipeSchema)
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    return recipe

