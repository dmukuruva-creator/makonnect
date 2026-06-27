import type { Metadata } from "next";
import Link from "next/link";
import { getResources } from "@/lib/data";
import { RESOURCE_CATEGORIES, type ResourceCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Alumni advice on college apps, finances, networking and relationships — readable offline.",
};

// Each category gets a warm, distinct chip + emoji so the hub scans at a glance.
const CATEGORY_STYLE: Record<
  ResourceCategory,
  { chip: string; emoji: string }
> = {
  "College Apps": { chip: "bg-primary/15 text-secondary", emoji: "🎓" },
  Finances: { chip: "bg-gold/15 text-gold", emoji: "💰" },
  Networking: { chip: "bg-secondary/15 text-secondary", emoji: "🤝" },
  Relationships: { chip: "bg-tint/50 text-secondary", emoji: "💛" },
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div>
      <header className="animate-fade-up mb-6">
        <span className="inline-flex items-center gap-2 rounded-pill bg-gold/15 px-3 py-1 text-sm font-bold text-gold">
          📖 Advice from alumni
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-text">
          Resources Hub
        </h1>
        <p className="mt-1.5 max-w-2xl text-text/70">
          Hard-won guidance passed back by alumni — static and readable offline,
          for when connectivity is poor.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {RESOURCE_CATEGORIES.map((c) => (
            <span
              key={c}
              className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-bold ${CATEGORY_STYLE[c].chip}`}
            >
              {CATEGORY_STYLE[c].emoji} {c}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r, i) => (
          <Link
            key={r.slug}
            href={`/resources/${r.slug}`}
            style={{ ["--delay" as string]: `${Math.min(i, 8) * 60}ms` }}
            className="group animate-fade-up flex flex-col rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/50"
          >
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-bold ${CATEGORY_STYLE[r.category].chip}`}
            >
              {CATEGORY_STYLE[r.category].emoji} {r.category}
            </span>
            <h2 className="mt-3 text-lg font-extrabold text-text group-hover:text-secondary">
              {r.title}
            </h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text/70">
              {r.summary}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-medium text-text/50">
              <span>{r.author}</span>
              <span className="inline-flex items-center gap-1 rounded-pill bg-bg/60 px-2 py-0.5">
                ⏱ {r.readMinutes} min read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
