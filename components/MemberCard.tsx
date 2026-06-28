import Link from "next/link";
import IntentChips from "@/components/IntentChips";
import type { Member } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Deterministic warm gradient per member so avatars feel personal but cohesive.
const GRADIENTS = [
  "from-[#bac132] to-[#9aa028]",
  "from-[#e3862f] to-[#c96f1f]",
  "from-[#805522] to-[#5e3d18]",
  "from-[#cdbf6a] to-[#a8983f]",
  "from-[#d98b4a] to-[#b56a2a]",
];
function gradientFor(id: string): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return GRADIENTS[sum % GRADIENTS.length];
}

export default function MemberCard({
  member,
  index = 0,
}: {
  member: Member;
  index?: number;
}) {
  return (
    <Link
      href={`/profile/${member.id}`}
      style={{ ["--delay" as string]: `${Math.min(index, 8) * 50}ms` }}
      className="group animate-fade-up flex flex-col rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/50"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientFor(
            member.id,
          )} text-sm font-black text-white shadow-soft transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}
        >
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-text group-hover:text-secondary">
            {member.name}
          </p>
          <p className="truncate text-sm text-text/70">{member.headline}</p>
        </div>
      </div>

      <p className="mt-3 text-xs font-medium text-text/55">
        Cohort {member.cohort} · {member.location}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {member.fields.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-pill bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-secondary"
          >
            {f}
          </span>
        ))}
      </div>

      {member.offersMentorship && (
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-pill bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          Offers mentorship
        </span>
      )}

      {/* Peer-connection intents (excluding Mentoring, which the badge above
          already conveys). Adult↔adult only — minors never carry intents. */}
      <IntentChips
        intents={member.openTo?.filter((i) => i !== "Mentoring")}
        max={3}
        className="mt-2.5"
      />
    </Link>
  );
}
