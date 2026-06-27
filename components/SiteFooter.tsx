export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-tint/60">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-text/60">
        <p className="font-medium text-text/80">
          MaKonnect — built by Makomborero alumni, for the Makomborero family.
        </p>
        <p className="mt-1">
          Mentorship-first. Boring tech, careful with kids and money, open by
          default.
        </p>
        <p className="mt-3 text-xs">
          This demo runs on synthetic (fake) data. No real student or alumni
          data is present. Safeguarding rules — no donor→student messaging, no
          unsupervised adult→minor contact, minors&apos; profiles family-only —
          are enforced by design.
        </p>
      </div>
    </footer>
  );
}
