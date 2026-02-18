export function LoadingState() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-52 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="text-center py-10 text-gray-500">
      No recipes found.
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="text-center text-red-500 py-6">
      {message}
    </div>
  );
}
