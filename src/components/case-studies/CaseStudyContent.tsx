import { Quote, TrendingUp, AlertCircle, Sparkles } from "lucide-react";
import { CaseStudy } from "@/sanity/types";
import { BlogContent } from "@/components/blogs/BlogContent";
import { Badge } from "@/components/common/Badge";

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  return (
    <div className="space-y-16">
      {/* ── Key Metrics Highlights ── */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[var(--color-bg-dark)] text-white shadow-xl">
          {caseStudy.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1 border-l-2 border-[var(--color-gold)]/40 pl-4">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--color-gold)]">
                {metric.value}
              </span>
              <span className="block text-sm font-semibold text-white/90">
                {metric.label}
              </span>
              {metric.description && (
                <span className="block text-xs text-white/60">
                  {metric.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Section 1: The Strategic Challenge ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" size="sm" className="gap-1 font-bold tracking-wider uppercase">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            The Situation
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-charcoal)]">
          The Strategic Challenge
        </h2>
        <div className="card-premium p-6 sm:p-8 bg-[var(--color-ivory)]/30 border border-[var(--color-border)]">
          <BlogContent content={caseStudy.challenge} />
        </div>
      </section>

      {/* ── Section 2: UVOKA Architecture & Solution ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm" className="gap-1 font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            The Architecture
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-charcoal)]">
          The Intervention & Narrative Engineering
        </h2>
        <div className="card-premium p-6 sm:p-8 bg-white border border-[var(--color-border)]">
          <BlogContent content={caseStudy.solution} />
        </div>
      </section>

      {/* ── Section 3: Commercial & Quantifiable Results ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm" className="gap-1 font-bold tracking-wider uppercase">
            <TrendingUp className="w-3 h-3" />
            Impact Delivered
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-charcoal)]">
          Commercial Impact & Long-Term Moat
        </h2>
        <div className="card-premium p-6 sm:p-8 bg-white border border-[var(--color-border)]">
          <BlogContent content={caseStudy.results} />
        </div>
      </section>

      {/* ── Testimonial Callout ── */}
      {caseStudy.testimonialQuote && (
        <div className="card-premium p-8 sm:p-10 bg-gradient-to-br from-[var(--color-ivory)]/60 via-white to-white border border-[var(--color-border)] relative overflow-hidden">
          <Quote className="w-12 h-12 text-[var(--color-gold)]/40 absolute top-6 right-6 pointer-events-none" />
          <blockquote className="space-y-4">
            <p className="font-serif italic text-lg sm:text-xl text-[var(--color-charcoal)] leading-relaxed">
              &ldquo;{caseStudy.testimonialQuote}&rdquo;
            </p>
            {caseStudy.testimonialAuthor && (
              <footer className="text-sm font-heading font-bold text-[var(--color-primary)]">
                — {caseStudy.testimonialAuthor}
              </footer>
            )}
          </blockquote>
        </div>
      )}
    </div>
  );
}
