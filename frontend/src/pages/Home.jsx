import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import RecipeGrid from "../components/RecipeGrid";
import Pagination from "../components/Pagination";

import PopularSection from "../components/PopulrSection";
import CuisineSection from "../components/CuisineSection";
import QuickPicks from "../components/QuickPicks";
import CTASection from "../components/CTASection";

import { useStore } from "../store/useStore";

// 🔌 Centralized API instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sort, setSort] = useState("default");

  const { cuisine, setCuisine } = useStore();

  const [suggestions, setSuggestions] = useState([]);

  const limit = 12;
  const resultsRef = useRef(null);

  const isSearching = debouncedSearch.trim() !== "";

  // 🔥 Validate recipe data
  const isValidRecipe = (r) => {
  return r?.id && r?.title; 
};
  const normalizeRecipe = (r) => {
  const defaultDescription =
    "A delicious and easy-to-make dish packed with flavor. Perfect for quick meals and family dinners.";

  const defaultIngredients = [
    "1 cup fresh ingredients",
    "2 tablespoons olive oil",
    "Salt to taste",
    "1 teaspoon spices",
  ];

  const defaultInstructions = [
    "Prepare all ingredients and keep them ready.",
    "Heat oil in a pan over medium flame.",
    "Add ingredients and cook until well combined.",
    "Serve hot and enjoy your meal.",
  ];

  return {
    id: r?.id ?? 0,
    title: r?.title ?? "Untitled Recipe",
    cuisine: r?.cuisine ?? "Global",
    rating: r?.rating ?? 4.0,
    total_time: r?.total_time ?? 30,

    description: r?.description || defaultDescription,

    ingredients:
      Array.isArray(r?.ingredients) && r.ingredients.length > 0
        ? r.ingredients
        : defaultIngredients,

    instructions:
      Array.isArray(r?.instructions) && r.instructions.length > 0
        ? r.instructions
        : defaultInstructions,

    image_url:
      r?.image_url ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  };
};  

  // ⚔️ Debounce search + suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      setDebouncedSearch(search);

      if (search.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get("/recipes/search", {
          params: { title: search },
        });

        // const clean = (res.data.data || []).filter(isValidRecipe);

        setSuggestions((res.data.data || []).slice(0, 5));
      } catch (err) {
        console.error("Suggestion Error:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ⚔️ Fetch recipes
  const fetchRecipes = async () => {
    try {
      const res =
        debouncedSearch.trim() === ""
          ? await api.get("/recipes", {
              params: { page, limit },
            })
          : await api.get("/recipes/search", {
              params: { title: debouncedSearch },
            });

      const rawData = res.data.data || [];

      // 🔥 Filter invalid recipes
      const cleanData = rawData.filter(isValidRecipe);

      setRecipes(rawData);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  // ⚔️ Fetch trigger
  useEffect(() => {
    fetchRecipes();
  }, [page, debouncedSearch]);

  // ⚔️ Scroll to results
  useEffect(() => {
    if (isSearching && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [debouncedSearch]);

  // ⚔️ Filter (Cuisine)
  const filtered =
    cuisine === "All"
      ? recipes
      : recipes.filter((r) => {
          const recipeCuisine = (r?.cuisine ?? "").toLowerCase();
          const selectedCuisine = (cuisine ?? "").toLowerCase();
          return recipeCuisine.includes(selectedCuisine);
        });

  // ⚔️ Sorting
  const processed = [...filtered];

  if (sort === "rating") {
    processed.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  if (sort === "time") {
    processed.sort((a, b) => (a.total_time || 999) - (b.total_time || 999));
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* HERO */}
      <Hero
        search={search}
        setSearch={setSearch}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />

      {/* ======================
          🔍 DISCOVERY MODE
      ====================== */}
      {!isSearching && (
        <>
          <PopularSection />
          <CuisineSection setCuisine={setCuisine} />
          <QuickPicks />
        </>
      )}

      {/* ======================
          🔎 RESULTS MODE
      ====================== */}
      {isSearching && (
        <div
          ref={resultsRef}
          className="bg-[#f9fafb] text-black px-10 py-10"
        >
          {/* FILTER + SORT */}
          <div className="flex justify-between items-center mb-6">
            <FilterBar cuisine={cuisine} setCuisine={setCuisine} />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border rounded text-sm"
            >
              <option value="default">Sort</option>
              <option value="rating">Top Rated</option>
              <option value="time">Fastest</option>
            </select>
          </div>

          {/* GRID */}
          <RecipeGrid recipes={processed} />

          {/* EMPTY STATE */}
          {processed.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No valid recipes found
            </p>
          )}

          {/* PAGINATION */}
          <Pagination page={page} setPage={setPage} />
        </div>
      )}

      {/* CTA */}
      <CTASection />
    </div>
  );
}

export default Home;