import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Timeline from "@/components/Timeline";
import { getAllMemberIds, getMember } from "@/lib/data";

// Pre-render every profile at build time (synthetic data only).
export function generateStaticParams() {
  return getAllMemberIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = getMember(id);
  if (!member) return { title: "Profile not found" };
  return { title: member.name, description: member.headline };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = getMember(id);
  if (!member) notFound();

  const familyOnly = member.isMinor || member.visibility === "family-only";
  const avatarInitials = member.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="animate-fade-up mx-auto max-w-2xl">
      <Link
        href="/directory"
        className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1.5 text-sm font-semibold text-secondary shadow-soft ring-1 ring-tint/40 transition-colors hover:bg-tint/30"
      >
        ← Back to directory
      </Link>

      <header className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span
          aria-hidden
          className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-secondary to-[#5e3d18] font-display text-2xl font-black text-bg shadow-lift ring-4 ring-bg"
        >
          {avatarInitials}
        </span>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text">
            {member.name}
          </h1>
          <p className="mt-1 text-text/70">{member.headline}</p>
          <p className="mt-1 text-sm font-medium text-text/55">
            Cohort {member.cohort} · {member.location}
          </p>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {member.fields.map((f) => (
          <span
            key={f}
            className="rounded-pill bg-primary/15 px-3 py-1 text-xs font-semibold text-secondary"
          >
            {f}
          </span>
        ))}
      </div>

      {familyOnly && (
        <div className="mt-6 rounded-card border border-gold/40 bg-gold/10 p-5 text-sm text-secondary shadow-soft">
          <p className="font-bold">🛡️ Family-only profile</p>
          <p className="mt-1.5 text-text/75">
            This is a current student. Their profile is visible only to the
            MakoZim family with guardian consent, and is never listed in the
            public directory. Economic and aid information is staff-only and is
            never shown here.
          </p>
        </div>
      )}

      <section className="mt-7 rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 sm:p-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-secondary">
          About
        </h2>
        <p className="mt-2 leading-relaxed text-text/80">{member.bio}</p>
      </section>

      <section className="mt-6 rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 sm:p-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-secondary">
          Journey
        </h2>
        <div className="mt-4">
          <Timeline milestones={member.journey} />
        </div>
      </section>

      <section className="mt-6 rounded-card bg-gradient-to-br from-surface to-surface-2 p-5 shadow-soft ring-1 ring-tint/40 sm:p-6">
        {familyOnly ? (
          <p className="text-sm text-text/70">
            Direct messaging is disabled for students. Mentorship with a student
            is arranged and supervised by MakoZim staff — there are no
            unsupervised adult→minor channels.
          </p>
        ) : member.offersMentorship ? (
          <div>
            <p className="text-sm font-medium text-text">
              {member.name.split(" ")[0]} offers mentorship.
            </p>
            <p className="mt-1 text-sm text-text/70">
              In the full app, requests route through staff-auditable mentorship
              channels. Messaging is not enabled in this synthetic demo.
            </p>
            <button
              type="button"
              disabled
              className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-pill bg-primary/40 px-5 py-2.5 text-sm font-bold text-text/60"
            >
              🤝 Request mentorship
              <span className="rounded-pill bg-bg/40 px-2 py-0.5 text-xs">
                Phase 2
              </span>
            </button>
          </div>
        ) : (
          <p className="text-sm text-text/70">
            This member isn&apos;t currently offering mentorship.
          </p>
        )}
      </section>
    </article>
  );
}
