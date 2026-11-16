import Link from "next/link";
import { Newspaper, ArrowUpRight, Calendar, ArrowRight } from "lucide-react";
import { PRESS_ITEMS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export function PressRelease() {
  return (
    <section id="press-section" className="section-padding-lg bg-[var(--color-white)] border-t border-[var(--color-border)] relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Media Coverage"
            title="Press Announcements & News"
            italicPhrase="Press Announcements"
            subtitle="Public recognition, agency milestone announcements, and media features covering UVOKA’s growth trajectory."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <Button
            href="/press"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-end"
          >
            Visit Press Room
          </Button>
        </div>

        {/* 3 Clean Editorial Press Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PRESS_ITEMS.map((item, idx) => (
            <AnimatedCard
              key={item.id}
              delay={idx * 0.12}
              enableTilt={true}
              className="p-8 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                  <Badge variant="ivory" size="sm" className="font-semibold gap-1">
                    <Newspaper className="w-3 h-3 text-[var(--color-primary)]" />
                    {item.publication}
                  </Badge>

                  <span className="text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                  Press Release
                </span>
                <Link
                  href="/press"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)]"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
