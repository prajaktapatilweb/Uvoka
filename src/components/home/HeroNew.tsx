"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Navbar } from "../layout/Navbar";

const ease = [0.16, 1, 0.3, 1] as const;
const GOLD = "var(--color-gold, #c9ae78)";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};


/* ---- Hero image size controls (desktop) ----
   The image keeps its LEFT edge fixed at the start of the right column and grows
   only towards the RIGHT (into the space beside the container), so it can never
   run into the text on the left. Make the numbers bigger for a bigger image. */
const IMG_BLEED_DESKTOP =
  "lg:w-[calc(100%+3rem)] lg:-mr-12 xl:w-[calc(100%+6rem)] xl:-mr-24 2xl:w-[calc(100%+9rem)] 2xl:-mr-36";
/* mobile: responsive sizing */
const IMG_SCALE_MOBILE = "";

const stats = [
  { value: 50, suffix: "M+", label: "Organic views" },
  { value: 25, suffix: "+", label: "Clients served" },
  { value: 7, suffix: "+", label: "Countries" },
];

const STAR_PATH =
  "M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z";

/* ============ background motion data (seeded, so server and browser match) ============ */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seeded(7);

const DOTS = Array.from({ length: 36 }, () => ({
  left: +(rand() * 100).toFixed(2),
  top: +(4 + rand() * 88).toFixed(2),
  size: +(3 + rand() * 4).toFixed(1),
  dx: Math.round((rand() - 0.5) * 160),
  dy: Math.round((rand() - 0.5) * 160),
  dur: +(6 + rand() * 6).toFixed(1),
  delay: +(rand() * 7).toFixed(1),
  gold: rand() > 0.6,
}));

const STARS = Array.from({ length: 6 }, () => ({
  left: +(rand() * 96).toFixed(2),
  top: +(6 + rand() * 80).toFixed(2),
  size: Math.round(12 + rand() * 10),
  dur: +(2.8 + rand() * 2).toFixed(1),
  delay: +(rand() * 5).toFixed(1),
}));

