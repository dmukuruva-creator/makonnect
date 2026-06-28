import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import type { Campaign } from "@/lib/types";

const STATUS_STYLE: Record<
  Campaign["status"],
  { chip: string; label: string }
> = {
  active: { chip: "bg-primary/15 text-secondary", label: "Active" },
  funded: { chip: "bg-gold/15 text-gold", label: "Funded 🎉" },
  upcoming: { chip: "bg-tint/50 text-secondary", label: "Upcoming" },
};

export function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export default function CampaignCard({
  campaign: c,
  index = 0,
}: {
  campaign: Campaign;
  index?: number;
}) {
  const pct =
    c.goalUsd > 0 ? Math.min(100, Math.round((c.raisedUsd / c.goalUsd) * 100)) : 0;

  return (
    <Link
      href={`/campaigns/${c.slug}`}
      style={{ ["--delay" as string]: `${Math.min(index, 8) * 60}ms` }}
      className="group animate-fade-up flex flex-col rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/50"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex w-fit items-center rounded-pill px-2.5 py-1 text-xs font-bold ${STATUS_STYLE[c.status].chip}`}
        >
          {STATUS_STYLE[c.status].label}
        </span>
        <span className="text-xs font-medium text-text/50">via {c.processor}</span>
      </div>

      <h2 className="mt-3 text-lg font-extrabold text-text group-hover:text-secondary">
        {c.title}
      </h2>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text/70">
        {c.summary}
      </p>

      <div className="mt-4">
        <ProgressBar value={c.raisedUsd} max={c.goalUsd} />
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-text/60">
          <span>
            <span className="font-bold text-secondary">{usd(c.raisedUsd)}</span>{" "}
            of {usd(c.goalUsd)}
          </span>
          <span>{pct}%</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-text/50">
        <span>{c.contributors} contributors</span>
        <span>by {c.organiser}</span>
      </div>
    </Link>
  );
}
