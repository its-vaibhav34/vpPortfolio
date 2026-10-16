export default function LoadingShimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header shimmer */}
      <div className="h-8 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-lg animate-shimmer" />

      {/* Content shimmers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/10 p-4 rounded-xl space-y-3">
            <div className="h-4 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded animate-shimmer" />
            <div className="h-3 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded w-3/4 animate-shimmer" />
            <div className="h-6 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded w-1/2 animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}
