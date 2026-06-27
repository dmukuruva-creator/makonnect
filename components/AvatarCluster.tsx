// Decorative "connection" motif for the hero — a small constellation of alumni
// nodes orbiting a central student, gently floating. Pure CSS motion, marked
// aria-hidden (it carries no information a screen reader needs).

type Node = {
  initials: string;
  field: string;
  from: string; // gradient start
  to: string; // gradient end
  className: string; // position + size
  delay: string;
};

const NODES: Node[] = [
  {
    initials: "TM",
    field: "Engineering",
    from: "#bac132",
    to: "#9aa028",
    className: "left-[6%] top-[8%] h-16 w-16 text-sm",
    delay: "0s",
  },
  {
    initials: "RC",
    field: "Medicine",
    from: "#e3862f",
    to: "#c96f1f",
    className: "right-[4%] top-[2%] h-14 w-14 text-sm",
    delay: "0.8s",
  },
  {
    initials: "PN",
    field: "Finance",
    from: "#805522",
    to: "#5e3d18",
    className: "left-[0%] bottom-[14%] h-14 w-14 text-sm",
    delay: "1.4s",
  },
  {
    initials: "FK",
    field: "CS",
    from: "#d6bead",
    to: "#bfa088",
    className: "right-[8%] bottom-[6%] h-16 w-16 text-sm",
    delay: "0.4s",
  },
];

export default function AvatarCluster() {
  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-sm"
    >
      {/* Connecting lines + soft halo behind everything. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-secondary/25"
        fill="none"
      >
        <circle cx="50" cy="50" r="34" className="stroke-tint/50" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="50" y1="50" x2="16" y2="16" stroke="currentColor" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="86" y2="12" stroke="currentColor" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="10" y2="78" stroke="currentColor" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="84" y2="86" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      {/* Soft glow. */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* Center node — "you", the student. */}
      <div className="animate-float absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-secondary to-[#5e3d18] text-bg shadow-lift ring-4 ring-bg">
        <span className="font-display text-xl font-black">You</span>
        <span className="text-[10px] font-semibold text-bg/70">Student</span>
      </div>

      {/* Orbiting alumni nodes. */}
      {NODES.map((n) => (
        <div
          key={n.initials}
          className={`animate-float absolute flex flex-col items-center justify-center rounded-full font-display font-black text-bg shadow-lift ring-4 ring-bg ${n.className}`}
          style={{
            background: `linear-gradient(135deg, ${n.from}, ${n.to})`,
            ["--delay" as string]: n.delay,
          }}
        >
          {n.initials}
          <span className="text-[8px] font-semibold text-bg/80">{n.field}</span>
        </div>
      ))}
    </div>
  );
}
