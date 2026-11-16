import { Download, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { RESOURCES } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export function Resources() {
  return (
    <section id="resources-section" className="section-padding-lg bg-[var(--color-white)] border-t border-[var(--color-border)] relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Founder Toolkits"
            title="Actionable Blueprints & Frameworks"
            italicPhrase="Blueprints & Frameworks"
            subtitle="Proprietary guides, hook vaults, and profile optimization audits developed by our editorial directors for high-growth leaders."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <Button
            href="/resources"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-end"
          >
            Access All Toolkits
          </Button>
        </div>

        {/* 3 Downloadable Resource Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {RESOURCES.map((res, idx) => (
            <AnimatedCard
              key={res.id}
              delay={idx * 0.12}
              enableTilt={true}
              className="p-8 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                  <Badge variant="ivory" size="sm" className="font-semibold">
                    {res.category}
                  </Badge>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    {res.type}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {res.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{res.downloadCount}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--color-border)]">
                <Button
                  href="/resources"
                  variant="secondary"
                  size="sm"
                  icon={<Download className="w-3.5 h-3.5" />}
                  className="w-full justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors"
                >
                  Download Free Toolkit
                </Button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
