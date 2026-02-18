const popular = [
  {
    id: 1,
    title: "Grilled Salmon",
    image: "https://picsum.photos/400/300?salmon",
  },
  {
    id: 2,
    title: "Classic Burger",
    image: "https://picsum.photos/400/300?burger",
  },
  {
    id: 3,
    title: "Pasta Alfredo",
    image: "https://picsum.photos/400/300?pasta",
  },
  {
    id: 4,
    title: "Chicken Tikka",
    image: "https://picsum.photos/400/300?chicken",
  },
  {
    id: 5,
    title: "Chocolate Cake",
    image: "https://picsum.photos/400/300?cake",
  },
];

function PopularSection() {
  return (
    <div className="px-10 py-10 bg-white text-black">
      <h2 className="text-2xl font-semibold mb-6">
        Popular Recipes
      </h2>

      <div className="flex gap-5 overflow-x-auto">
        {popular.map((r) => (
          <div
            key={r.id}
            className="min-w-[220px] bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={r.image}
              className="h-36 w-full object-cover"
            />

            <div className="p-3">
              <p className="text-sm font-semibold">
                {r.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSection;
