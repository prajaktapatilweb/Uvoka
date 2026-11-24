"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GoalIcon, LinkedInIcon, TrophyIcon, MilestoneFlagIcon } from "../common/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const heroStats = [
  { value: 50, suffix: "M+", label: "Organic Views", icon: TrendingUp },
  { value: 25, suffix: "+", label: "Clients Served", icon: UsersRound },
  { value: 7, suffix: "+", label: "Countries", icon: Globe2 },
];

/* Bottom wave: two very similar shapes (same commands) that the wave slowly
   moves between. Adjusted lower to preserve full purple coverage on mobile. */
const EDGE_A = "C 820 975 690 925 500 955 C 310 985 180 925 0 960";
const EDGE_B = "C 820 965 690 935 500 945 C 310 970 180 935 0 950";
const FILL_A = `M 0 0 H 1000 V 940 ${EDGE_A} Z`;
const FILL_B = `M 0 0 H 1000 V 940 ${EDGE_B} Z`;
const LINE_A = `M 1000 940 ${EDGE_A}`;
const LINE_B = `M 1000 940 ${EDGE_B}`;
const WAVE_MOVE = { duration: 7, repeat: Infinity, ease: "easeInOut" as const };

/* ============ background motion data ============
   Seeded random numbers, so the server and the browser build the exact same
   values (no hydration mismatch). Change the seed or the counts to taste. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seeded(42);

// small glowing dots that drift in a direction, fade in and fade out
const DOTS = Array.from({ length: 64 }, () => ({
  left: +(rand() * 100).toFixed(2),
  top: +(4 + rand() * 78).toFixed(2),
  size: +(2 + rand() * 3).toFixed(1),
  dx: Math.round((rand() - 0.5) * 180),
  dy: Math.round((rand() - 0.5) * 180),
  dur: +(5 + rand() * 6).toFixed(1),
  delay: +(rand() * 6).toFixed(1),
  gold: rand() > 0.88,
}));

// four-point sparkles that twinkle in place
const STARS = Array.from({ length: 7 }, () => ({
  left: +(rand() * 96).toFixed(2),
  top: +(6 + rand() * 72).toFixed(2),
  size: Math.round(10 + rand() * 9),
  dur: +(2.5 + rand() * 2).toFixed(1),
  delay: +(rand() * 5).toFixed(1),
}));

function BackgroundMotion() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {DOTS.map((d, i) => (
        <motion.span
          key={`dot-${i}`}
          className={`absolute rounded-full ${d.gold ? "bg-gold/80" : "bg-white"} ${
            i > 22 ? "hidden sm:block" : ""
          }`}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: d.gold
              ? "0 0 6px 1px rgba(210,185,139,0.5)"
              : "0 0 8px 1px rgba(255,255,255,0.7)",
          }}
          animate={{ opacity: [0, 0.9, 0], x: [0, d.dx], y: [0, d.dy], scale: [0.5, 1, 0.5] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {STARS.map((s, i) => (
        <motion.svg
          key={`star-${i}`}
          viewBox="0 0 24 24"
          className={`absolute text-white/70 ${i > 3 ? "hidden sm:block" : ""}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3], rotate: [0, 90] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z"
            fill="currentColor"
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ============ social icons ============ */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/*
  Where each icon sits. `pos` is a Tailwind position (mobile first, then lg),
  `size` is the badge size. Items with `lgOnly` are hidden on phones/tablets.
  Add, remove or move items freely.
*/
type SocialBadgeType = "linkedin" | "instagram" | "trophy" | "goal" | "milestone";

interface SocialItem {
  type: SocialBadgeType;
  pos: string;
  size: string;
  lgOnly: boolean;
  delay: number;
}

const SOCIALS: SocialItem[] = [
  { type: "linkedin", pos: "right-[5%] top-[14%] lg:right-[8%] lg:top-[20%]", size: "h-11 w-11 lg:h-14 lg:w-14", lgOnly: false, delay: 0 },
  { type: "trophy", pos: "left-[5%] top-[18%] lg:top-[15%]", size: "h-10 w-10 lg:h-14 lg:w-14", lgOnly: false, delay: 0.8 },
  { type: "goal", pos: "left-[44%] top-[8%]", size: "h-14 w-14", lgOnly: true, delay: 1.6 },
  { type: "milestone", pos: "left-[3%] top-[54%]", size: "h-16 w-16", lgOnly: true, delay: 2.4 },
  { type: "linkedin", pos: "right-[35%] top-[74%]", size: "h-12 w-12", lgOnly: true, delay: 3.2 },
  { type: "trophy", pos: "right-[17%] top-[62%]", size: "h-14 w-14", lgOnly: true, delay: 4 },
];

