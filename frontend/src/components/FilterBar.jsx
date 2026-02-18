function FilterBar({ cuisine, setCuisine }) {
  const options = [
    "All",
    "Dessert",
    "Chicken",
    "Seafood",
    "Vegetarian",
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setCuisine(opt)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            cuisine === opt
              ? "bg-orange-500 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
