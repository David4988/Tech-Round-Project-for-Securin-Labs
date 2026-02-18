import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { useEffect } from "react";

function DetailOverlay() {
  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSelected]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-6"
          onClick={() => setSelected(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* CONTENT */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* IMAGE */}
            <img
              src={selected.image_url}
              className="w-full h-64 object-cover rounded-t-lg"
            />

            {/* BODY */}
            <div className="p-6 text-black">
              {/* HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {selected.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selected.cuisine}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>
              </div>

              {/* META */}
              <div className="flex gap-6 text-sm mb-6">
                <span className="text-orange-500">
                  ⭐ {selected.rating || "-"}
                </span>
                <span>{selected.total_time} min</span>
                <span>{selected.serves || "-"}</span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-700 mb-6">
                {selected.description}
              </p>

              {/* INGREDIENTS */}
              {selected.ingredients && (
                <>
                  <h3 className="font-semibold mb-2">
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside mb-6 text-sm text-gray-700">
                    {selected.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* INSTRUCTIONS */}
              {selected.instructions && (
                <>
                  <h3 className="font-semibold mb-2">
                    Instructions
                  </h3>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                    {selected.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DetailOverlay;