/** Soft purple and gold dots that drift, plus a few twinkling stars. */
function BackgroundMotion() {
  return (
    <>
      {DOTS.map((d, i) => (
        <motion.span
          key={`dot-${i}`}
          className={`absolute rounded-full ${i > 16 ? "hidden sm:block" : ""}`}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.gold ? GOLD : "var(--brand-purple)",
          }}
          animate={{ opacity: [0, 0.5, 0], x: [0, d.dx], y: [0, d.dy], scale: [0.5, 1, 0.5] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {STARS.map((s, i) => (
        <motion.svg
          key={`star-${i}`}
          viewBox="0 0 24 24"
          className={`absolute ${i > 2 ? "hidden sm:block" : ""}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, color: GOLD }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.3, 1, 0.3], rotate: [0, 90] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d={STAR_PATH} fill="currentColor" />
        </motion.svg>
      ))}
    </>
  );
}

export function HeroNew() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate -mt-20 pb-15 min-h-[820px] overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#fbfbfc] to-[#f6f5f7] pt-28 md:min-h-[780px] md:pt-32 lg:min-h-[100vh] lg:pt-28">

      {/* Background Decorative Graphics */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 opacity-[0.45] [background-image:linear-gradient(to_right,rgba(82,33,102,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(82,33,102,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_65%,transparent_100%)]" />

        {/* Soft ambient glow orbs */}
        <div className="absolute -left-36 top-16 h-[540px] w-[540px] rounded-full bg-[var(--brand-purple)]/[0.18] blur-[120px]" />
        <div className="absolute right-[-8%] top-[10%] h-[620px] w-[620px] rounded-full bg-[var(--brand-muted)]/[0.22] blur-[130px]" />
        <div className="absolute right-[22%] bottom-[5%] h-[380px] w-[380px] rounded-full bg-[var(--brand-purple)]/[0.14] blur-[100px]" />

        {/* Concentric circle lines */}
        <div className="absolute -right-[10%] -top-[6%] h-[840px] w-[840px] rounded-full border border-[var(--brand-purple)]/[0.12]" />
        <div className="absolute right-[2%] top-[6%] h-[640px] w-[640px] rounded-full border border-[var(--brand-purple)]/[0.14]" />

        {/* Curved accent lines */}
        <svg
          className="absolute right-0 top-0 h-full w-full max-w-[850px] opacity-50"
          viewBox="0 0 850 850"
          fill="none"
        >
          <path
            d="M 120 120 C 320 260 480 180 720 360 C 860 470 820 680 720 800"
            stroke="var(--brand-purple)"
            strokeWidth="1.2"
            strokeOpacity="0.30"
            strokeDasharray="4 6"
          />
          <path
            d="M 40 260 C 260 300 400 520 660 560 C 760 580 820 530 850 460"
            stroke="var(--brand-muted)"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />
        </svg>

        {/* Crosshair (+) markers */}
        <div className="absolute left-[10%] top-[22%] select-none font-mono text-xs font-light text-[var(--brand-purple)]/30">+</div>
        <div className="absolute left-[44%] top-[15%] select-none font-mono text-xs font-light text-[var(--brand-muted)]/40">+</div>
        <div className="absolute right-[30%] top-[11%] select-none font-mono text-xs font-light text-[var(--brand-purple)]/30">+</div>
        <div className="absolute left-[24%] bottom-[16%] select-none font-mono text-xs font-light text-[var(--brand-purple)]/25">+</div>

        {/* drifting dots + twinkling stars */}
        {!reduced && <BackgroundMotion />}
      </div>

      <Container className="relative z-10 h-full">
        {/* CHANGED: a real gap between the two columns (lg:gap-x-8) */}
        <div className="grid min-h-[640px] items-center gap-10 lg:min-h-[760px] lg:grid-cols-[44%_56%] lg:gap-x-8 xl:grid-cols-[42%_58%]">
          {/* ================= LEFT COLUMN ================= */}
          <div className="relative z-20 pb-8 pt-4 text-center lg:pb-16 lg:text-left">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease }}
              className="mb-7 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--brand-purple)]/20 bg-white/70 px-4 py-2 shadow-[0_6px_20px_rgba(82,33,102,0.08)] backdrop-blur-md">
                <Sparkles className="h-4 w-4" style={{ color: GOLD }} />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-purple)] sm:text-xs">
                  Leading LinkedIn branding agency
                </span>
                <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: GOLD }} />
              </span>
            </motion.div>

            {/* Heading: "Brands" is struck out and replaced by "Legacies." */}
             {/* Heading */}
                         <motion.h1
                           variants={fadeUp}
                           initial="hidden"
                           animate="visible"
                           transition={{ delay: 0.12 }}
                           className="mx-auto max-w-[900px]  text-[2.15rem] font-editorial font-extrabold leading-[1.1]  sm:text-5xl sm:leading-[1.08] md:text-5xl xl:mx-0 xl:text-[3.5rem] 2xl:text-[4.25rem]"
                         >
                             <span aria-hidden="true">
              
                <span className="relative my-1 inline-block text-[0.8em] font-editorial font-bold leading-none text-[var(--brand-charcoal)]/35">
                  Brands
                  <motion.span
                    className="absolute left-[-3%] top-1/2 h-[0.1em] w-[106%] origin-left rounded-full bg-[var(--brand-purple)] "
                    initial={{ scaleX: reduced ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1, ease: "easeOut" }}
                  />
                </span>
                  <span className="block font-editorial font-black text-[1.22em] tracking-tight text-[#131214]">We build</span>
              <span className="sr-only">We build Legacies.</span>
             
                <span className="relative block w-fit  font-editorial font-extrabold  text-[var(--brand-purple)] max-lg:mx-auto">
                  Legacies.
                  <svg
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-2.5 w-full"
                  >
                    <motion.path
                      d="M2 8 C 60 1, 140 1, 298 7"
                      fill="none"
                      stroke={GOLD}
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 1.4, ease: "easeOut" }}
                    />
                  </svg>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.2, ease }}
              className="mx-auto mt-8 max-w-xl text-base leading-[1.65] text-[var(--brand-charcoal)]/90 sm:text-lg lg:mx-0" style={{color:'#131214'}}
            >
              We help founders, executives, professionals and companies build LinkedIn presences that lead, influence and last.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.32, ease }}
              className="mt-8 flex flex-col items-center rounded-2xl gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <MagneticButton>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="w-full sm:w-auto "
                >
                Let's Build Your Brand
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.48 }}
              className="mt-9 grid max-w-xl grid-cols-3 rounded-[10px]  border border-[var(--brand-purple)]/15 bg-white/60 py-4   sm:mt-12 max-lg:mx-auto  shadow-[8px_8px_6px_#ddd,8px_6px_20px_#fff]"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex min-w-0 flex-col px-3 sm:px-5 ${index > 0 ? "border-l border-[var(--brand-purple)]/15" : ""}`}
                >
                  <span className="bg-gradient-to-br from-[var(--brand-purple)] to-[var(--brand-muted)] bg-clip-text font-heading text-2xl font-black text-transparent sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.2} />
                  </span>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--brand-charcoal)]/60 sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN (desktop) ================= */}
          <div className="relative hidden h-[700px] items-end justify-start lg:flex xl:h-[800px]">
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 36, scale: reduced ? 1 : 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.95, delay: reduced ? 0 : 0.22, ease }}
              className="relative flex h-full w-full items-end justify-start"
            >
              {/* slowly turning dashed orbit with a gold dot */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[4%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full border border-dashed border-[var(--brand-purple)]/25"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <span
                  className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full shadow-[0_0_14px_2px_rgba(201,174,120,0.7)]"
                  style={{ background: GOLD }}
                />
              </motion.div>

              {/* The Hero Cutout Image
                  CHANGED: no centre-scaling any more. Its left edge stays put and it
                  extends to the right (IMG_BLEED_DESKTOP), so it never touches the text. */}
              <motion.div
                animate={reduced ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`relative z-10 shrink-0 ${IMG_BLEED_DESKTOP}`}
              >
                <Image
                  src="/images/heroimg1.png"
                  alt="UVOKA Personal Branding & Executive Presence"
                  width={1536}
                  height={1024}
                  priority
                  className="h-auto w-full object-contain drop-shadow-[0_24px_50px_rgba(56,32,68,0.25)] mb-20"
                />
              </motion.div>

              {/* floating pill badge */}
              <motion.div
                animate={reduced ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-10 left-[2%] z-20 flex items-center gap-2.5 rounded-full border border-white/90 bg-white/95 px-5 py-2.5 shadow-[0_14px_40px_rgba(56,32,68,0.12)] backdrop-blur-md"
              >
                <BadgeCheck className="h-4 w-4 text-[var(--brand-purple)]" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-purple)]">
                Our Guarantee: 100% increase in profile impressions in 30 days
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ================= MOBILE / TABLET IMAGE ================= */}
          <div className="relative mt-0 mb-3 flex w-full items-center justify-center px-4 sm:px-8 lg:hidden">
            {/* Ambient soft purple glow behind the monument on mobile */}
            <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full bg-[var(--brand-purple)]/18 blur-3xl" />

            <Image
              src="/images/heroimg1.png"
              alt="UVOKA Personal Branding & Executive Presence"
              width={1276}
              height={1024}
              priority
              className="relative z-10 h-auto w-full max-w-[340px] object-contain drop-shadow-[0_16px_35px_rgba(56,32,68,0.22)] sm:max-w-[420px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}