import type { Metadata } from "next";
import Link from "next/link";
import { getResources } from "@/lib/data";
import { RESOURCE_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Alumni advice on college apps, finances, networking and relationships — readable offline.",
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-text">Resources Hub</h1>
        <p className="mt-1 text-text/70">
          Advice passed back by alumni. Static and readable offline, for poor
          connectivity. Categories: {RESOURCE_CATEGORIES.join(" · ")}.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <Link
            key={r.slug}
            href={`/resources/${r.slug}`}
            className="group flex flex-col rounded-xl border border-tint/60 bg-white/50 p-5 transition-colors hover:border-primary"
          >
            <span className="w-fit rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">
              {r.category}
            </span>
            <h2 className="mt-2 font-semibold text-text group-hover:text-secondary">
              {r.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-text/70">{r.summary}</p>
            <p className="mt-3 text-xs text-text/50">
              {r.author} · {r.readMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
