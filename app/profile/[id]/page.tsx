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

  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/directory" className="text-sm text-secondary hover:underline">
        ← Back to directory
      </Link>

      <header className="mt-4">
        <h1 className="text-2xl font-bold text-text">{member.name}</h1>
        <p className="mt-1 text-text/70">{member.headline}</p>
        <p className="mt-1 text-sm text-text/60">
          Cohort {member.cohort} · {member.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.fields.map((f) => (
            <span
              key={f}
              className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-secondary"
            >
              {f}
            </span>
          ))}
        </div>
      </header>

      {familyOnly && (
        <div className="mt-6 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm text-secondary">
          <p className="font-semibold">Family-only profile</p>
          <p className="mt-1 text-text/75">
            This is a current student. Their profile is visible only to the
            MakoZim family with guardian consent, and is never listed in the
            public directory. Economic and aid information is staff-only and is
            never shown here.
          </p>
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
          About
        </h2>
        <p className="mt-2 text-text/80">{member.bio}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
          Journey
        </h2>
        <div className="mt-3">
          <Timeline milestones={member.journey} />
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-tint/60 bg-white/40 p-4">
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
              className="mt-3 cursor-not-allowed rounded-lg bg-primary/40 px-4 py-2 text-sm font-semibold text-text/60"
            >
              Request mentorship (coming in Phase 2)
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
