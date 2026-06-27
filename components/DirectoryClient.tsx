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

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, field, location…"
          aria-label="Search the directory"
          className="w-full flex-1 rounded-lg border border-tint bg-white/70 px-4 py-2.5 text-text outline-none placeholder:text-text/40 focus:border-primary"
        />
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          aria-label="Filter by field"
          className="rounded-lg border border-tint bg-white/70 px-3 py-2.5 text-text outline-none focus:border-primary"
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
          className="rounded-lg border border-tint bg-white/70 px-3 py-2.5 text-text outline-none focus:border-primary"
        >
          <option value="all">Everyone</option>
          <option value="offers">Offers mentorship</option>
        </select>
      </div>

      <p className="mt-3 text-sm text-text/60">
        {results.length} {results.length === 1 ? "person" : "people"}
      </p>

      {results.length === 0 ? (
        <p className="mt-10 text-center text-text/60">
          No one matches that search yet. Try a broader term.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
}
