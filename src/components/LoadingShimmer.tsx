export default function LoadingShimmer() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header shimmer */}
      <div className="h-6 w-48 rounded-lg" style={{ background: "rgba(245,158,11,0.08)" }} />

      {/* Content shimmers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-xl space-y-3"
            style={{ background: "rgba(26,26,46,0.5)", border: "1px solid rgba(245,158,11,0.06)" }}
          >
            <div className="h-4 rounded w-3/4" style={{ background: "rgba(245,158,11,0.08)" }} />
            <div className="h-3 rounded w-1/2" style={{ background: "rgba(245,158,11,0.05)" }} />
            <div className="h-3 rounded w-5/6" style={{ background: "rgba(245,158,11,0.05)" }} />
          </div>
        ))}
      </div>
    </div>
  )
}
