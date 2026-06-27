import Link from "next/link";
import { getDirectoryMembers, getResources } from "@/lib/data";

export default function Home() {
  const members = getDirectoryMembers();
  const resources = getResources();

  return (
    <div className="space-y-16">
      <section className="pt-6 text-center sm:pt-12">
        <p className="text-sm font-medium uppercase tracking-wide text-secondary">
          For the Makomborero family
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight text-text sm:text-4xl">
          Hear from — and reach — someone who got where you&apos;re trying to
          go.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-text/70">
          MaKonnect is a mentorship-first network for Makomborero alumni,
          students and staff. Find an alum who&apos;s walked your path, and read
          the advice they&apos;ve passed back.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/directory"
            className="rounded-lg bg-primary px-5 py-3 font-semibold text-text shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Find an alum
          </Link>
          <Link
            href="/resources"
            className="rounded-lg border border-secondary/40 px-5 py-3 font-semibold text-secondary transition-colors hover:bg-tint/30"
          >
            Browse resources
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            stat: `${members.length}`,
            label: "alumni & staff in the directory",
          },
          { stat: `${resources.length}`, label: "advice pieces in the hub" },
          { stat: "Synthetic", label: "data only — no real students" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-tint/60 bg-white/40 p-5"
          >
            <p className="text-2xl font-bold text-secondary">{card.stat}</p>
            <p className="mt-1 text-sm text-text/70">{card.label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-tint/60 bg-white/40 p-6">
        <h2 className="text-lg font-semibold text-text">
          Built carefully around young people
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-text/75">
          <li>
            • Students&apos; profiles default to <strong>family-only</strong> and
            are never browsable in the public directory.
          </li>
          <li>
            • No donor→student messaging; no unsupervised adult→minor contact.
            Mentorship runs through staff-auditable channels.
          </li>
          <li>
            • Economic-vulnerability and aid status are{" "}
            <strong>staff-only</strong> — never shown to members or donors.
          </li>
        </ul>
        <p className="mt-3 text-xs text-text/50">
          Safeguarding is the foundation, not an afterthought. This demo shows
          those rules already shaping the product.
        </p>
      </section>
    </div>
  );
}
