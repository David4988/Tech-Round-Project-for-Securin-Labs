import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipePage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Normalize (fake + fallback)
  const normalizeRecipe = (r) => {
    return {
      id: r?.id ?? 0,
      title: r?.title ?? "Untitled Recipe",
      cuisine: r?.cuisine ?? "Global",
      rating: r?.rating ?? 4.2,
      total_time: r?.total_time ?? 25,

      description:
        r?.description ||
        `A delicious ${r?.title || "dish"} that is simple to prepare and full of flavor.`,

      image_url:
        r?.image_url ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

      ingredients:
        Array.isArray(r?.ingredients) && r.ingredients.length > 0
          ? r.ingredients
          : [
              "1 cup main ingredient",
              "2 tbsp oil",
              "Salt to taste",
              "Spices as needed",
            ],

      instructions:
        Array.isArray(r?.instructions) && r.instructions.length > 0
          ? r.instructions
          : [
              "Prepare all ingredients.",
              "Heat oil in a pan.",
              "Cook everything until done.",
              "Serve hot and enjoy.",
            ],
    };
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `http://127.0.0.1:8000/api/recipes/${id}`
        );

        const clean = normalizeRecipe(res.data);
        setRecipe(clean);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe");
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (error)
    return <p className="p-10 text-red-500 font-medium">{error}</p>;

  if (!recipe)
    return <p className="p-10 text-gray-500">No recipe found</p>;

  return (
  <div className="bg-[#0b1220] text-white min-h-screen">
    
    {/* HERO IMAGE */}
    <div className="relative h-[50vh] w-full">
      <img
        src={recipe.image_url}
        className="absolute inset-0 w-full h-full object-cover"
        alt={recipe.title}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* TITLE */}
      <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {recipe.title}
        </h1>

        <div className="flex gap-4 text-sm text-gray-300">
          <span>⭐ {recipe.rating}</span>
          <span>⏱ {recipe.total_time} mins</span>
          <span>{recipe.cuisine}</span>
        </div>
      </div>
    </div>

    {/* CONTENT */}
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* DESCRIPTION */}
      <p className="text-gray-300 text-lg leading-relaxed">
        {recipe.description}
      </p>

      {/* INGREDIENTS */}
      <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="space-y-2 text-gray-300">
          {recipe.ingredients.map((i, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-orange-400">•</span>
              {i}
            </li>
          ))}
        </ul>
      </div>

      {/* INSTRUCTIONS */}
      <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="space-y-3 text-gray-300">
          {recipe.instructions.map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-orange-400 font-bold">
                {idx + 1}.
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);
}

export default RecipePage;