import { motion } from "framer-motion";
import Navbar from "./Navbar";

function Hero({ search, setSearch }) {
  return (
    <div className="relative h-[480px] flex items-center px-10 overflow-hidden">
      <Navbar />
      {/* Image */}
      <motion.img
        src="../../public/images/hero pic.jfif"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-xl text-white"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <p className="text-orange-400 mb-2 tracking-wide">
          Curated Culinary Experience
        </p>

        <h2 className="text-4xl font-bold mb-4 leading-tight">
          Discover Recipes Worth Your Time
        </h2>

        <p className="text-gray-300 mb-6">
          Explore handpicked recipes, refine your taste, and turn everyday cooking into something worth remembering.
        </p>

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full bg-[#1f2937] border border-[#374151] rounded text-white"
        />
      </motion.div>
    </div>
  );
}

export default Hero;
