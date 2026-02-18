# 🍽️ Culinary Codex – Frontend (API Integration Focus)

## 🧠 Overview

Recipe Codex is a React-based frontend application designed to consume and display data from a FastAPI backend.

The focus of this implementation is:

* Efficient API integration
* Optimized data fetching
* Responsive UI updates based on API state

---

## ⚙️ Tech Stack (Frontend Focus)

* **React (Vite)** – UI framework
* **Axios** – API communication
* **Tailwind CSS** – Styling
* **Framer Motion** – UI animations
* **GSAP** – Scroll animations
* **React Router** – Navigation
* **Zustand** – Global state management

---

## 🔌 API Integration Layer

### 🔹 API Client Setup

Centralized API handling using Axios:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

export default api;
```

Benefits:

* Reusable instance
* Cleaner code
* Easier scaling

---

### 🔹 Data Fetching

Example: Fetch paginated recipes

```js
const fetchRecipes = async (page) => {
  const res = await api.get(`/recipes?page=${page}&limit=10`);
  setRecipes(res.data.data);
};
```

---

### 🔹 Search Integration (Debounced)

Problem:

* Calling API on every keystroke → performance issues

Solution:

* Debounce input (300–400ms delay)

```js
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
```

Impact:

* Reduces unnecessary API calls
* Improves UX and performance

---

### 🔹 Dynamic Query Handling

Search endpoint supports multiple filters:

```
/api/recipes/search?title=pasta&rating>=4&cuisine=Italian
```

Frontend dynamically builds queries:

```js
const params = {
  title: search,
  cuisine,
  rating: minRating,
};

api.get("/recipes/search", { params });
```

---

## 🔄 State Management

### Local State

* `recipes`
* `loading`
* `error`
* `page`
* `query`

### Global State (Zustand)

* Favorites
* Selected recipe

```js
const useStore = create((set) => ({
  favorites: [],
  addFavorite: (recipe) => set((state) => ({
    favorites: [...state.favorites, recipe]
  }))
}));
```

---

## 🔁 UI-State Synchronization

UI updates based on API state:

| State   | UI Behavior           |
| ------- | --------------------- |
| Loading | Spinner / skeleton    |
| Success | Render recipe grid    |
| Empty   | Show fallback message |
| Error   | Display error message |

---

## 🔍 Core API Features Implemented

### 1. Pagination

* Controlled using `page` state
* Updates trigger API calls

```js
setPage(prev => prev + 1);
```

---

### 2. Search

* API-based filtering
* Debounced input
* Dynamic results update

---

### 3. Filtering (Hybrid)

* Cuisine → client-side
* Rating / time → backend

---

### 4. Sorting

Handled client-side:

```js
recipes.sort((a, b) => b.rating - a.rating);
```

---

## 🎨 UI Components (API-Driven)

* **RecipeGrid** → Displays fetched data
* **RecipeCard** → Individual item
* **Pagination** → Controls API requests
* **SearchBar** → Triggers search API
* **RecipePage** → Fetches data by ID

---

## 🎞️ Performance Optimizations

* Debounced search (prevents API spam)
* Conditional fetching (search vs list)
* Safe rendering (`?.`, `??`)
* Fallback images for broken URLs

---

## 🚧 Challenges Faced

* Excess API calls without debounce
* Managing multiple states (search + pagination)
* Handling missing/null API data
* Synchronizing UI with async API responses
* Preventing unnecessary re-renders

---

## 🔮 Improvements

* Move all filters to backend
* Add caching (React Query / SWR)
* Implement infinite scroll
* Add API error boundaries
* Improve loading skeletons

---

## 🧠 Key Takeaways

* API integration is not just fetching data
* Managing UI state is critical
* Debouncing significantly improves performance
* Separation of API logic improves scalability
* UX depends heavily on how data is handled

---

## 🎯 Summary

This project demonstrates:

* Efficient API integration using Axios
* Performance optimization (debounce, conditional fetch)
* State-driven UI updates
* Clean separation between data and UI
---
