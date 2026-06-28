"use client";

/**
 * Share to WhatsApp — the "reach layer" students and alumni already live in
 * (§2A.3 / §3.5). Builds a wa.me link at click time from the current URL, so it
 * always points at the page being viewed without needing the origin at build.
 */
export default function ShareButton({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const share = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${title} — via MaKonnect`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <button
      type="button"
      onClick={share}
      className={`inline-flex items-center gap-1.5 rounded-pill border border-tint/60 bg-surface px-3.5 py-1.5 text-sm font-semibold text-secondary shadow-soft transition-colors hover:bg-tint/30 ${className}`}
    >
      <span aria-hidden>💬</span> Share on WhatsApp
    </button>
  );
}
