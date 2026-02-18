function Pagination({ page, setPage }) {
  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: 5 }).map((_, i) => {
        const pageNum = page - 2 + i;
        if (pageNum < 1) return null;

        return (
          <button
            key={i}
            onClick={() => setPage(pageNum)}
            className={`w-9 h-9 rounded-full text-sm ${
              pageNum === page
                ? "bg-[#f97316] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => setPage((p) => p + 1)}
        className="px-4 py-2 rounded bg-gray-200 text-gray-700"
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
