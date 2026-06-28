import type { ConnectionIntent } from "@/lib/types";

// Each connection intent gets a small, consistent emoji so cards and profiles
// scan at a glance. Adult↔adult only — minors never carry intents.
const INTENT_EMOJI: Record<ConnectionIntent, string> = {
  Mentoring: "🤝",
  Hiring: "💼",
  Collaborating: "🧩",
  Investing: "🌱",
  Reconnecting: "🔗",
};

export default function IntentChips({
  intents,
  max,
  className = "",
}: {
  intents?: ConnectionIntent[];
  /** Cap the number shown (e.g. on a compact card). Omit to show all. */
  max?: number;
  className?: string;
}) {
  if (!intents || intents.length === 0) return null;
  const shown = typeof max === "number" ? intents.slice(0, max) : intents;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((intent) => (
        <span
          key={intent}
          className="inline-flex items-center gap-1 rounded-pill bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary"
        >
          <span aria-hidden>{INTENT_EMOJI[intent]}</span>
          {intent}
        </span>
      ))}
    </div>
  );
}
