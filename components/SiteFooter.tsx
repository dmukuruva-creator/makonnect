import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-tint/50 bg-surface/50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 font-display font-extrabold">
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-2xl bg-primary text-text shadow-soft"
              >
                M
              </span>
              <span className="text-lg text-text">
                Ma<span className="text-secondary">Konnect</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text/65">
              Built by Makomborero alumni, for the Makomborero family.
              Mentorship-first. Boring tech, careful with kids and money, open by
              default.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm font-semibold text-text/70">
            <Link href="/directory" className="transition-colors hover:text-secondary">
              Directory
            </Link>
            <Link href="/resources" className="transition-colors hover:text-secondary">
              Resources
            </Link>
          </nav>
        </div>

        <div className="mt-8 rounded-card bg-gold/10 p-4 text-xs leading-relaxed text-secondary">
          <span className="font-bold">🛡️ Safeguarding by design.</span> This demo
          runs on synthetic (fake) data — no real student or alumni data is
          present. No donor→student messaging, no unsupervised adult→minor
          contact, minors&apos; profiles family-only.
        </div>
      </div>
    </footer>
  );
}
