"use client";

import { motion } from "framer-motion";
import { STATISTICS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STAT_ACCENTS = [
  "text-primary",
  "text-primary-dark",
  "text-primary-muted",
  "text-gold",
];

/*
  One static wave edge (it does not move). x=100 is where the number circle sits.
  The bottom of the wave sits further LEFT than the top.
  For more curve, push the control-point x values further apart
  (88 / 132 / 80 / 112); for less curve, bring them closer to 100.
*/
const WAVE = "M 116 0 C 88 14, 132 36, 106 50 C 80 64, 112 86, 84 100 L 200 100 L 200 0 Z";

export function ResultsCounter() {
  const reduced = useReducedMotion();

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
          title="Results That Speak for Themselves"
          italicPhrase="Speak for Themselves"
          subtitle="Every narrative sprint, ghostwritten piece, and outbound interaction is engineered for verifiable reach, engagement quality, and pipeline velocity."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {STATISTICS.map((stat, idx) => (
            <AnimatedCard
              key={stat.id}
              delay={idx * 0.1}
              enableTilt={true}
              className="flex min-h-44 overflow-hidden p-0 text-left sm:min-h-48"
            >
              {/* text */}
              <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center py-6 pl-6 pr-20 sm:py-7 sm:pl-8 sm:pr-20">
                <h4 className="font-heading text-base font-bold text-charcoal sm:text-lg">
                  {stat.label}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {stat.description}
                </p>
              </div>

              {/* wavy panel + number */}
              <div
                className={`relative w-28 shrink-0 sm:w-40 ${STAT_ACCENTS[idx % STAT_ACCENTS.length]}`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  className="absolute -left-full top-0 h-full w-[200%] overflow-visible"
                >
                  <path d={WAVE} fill="currentColor" />
                </svg>

                {/* round number badge */}
                <motion.div
                  initial={{ opacity: 0, scale: reduced ? 1 : 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 14,
                    delay: 0.2 + idx * 0.1,
                  }}
                  className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* gentle float */}
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                    className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32"
                  >
                    {/* soft glow that breathes (filled, not a ring) */}
                    {!reduced && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-current"
                        animate={{ scale: [1, 1.25], opacity: [0.22, 0] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: idx * 0.3 }}
                      />
                    )}

                    {/* the round badge: glossy, with a soft coloured glow shadow */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-br from-white via-white to-[var(--color-ivory)] shadow-[0_14px_38px_-8px_currentColor,0_6px_16px_rgba(39,35,42,0.16),inset_0_2px_5px_rgba(255,255,255,1),inset_0_-8px_16px_rgba(39,35,42,0.07)] ring-1 ring-white"
                    >
                      {/* gloss highlight on the top-left */}
                      <span className="absolute left-[12%] top-[6%] h-[38%] w-[62%] rounded-full bg-gradient-to-b from-white to-transparent opacity-90" />
                      {/* light sweep that glides across now and then */}
                      {/* {!reduced && (
                        <motion.span
                          className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                          animate={{ x: ["0%", "480%"] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            repeatDelay: 3.2,
                            ease: "easeInOut",
                            delay: 1 + idx * 0.5,
                          }}
                        />
                      )} */}
                    </span>

                    {/* the number */}
                    <span className="relative px-2 text-center">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2.2}
                        className="font-heading text-3xl font-extrabold leading-none text-primary-dark sm:text-4xl"
                      />
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Client Transparency Note */}
        <div className="mt-10 text-center">
          {/* <p className="text-xs text-[var(--color-text-muted)] font-mono">
            * Aggregated performance metrics across active founder, executive & creator sprints.
          </p> */}
        </div>
      </Container>
    </section>
  );
}