import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { getDirectoryMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Directory",
  description: "Search Makomborero alumni and staff who offer mentorship.",
};

export default function DirectoryPage() {
  // Only directory-visible, non-minor members reach this surface (lib/data.ts).
  const members = getDirectoryMembers();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-text">Directory</h1>
        <p className="mt-1 text-text/70">
          Find an alum who walked your path. Students don&apos;t appear here —
          their profiles are family-only and mentorship is arranged through
          staff.
        </p>
      </header>
      <DirectoryClient members={members} />
    </div>
  );
}
