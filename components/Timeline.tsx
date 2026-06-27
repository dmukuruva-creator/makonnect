import type { JourneyMilestone } from "@/lib/types";

export default function Timeline({
  milestones,
}: {
  milestones: JourneyMilestone[];
}) {
  return (
    <ol className="relative ml-3 border-l border-tint">
      {milestones.map((m, i) => (
        <li key={`${m.year}-${i}`} className="mb-6 ml-6 last:mb-0">
          <span
            aria-hidden
            className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-bg"
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            {m.year}
          </p>
          <p className="font-medium text-text">{m.title}</p>
          <p className="text-sm text-text/70">{m.detail}</p>
        </li>
      ))}
    </ol>
  );
}
