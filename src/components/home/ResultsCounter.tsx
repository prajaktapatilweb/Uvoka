import { STATISTICS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const STAT_ACCENTS = [
  "text-primary",
  "text-primary-dark",
  "text-primary-muted",
  "text-gold",
];

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {STATISTICS.map((stat, idx) => (
            <AnimatedCard
              key={stat.id}
              delay={idx * 0.1}
              enableTilt={true}
              className="flex min-h-40 overflow-hidden p-0 text-left"
            >
              <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center py-6 pl-6 pr-10 sm:py-7 sm:pl-8 sm:pr-12">
                <h3 className="font-heading text-base font-bold text-charcoal sm:text-lg">
                  {stat.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {stat.description}
                </p>
              </div>

              <div className="relative my-0 mr-0 w-24 shrink-0 sm:w-32">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  className={`absolute -left-full top-0 h-full w-[200%] overflow-visible ${STAT_ACCENTS[idx % STAT_ACCENTS.length]}`}
                >
                  <path
                    d="M 166 0 C 158 12, 148 17, 137 20 C 122 24, 126 36, 111 42 C 100 47, 88 47, 78 54 C 66 62, 77 70, 84 78 C 92 87, 78 95, 70 100 L 200 100 L 200 0 Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="absolute left-0 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white px-1 text-center text-primary shadow-[0_3px_10px_rgba(39,35,42,0.18)] sm:h-24 sm:w-24">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.2}
                    className="font-heading text-xl font-extrabold leading-none sm:text-2xl"
                  />
                </div>
              </div>

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
