const quick = [
  {
    id: 1,
    title: "Egg Fried Rice",
    time: "20 min",
    img: "https://picsum.photos/400?rice",
  },
  {
    id: 2,
    title: "Grilled Sandwich",
    time: "15 min",
    img: "https://picsum.photos/400?sandwich",
  },
  {
    id: 3,
    title: "Pasta",
    time: "25 min",
    img: "https://picsum.photos/400?pasta",
  },
];

function QuickPicks() {
  return (
    <div className="px-10 py-10 bg-white text-black">
      <h2 className="text-2xl font-semibold mb-6">
        Quick Picks (Under 30 mins)
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {quick.map((r) => (
          <div
            key={r.id}
            className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={r.img}
              className="h-40 w-full object-cover"
            />

            <div className="p-3">
              <p className="font-semibold">{r.title}</p>
              <p className="text-xs text-gray-500">
                {r.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickPicks;
