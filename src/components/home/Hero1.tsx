
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
  Linkedin,
  BadgeCheck,
  Eye,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LinkedInIcon } from "../common/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const statContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.45,
    },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 35, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

export function Hero1() {
  const heroRef = useRef<HTMLElement>(null);
  const orbPurpleRef = useRef<HTMLDivElement>(null);
  const orbGoldRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(orbPurpleRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(orbGoldRef.current, {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(visualRef.current, {
        y: -35,
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

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-white via-[var(--color-ivory)]/50 to-white pt-28 pb-12 md:pt-32 md:pb-16"
    >
      {/* Background ambient lighting */}

      <div
        ref={orbPurpleRef}
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-[var(--color-primary)]/10 blur-[110px]"
      />

      <div
        ref={orbGoldRef}
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-[var(--color-gold)]/15 blur-[120px]"
      />

      <div className="pointer-events-none absolute -bottom-48 left-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-[var(--color-primary-muted)]/10 blur-[100px]" />

      {/* Decorative elements */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-32 hidden h-20 w-20 rotate-12 rounded-2xl border border-[var(--color-gold)]/30 md:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-[45%] hidden h-24 w-24 rounded-full border border-[var(--color-primary)]/15 md:block"
      />

      <Container className="relative z-10">

        {/* Main Hero Grid */}

        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-14">

          {/* LEFT CONTENT */}

          <div className="relative z-20 text-center lg:text-left">

            {/* Eyebrow */}

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
            >
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-gold)]/25 bg-[var(--color-ivory)] px-4 py-2 shadow-sm">
                <Sparkles className="h-4 w-4 text-[var(--color-gold)]" />

                <span className="font-body text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--color-primary)] sm:text-xs">
                  Premium LinkedIn Branding & Lead Generation
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
              </div>
            </motion.div>

            {/* Headline */}

            <motion.h1
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12 }}
              className="mx-auto max-w-3xl text-balance font-heading text-[2.65rem] font-extrabold leading-[1.09] tracking-tight text-[var(--color-charcoal)] sm:text-5xl md:text-6xl lg:mx-0 lg:text-6xl xl:text-[4.5rem]"
            >
              We Turn Industry Leaders into{" "}
              <span className="font-editorial font-normal italic text-[var(--color-primary)]">
                Unrivaled Category
              </span>{" "}
              Authorities
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.24 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg lg:mx-0"
            >
              UVOKA architects high-impact personal brands and inbound
              pipeline engines for founders, executives and global
              creators on LinkedIn — driving verified authority,
              media resonance, and multi-million dollar business
              opportunities.
            </motion.p>

            {/* CTA Buttons */}

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.36 }}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <MagneticButton>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="w-full shadow-lg transition-shadow hover:shadow-xl sm:w-auto"
                >
                  Start Your Transformation
                </Button>
              </MagneticButton>

              <Button
                href="/services"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Strategic Offerings
              </Button>
            </motion.div>

            {/* Bottom trust indicators */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 border-t border-[var(--color-border)]/80 pt-7 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-charcoal)]">
                  Authority-driven growth
                </span>
              </div>

              <div className="hidden h-5 w-px bg-[var(--color-border)] sm:block" />

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[var(--color-gold)]" />
                <span className="text-xs font-semibold text-[var(--color-charcoal)]">
                  Bespoke brand strategy
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL COMPOSITION */}

          <div
            ref={visualRef}
            className="relative mx-auto w-full max-w-[590px] lg:ml-auto lg:mr-0"
          >

            {/* Main purple ambient circle */}

            <div className="absolute left-1/2 top-[42%] h-[75%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />

            <div className="absolute right-[5%] top-[3%] h-[75%] w-[75%] rounded-full border border-[var(--color-gold)]/30" />

            <div className="absolute bottom-[12%] left-[3%] h-48 w-48 rounded-full bg-[var(--color-primary)]/15 blur-3xl" />

            {/* Decorative dots */}

            <div className="absolute -left-1 top-[12%] hidden grid-cols-4 gap-3 opacity-40 sm:grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
                />
              ))}
            </div>

            {/* Profile card entrance */}

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease,
              }}
              className="relative z-10 mx-auto w-[83%] max-w-[420px] overflow-hidden rounded-[22px] border border-white/90 bg-white shadow-[0_30px_80px_rgba(36,24,78,0.17)]"
            >

              {/* LinkedIn-style cover image */}

              <div
                role="img"
                aria-label="Modern corporate city skyline"
                className="relative h-36 overflow-hidden bg-cover bg-center sm:h-44"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,rgba(23,20,65,.12),rgba(23,20,65,.05)),url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=85)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#19133d]/30 to-transparent" />

                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-lg">
                  <LinkedInIcon size={22} fill="white" />
                </div>
              </div>

              {/* Profile details */}

              <div className="relative px-5 pb-6 sm:px-7">

                {/* Profile photo */}

                <div
                  role="img"
                  aria-label="Professional executive portrait"
                  className="-mt-12 h-24 w-24 rounded-full border-[5px] border-white bg-cover bg-center shadow-lg sm:h-28 sm:w-28"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85)",
                  }}
                />

                <div className="mt-4 flex items-center gap-2">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-charcoal)] sm:text-2xl">
                    Industry Leader
                  </h3>
                  <BadgeCheck
                    size={20}
                    className="shrink-0 text-[#0A66C2]"
                    fill="#0A66C2"
                    stroke="white"
                  />
                </div>

                <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                  Founder & CEO | Building What's Next
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-primary)]">
                  <Users size={15} />
                  <span>Executive Network & Industry Influence</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <div className="flex-1 rounded-full bg-[#0A66C2] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm">
                    Connect
                  </div>

                  <div className="flex-1 rounded-full border border-[var(--color-primary)]/30 px-4 py-2.5 text-center text-sm font-semibold text-[var(--color-primary)]">
                    Message
                  </div>
                </div>

                {/* Card footer */}

                <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    PERSONAL BRAND AUTHORITY
                  </span>

                  <span className="flex items-center gap-1 text-xs font-bold text-[var(--color-gold)]">
                    <Sparkles size={13} />
                    UVOKA
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating statistic cards - Sequential reveal */}

            <motion.div
              variants={statContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="relative z-20 -mt-1 grid grid-cols-3 gap-2 px-0 sm:-mt-3 sm:gap-3"
            >

              {/* Impressions */}

              <motion.div
                variants={statItem}
                className="relative rounded-2xl border border-white bg-white/95 p-3 shadow-[0_15px_40px_rgba(36,24,78,0.12)] backdrop-blur-xl sm:-translate-y-4 sm:p-4"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Eye size={19} />
                </div>

                <div className="font-heading text-xl font-extrabold text-[var(--color-charcoal)] sm:text-3xl">
                  50M+
                </div>

                <p className="mt-1 text-[10px] font-medium leading-tight text-[var(--color-text-secondary)] sm:text-xs">
                  Organic Executive Impressions
                </p>

                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
              </motion.div>

              {/* Bespoke architecture */}

              <motion.div
                variants={statItem}
                className="relative rounded-2xl border border-[var(--color-gold)]/25 bg-white/95 p-3 shadow-[0_15px_40px_rgba(36,24,78,0.12)] backdrop-blur-xl sm:translate-y-2 sm:p-4"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
                  <ShieldCheck size={19} />
                </div>

                <div className="font-heading text-xl font-extrabold text-[var(--color-charcoal)] sm:text-3xl">
                  100%
                </div>

                <p className="mt-1 text-[10px] font-medium leading-tight text-[var(--color-text-secondary)] sm:text-xs">
                  Bespoke Executive Voice Architecture
                </p>

                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
              </motion.div>

              {/* Top 1% */}

              <motion.div
                variants={statItem}
                className="relative rounded-2xl border border-white bg-white/95 p-3 shadow-[0_15px_40px_rgba(36,24,78,0.12)] backdrop-blur-xl sm:-translate-y-4 sm:p-4"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <BriefcaseBusiness size={19} />
                </div>

                <div className="font-heading text-xl font-extrabold text-[var(--color-charcoal)] sm:text-3xl">
                  Top 1%
                </div>

                <p className="mt-1 text-[10px] font-medium leading-tight text-[var(--color-text-secondary)] sm:text-xs">
                  Creator Authority Positioning
                </p>

                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
              </motion.div>
            </motion.div>

            {/* Gold decorative ring */}

            <div className="pointer-events-none absolute -bottom-8 left-1/2 -z-10 h-12 w-[75%] -translate-x-1/2 rounded-[50%] border border-[var(--color-gold)]/40 shadow-[0_0_25px_rgba(190,145,65,0.12)]" />

            {/* Floating decorative element */}

            <motion.div
              animate={reduced ? undefined : { y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-2 top-[23%] z-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-gold)]/30 bg-white/90 text-[var(--color-gold)] shadow-lg backdrop-blur-md sm:flex"
            >
              <Sparkles size={25} />
            </motion.div>

          </div>
        </div>

        {/* Explore work scroll indicator */}

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={scrollToWork}
          className="mx-auto mt-14 flex flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.28em] text-[var(--color-primary)] transition-opacity hover:opacity-60 md:mt-16"
        >
          <span>EXPLORE OUR WORK</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.button>

      </Container>
    </section>
  );
}
