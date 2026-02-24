import { useNavigate } from "react-router-dom";

function Hero({ search, setSearch, suggestions = [], setSuggestions }) {
  const navigate = useNavigate();

  const handleSelect = (recipe) => {
    setSuggestions([]);
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="relative h-[85vh] w-full flex items-center justify-center text-white">
      {/* BACKGROUND IMAGE */}
      <img
        src="/images/hero pic.jfif" // replace with your image
        className="absolute inset-0 w-full h-full object-cover"
        alt="hero"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl w-full px-6 text-center">
        {/* HEADLINE */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Discover Recipes Worth Your Time
        </h1>

        {/* SUBTEXT */}
        <p className="text-lg text-gray-300 mb-8">
          Search, explore and cook amazing dishes from around the world
        </p>

        {/* SEARCH BOX */}
        <div className="relative bg-white rounded-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="
              w-full px-6 py-4 rounded-xl text-black text-lg
              outline-none
              shadow-lg
              focus:ring-2 focus:ring-orange-500
              transition
            "
          />

          {/* SUGGESTIONS */}
          {suggestions?.length > 0 && (
            <div className="absolute w-full bg-white text-black mt-2 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelect(s)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                >
                  {s.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })}
          className="
            mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600
            rounded-full font-semibold shadow-lg transition
          "
        >
          Explore Recipes →
        </button>
      </div>
    </div>
  );
}

export default Hero;