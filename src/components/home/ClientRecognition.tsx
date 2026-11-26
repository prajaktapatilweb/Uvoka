import { Award, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CLIENT_ACHIEVEMENTS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export function ClientRecognition() {
  return (
    <section className="section-padding-lg bg-[var(--color-ivory)]/50 border-t border-[var(--color-border)] relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Credibility & Milestones"
            title="Recognized Results for Visionary Leaders"
            italicPhrase="Visionary Leaders"
            subtitle="We do not rely on vanity marketing claims. We build verified category leadership, high creator rankings, and measurable inbound commercial pipeline."
            align="left"
            className="mb-0 max-w-2xl"
          />
{/* 
          <Button
            href="/case-studies"
            variant="outline"
            size="md"
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="self-start md:self-end"
          >
            View All Case Studies
          </Button> */}
        </div>

        {/* 3 Interactive Achievement Cards with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {CLIENT_ACHIEVEMENTS.map((item, idx) => (
            <AnimatedCard
              key={item.id}
              delay={idx * 0.12}
              enableTilt={true}
              className="p-8 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-5">
                {/* Card Top: Category & Creator Rank Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-4">
                  <span className="eyebrow text-[11px] text-[var(--color-primary)]">
                    {item.category}
                  </span>
                  <Badge variant="gold" size="sm" className="font-semibold gap-1">
                    <Award className="w-3 h-3" />
                    {item.creatorRank}
                  </Badge>
                </div>

                {/* Client Profile Identity */}
                <div>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
                    {item.clientTitle}
                  </h3>
                  <p className="text-xs font-mono text-[var(--color-text-muted)] mt-1">
                    Industry: {item.industry}
                  </p>
                </div>

                {/* Primary Metric Callout */}
                <div className="p-4 rounded-xl bg-[var(--color-ivory)]/70 border border-[var(--color-border)]">
                  <div className="font-heading font-black text-3xl md:text-4xl text-[var(--color-primary)]">
                    {item.metric}
                  </div>
                  <div className="text-xs font-medium text-[var(--color-text-secondary)] mt-0.5">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Highlight summary */}
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <span>{item.highlight}</span>
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--color-text-muted)]">
                  Verified Outcome
                </span>
                <span className="font-semibold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Breakdown →
                </span>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
