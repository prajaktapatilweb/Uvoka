"use client";

import { motion } from "framer-motion";
import { STATISTICS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
              className="group flex flex-col items-center justify-between rounded-3xl border border-[var(--color-border)]/80 bg-white p-8 text-center shadow-[0_10px_30px_rgba(82,33,102,0.04)] transition-all duration-300 hover:border-gold/50 hover:shadow-[0_20px_45px_rgba(82,33,102,0.10)] sm:p-10"
            >
              {/* ===== Centered Round Badge with Animated Gold Ring ===== */}
              <div className="relative flex items-center justify-center pt-2 pb-4">
                {/* Ambient soft glow behind badge on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute h-36 w-36 rounded-full bg-gold/15 blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                />

                {/* Badge Container */}
                <motion.div
                  initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 14,
                    delay: 0.15 + idx * 0.1,
                  }}
                  className="relative flex h-36 w-36 items-center justify-center"
                >
                  {/* Circular Gold Progress Ring (Animated Fill) */}
                  <svg
                    aria-hidden="true"
                    className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] -rotate-90 pointer-events-none"
                    viewBox="0 0 120 120"
                  >
                    <defs>
                      <linearGradient id={`goldGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-gold, #D2B98B)" />
                        <stop offset="60%" stopColor="#E2CA9E" />
                        <stop offset="100%" stopColor="var(--color-gold, #D2B98B)" />
                      </linearGradient>
                      <filter id={`goldGlow-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D2B98B" floodOpacity="0.45" />
                      </filter>
                    </defs>

                    {/* Background Ring Track */}
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--color-border, #E5E0EA)"
                      strokeWidth="3.5"
                      strokeOpacity="0.6"
                    />

                    {/* Animated Gold Fill Ring */}
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={`url(#goldGrad-${idx})`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter={`url(#goldGlow-${idx})`}
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: reduced ? 0 : 2.2,
                        delay: 0.2 + idx * 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </svg>

                  {/* Inner Round Badge with subtle gloss and depth */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-1.5 overflow-hidden rounded-full bg-gradient-to-br from-white via-white to-[var(--color-ivory)] shadow-[0_10px_25px_rgba(39,35,42,0.10),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(39,35,42,0.05)] ring-2 ring-white"
                  >
                    {/* Gloss specular highlight on top */}
                    <span className="absolute left-[15%] top-[8%] h-[35%] w-[60%] rounded-full bg-gradient-to-b from-white to-transparent opacity-90" />
                  </span>

                  {/* The Counter Number */}
                  <span className="relative z-10 px-2 text-center">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2.2}
                      className="font-heading text-4xl font-extrabold leading-none text-primary-dark"
                    />
                  </span>
                </motion.div>
              </div>

              {/* ===== Text Section ===== */}
              <div className="flex flex-1 flex-col items-center pt-2">
                <h4 className="font-heading text-lg font-bold text-charcoal sm:text-xl">
                  {stat.label}
                </h4>
                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-text-secondary">
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
