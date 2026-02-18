function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 px-10 py-5 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-white text-lg font-semibold tracking-wide">
        Culinary Codex
      </h1>

      {/* Links */}
      <div className="flex gap-6 text-sm text-gray-300">
        <a href="#" className="hover:text-white">Home</a>
        <a href="#" className="hover:text-white">Recipes</a>
        <a href="#" className="hover:text-white">Explore</a>
      </div>

      {/* CTA */}
      <button className="bg-orange-500 px-4 py-2 rounded text-white text-sm">
        Start Cooking
      </button>
    </div>
  );
}

export default Navbar;
