export default function AdminLoading() {
  return (
    <div className="flex-1 p-6 animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 rounded-lg" />
          <div className="h-4 w-64 bg-gray-100 rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100">
            <div className="h-4 w-20 bg-gray-100 rounded mb-3" />
            <div className="h-8 w-16 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
