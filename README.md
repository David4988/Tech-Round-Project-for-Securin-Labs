# 🍽️ Culinary Codex — Fullstack Recipe Exploration Platform

## 🧠 Overview

Culinary Codex is a fullstack web application that enables users to explore, search, and interact with recipe data through a clean and responsive UI.

The project focuses on efficient API integration, data handling, and UI synchronization, transforming raw backend data into a usable product experience.

This project was built as part of an API integration-focused task, with additional emphasis on performance and UX.

---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- Axios (API integration)
- Tailwind CSS
- Framer Motion
- GSAP
- React Router
- Zustand (state management)

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL (Dockerized)

---

## 🔌 API Integration (Core Focus)

### 🔹 Centralized API Client

A reusable Axios instance is used for all API calls.

Example:

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

Benefits:
- Cleaner code
- Reusability
- Easy scaling

---

### 🔹 Data Fetching

Pagination-based fetching:

const fetchRecipes = async (page) => {
  const res = await api.get(`/recipes?page=${page}&limit=10`);
  setRecipes(res.data.data);
};

---

### 🔹 Debounced Search

To avoid excessive API calls:

useEffect(() => {
  const delay = setTimeout(() => {
    if (query) {
      searchRecipes(query);
    } else {
      fetchRecipes(1);
    }
  }, 400);

  return () => clearTimeout(delay);
}, [query]);

Impact:
- Reduces API load
- Improves performance
- Better UX

---

### 🔹 Dynamic Query Handling

Search supports multiple filters:

/api/recipes/search?title=pasta&rating>=4&cuisine=Italian

Example:

api.get("/recipes/search", {
  params: {
    title: search,
    cuisine,
    rating: minRating,
  },
});

---

## 🔄 State Management

### Local State
- recipes
- loading
- error
- page
- search

### Global State (Zustand)
- favorites
- selected recipe

Example:

const useStore = create((set) => ({
  favorites: [],
  addFavorite: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),
}));

---

## 🔁 UI–API Synchronization

| State   | UI Behavior           |
|--------|----------------------|
| Loading | Spinner / skeleton   |
| Success | Render data          |
| Empty   | Fallback message     |
| Error   | Error message        |

---

## 🔍 Core Features

### Pagination
- Controlled using page state
- Triggers API calls

### Search
- Debounced API search
- Suggestions dropdown
- Dynamic results

### Filtering
- Hybrid approach:
  - Cuisine → client-side
  - Rating / time → backend

### Sorting

recipes.sort((a, b) => b.rating - a.rating);

### Recipe Details
- Dynamic route /recipe/:id
- Fetch by ID
- Handles incomplete data

---

## 🧩 UI Components

- Hero (search + suggestions)
- RecipeGrid (API data display)
- RecipeCard
- Pagination
- RecipePage (details)

---

## 🎞️ Performance Optimizations

- Debounced search
- Conditional fetching
- Safe rendering (optional chaining)
- Fallback data normalization
- Image fallback handling

---

## 🧠 Handling Incomplete Data

To ensure stable UI rendering, API responses are normalized.

Example:

const normalizeRecipe = (r) => ({
  title: r?.title ?? "Untitled Recipe",
  description: r?.description ?? "A delicious dish.",
  ingredients: r?.ingredients?.length ? r.ingredients : ["Basic ingredients"],
  instructions: r?.instructions?.length ? r.instructions : ["Cook and enjoy"],
});

This prevents UI crashes and improves user experience.

---

## 🚧 Challenges Faced

- Excess API calls without debounce
- Managing async UI state
- Handling null / missing data
- Syncing UI with backend responses

---

## 🔮 Future Improvements

- Move filters to backend
- Add caching (React Query / SWR)
- Infinite scroll
- Better loading states

---

## ⚙️ Setup Instructions

### Backend

cd backend  
pip install -r requirements.txt  
uvicorn app.main:app --reload  

---

### Database (Docker)

docker-compose up  

---

### Frontend

cd frontend  
npm install  
npm run dev  

---

## 📌 Note

The application is demonstrated locally.

Backend uses FastAPI and PostgreSQL (Docker).  
Frontend communicates with the local API.

---

## 🎯 Key Takeaways

- API integration requires efficient data handling
- UI must adapt to async states
- Debouncing improves performance
- Data normalization ensures stability
- Separation of concerns improves scalability

---

## 🚀 Conclusion

This project demonstrates:

- API integration using Axios
- State-driven UI development
- Performance optimization techniques
- Handling real-world data inconsistencies
- Fullstack system design

---