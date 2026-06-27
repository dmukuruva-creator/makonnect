import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <article className="mx-auto max-w-2xl">
      <Link href="/resources" className="text-sm text-secondary hover:underline">
        ← Back to resources
      </Link>

      <header className="mt-4">
        <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
          {resource.category}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-text">{resource.title}</h1>
        <p className="mt-1 text-sm text-text/60">
          {resource.author} · {resource.readMinutes} min read
        </p>
      </header>

      <div className="mt-6 space-y-4 text-text/85 leading-relaxed">
        {resource.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
