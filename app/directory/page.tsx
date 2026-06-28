import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { getDirectoryMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "The Makomborero alumni & staff network — connect with peers, offer or find mentorship.",
};

export default function DirectoryPage() {
  // Only directory-visible, non-minor members reach this surface (lib/data.ts).
  const members = getDirectoryMembers();

  return (
    <div>
      <header className="animate-fade-up mb-6">
        <span className="inline-flex items-center gap-2 rounded-pill bg-primary/15 px-3 py-1 text-sm font-bold text-secondary">
          🌍 Alumni & staff
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-text">
          The alumni network
        </h1>
        <p className="mt-1.5 max-w-2xl text-text/70">
          Connect with alumni and staff, see what each is{" "}
          <span className="font-semibold text-secondary">open to</span> —
          mentoring, hiring, collaborating, reconnecting — and find someone
          who&apos;s walked your path. Students don&apos;t appear here: their
          profiles are family-only and mentorship is arranged through staff.
        </p>
      </header>
      <DirectoryClient members={members} />
    </div>
  );
}
