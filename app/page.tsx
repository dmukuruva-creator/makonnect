import Link from "next/link";
import { getCampaigns, getDirectoryMembers, getResources } from "@/lib/data";
import AvatarCluster from "@/components/AvatarCluster";
import CampaignCard from "@/components/CampaignCard";

export default function Home() {
  const members = getDirectoryMembers();
  const resources = getResources();
  const campaigns = getCampaigns();

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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              emoji: "🤝",
              title: "Connect",
              href: "/directory",
              body: "Reconnect and network with alumni worldwide — see who's open to mentoring, hiring or collaborating.",
            },
            {
              emoji: "🎓",
              title: "Mentor",
              href: "/directory",
              body: "Alumni guide the students coming up behind them, through safe, staff-auditable channels.",
            },
            {
              emoji: "📖",
              title: "Learn",
              href: "/resources",
              body: "Hard-won advice on college apps, finances and life — readable offline when connectivity is poor.",
            },
            {
              emoji: "💛",
              title: "Give",
              href: "/campaigns",
              body: "Back time-bound, transparent campaigns run by alumni for the family.",
            },
          ].map((step, i) => (
            <Link
              key={step.title}
              href={step.href}
              className="group animate-fade-up rounded-card bg-surface p-6 shadow-soft ring-1 ring-tint/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/50"
              style={{ ["--delay" as string]: `${i * 90}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl">
                {step.emoji}
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-text group-hover:text-secondary">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text/70">
                {step.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Stats -------------------------------------------------------- */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { stat: `${members.length}`, label: "alumni & staff in the directory" },
          { stat: `${resources.length}`, label: "advice pieces in the hub" },
          { stat: `${campaigns.length}`, label: "giving campaigns (demo)" },
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

      {/* ---- Campaigns teaser --------------------------------------------- */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-text">
              Alumni-directed giving
            </h2>
            <p className="mt-1 max-w-xl text-sm text-text/70">
              Time-bound, transparent campaigns run by alumni for the family — a
              preview on synthetic data, with no real money moving in-app.
            </p>
          </div>
          <Link
            href="/campaigns"
            className="group inline-flex items-center gap-1.5 rounded-pill bg-surface px-4 py-2 text-sm font-semibold text-secondary shadow-soft ring-1 ring-tint/40 transition-colors hover:bg-tint/30"
          >
            All campaigns
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.slice(0, 3).map((c, i) => (
            <CampaignCard key={c.slug} campaign={c} index={i} />
          ))}
        </div>
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
