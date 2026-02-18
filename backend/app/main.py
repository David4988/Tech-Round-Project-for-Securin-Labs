from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import recipe   # IMPORTANT

from app.database import engine, Base
from app.routes import recipes


# Create DB tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Recipe API",
    description="API for managing recipes with pagination and search",
    version="1.0.0"
)


# CORS (for React frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include Routes
app.include_router(recipes.router, prefix="/api/recipes", tags=["Recipes"])


# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to Recipe API 2.0"}
