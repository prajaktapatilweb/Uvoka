"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CheckCircle2, Sparkles, Compass } from "lucide-react";
import { JOURNEY_STAGES } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// Normalized progress milestones along the path (0 to 1)
const MILESTONE_POSITIONS = [0.03, 0.22, 0.42, 0.62, 0.81, 0.97];

// Exact SVG coordinates for the 6 nodes on wave:
// M 60,110 C 260,30 380,190 580,110 C 780,30 900,190 1140,110
const NODE_COORDINATES = [
  { x: 60, y: 110 },
  { x: 260, y: 55 },
  { x: 470, y: 165 },
  { x: 690, y: 55 },
  { x: 900, y: 165 },
  { x: 1140, y: 110 },
];

export function JourneyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const logoNodeRef = useRef<SVGGElement>(null);
  const reduced = useReducedMotion();

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useLayoutEffect(() => {
    if (reduced || !containerRef.current || !stickyRef.current) return;

    // Only create pinned scroll sequence on desktop/tablet (>=768px)
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const progressPath = progressPathRef.current;
      const logoNode = logoNodeRef.current;

      if (!path || !progressPath || !logoNode) return;

      const pathLength = path.getTotalLength();
      gsap.set(progressPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Master Pinned Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);

            // Determine active milestone index based on scroll position
            let activeIdx = 0;
            for (let i = 0; i < MILESTONE_POSITIONS.length; i++) {
              if (p >= MILESTONE_POSITIONS[i] - 0.08) {
                activeIdx = i;
              }
            }
            setActiveStageIndex(activeIdx);
          },
        },
      });

      // 1. Draw the golden progress wave line matching scroll
      tl.to(
        progressPath,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0
      );

      // 2. Animate traveling golden seal logo along the wave path
      tl.to(
        logoNode,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  const activeStage = JOURNEY_STAGES[activeStageIndex];

  return (
    <section
      id="how-we-work"
      className="bg-gradient-to-b from-[var(--color-white)] via-[var(--color-ivory)]/35 to-[var(--color-white)] border-t border-[var(--color-border)] relative overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          DESKTOP PINNED SCROLL JOURNEY (>= 768px)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: "260vh" }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex flex-col justify-between py-12 overflow-hidden"
        >
          <Container className="flex-1 flex flex-col justify-between max-w-6xl">
            {/* Header with Editorial Styling */}
            <div className="flex flex-col items-center text-center">
              <SectionHeading
                eyebrow="Our Methodology"
                title="The Interactive Client Journey Map"
                italicPhrase="Journey Map"
                subtitle="A connected 6-stage storytelling architecture engineered to transition founders from discovery to consistent executive category dominance."
                className="mb-4"
              />

              {/* Minimalist Milestone Indicator Strip */}
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[var(--color-border)] shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[var(--color-primary)] animate-spin-slow" />
                <div className="flex items-center gap-1.5">
                  {JOURNEY_STAGES.map((stg, i) => {
                    const isPassed = activeStageIndex >= i;
                    const isCurrent = activeStageIndex === i;

                    return (
                      <div
                        key={stg.step}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all duration-300 flex items-center gap-1 ${
                          isCurrent
                            ? "bg-[var(--color-primary)] text-white font-bold shadow-xs scale-105"
                            : isPassed
                            ? "bg-[var(--color-gold)]/20 text-[var(--color-primary)] font-semibold"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        <span>{stg.step}</span>
                        {isCurrent && <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Curving SVG Wave Path with GSAP MotionPath Golden Traveler */}
            <div className="relative my-4 w-full">
              <svg
                viewBox="0 0 1200 220"
                className="w-full h-32 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Luxury Metallic Gradient */}
                  <linearGradient id="journeyGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="35%" stopColor="var(--color-gold)" />
                    <stop offset="70%" stopColor="#e8cf9b" />
                    <stop offset="100%" stopColor="var(--color-primary)" />
                  </linearGradient>

                  {/* Node Glow Filter */}
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(210, 185, 139, 0.45)" />
                  </filter>
                </defs>

                {/* Base Guide Track (Dotted) */}
                <path
                  ref={pathRef}
                  id="journey-wave-track"
                  d="M 60,110 C 260,30 380,190 580,110 C 780,30 900,190 1140,110"
                  stroke="rgba(82, 33, 102, 0.15)"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />

                {/* Animated Gold Progress Track (Drawn by Scroll) */}
                <path
                  ref={progressPathRef}
                  id="journey-wave-progress"
                  d="M 60,110 C 260,30 380,190 580,110 C 780,30 900,190 1140,110"
                  stroke="url(#journeyGoldGradient)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />

                {/* 6 Milestone Nodes on the Wave */}
                {NODE_COORDINATES.map((coords, idx) => {
                  const isNodeActive = activeStageIndex === idx;
                  const isPassed = activeStageIndex >= idx;

                  return (
                    <g key={idx} className="transition-all duration-300">
                      {/* Pulse ring for active milestone */}
                      {isNodeActive && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="22"
                          stroke="var(--color-gold)"
                          strokeWidth="2"
                          fill="none"
                          className="animate-ping opacity-60"
                        />
                      )}

                      {/* Milestone outer circle */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isNodeActive ? 15 : 10}
                        fill={isPassed ? "var(--color-primary)" : "white"}
                        stroke={isNodeActive ? "var(--color-gold)" : "var(--color-primary)"}
                        strokeWidth={isNodeActive ? 4 : 2}
                        filter={isNodeActive ? "url(#nodeGlow)" : undefined}
                        className="transition-all duration-300"
                      />

                      {/* Center dot */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isNodeActive ? 5 : 3}
                        fill={isPassed ? "var(--color-gold)" : "var(--color-primary)"}
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* Traveling UVOKA Golden Seal (MotionPath Driven by GSAP) */}
                <g ref={logoNodeRef} id="traveling-seal" className="cursor-pointer">
                  <circle
                    cx="0"
                    cy="0"
                    r="24"
                    fill="white"
                    stroke="var(--color-gold)"
                    strokeWidth="3"
                    filter="url(#nodeGlow)"
                  />
                  <image
                    href="/logo/journeylogo.png"
                    width="36"
                    height="36"
                    x="-18"
                    y="-18"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
              </svg>
            </div>

            {/* Dynamic Stage Details Card (Reveals Smoothly as User Scrolls) */}
            <div className="relative w-full max-w-4xl mx-auto mb-4">
              <div className="relative rounded-3xl border border-[var(--color-primary)]/30 bg-white/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(82,33,102,0.1)] transition-all duration-500 overflow-hidden">
                {/* Top Metallic Gold Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary)]"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column (7 cols): Stage Narrative */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-[var(--color-primary)] text-white shadow-xs">
                        STAGE {activeStage.step}
                      </span>
                      <Badge variant="gold" size="sm" className="font-mono text-xs">
                        {activeStage.timeline}
                      </Badge>
                      <span className="text-xs text-[var(--color-text-muted)] font-mono">
                        • {activeStage.tagline}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-charcoal)] leading-snug">
                      {activeStage.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {activeStage.description}
                    </p>
                  </div>

                  {/* Right Column (5 cols): Key Deliverables */}
                  <div className="lg:col-span-5 bg-[var(--color-ivory)]/60 rounded-2xl p-6 border border-[var(--color-border)] space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      Core Deliverables
                    </h4>

                    <div className="space-y-2.5">
                      {activeStage.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-[var(--color-charcoal)] leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Cue Bottom Bar */}
                <div className="mt-6 pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                  <span>Scroll to navigate methodology</span>
                  <span className="text-[var(--color-primary)] font-bold">
                    {Math.round(scrollProgress * 100)}% Complete
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE VERTICAL TIMELINE (< 768px)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden py-16">
        <Container>
          <SectionHeading
            eyebrow="Our Methodology"
            title="The 6-Stage Client Journey"
            italicPhrase="Client Journey"
            subtitle="Engineered to transition founders from discovery to consistent executive category dominance."
            className="mb-10 text-left items-start"
          />

          <div className="relative pl-6 border-l-2 border-[var(--color-gold)]/40 space-y-8">
            {JOURNEY_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-[var(--color-border)] p-6 shadow-sm space-y-3"
              >
                {/* Node circle on the vertical line */}
                <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-[var(--color-primary)] border-2 border-white shadow-xs" />

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[var(--color-primary)] text-white">
                    STAGE {stage.step}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-gold)] font-bold">
                    {stage.timeline}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[var(--color-charcoal)]">
                  {stage.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {stage.description}
                </p>

                <div className="pt-2 border-t border-[var(--color-border)] space-y-1.5">
                  {stage.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-[var(--color-charcoal)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
