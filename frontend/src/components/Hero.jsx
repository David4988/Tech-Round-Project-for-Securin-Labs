import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { useEffect, useRef } from "react";

const Hero = ({ search, setSearch, suggestions, setSuggestions }) => {

  const boxRef = useRef(null);
  


  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  

  return (
    <div className="relative h-[420px] flex items-center px-10 overflow-hidden">
      <Navbar />
      {/* IMAGE */}
      <img
        src="../../public/images/hero pic.jfif"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-xl text-white">
        <h2 className="text-4xl font-bold mb-4">
          Discover Recipes Worth Your Time
        </h2>

        {/* SEARCH */}
        <div ref={boxRef} className="relative">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 w-full bg-[#1f2937] border border-[#374151] rounded text-white"
          />

          {/* 🔥 SUGGESTIONS DROPDOWN */}
          {suggestions.length > 0 && (
            <div className="absolute w-full bg-white text-black mt-2 rounded shadow-lg z-20 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSearch(item.title);
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
