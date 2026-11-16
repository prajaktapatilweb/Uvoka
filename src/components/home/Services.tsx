"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Sparkles, UserCheck, Building2, Target, KeyRound, Workflow } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Icons for each service
const SERVICE_ICONS = [
  <UserCheck key="1" className="w-6 h-6 text-[var(--color-primary)]" />,
  <Building2 key="2" className="w-6 h-6 text-[var(--color-primary)]" />,
  <Target key="3" className="w-6 h-6 text-[var(--color-primary)]" />,
  <KeyRound key="4" className="w-6 h-6 text-[var(--color-primary)]" />,
  <Workflow key="5" className="w-6 h-6 text-[var(--color-primary)]" />,
];

// 5 Coordinated but unique entrance animation variants as required by spec
const CARD_VARIANTS: Variants[] = [
  // Card 1: Upward reveal
  {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Card 2: Horizontal slide-in
  {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Card 3: Scale and fade
  {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } },
  },
  // Card 4: Subtle rotational entrance
  {
    hidden: { opacity: 0, rotate: -4, y: 40 },
    visible: { opacity: 1, rotate: 0, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Card 5: Vertical scale reveal
  {
    hidden: { opacity: 0, y: 50, scaleY: 0.9 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
];

export function Services() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="services-section" className="section-padding-lg bg-[var(--color-white)] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 -left-20 w-[30rem] h-[30rem] rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-20 w-[32rem] h-[32rem] rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          eyebrow="Core Specializations"
          title="Five Distinct Strategic Service Offerings"
          italicPhrase="Strategic Service Offerings"
          subtitle="Bespoke LinkedIn architecture engineered to build authority, scale enterprise company pages, and capture high-intent executive pipelines."
        />

        {/* 5 Unique Animated Cards Layout: 3 cards on top row, 2 cards on bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const variant = CARD_VARIANTS[index % CARD_VARIANTS.length];
            const icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
            const isBottomRow = index >= 3;
            const isHovered = hoveredCardIndex === index;

            return (
              <motion.div
                key={service.id}
                variants={variant}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white/85 backdrop-blur-md p-8 sm:p-9 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(82,33,102,0.08)] hover:border-[var(--color-primary)]/40 hover:-translate-y-1.5 group ${
                  isBottomRow ? "lg:col-span-1.5 md:col-span-1" : ""
                }`}
              >
                {/* Top Metallic Gradient Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary-muted)] transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />

                {/* Continuously moving soft light glow orb */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[var(--color-gold)]/10 blur-2xl group-hover:bg-[var(--color-primary)]/15 transition-all duration-500 pointer-events-none animate-pulse-subtle"
                  aria-hidden="true"
                />

                {/* Subtle abstract geometric pattern background */}
                <div
                  className="absolute bottom-0 right-0 w-36 h-36 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Card Header: Icon & Service Number Monogram */}
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--color-primary)]/30 group-hover:bg-white shadow-xs">
                      {icon}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-gold)] px-2.5 py-1 rounded bg-[var(--color-ivory)] border border-[var(--color-border)]">
                        0{index + 1}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-3.5 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-5 border-t border-[var(--color-border)] flex items-center justify-between relative z-10">
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    Strategic Scope
                  </span>

                  <Link
                    href={`/services/${service.slug}` as Route}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group/link"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
