import type { Metadata } from "next";
import CampaignCard from "@/components/CampaignCard";
import { getCampaigns } from "@/lib/data";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Alumni-directed, time-bound giving campaigns for the Makomborero family.",
};

export default function CampaignsPage() {
  const campaigns = getCampaigns();

  return (
    <div>
      <header className="animate-fade-up mb-6">
        <span className="inline-flex items-center gap-2 rounded-pill bg-gold/15 px-3 py-1 text-sm font-bold text-gold">
          💛 Alumni-directed giving
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-text">
          Campaigns
        </h1>
        <p className="mt-1.5 max-w-2xl text-text/70">
          Time-bound, transparent campaigns run by alumni for the family —
          replacing the scattered WhatsApp giving pipeline. Every gift goes to an{" "}
          <span className="font-semibold text-secondary">aggregate cohort</span>,
          never a named student.
        </p>
      </header>

      {/* Demo disclaimer — money never moves inside MaKonnect (§3.12). */}
      <div className="mb-6 rounded-card border border-gold/40 bg-gold/10 p-4 text-sm shadow-soft">
        <p className="font-bold text-secondary">
          🔒 Demo — no real money moves here
        </p>
        <p className="mt-1 text-text/75">
          A preview on synthetic data. &ldquo;Give&rdquo; opens a known processor
          (Paynow / EcoCash) whose name is on the receipt — not
          &ldquo;MaKonnect.&rdquo; In-app payment capture is gated on a
          registered legal entity, a named reconciler and a regulatory check, and
          isn&apos;t built yet.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c, i) => (
          <CampaignCard key={c.slug} campaign={c} index={i} />
        ))}
      </div>
    </div>
  );
}
