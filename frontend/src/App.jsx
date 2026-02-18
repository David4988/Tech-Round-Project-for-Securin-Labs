import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import RecipeGrid from "./components/RecipeGrid";
import DetailOverlay from "./components/DetailOverlay";

import Pagination from "./components/Pagination";

import { useStore } from "./store/useStore";
import PopularSection from "./components/PopulrSection";
import CuisineSection from "./components/CuisineSection";
import QuickPicks from "./components/QuickPicks";
import CTASection from "./components/CTASection";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { cuisine, setCuisine } = useStore();

  const limit = 12;

  // 🔹 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔹 Fetch data
  const fetchRecipes = async () => {
    try {
      const url =
        debouncedSearch.trim() === ""
          ? `http://127.0.0.1:8000/api/recipes?page=${page}&limit=${limit}`
          : `http://127.0.0.1:8000/api/recipes/search?title=${debouncedSearch}`;

      const res = await axios.get(url);
      setRecipes(res.data.data || []);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page, debouncedSearch]);

  // 🔹 Filter logic
  const filtered =
    cuisine === "All"
      ? recipes
      : recipes.filter((r) =>
          (r.cuisine || "")
            .toLowerCase()
            .includes(cuisine.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">

  {/* HERO */}
  <Hero search={search} setSearch={setSearch} />

  {/* POPULAR */}
  <PopularSection />

  {/* CUISINES */}
  <CuisineSection setCuisine={setCuisine} />

  {/* QUICK PICKS */}
  <QuickPicks />

  {/* MAIN GRID */}
  <div className="bg-[#f9fafb] text-black px-10 py-10">
    <FilterBar cuisine={cuisine} setCuisine={setCuisine} />

    <RecipeGrid recipes={filtered} />
    <Pagination page={page} setPage={setPage} />
  </div>

  {/* CTA */}
  <CTASection />

  {/* DETAIL OVERLAY */}
  <DetailOverlay />
</div>

  );
}

export default App;
