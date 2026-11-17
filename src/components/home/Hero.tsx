"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  BriefcaseBusiness,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LinkedInIcon } from "../common/Icons";
import { FeaturedIn } from "./FeaturedIn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const chipsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
};

const chip = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

const trust = [
  { icon: TrendingUp, value: "50M+", label: "Organic Executive Impressions" },
  { icon: ShieldCheck, value: "100%", label: "Bespoke Executive Voice Architecture" },
  { icon: BriefcaseBusiness, value: "Top 1%", label: "Creator Authority Positioning" },
];

const floatingStats = [
  { value: "50M+", label: "Organic Views", tone: "violet" },
  { value: "25+", label: "Clients Served", tone: "gold" },
  { value: "7+", label: "Countries", tone: "violet" },
  { value: "1:1", label: "Bespoke Strategy", tone: "gold" },
] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(visualRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToWork = () => {
    document
      .getElementById("featured-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const float = (distance: number, duration: number) =>
    reduced
      ? undefined
      : { animate: { y: [0, distance, 0] }, transition: { duration, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <section
      ref={heroRef}
      className="relative isolate -mt-20 overflow-hidden xl:min-h-screen"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ================= BACKGROUND ================= */}

      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[100px] xl:h-[650px] xl:w-[650px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-[10%] -z-10 h-[360px] w-[360px] rounded-full bg-gold/15 blur-[110px] xl:h-[500px] xl:w-[500px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 -z-10 hidden h-[700px] w-[700px] rounded-full border border-primary-muted/25 xl:block"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(var(--color-primary-dark)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* ================= MAIN GRID ================= */}

      <div className="relative grid items-center gap-10 xl:min-h-[120VH] xl:grid-cols-[1.08fr_0.92fr] xl:gap-8 xl:pr-12 2xl:pr-20">
        {/* Desktop dark organic panel (single SVG, no duplicates) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -left-[3vw] -top-10 -z-10 hidden h-[calc(100%+70px)] w-[59%] overflow-visible xl:block"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(15px 20px 30px var(--color-glow-primary))" }}
        >
          <defs>
            <linearGradient id="uvokaHeroGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary-dark)" />
              <stop offset="55%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-bg-dark)" />
            </linearGradient>
            <radialGradient id="uvokaGlow" cx="25%" cy="20%" r="55%">
              <stop offset="0%" stopColor="var(--color-primary-muted)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-primary-muted)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M 0 0 H 880 C 940 0 960 55 940 150 C 920 240 850 300 880 400 C 910 500 980 550 940 650 C 910 750 850 850 720 1000 H 0 Z"
            fill="url(#uvokaHeroGradient)"
          />
          <path
            d="M 0 0 H 880 C 940 0 960 55 940 150 C 920 240 850 300 880 400 C 910 500 980 550 940 650 C 910 750 850 850 720 1000 H 0 Z"
            fill="url(#uvokaGlow)"
          />
        </svg>

        {/* ================= LEFT CONTENT ================= */}
        {/* On mobile/tablet the dark panel is the wrapper's own background */}
        <div className="relative rounded-b-[40px] bg-gradient-to-br from-primary-dark via-primary to-bg-dark shadow-[0_25px_60px_var(--color-glow-primary)] xl:rounded-none xl:bg-none xl:shadow-none">
          <Container className="relative z-10">
            {/* CHANGED: extra top padding so the badge clears the fixed navbar */}
            <div className="px-1 pb-12 pt-28 text-center sm:pt-32 xl:px-0 xl:pb-16 xl:pt-32 xl:pl-3 2xl:pl-5 2xl:pt-36 xl:text-left">
              {/* Eyebrow */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <div className="mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.07] px-4 py-2 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-xs">
                    Premium LinkedIn Branding &amp; Lead Generation
                  </span>
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-gold" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.12 }}
                className="mx-auto max-w-[680px] font-heading text-[2.4rem] font-extrabold leading-[1.08] tracking-tight !text-white sm:text-5xl md:text-5xl xl:mx-0 xl:text-[3.5rem] 2xl:text-[4.25rem]"
              >
                We Turn Industry Leaders into{" "}
                <span className="relative inline-block font-editorial font-normal italic text-gold">
                  Unrivaled Category
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-2 w-full"
                  >
                    <path
                      d="M2 8 C 60 1, 140 1, 298 7"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeOpacity="0.6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Authorities
              </motion.h1>

              {/* Description (CHANGED: !text-white/80 so global p styles can't dim it) */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.24 }}
                className="mx-auto mt-7 max-w-[590px] text-sm leading-relaxed !text-white/80 sm:text-base md:text-lg xl:mx-0"
              >
                UVOKA architects high-impact personal brands and inbound
                pipeline engines for founders, executives and global creators on
                LinkedIn — driving verified authority, media resonance, and
                multi-million dollar business opportunities.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.36 }}
                className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center xl:justify-start"
              >
                <MagneticButton>
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="w-full border border-gold bg-gold text-bg-dark shadow-[0_10px_30px_var(--color-glow-gold)] hover:shadow-[0_14px_40px_var(--color-glow-gold)] sm:w-auto"
                  >
                    Start Your Transformation
                  </Button>
                </MagneticButton>

                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="w-full border border-white/70 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  Explore Strategic Offerings
                </Button>
              </motion.div>

              {/* Trust row */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="mt-12 grid grid-cols-3 border-t border-white/20 pt-7 text-left"
              >
                {trust.map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={value}
                    className={`flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3 ${
                      i > 0 ? "border-l border-white/20 pl-3 sm:pl-5" : "pr-2"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-gold sm:mt-1 sm:h-6 sm:w-6" />
                    <div>
                      <div className="font-heading text-lg font-bold text-white sm:text-2xl">
                        {value}
                      </div>
                      <p className="mt-1 text-[10px] leading-snug text-white/70 sm:text-xs">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div> */}
            </div>
          </Container>
        </div>

        {/* ================= RIGHT VISUAL ================= */}
        {/* Desktop spacing keeps the profile card aligned with the copy. */}
        <div
          ref={visualRef}
          className="relative mx-auto w-full min-w-0 max-w-[560px] px-4 pb-14 sm:px-0 xl:pb-10 xl:pt-24"
        >
          {/* gold ring */}
          <div
            aria-hidden="true"
            className="absolute left-1/3 top-[38%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/50 sm:h-[500px] sm:w-[500px]"
          />
          {/* purple glow */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] top-[18%] h-[300px] w-[300px] rounded-full bg-primary-muted/25 blur-[75px]"
          />
          {/* dot pattern */}
          <div
            aria-hidden="true"
            className="absolute -left-1 top-[1%] hidden grid-cols-4 gap-3 opacity-50 sm:grid"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-primary-muted" />
            ))}
          </div>

          {/* floating spheres */}
          <motion.div
            {...float(-14, 4)}
            aria-hidden="true"
            className="absolute right-2 top-[10%] z-20 h-7 w-7 rounded-full bg-gradient-to-br from-primary-muted to-primary-dark shadow-lg shadow-primary-dark/20"
          />
          <motion.div
            {...float(12, 5)}
            aria-hidden="true"
            className="absolute left-0 top-[52%] z-20 h-6 w-6 rounded-full bg-gradient-to-br from-gold to-primary-muted shadow-lg"
          />

          {/* ---------- Profile card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="relative z-10 mx-auto w-[100%] max-w-[480px] overflow-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_30px_80px_var(--color-glow-primary)] ring-1 ring-primary/5"
          >
            {/* cover */}
            <div
              className="relative h-24 bg-cover bg-center sm:h-32 xl:h-40"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,var(--color-glow-primary),var(--color-glow-primary)),url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=85)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/35 to-transparent" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                <LinkedInIcon className="h-5 w-5" />
              </div>
            </div>

            <div className="relative px-4 pb-4 sm:px-5 sm:pb-5">
              {/* avatar */}
              <div
                role="img"
                aria-label="Professional executive portrait"
                className="-mt-10 h-20 w-20 rounded-full border-4 border-white bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85)",
                }}
              />

              <div className="mt-2 flex items-center gap-1.5">
                <h3 className="font-heading text-xl font-bold text-charcoal sm:text-2xl">
                  Industry Leader
                </h3>
                <BadgeCheck
                  size={17}
                  className="text-primary"
                  fill="var(--color-primary)"
                  stroke="white"
                />
              </div>

              <p className="mt-1 text-xs font-medium text-text-secondary sm:text-sm">
                Founder &amp; CEO | Building What&apos;s Next
              </p>

              <div className="mt-1 text-xs text-primary sm:text-sm">
                <span>500+ connections</span>
              </div>

              <div className="mt-3 flex gap-2">
                <div className="flex-1 rounded-full bg-primary px-3 py-2 text-center text-xs font-semibold text-white shadow-md sm:text-sm">
                  Connect
                </div>
                <div className="flex-1 rounded-full border border-primary px-3 py-2 text-center text-xs font-semibold text-primary sm:text-sm">
                  Message
                </div>
              </div>

              {/* engagement strip */}
              <div className="mt-3 flex items-center justify-between rounded-lg bg-ivory px-2.5 py-2 text-[9px] font-medium text-primary-dark sm:text-[10px]">
                <span>12.4K likes</span>
                <span>860 comments</span>
                <span>2.1K reposts</span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-[9px] font-bold tracking-[0.13em] text-text-muted sm:text-[10px]">
                  PERSONAL BRAND AUTHORITY
                </span>
                <span className="text-xs font-bold text-gold">UVOKA</span>
              </div>
            </div>
          </motion.div>

          {/* ---------- Floating stat chips ---------- */}
          <motion.div
            variants={chipsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-20 isolate mx-auto mt-7 grid w-full max-w-[560px] grid-cols-4 gap-4 pb-6 sm:mt-8 sm:gap-6 sm:pb-10"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
            >
              <path
                d="M 5 5 C 5 240 295 240 295 5"
                fill="none"
                stroke="var(--color-gold)"
                strokeOpacity="0.55"
                strokeWidth="2"
              />
            </svg>
            {floatingStats.map(({ value, label, tone }, index) => (
              <motion.div
                key={label}
                variants={chip}
                className={`relative z-10 flex aspect-square min-w-0 flex-col items-center justify-center rounded-full border bg-white/95 p-2 text-center shadow-[0_10px_24px_var(--color-glow-primary)] backdrop-blur-xl sm:p-3 ${
                  index === 1 || index === 2 ? "translate-y-6 sm:translate-y-10" : "-translate-y-2 sm:-translate-y-4"
                } ${
                  tone === "gold" ? "border-gold/50" : "border-white"
                }`}
              >
                <div className="font-heading text-base font-extrabold text-primary-dark sm:text-lg">
                  {value}
                </div>
                <p className="mt-1 max-w-[8em] text-[10px] font-medium leading-tight text-text-secondary sm:text-xs">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= SCROLL CUE ================= */}
        {/* Desktop scroll cue sits over the dark panel. */}
        {/* <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={scrollToWork}
          className="mx-auto mb-8 mt-6 flex flex-col items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-[var(--color-primary)] transition-opacity hover:opacity-60 xl:text-white/80"
        >
          <span>EXPLORE OUR WORK</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.button> */}
      </div>
      {/* <FeaturedIn/> */}
    </section>
  );
}