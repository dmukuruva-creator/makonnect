import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ShareButton from "@/components/ShareButton";
import { usd } from "@/components/CampaignCard";
import { getAllCampaignSlugs, getCampaign } from "@/lib/data";

// Pre-render every campaign at build time (synthetic data only).
export function generateStaticParams() {
  return getAllCampaignSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return { title: "Campaign not found" };
  return { title: campaign.title, description: campaign.summary };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();

  const pct =
    c.goalUsd > 0 ? Math.min(100, Math.round((c.raisedUsd / c.goalUsd) * 100)) : 0;
  const deadline = new Date(c.deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="animate-fade-up mx-auto max-w-2xl">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1.5 text-sm font-semibold text-secondary shadow-soft ring-1 ring-tint/40 transition-colors hover:bg-tint/30"
      >
        ← All campaigns
      </Link>

      <header className="mt-5">
        <span className="inline-flex items-center gap-2 rounded-pill bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
          💛 {c.status === "funded" ? "Funded campaign" : "Alumni-directed giving"}
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-text">
          {c.title}
        </h1>
        <p className="mt-1.5 text-sm font-medium text-text/55">
          Organised by {c.organiser} · for {c.beneficiaryCohort}
        </p>
      </header>

      {/* Progress + key numbers. */}
      <section className="mt-6 rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 sm:p-6">
        <ProgressBar value={c.raisedUsd} max={c.goalUsd} />
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-display text-xl font-black text-secondary">
              {usd(c.raisedUsd)}
            </p>
            <p className="text-xs text-text/55">of {usd(c.goalUsd)} ({pct}%)</p>
          </div>
          <div>
            <p className="font-display text-xl font-black text-secondary">
              {c.contributors}
            </p>
            <p className="text-xs text-text/55">contributors</p>
          </div>
          <div>
            <p className="font-display text-xl font-black text-secondary">
              {c.status === "funded" ? "Met" : deadline}
            </p>
            <p className="text-xs text-text/55">
              {c.status === "funded" ? "target reached" : "deadline"}
            </p>
          </div>
        </div>

        {/* Give = LINK-OUT to a named processor. No money moves in MaKonnect. */}
        <a
          href={c.processorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-gold px-6 py-3.5 font-bold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
        >
          Give via {c.processor}
          <span aria-hidden>↗</span>
        </a>
        <p className="mt-2 text-center text-xs text-text/55">
          Opens {c.processor} — the receipt comes from {c.processor}, not
          MaKonnect. No card details touch our system.
        </p>
        <div className="mt-4 flex justify-center border-t border-tint/40 pt-4">
          <ShareButton title={`Back this campaign: ${c.title}`} />
        </div>
      </section>

      <section className="mt-6 rounded-card bg-surface p-5 shadow-soft ring-1 ring-tint/40 sm:p-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-secondary">
          About this campaign
        </h2>
        <div className="mt-2 space-y-3 leading-relaxed text-text/80">
          {c.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-card border border-tint/60 bg-bg/50 p-5 text-sm sm:p-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-secondary">
          If the target isn&apos;t met
        </h2>
        <p className="mt-2 leading-relaxed text-text/75">{c.missTargetNote}</p>
      </section>

      <p className="mt-6 rounded-card border border-gold/40 bg-gold/10 p-4 text-xs leading-relaxed text-text/70">
        🔒 <span className="font-bold text-secondary">Demo:</span> synthetic data,
        no real money. In-app payment capture is gated on a registered legal
        entity, a named reconciler and a regulatory check — see the team&apos;s
        approvals list.
      </p>
    </article>
  );
}
