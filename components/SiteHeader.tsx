import Link from "next/link";

const NAV = [
  { href: "/directory", label: "Directory" },
  { href: "/resources", label: "Resources" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-tint/60 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden
            className="inline-block h-6 w-6 rounded-full bg-primary"
          />
          <span className="text-lg tracking-tight text-text">MaKonnect</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-text/80 transition-colors hover:bg-tint/40 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
