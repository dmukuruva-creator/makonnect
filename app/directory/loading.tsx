import { MemberCardSkeleton } from "@/components/Skeleton";

export default function DirectoryLoading() {
  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="skeleton h-6 w-28 rounded-pill" />
        <div className="skeleton h-9 w-56 rounded-pill" />
        <div className="skeleton h-4 w-full max-w-xl rounded-pill" />
      </div>
      <div className="skeleton h-16 w-full rounded-card" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MemberCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
