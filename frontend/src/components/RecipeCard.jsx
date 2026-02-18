import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const { favorites, toggleFavorite } = useStore();

  const isFav = favorites.find((r) => r.id === recipe.id);

  const handleNavigate = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <motion.div
      className="card relative bg-white rounded-lg overflow-hidden shadow-md cursor-pointer border border-gray-200"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleNavigate}
    >
      {/* ❤️ FAVORITE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔥 prevent navigation
          toggleFavorite(recipe);
        }}
        className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded-full shadow"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <img
        src={
          recipe.image_url ||
          `https://picsum.photos/400/300?random=${recipe.id}`
        }
        onError={(e) => {
          e.target.src = "https://picsum.photos/400/300";
        }}
        className="w-full h-40 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <h3 className="text-gray-900 text-sm font-semibold mb-1">
          {recipe.title.length > 40
            ? recipe.title.slice(0, 40) + "..."
            : recipe.title}
        </h3>

        {/* CUISINE */}
        <p className="text-xs text-gray-500 mb-2">
          {recipe.cuisine || "Unknown"}
        </p>

        {/* META */}
        <div className="flex justify-between text-xs text-gray-600">
          <span className="text-orange-500">
            ⭐ {recipe.rating || "-"}
          </span>

          <span>
            {recipe.total_time ? `${recipe.total_time} min` : "-"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeCard;
