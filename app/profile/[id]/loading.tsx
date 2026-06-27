import { SkeletonLine } from "@/components/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="skeleton h-8 w-36 rounded-pill" />
      <div className="mt-5 flex items-center gap-4">
        <div className="skeleton h-20 w-20 shrink-0 rounded-3xl" />
        <div className="flex-1 space-y-2.5">
          <SkeletonLine className="h-6 w-48" />
          <SkeletonLine className="w-2/3" />
          <SkeletonLine className="w-1/3" />
        </div>
      </div>
      <div className="mt-7 space-y-3 rounded-card bg-surface p-6 shadow-soft ring-1 ring-tint/40">
        <SkeletonLine className="w-24" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-4/5" />
      </div>
      <div className="mt-6 space-y-3 rounded-card bg-surface p-6 shadow-soft ring-1 ring-tint/40">
        <SkeletonLine className="w-24" />
        <SkeletonLine className="w-2/3" />
        <SkeletonLine className="w-1/2" />
      </div>
    </div>
  );
}
