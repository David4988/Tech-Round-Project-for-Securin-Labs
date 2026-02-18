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


  // ⚔️ Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      setDebouncedSearch(search);

      if (search.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/recipes/search?title=${search}`,
        );

        // take top 5 suggestions
        setSuggestions(res.data.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ⚔️ Fetch Recipes
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
  if (debouncedSearch && resultsRef.current) {
    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [debouncedSearch]);


  useEffect(() => {
    fetchRecipes();
  }, [page, debouncedSearch]);

  // ⚔️ Filter (cuisine)
  let filtered =
    cuisine === "All"
      ? recipes
      : recipes.filter((r) => {
          const recipeCuisine = (r?.cuisine ?? "").toString().toLowerCase();

          const selectedCuisine = (cuisine ?? "").toString().toLowerCase();

          return recipeCuisine.includes(selectedCuisine);
        });

  // ⚔️ Sorting
  let processed = [...filtered];

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

      

      {/* MAIN SECTION */}
      <div ref={resultsRef} className="bg-[#f9fafb] text-black px-10 py-10">
        {/* FILTER + SORT BAR */}
        <div className="flex justify-between items-center mb-6">
          <FilterBar cuisine={cuisine} setCuisine={setCuisine} />

          {/* SORT */}
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
        {/* 🔥 DISCOVERY SECTIONS */}
      <PopularSection />
      <CuisineSection setCuisine={setCuisine} />
      <QuickPicks />

        {/* PAGINATION */}
        <Pagination page={page} setPage={setPage} />
      </div>

      {/* CTA */}
      <CTASection />
    </div>
  );
}

export default Home;
