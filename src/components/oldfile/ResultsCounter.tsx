import { STATISTICS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export function ResultsCounter() {
  return (
    <section className="section-padding-lg bg-[var(--color-white)] relative overflow-hidden">
      {/* Background radial accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[22rem] bg-[var(--color-ivory)]/80 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          eyebrow="Measurable Business Impact"
          title="Numbers That Define Executive Authority"
          italicPhrase="Executive Authority"
          subtitle="Every narrative sprint, ghostwritten piece, and outbound interaction is engineered for verifiable reach, engagement quality, and pipeline velocity."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATISTICS.map((stat, idx) => (
            <AnimatedCard
              key={stat.id}
              delay={idx * 0.1}
              enableTilt={true}
              className="p-8 flex flex-col justify-between text-center sm:text-left relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[var(--color-primary)] tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </div>
                <h3 className="font-heading font-bold text-base md:text-lg text-[var(--color-charcoal)]">
                  {stat.label}
                </h3>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Subtle top gold accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </AnimatedCard>
          ))}
        </div>

        {/* Client Transparency Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[var(--color-text-muted)] font-mono">
            * Aggregated performance metrics across active founder, executive & creator sprints.
          </p>
        </div>
      </Container>
    </section>
  );
}
