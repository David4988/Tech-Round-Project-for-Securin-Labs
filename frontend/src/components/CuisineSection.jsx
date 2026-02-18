const cuisines = [
  { name: "Italian", img: "https://picsum.photos/300?italian" },
  { name: "Indian", img: "https://picsum.photos/300?indian" },
  { name: "Mexican", img: "https://picsum.photos/300?mexican" },
  { name: "Chinese", img: "https://picsum.photos/300?chinese" },
];

function CuisineSection({ setCuisine }) {
  return (
    <div className="px-10 py-10 bg-gray-100 text-black">
      <h2 className="text-2xl font-semibold mb-6">
        Explore Cuisines
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {cuisines.map((c) => (
          <div
            key={c.name}
            onClick={() => setCuisine(c.name)}
            className="relative cursor-pointer rounded-lg overflow-hidden group"
          >
            <img
              src={c.img}
              className="w-full h-32 object-cover group-hover:scale-110 transition"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white font-semibold">
                {c.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CuisineSection;
