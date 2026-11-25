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
  One static wave along the BOTTOM of the coloured header (it does not move).
  The round number badge sits on the middle of this wave (x = 200).
  For more curve, push the control-point y values further apart (128 / 68 / 64).
*/
const WAVE = "M 0 0 H 400 V 92 C 340 128, 270 128, 200 98 C 130 68, 60 64, 0 100 Z";

export function ResultsCounter1() {
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
          eyebrow="Proven Results"
          title="Results That Speak for Themselves"
          italicPhrase="Speak for Themselves"
          subtitle="Our proven methodology turns LinkedIn profiles into lead magnets all organically without spending $$$ on ads."
        />

        {/* 1 column on phones/tablets, 3 across on desktop */}
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {STATISTICS.map((stat, idx) => (
            <AnimatedCard
              key={stat.id}
              delay={idx * 0.1}
              enableTilt={true}
              className="flex flex-col overflow-hidden p-0 text-center"
            >
              {/* ===== coloured header with a wavy bottom edge ===== */}
              <div
                className={`relative h-44 shrink-0 ${STAT_ACCENTS[idx % STAT_ACCENTS.length]}`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 140"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient id={`sheen-${idx}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                      <stop offset="60%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={WAVE} fill="currentColor" />
                  {/* soft light sheen across the header */}
                  <path d={WAVE} fill={`url(#sheen-${idx})`} />
                </svg>


                {/* round number badge, sitting on the wave */}
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
                  className="absolute left-1/2 top-[70%] z-10 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* gentle float */}
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                    className="relative flex h-32 w-32 items-center justify-center"
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
                      className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-br from-white via-white to-[var(--color-ivory)] shadow-[0_14px_38px_-8px_currentColor,0_6px_16px_rgba(39,35,42,0.16),inset_0_2px_5px_rgba(255,255,255,1),inset_0_-8px_16px_rgba(39,35,42,0.07)] ring-4 ring-white"
                    >
                      {/* gloss highlight on the top-left */}
                      <span className="absolute left-[12%] top-[6%] h-[38%] w-[62%] rounded-full bg-gradient-to-b from-white to-transparent opacity-90" />
                    </span>

                    {/* the number */}
                    <span className="relative px-2 text-center">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2.2}
                        className="font-heading text-4xl font-extrabold leading-none text-primary-dark"
                      />
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              {/* ===== text ===== */}
              <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-14 sm:px-8">
                <h4 className="font-heading text-lg font-bold text-charcoal sm:text-xl">
                  {stat.label}
                </h4>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
                  {stat.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}