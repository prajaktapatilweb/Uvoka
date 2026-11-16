import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { LinkedInIcon } from "@/components/common/Icons";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { BlogContent } from "@/components/blogs/BlogContent";
import { BlogCard } from "@/components/blogs/BlogCard";
import { getBlogPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/lib/sanity-fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | UVOKA",
    };
  }

  const title = post.seoTitle || `${post.title} | UVOKA`;
  const description =
    post.seoDescription || post.excerpt || "Executive LinkedIn thought leadership by UVOKA.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.uvoka.in/blogs/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://www.uvoka.in/blogs/${slug}`,
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);
  const primaryCategory = post.categories?.[0]?.title || "Executive Strategy";
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="flex flex-col w-full pb-24">
      {/* ── Article Header ── */}
      <header className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white border-b border-[var(--color-border)]">
        <Container size="narrow">
          <div className="space-y-6">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Editorial Library
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" size="sm">
                {primaryCategory}
              </Badge>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime || 5} min read
              </span>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[var(--color-charcoal)] leading-tight text-balance">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author Attribution Strip */}
            {post.author && (
              <div className="pt-4 flex items-center justify-between gap-4 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold font-heading text-sm">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-[var(--color-charcoal)]">
                      {post.author.name}
                    </span>
                    <span className="block text-xs text-[var(--color-text-muted)]">
                      {post.author.role || "UVOKA Strategic Desk"}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.uvoka.in/blogs/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-charcoal)] transition-all"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>Share</span>
                </a>
              </div>
            )}
          </div>
        </Container>
      </header>

      {/* ── Article Body Content ── */}
      <section className="py-12 md:py-16 bg-white">
        <Container size="narrow">
          <BlogContent content={post.body} />
        </Container>
      </section>

      {/* ── Author Bio Callout ── */}
      {post.author && (
        <section className="py-8 bg-white">
          <Container size="narrow">
            <div className="p-8 rounded-3xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--color-gold)]">
                  Authored By
                </span>
                <h3 className="text-xl font-heading font-bold text-[var(--color-charcoal)]">
                  {post.author.name}
                </h3>
                {post.author.bio && (
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">
                    {post.author.bio}
                  </p>
                )}
              </div>

              <Button
                href="/contact"
                variant="primary"
                size="sm"
                className="shrink-0"
              >
                Consult Author
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* ── Related Articles ── */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[var(--color-ivory)]/30 border-t border-[var(--color-border)]">
          <Container>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="eyebrow">Continue Exploring</span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-charcoal)]">
                    Related Insights & Frameworks
                  </h2>
                </div>
                <Link
                  href="/blogs"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] hover:translate-x-1 transition-all"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-gold)]" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost._id} post={rPost} variant="standard" />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
