import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { BlogGrid } from "@/components/blogs/BlogGrid";
import { getBlogPosts } from "@/lib/sanity-fetch";

export const metadata: Metadata = {
  title: "Insights & Thought Leadership | UVOKA Editorial",
  description:
    "Executive strategies, data teardowns, and actionable LinkedIn growth frameworks authored by UVOKA brand architects.",
  alternates: { canonical: "https://www.uvoka.in/blogs" },
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col w-full pb-24">
      {/* ── Page Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            UVOKA Editorial Desk
          </Badge>

          <h1 className="text-balance font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight">
            Strategic Insights on{" "}
            <span className="gradient-text font-extrabold">Executive Conviction</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            Tactical frameworks, content breakdowns, and algorithms teardowns designed to help founders and B2B leadership convert organic LinkedIn presence into commercial momentum.
          </p>
        </Container>
      </section>

      {/* ── Blog Grid & Filtering ── */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          <BlogGrid initialPosts={posts} />
        </Container>
      </section>
    </div>
  );
}
