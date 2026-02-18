import { motion } from "framer-motion";
import { useStore } from "../store/useStore";

function RecipeCard({ recipe }) {
  const setSelected = useStore((s) => s.setSelected);

  return (
    <motion.div
      className="card bg-white rounded-lg overflow-hidden shadow-md cursor-pointer border border-gray-200"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelected(recipe)}
    >
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

      <div className="p-4">
        <h3 className="text-gray-900 text-sm font-semibold mb-1">
          {recipe.title}
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          {recipe.cuisine}
        </p>

        <p className="text-xs text-orange-500">
          ⭐ {recipe.rating || "-"} • {recipe.total_time || "-"} min
        </p>
      </div>
    </motion.div>
  );
}

export default RecipeCard;
