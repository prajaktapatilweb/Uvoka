import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, Clock, Calendar, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export function BlogsPreview() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((p) => p.id !== featuredPost.id);

  return (
    <section id="blogs-section" className="section-padding-lg bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)] relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Thought Leadership & Insights"
            title="Executive Perspectives on Authority & Pipeline"
            italicPhrase="Executive Perspectives"
            subtitle="Deep-dive essays and strategic teardowns on the creator economy, algorithmic distribution, and founder-led sales."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <Button
            href="/blogs"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-end"
          >
            Explore All Articles
          </Button>
        </div>

        {/* 2-Column Grid: Featured Article (Left 7 cols) & Regular Articles (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Post Card (7 cols) */}
          <div className="lg:col-span-7 card-premium bg-white p-8 sm:p-10 flex flex-col justify-between group hover:border-[var(--color-primary)]/40 transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <Badge variant="gold" size="sm" className="font-semibold uppercase tracking-wider">
                  Featured Insight
                </Badge>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readingTime}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="eyebrow text-[11px] text-[var(--color-primary)]">
                  {featuredPost.category}
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                  {featuredPost.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                Author: UVOKA Editorial Board
              </span>
              <Link
                href={`/blogs/${featuredPost.slug}` as Route}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)]"
              >
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Regular Posts List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {regularPosts.map((post) => (
              <div
                key={post.id}
                className="card-premium bg-white p-6 flex flex-col justify-between flex-1 group hover:border-[var(--color-primary)]/40 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                    <span className="text-[var(--color-primary)] font-semibold font-body">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base sm:text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {post.title}
                  </h4>

                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                    {post.date}
                  </span>
                  <Link
                    href={`/blogs/${post.slug}` as Route}
                    className="font-semibold text-[var(--color-primary)] inline-flex items-center gap-1"
                  >
                    <span>Read →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
