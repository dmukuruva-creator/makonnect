"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/directory", label: "Directory" },
  { href: "/resources", label: "Resources" },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Close the mobile menu when a link is tapped (the only way it stays open
  // across a navigation). Resetting in an effect on `pathname` would trigger a
  // cascading render — closing on click is the idiomatic React pattern.
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-tint/50 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display font-extrabold"
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-base text-text shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
          >
            M
          </span>
          <span className="text-lg tracking-tight text-text">
            Ma<span className="text-secondary">Konnect</span>
          </span>
        </Link>

        {/* Desktop nav — pill group with sliding active state. */}
        <nav className="hidden items-center gap-1 rounded-pill bg-surface/70 p-1 shadow-soft ring-1 ring-tint/40 sm:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-pill px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-primary text-text shadow-sm"
                    : "text-text/70 hover:bg-tint/40 hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:block">
          <Link
            href="/directory"
            className="rounded-pill bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Find an alum
          </Link>
        </div>

        {/* Mobile toggle. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="grid h-10 w-10 place-items-center rounded-2xl bg-surface/70 text-text shadow-soft ring-1 ring-tint/40 transition-colors hover:bg-tint/40 sm:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu — slides/fades open. */}
      <div
        className={`overflow-hidden border-t border-tint/40 transition-[max-height,opacity] duration-300 ease-out sm:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-text"
                    : "text-text/80 hover:bg-tint/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/directory"
            onClick={close}
            className="mt-1 rounded-2xl bg-secondary px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Find an alum
          </Link>
        </nav>
      </div>
    </header>
  );
}
