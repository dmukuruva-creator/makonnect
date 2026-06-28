import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import { getAllResourceSlugs, getResource } from "@/lib/data";

export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return { title: "Resource not found" };
  return { title: resource.title, description: resource.summary };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  return (
    <article className="animate-fade-up mx-auto max-w-2xl">
      <Link
        href="/resources"
        className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1.5 text-sm font-semibold text-secondary shadow-soft ring-1 ring-tint/40 transition-colors hover:bg-tint/30"
      >
        ← Back to resources
      </Link>

      <header className="mt-5">
        <span className="rounded-pill bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
          {resource.category}
        </span>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-text">
          {resource.title}
        </h1>
        <p className="mt-2 text-sm font-medium text-text/55">
          {resource.author} · ⏱ {resource.readMinutes} min read
        </p>
        <ShareButton title={resource.title} className="mt-4" />
      </header>

      <div className="mt-7 space-y-4 rounded-card bg-surface p-6 text-[1.05rem] leading-relaxed text-text/85 shadow-soft ring-1 ring-tint/40 sm:p-8">
        {resource.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
