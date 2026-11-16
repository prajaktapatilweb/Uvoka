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
  Eye,
  BriefcaseBusiness,
  Users,
  MessageCircle,
  ThumbsUp,
  Repeat2,
  Mail,
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
  { icon: Eye, value: "+312%", label: "Profile views", tone: "violet", offset: "sm:-translate-y-5" },
  { icon: Mail, value: "48", label: "Inbound leads / mo", tone: "gold", offset: "sm:translate-y-2" },
  { icon: BadgeCheck, value: "Verified", label: "Category authority", tone: "violet", offset: "sm:-translate-y-5" },
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
      className="relative isolate overflow-hidden bg-[#FBF9FF] lg:min-h-screen"
    >
      {/* ================= BACKGROUND ================= */}

      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#D9CBFF]/60 blur-[100px] lg:h-[650px] lg:w-[650px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-[10%] -z-10 h-[360px] w-[360px] rounded-full bg-[#E7D9FF]/70 blur-[110px] lg:h-[500px] lg:w-[500px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 -z-10 hidden h-[700px] w-[700px] rounded-full border border-[#C7B1EF]/40 lg:block"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(#191342_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* ================= MAIN GRID ================= */}

      <div className="relative grid items-center gap-10 lg:min-h-[740px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pr-12 xl:pr-20">
        {/* Desktop dark organic panel (single SVG, no duplicates) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -left-[3vw] -top-10 -z-10 hidden h-[calc(100%+70px)] w-[59%] overflow-visible lg:block"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(15px 20px 30px rgba(25,19,66,0.18))" }}
        >
          <defs>
            <linearGradient id="uvokaHeroGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#191342" />
              <stop offset="55%" stopColor="#29205D" />
              <stop offset="100%" stopColor="#211747" />
            </linearGradient>
            <radialGradient id="uvokaGlow" cx="25%" cy="20%" r="55%">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
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
        <div className="relative rounded-b-[40px] bg-gradient-to-br from-[#191342] via-[#29205D] to-[#211747] shadow-[0_25px_60px_rgba(25,19,66,0.25)] lg:rounded-none lg:bg-none lg:shadow-none">
          <Container className="relative z-10">
            <div className="px-1 pb-12 pt-24 text-center sm:pt-28 lg:px-0 lg:py-20 lg:pl-3 lg:text-left xl:pl-5">
              {/* Eyebrow */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <div className="mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.07] px-4 py-2 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#F1BE56]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-xs">
                    Premium LinkedIn Branding &amp; Lead Generation
                  </span>
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#F1BE56]" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.12 }}
                className="mx-auto max-w-[680px] font-heading text-[2.4rem] font-extrabold leading-[1.08] tracking-tight !text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-[3.5rem] xl:text-[4.25rem]"
              style={{ fontSize: 'clamp(3.4rem, 5vw, 5.10rem)' }}
              >
                We Turn Industry Leaders into{" "}
                <span className="relative inline-block font-editorial font-normal italic text-[#F1BE56]">
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
                      stroke="#F1BE56"
                      strokeOpacity="0.6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Authorities
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.24 }}
                className="mx-auto mt-7 max-w-[590px] text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:mx-0"
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
                className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center lg:justify-start"
              >
                <MagneticButton>
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="w-full border border-[#F1BE56] bg-[#F1BE56] text-[#191342] shadow-[0_10px_30px_rgba(241,190,86,0.35)] hover:shadow-[0_14px_40px_rgba(241,190,86,0.5)] sm:w-auto"
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
                    <Icon className="h-5 w-5 shrink-0 text-[#F1BE56] sm:mt-1 sm:h-6 sm:w-6" />
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
        <div
          ref={visualRef}
          className="relative mx-auto w-full min-w-0 max-w-[520px] px-4 pb-14 sm:px-0 lg:py-10"
        >
          {/* gold ring */}
          <div
            aria-hidden="true"
            className="absolute left-1/3 top-[38%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#D9AA46]/50 sm:h-[500px] sm:w-[500px]"
          />
          {/* purple glow */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] top-[18%] h-[300px] w-[300px] rounded-full bg-[#A78BFA]/35 blur-[75px]"
          />
          {/* dot pattern */}
          <div
            aria-hidden="true"
            className="absolute -left-1 top-[1%] hidden grid-cols-4 gap-3 opacity-50 sm:grid"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
            ))}
          </div>

          {/* floating spheres */}
          <motion.div
            {...float(-14, 4)}
            aria-hidden="true"
            className="absolute right-2 top-[10%] z-20 h-7 w-7 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#5124A5] shadow-lg shadow-purple-900/20"
          />
          <motion.div
            {...float(12, 5)}
            aria-hidden="true"
            className="absolute left-0 top-[52%] z-20 h-6 w-6 rounded-full bg-gradient-to-br from-[#F8D77D] to-[#D49A27] shadow-lg"
          />

          {/* ---------- Profile card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="relative z-10 mx-auto w-[100%] max-w-[480px] overflow-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_30px_80px_rgba(35,23,78,0.22)] ring-1 ring-[#191342]/5"
          >
            {/* cover */}
            <div
              className="relative h-28 bg-cover bg-center sm:h-46"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,rgba(20,25,65,.05),rgba(20,25,65,.15)),url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=85)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#191342]/35 to-transparent" />
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-lg">
                <LinkedInIcon size={22} />
              </div>
            </div>

            <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
              {/* avatar */}
              <div
                role="img"
                aria-label="Professional executive portrait"
                className="-mt-12 h-24 w-24 rounded-full border-[5px] border-white bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85)",
                }}
              />

              <div className="mt-3 flex items-center gap-2">
                <h3 className="font-heading text-xl font-bold text-[#191342] sm:text-2xl">
                  Industry Leader
                </h3>
                <BadgeCheck
                  size={20}
                  className="text-[#0A66C2]"
                  fill="#0A66C2"
                  stroke="white"
                />
              </div>

              <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
                Founder &amp; CEO | Building What&apos;s Next
              </p>

              <div className="mt-2 flex items-center gap-2 text-xs text-[#0A66C2] sm:text-sm">
                <Users size={15} />
                <span>500+ connections</span>
              </div>

              <div className="mt-4 flex gap-3">
                <div className="flex-1 rounded-full bg-[#0A66C2] px-3 py-2.5 text-center text-xs font-semibold text-white shadow-md sm:text-sm">
                  Connect
                </div>
                <div className="flex-1 rounded-full border border-[#0A66C2] px-3 py-2.5 text-center text-xs font-semibold text-[#0A66C2] sm:text-sm">
                  Message
                </div>
              </div>

              {/* engagement strip */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F6F3FF] px-3 py-2.5 text-[11px] font-medium text-[#4B3B8F]">
                <span className="flex items-center gap-1.5">
                  <ThumbsUp size={13} /> 12.4K
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={13} /> 860
                </span>
                <span className="flex items-center gap-1.5">
                  <Repeat2 size={13} /> 2.1K
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-[9px] font-bold tracking-[0.13em] text-gray-500 sm:text-[10px]">
                  PERSONAL BRAND AUTHORITY
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#B58A36]">
                  <Sparkles size={13} />
                  UVOKA
                </span>
              </div>
            </div>
          </motion.div>

          {/* floating sparkle badge */}
          <motion.div
            {...float(-10, 4)}
            className="absolute -right-1 top-[24%] z-20 hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#E7D4A4] bg-white text-[#D49A27] shadow-xl sm:flex"
          >
            <Sparkles size={22} />
          </motion.div>

          {/* ---------- Floating stat chips ---------- */}
          <motion.div
            variants={chipsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-20 -mt-6 grid grid-cols-3 gap-2 sm:gap-4"
          >
            {floatingStats.map(({ icon: Icon, value, label, tone, offset }) => (
              <motion.div
                key={label}
                variants={chip}
                className={`rounded-2xl border bg-white/85 p-3 text-center shadow-[0_15px_40px_rgba(35,23,78,0.14)] backdrop-blur-xl sm:rounded-3xl sm:p-4 ${offset} ${
                  tone === "gold" ? "border-[#F0DDAF]" : "border-white"
                }`}
              >
                <div
                  className={`mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                    tone === "gold"
                      ? "bg-[#FFF3D7] text-[#D49A27]"
                      : "bg-[#EEE7FF] text-[#5124A5]"
                  }`}
                >
                  <Icon size={19} />
                </div>
                <div className="font-heading text-base font-extrabold text-[#191342] sm:text-xl">
                  {value}
                </div>
                <p className="mt-1 text-[9px] font-medium leading-tight text-gray-600 sm:text-xs">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* bottom gold ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2 left-1/2 -z-10 h-12 w-[75%] -translate-x-1/2 rounded-[50%] border border-[#D6A43E]/60"
          />
        </div>
          {/* ================= SCROLL CUE ================= */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={scrollToWork}
        className="mx-auto mb-8 mt-6 flex flex-col items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-[var(--color-primary)] transition-opacity hover:opacity-60"
      >
        <span>EXPLORE OUR WORK</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
      </div>

    
    </section>
  );
}
