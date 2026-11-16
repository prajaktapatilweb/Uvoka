import Link from "next/link";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { CaseStudy } from "@/sanity/types";
import { Badge } from "@/components/common/Badge";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  variant?: "featured" | "standard";
  className?: string;
}

export function CaseStudyCard({
  caseStudy,
  variant = "standard",
  className = "",
}: CaseStudyCardProps) {
  if (variant === "featured") {
    return (
      <article
        className={`group relative card-premium p-8 sm:p-10 bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between ${className}`}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold" size="sm" className="gap-1 font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Flagship Case Study
            </Badge>
            <Badge variant="primary" size="sm">
              {caseStudy.industry}
            </Badge>
            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {caseStudy.client}
            </span>
          </div>

          <Link href={`/case-studies/${caseStudy.slug.current}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
              {caseStudy.title}
            </h2>
          </Link>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {caseStudy.summary}
          </p>

          {/* Key Metrics Strip */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--color-border)]">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)]">
                  <span className="block font-heading font-extrabold text-2xl text-[var(--color-primary)]">
                    {m.value}
                  </span>
                  <span className="block text-xs font-semibold text-[var(--color-charcoal)] mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-8 mt-8 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Service: {caseStudy.service}
          </span>

          <Link
            href={`/case-studies/${caseStudy.slug.current}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] group-hover:translate-x-1 transition-all"
          >
            <span>Read Case Study Breakdown</span>
            <ArrowRight className="w-4 h-4 text-[var(--color-gold)]" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative card-premium p-6 sm:p-8 bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="primary" size="sm">
            {caseStudy.industry}
          </Badge>
          <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {caseStudy.client}
          </span>
        </div>

        <Link href={`/case-studies/${caseStudy.slug.current}`}>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
            {caseStudy.title}
          </h3>
        </Link>

        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
          {caseStudy.summary}
        </p>

        {/* Primary Metric Preview */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 pt-3">
            {caseStudy.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[var(--color-ivory)]/40 border border-[var(--color-border)]">
                <span className="block font-heading font-bold text-lg text-[var(--color-primary)]">
                  {m.value}
                </span>
                <span className="block text-[11px] text-[var(--color-text-muted)] truncate">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 mt-6 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
        <span className="text-[var(--color-text-muted)] truncate max-w-[150px]">
          {caseStudy.service}
        </span>

        <Link
          href={`/case-studies/${caseStudy.slug.current}`}
          className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)] group-hover:translate-x-0.5 transition-all"
        >
          <span>Deep-Dive</span>
          <ArrowRight className="w-3.5 h-3.5 text-[var(--color-gold)]" />
        </Link>
      </div>
    </article>
  );
}
