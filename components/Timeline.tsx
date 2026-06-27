import type { JourneyMilestone } from "@/lib/types";

export default function Timeline({
  milestones,
}: {
  milestones: JourneyMilestone[];
}) {
  return (
    <ol className="relative ml-3 pl-6">
      {/* Animated rail that draws itself in from the top. */}
      <span
        aria-hidden
        className="animate-draw absolute left-0 top-1 h-[calc(100%-0.5rem)] w-0.5 rounded-full bg-gradient-to-b from-primary via-tint to-transparent"
      />
      {milestones.map((m, i) => (
        <li
          key={`${m.year}-${i}`}
          className="animate-fade-up relative mb-7 last:mb-0"
          style={{ ["--delay" as string]: `${i * 110 + 200}ms` }}
        >
          <span
            aria-hidden
            className="absolute -left-[1.6rem] top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-primary ring-4 ring-surface"
          />
          <p className="text-xs font-bold uppercase tracking-wide text-secondary">
            {m.year}
          </p>
          <p className="mt-0.5 font-bold text-text">{m.title}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-text/70">
            {m.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
