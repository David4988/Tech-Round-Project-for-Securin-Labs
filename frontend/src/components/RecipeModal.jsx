import {  AnimatePresence } from "framer-motion";

function RecipeModal({ selected, onClose }) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white text-black p-6 rounded-lg max-w-xl w-full"
          >
            <img
              src={selected.image_url}
              className="w-full h-56 object-cover mb-4 rounded"
            />

            <h2 className="text-lg mb-2">{selected.title}</h2>

            <p className="text-sm text-gray-600 mb-4">
              {selected.description}
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-[#f97316] text-white rounded"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RecipeModal;
