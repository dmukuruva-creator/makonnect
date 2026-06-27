import { ResourceCardSkeleton } from "@/components/Skeleton";

export default function ResourcesLoading() {
  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="skeleton h-6 w-36 rounded-pill" />
        <div className="skeleton h-9 w-52 rounded-pill" />
        <div className="skeleton h-4 w-full max-w-xl rounded-pill" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <ResourceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
