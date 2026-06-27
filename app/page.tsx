import Link from "next/link";
import { getDirectoryMembers, getResources } from "@/lib/data";
import AvatarCluster from "@/components/AvatarCluster";

export default function Home() {
  const members = getDirectoryMembers();
  const resources = getResources();

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* ---- Hero ---------------------------------------------------------- */}
      <section className="grid items-center gap-10 pt-2 sm:pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="text-center lg:text-left">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-pill bg-surface px-3.5 py-1.5 text-sm font-semibold text-secondary shadow-soft ring-1 ring-tint/50"
            style={{ ["--delay" as string]: "0ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            For the Makomborero family
          </span>

          <h1
            className="animate-fade-up mx-auto mt-5 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-text sm:text-5xl lg:mx-0"
            style={{ ["--delay" as string]: "80ms" }}
          >
            Hear from — and reach —{" "}
            <span className="relative whitespace-nowrap text-secondary">
              someone
              <svg
                aria-hidden
                viewBox="0 0 220 12"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-primary"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 60 2 110 6 T 218 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            who got where you&apos;re trying to go.
          </h1>

          <p
            className="animate-fade-up mx-auto mt-5 max-w-xl text-lg text-text/70 lg:mx-0"
            style={{ ["--delay" as string]: "160ms" }}
          >
            MaKonnect is a mentorship-first network for Makomborero alumni,
            students and staff. Find an alum who&apos;s walked your path, and read
            the advice they&apos;ve passed back.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ ["--delay" as string]: "240ms" }}
          >
            <Link
              href="/directory"
              className="group inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3.5 font-bold text-text shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Find an alum
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/resources"
              className="rounded-pill border-2 border-secondary/25 bg-surface/60 px-6 py-3.5 font-bold text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-surface"
            >
              Browse resources
            </Link>
          </div>

          <p
            className="animate-fade-up mt-5 text-sm text-text/50 lg:mx-0"
            style={{ ["--delay" as string]: "320ms" }}
          >
            Built by Makomborero alumni · Safeguarding-first · Reads offline
          </p>
        </div>

        {/* Connection motif. */}
        <div className="animate-fade-in" style={{ ["--delay" as string]: "200ms" }}>
          <AvatarCluster />
        </div>
      </section>

      {/* ---- How it works ------------------------------------------------- */}
      <section>
        <h2 className="text-center text-2xl font-extrabold text-text">
          How MaKonnect works
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              emoji: "🔎",
              title: "Find your person",
              body: "Search alumni and staff by field, country or cohort — the ones who walked your exact path.",
            },
            {
              emoji: "📖",
              title: "Read the advice",
              body: "Alumni pass back hard-won guidance on college apps, finances and life. Readable offline.",
            },
            {
              emoji: "🤝",
              title: "Ask for mentorship",
              body: "Reach out through staff-auditable channels — safe, supervised, and built around young people.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="animate-fade-up rounded-card bg-surface p-6 shadow-soft ring-1 ring-tint/40 transition-transform duration-300 hover:-translate-y-1"
              style={{ ["--delay" as string]: `${i * 90}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl">
                {step.emoji}
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-text">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text/70">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Stats -------------------------------------------------------- */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { stat: `${members.length}`, label: "alumni & staff in the directory" },
          { stat: `${resources.length}`, label: "advice pieces in the hub" },
          { stat: "Synthetic", label: "data only — no real students" },
        ].map((card, i) => (
          <div
            key={card.label}
            className="animate-pop-in rounded-card bg-gradient-to-br from-surface to-surface-2 p-6 text-center shadow-soft ring-1 ring-tint/40"
            style={{ ["--delay" as string]: `${i * 100}ms` }}
          >
            <p className="font-display text-4xl font-black text-secondary">
              {card.stat}
            </p>
            <p className="mt-1.5 text-sm text-text/70">{card.label}</p>
          </div>
        ))}
      </section>

      {/* ---- Safeguarding promise ----------------------------------------- */}
      <section className="overflow-hidden rounded-card bg-secondary text-bg shadow-lift">
        <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-pill bg-bg/15 px-3 py-1 text-sm font-bold">
              🛡️ Safeguarding-first
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-bg">
              Built carefully around young people.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bg/75">
              The safety of minors is the foundation of this product — not an
              afterthought. These rules already shape the demo.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Students' profiles default to family-only and are never browsable in the public directory.",
              "No donor→student messaging; no unsupervised adult→minor contact. Mentorship runs through staff-auditable channels.",
              "Economic-vulnerability and aid status are staff-only — never shown to members or donors.",
            ].map((rule) => (
              <li
                key={rule}
                className="flex gap-3 rounded-2xl bg-bg/10 p-3.5 text-sm leading-relaxed text-bg/90"
              >
                <span className="mt-0.5 text-primary" aria-hidden>
                  ✓
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
