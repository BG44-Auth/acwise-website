import type { Metadata } from "next";
import Link from "next/link";
import { articles, categories } from "@/content/articles";

export const metadata: Metadata = {
  title: "Learn - AC Buyer's Guides & FAQs | AC Wise",
  description:
    "Guides, tips, and straight talk about air conditioning in Australia.",
};

function countFor(category: (typeof categories)[number]) {
  if (category === "All") return articles.length;
  return articles.filter((article) => article.category === category).length;
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: rawCategory } = await searchParams;
  const activeCategory =
    rawCategory && categories.includes(rawCategory as (typeof categories)[number])
      ? (rawCategory as (typeof categories)[number])
      : "All";

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="flex flex-1 flex-col bg-black">
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            Resources
          </p>
          <h1 className="font-heading mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Air Conditioning Guides &amp; Resources
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Guides, tips, and straight talk about air conditioning in
            Australia.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            const href =
              category === "All" ? "/learn" : `/learn?category=${encodeURIComponent(category)}`;
            return (
              <Link
                key={category}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand text-brand-ink"
                    : "border border-border/50 bg-card text-muted-foreground hover:border-brand/30 hover:text-foreground"
                }`}
              >
                {category}
                <span className={isActive ? "opacity-70" : "text-muted-foreground"}>
                  {" "}
                  {countFor(category)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="glow-border group flex flex-col overflow-hidden rounded-xl bg-card p-8 transition-all hover:border-brand/30"
            >
              <p className="text-xs font-semibold tracking-widest text-brand uppercase">
                {article.category}
              </p>
              <h2 className="font-heading mt-4 text-lg font-semibold text-white">
                {article.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm">
                {article.readTime ? (
                  <span className="text-muted-foreground">{article.readTime}</span>
                ) : (
                  <span />
                )}
                <span className="font-semibold text-brand">Read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            Help Centre
          </p>
          <h2 className="font-heading mt-4 text-2xl font-bold text-white sm:text-3xl">
            Looking for FAQs?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Quick answers to the most common questions from customers and
            professionals.
          </p>
          <Link
            href="/faqs"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
          >
            Visit the FAQs
          </Link>
        </div>
      </section>
    </div>
  );
}
