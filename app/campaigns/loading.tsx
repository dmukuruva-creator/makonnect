export default function CampaignsLoading() {
  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="skeleton h-6 w-40 rounded-pill" />
        <div className="skeleton h-9 w-48 rounded-pill" />
        <div className="skeleton h-4 w-full max-w-xl rounded-pill" />
      </div>
      <div className="skeleton mb-6 h-20 w-full rounded-card" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40"
          >
            <div className="skeleton h-5 w-20 rounded-pill" />
            <div className="skeleton mt-3 h-5 w-3/4 rounded-pill" />
            <div className="skeleton mt-2 h-4 w-full rounded-pill" />
            <div className="skeleton mt-4 h-2.5 w-full rounded-pill" />
            <div className="skeleton mt-3 h-3 w-2/3 rounded-pill" />
          </div>
        ))}
      </div>
    </div>
  );
}