function SocialIcons({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {SOCIALS.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.pos} ${item.size} ${item.lgOnly ? "hidden lg:block" : ""}`}
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          {/* rings that radiate outward */}
          {!reduced &&
            [0, 1.5].map((d) => (
              <motion.span
                key={d}
                className="absolute inset-0 rounded-full border border-white/20"
                animate={{ scale: [1, 2.1], opacity: [0.35, 0] }}
                transition={{ duration: 3, delay: item.delay + d, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

          {/* sparkles that circle around the icon */}
          {!reduced && (
            <motion.div
              className="absolute -inset-[38%]"
              animate={{ rotate: 360 }}
              transition={{ duration: 12 + (i % 3) * 3, repeat: Infinity, ease: "linear" }}
            >
              {[
                "left-1/2 top-0 -translate-x-1/2",
                "bottom-[14%] left-[6%]",
                "bottom-[14%] right-[6%]",
              ].map((spot, k) => (
                <motion.svg
                  key={k}
                  viewBox="0 0 24 24"
                  className={`absolute h-3 w-3 text-white/60 lg:h-4 lg:w-4 ${spot}`}
                  animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.6, 1.2, 0.6] }}
                  transition={{ duration: 2 + k * 0.4, delay: item.delay + k * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z"
                    fill="currentColor"
                  />
                </motion.svg>
              ))}
            </motion.div>
          )}

          {/* the round glass badge with the icon */}
         <span className="absolute inset-0 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/25 shadow-[0_0_18px_rgba(217,187,122,0.12)] backdrop-blur-sm">
  {item.type === "linkedin" && <LinkedInIcon className="h-1/2 w-1/2" />}
  {item.type === "trophy" && <TrophyIcon className="h-1/2 w-1/2" />}
  {item.type === "goal" && <GoalIcon className="h-1/2 w-1/2" />}
  {item.type === "milestone" && <MilestoneFlagIcon className="h-1/2 w-1/2" />}
</span>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [visibleWords, setVisibleWords] = useState(0);
  const [brandWord, setBrandWord] = useState("Brands");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const reduced = useReducedMotion();

  const cascadeVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.85,
        delay: reduced ? 0 : customDelay,
        ease,
      },
    }),
  };

  useEffect(() => {
    if (reduced) {
      setVisibleWords(3);
      setBrandWord("Legacies");
      setIsTypingComplete(true);
      return;
    }

    const timers: number[] = [];
    const schedule = (delay: number, callback: () => void) => {
      timers.push(window.setTimeout(callback, delay));
    };

    schedule(350, () => setVisibleWords(1));
    schedule(800, () => setVisibleWords(2));
    schedule(1250, () => setVisibleWords(3));

    const deletionStart = 2400;
    for (let length = "Brands".length - 1; length >= 0; length -= 1) {
      schedule(deletionStart + ("Brands".length - length - 1) * 125, () =>
        setBrandWord("Brands".slice(0, length)),
      );
    }

    const typingStart = deletionStart + "Brands".length * 125 + 140;
    for (let length = 1; length <= "Legacies".length; length += 1) {
      schedule(typingStart + (length - 1) * 150, () =>
        setBrandWord("Legacies".slice(0, length)),
      );
    }

    schedule(typingStart + "Legacies".length * 150 + 200, () => {
      setIsTypingComplete(true);
    });

    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

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
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative isolate -mt-20 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ================= BACKGROUND ================= */}

      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[100px] xl:h-[650px] xl:w-[650px]"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(var(--color-primary-dark)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* LinkedIn + Instagram icons with sparkles circling them */}
      <SocialIcons reduced={reduced} />

      {/* ================= MAIN GRID ================= */}

      <div className="relative flex flex-col justify-center min-h-[100svh] md:min-h-0 md:py-16 lg:min-h-[95vh] xl:min-h-[100vh] 2xl:min-h-[105vh] lg:py-0">
        {/* Full-width brand fill with a wave-shaped lower edge */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full overflow-visible"
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
          <motion.path
            d={FILL_A}
            fill="url(#uvokaHeroGradient)"
            animate={reduced ? undefined : { d: [FILL_A, FILL_B, FILL_A] }}
            transition={WAVE_MOVE}
          />
          <motion.path
            d={FILL_A}
            fill="url(#uvokaGlow)"
            animate={reduced ? undefined : { d: [FILL_A, FILL_B, FILL_A] }}
            transition={WAVE_MOVE}
          />
          {/* thin subtle gold accent line: draws itself once, then moves with the wave */}
          <motion.path
            d={LINE_A}
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={
              reduced
                ? { pathLength: 1 }
                : { pathLength: 1, d: [LINE_A, LINE_B, LINE_A] }
            }
            transition={{
              pathLength: { duration: reduced ? 0 : 2.2, delay: 0.6, ease: "easeInOut" },
              d: WAVE_MOVE,
            }}
          />
        </svg>

        {/* drifting dots and sparkles */}
        {!reduced && <BackgroundMotion />}

        {/* ================= LEFT CONTENT ================= */}
        <div className="relative w-full">
          <Container className="relative z-10">
            <div className="px-1 pt-24 pb-24 sm:pt-28 sm:pb-28 md:pt-28 md:pb-20 xl:px-0 xl:pt-24 xl:pb-20 xl:text-left">
              {/* Eyebrow */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <div className="mb-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.07] px-4 py-2 backdrop-blur-md sm:mb-7">
                  <Sparkles className="h-4 w-4 shrink-0 text-white/75" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-xs">
                    Leading LinkedIn Branding Agency
                  </span>
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.12 }}
                className="mx-auto max-w-[900px] font-heading text-[2.15rem] font-extrabold leading-[1.1] tracking-tight !text-white sm:text-5xl sm:leading-[1.08] md:text-5xl xl:mx-0 xl:text-[3.5rem] 2xl:text-[4.25rem]"
              >
                <span className="sr-only">We build Legacies</span>
                <span aria-hidden="true" className="inline-flex flex-wrap justify-center gap-x-[0.24em] xl:justify-start">
                  {["We", "build"].map((word, index) => (
                    <motion.span
                      key={word}
                      initial={false}
                      animate={{ opacity: visibleWords > index ? 1 : 0, y: visibleWords > index ? 0 : 14 }}
                      transition={{ duration: reduced ? 0 : 0.38, ease }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={false}
                    animate={{ opacity: visibleWords > 2 ? 1 : 0, y: visibleWords > 2 ? 0 : 14 }}
                    transition={{ duration: reduced ? 0 : 0.38, ease }}
                    className="inline-flex items-baseline font-editorial font-normal  text-gold"
                  >
                    <span className="relative inline-block">
                      {brandWord}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isTypingComplete ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] origin-left rounded-full bg-[var(--color-gold)] pointer-events-none"
                      />
                    </span>
                    {!isTypingComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        className="ml-[2px] inline-block h-[0.82em] w-[2px] translate-y-[0.08em] bg-[var(--color-gold)]"
                        aria-hidden="true"
                      />
                    )}
                  </motion.span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={0.25}
                variants={cascadeVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                className="mx-auto mt-5 max-w-[760px] text-sm leading-relaxed !text-white/80 sm:mt-7 sm:text-base md:text-lg xl:mx-0"
              >
                We help Founders, Executives, Professionals and Companies build
                LinkedIn presences that Lead, Influence and Last.
              </motion.p>

              {/* Counter cards: frosted glass tiles */}
              <div className="mx-auto mt-6 grid max-w-[760px] grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-4 xl:mx-0">
                {heroStats.map(({ value, suffix, label, icon: Icon }, index) => (
                  <motion.div
                    key={label}
                    custom={0.55 + index * 0.25}
                    variants={cascadeVariants}
                    initial="hidden"
                    animate={isTypingComplete ? "visible" : "hidden"}
                    whileHover={reduced ? undefined : { y: -5 }}
                    className="group relative flex flex-col items-center justify-center text-center min-w-0 overflow-hidden rounded-xl border border-white/15 bg-white/[0.07] p-2.5 backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-white/[0.11] sm:rounded-3xl sm:p-5"
                  >
                    {/* glowing gold top edge */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                    />
                    {/* corner glow */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70"
                    />

                    <span className="relative mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/75 ring-1 ring-white/20 sm:mb-4 sm:h-10 sm:w-10 mx-auto">
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                    </span>

                    <div className="relative text-center font-heading text-xl font-extrabold leading-none tabular-nums text-white sm:text-4xl">
                      <AnimatedCounter
                        key={isTypingComplete ? `active-${value}` : `wait-${value}`}
                        value={value}
                        suffix={suffix}
                        duration={2.6}
                      />
                    </div>
                    <p className="relative mt-1.5 text-[9px] text-center font-medium uppercase leading-snug tracking-[0.06em] !text-white/75 sm:mt-2 sm:text-xs sm:tracking-[0.08em]">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <motion.div
                custom={1.35}
                variants={cascadeVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center xl:justify-start"
              >
                <MagneticButton>
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="w-full border border-gold bg-gold text-bg-dark shadow-[0_10px_30px_var(--color-glow-gold)] hover:shadow-[0_14px_40px_var(--color-glow-gold)] sm:w-auto"
                  >
                    Let&apos;s Build Your Brand
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

              <motion.p
                custom={1.6}
                variants={cascadeVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                className="mx-auto mt-5 flex max-w-[760px] items-start justify-center gap-2 text-left text-xs leading-relaxed !text-white/80 sm:mt-6 sm:text-sm xl:mx-0 xl:justify-start"
              >
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                <span>
                  <strong className="font-semibold text-white">Our Guarantee:</strong>{" "}
                  100% increase in profile impressions in 30 days.
                </span>
              </motion.p>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}