import Link from "next/link";
import type { Member } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MemberCard({ member }: { member: Member }) {
  return (
    <Link
      href={`/profile/${member.id}`}
      className="group flex flex-col rounded-xl border border-tint/60 bg-white/50 p-5 transition-colors hover:border-primary"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint text-sm font-semibold text-secondary"
        >
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-text group-hover:text-secondary">
            {member.name}
          </p>
          <p className="truncate text-sm text-text/70">{member.headline}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-text/60">
        Cohort {member.cohort} · {member.location}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {member.fields.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-secondary"
          >
            {f}
          </span>
        ))}
      </div>

      {member.offersMentorship && (
        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold">
          Offers mentorship
        </span>
      )}
    </Link>
  );
}
