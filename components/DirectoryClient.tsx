"use client";

import { useMemo, useState } from "react";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/lib/types";

type MentorshipFilter = "all" | "offers";

export default function DirectoryClient({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const [mentorship, setMentorship] = useState<MentorshipFilter>("all");

  const fields = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => m.fields.forEach((f) => set.add(f)));
    return ["all", ...Array.from(set).sort()];
  }, [members]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const matchesQuery =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.headline.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.fields.some((f) => f.toLowerCase().includes(q));
      const matchesField = field === "all" || m.fields.includes(field);
      const matchesMentorship =
        mentorship === "all" || (mentorship === "offers" && m.offersMentorship);
      return matchesQuery && matchesField && matchesMentorship;
    });
  }, [members, query, field, mentorship]);

  const filtersActive =
    query.trim() !== "" || field !== "all" || mentorship !== "all";

  return (
    <div>
      {/* Search + filter bar — a single soft rounded panel. */}
      <div className="rounded-card bg-surface p-3 shadow-soft ring-1 ring-tint/40 sm:p-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text/40"
            >
              🔎
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, field, location…"
              aria-label="Search the directory"
              className="w-full rounded-pill border border-tint/60 bg-bg/60 py-2.5 pl-11 pr-4 text-text outline-none transition-colors placeholder:text-text/40 focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            aria-label="Filter by field"
            className="cursor-pointer rounded-pill border border-tint/60 bg-bg/60 px-4 py-2.5 font-medium text-text outline-none transition-colors focus:border-primary"
          >
            {fields.map((f) => (
              <option key={f} value={f}>
                {f === "all" ? "All fields" : f}
              </option>
            ))}
          </select>
          <select
            value={mentorship}
            onChange={(e) => setMentorship(e.target.value as MentorshipFilter)}
            aria-label="Filter by mentorship"
            className="cursor-pointer rounded-pill border border-tint/60 bg-bg/60 px-4 py-2.5 font-medium text-text outline-none transition-colors focus:border-primary"
          >
            <option value="all">Everyone</option>
            <option value="offers">Offers mentorship</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-text/60">
          <span
            key={results.length}
            className="animate-fade-in font-bold text-secondary"
          >
            {results.length}
          </span>{" "}
          {results.length === 1 ? "person" : "people"}
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setField("all");
              setMentorship("all");
            }}
            className="rounded-pill px-3 py-1 text-sm font-semibold text-secondary transition-colors hover:bg-tint/40"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="animate-fade-up mt-8 rounded-card bg-surface p-10 text-center shadow-soft ring-1 ring-tint/40">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-tint/40 text-3xl">
            🔍
          </div>
          <p className="mt-4 font-bold text-text">No one matches that yet</p>
          <p className="mt-1 text-sm text-text/60">
            Try a broader term, or clear the filters to see everyone.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
