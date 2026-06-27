// Shimmer skeletons for loading states. The `.skeleton` class (globals.css)
// carries the animated sweep and is disabled under prefers-reduced-motion.

export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton h-3 rounded-pill ${className}`} />;
}

/** Mirrors MemberCard's silhouette so the swap-in feels seamless. */
export function MemberCardSkeleton() {
  return (
    <div className="rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1 space-y-2">
          <SkeletonLine className="w-2/3" />
          <SkeletonLine className="w-full" />
        </div>
      </div>
      <SkeletonLine className="mt-4 w-1/2" />
      <div className="mt-3 flex gap-1.5">
        <div className="skeleton h-5 w-16 rounded-pill" />
        <div className="skeleton h-5 w-12 rounded-pill" />
      </div>
    </div>
  );
}

/** Mirrors a Resources Hub card. */
export function ResourceCardSkeleton() {
  return (
    <div className="rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40">
      <div className="skeleton h-5 w-24 rounded-pill" />
      <SkeletonLine className="mt-3 w-3/4" />
      <SkeletonLine className="mt-3 w-full" />
      <SkeletonLine className="mt-2 w-5/6" />
      <div className="mt-4 flex justify-between">
        <SkeletonLine className="w-20" />
        <SkeletonLine className="w-16" />
      </div>
    </div>
  );
}
