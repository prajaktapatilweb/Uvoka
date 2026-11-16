import Link from "next/link";
import { Clock, ArrowRight, Calendar, User, Sparkles } from "lucide-react";
import { BlogPost } from "@/sanity/types";
import { Badge } from "@/components/common/Badge";

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "standard" | "compact";
  className?: string;
}

export function BlogCard({ post, variant = "standard", className = "" }: BlogCardProps) {
  const primaryCategory = post.categories?.[0]?.title || "Executive Strategy";
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (variant === "featured") {
    return (
      <article
        className={`group relative card-premium p-8 sm:p-10 bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between ${className}`}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold" size="sm" className="gap-1 font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Featured Essay
            </Badge>
            <Badge variant="ivory" size="sm">
              {primaryCategory}
            </Badge>
          </div>

          <Link href={`/blogs/${post.slug.current}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
              {post.title}
            </h2>
          </Link>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="pt-8 mt-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-[var(--color-text-muted)]">
            {post.author && (
              <span className="flex items-center gap-1.5 font-medium text-[var(--color-charcoal)]">
                <User className="w-4 h-4 text-[var(--color-primary)]" />
                {post.author.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime || 5} min read
            </span>
          </div>

          <Link
            href={`/blogs/${post.slug.current}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] group-hover:translate-x-1 transition-all"
          >
            <span>Read Complete Essay</span>
            <ArrowRight className="w-4 h-4 text-[var(--color-gold)]" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative card-premium p-6 sm:p-7 bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="primary" size="sm">
            {primaryCategory}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <Clock className="w-3 h-3" />
            {post.readingTime || 5} min
          </span>
        </div>

        <Link href={`/blogs/${post.slug.current}`}>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>

      <div className="pt-6 mt-6 border-t border-[var(--color-border)] flex items-center justify-between gap-3 text-xs">
        <span className="text-[var(--color-text-muted)] flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formattedDate}
        </span>

        <Link
          href={`/blogs/${post.slug.current}`}
          className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)] group-hover:translate-x-0.5 transition-all"
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5 text-[var(--color-gold)]" />
        </Link>
      </div>
    </article>
  );
}
