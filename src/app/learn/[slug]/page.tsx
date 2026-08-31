import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: "AC Wise" };
  return {
    title: `${article.title} | AC Wise`,
    description: article.excerpt,
  };
}

function Paragraph({ text }: { text: string }) {
  return <p className="text-base leading-7 text-muted-foreground">{text}</p>;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-black">
      <article className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Learn
          </Link>

          <p className="mt-8 text-xs font-semibold tracking-widest text-brand uppercase">
            {article.category}
          </p>
          <h1 className="font-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {article.title}
          </h1>
          {article.readTime && (
            <p className="mt-3 text-sm text-muted-foreground">{article.readTime}</p>
          )}

          <div className="mt-10 space-y-6 text-base leading-relaxed">
            {article.body.map((paragraph, index) => (
              <Paragraph key={index} text={paragraph} />
            ))}
          </div>

          <div className="mt-16 border-t border-border/30 pt-8">
            <h2 className="font-heading text-sm font-semibold text-white">References</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {article.references.map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
