"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { ArrowRight, Check, Quote, Sparkles, TrendingUp, UsersRound } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { LinkedInIcon } from "@/components/common/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

/* =====================================================================
   EDIT YOUR CONTENT HERE
   ===================================================================== */
const FOUNDER = {
  firstName: "Founder", // shown in the heading: "Hi, I'm <firstName>"
  fullName: "Founder Name", // shown under the signature
  initials: "FN", // shown if the photo cannot load
  role: "Founder & CEO, UVOKA",
  image: "/images/founder.jpg", // put the photo in /public/images/
  linkedin: "https://www.linkedin.com/in/your-profile", // your LinkedIn URL
  quote: "Your story is your strongest asset. We make sure the right people hear it.",
  bio: [
    "I started UVOKA with one belief: the best founders and executives are often the least visible online, and that costs them opportunities every single day.",
    "Today we help leaders turn their LinkedIn presence into a trusted voice that attracts clients, media and partners, organically and without paying for ads.",
  ],
  credentials: [
    "Built personal brands for 25+ founders and executives",
    "50M+ organic views generated for clients",
    "Clients featured in leading media outlets",
    "Working with leaders across 7+ countries",
  ],
  stats: [
    { value: 50, suffix: "M+", label: "Organic views" },
    { value: 25, suffix: "+", label: "Clients served" },
    { value: 7, suffix: "+", label: "Countries" },
  ],
};

const STAR_PATH =
  "M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z";

export function FounderSection() {
  const reduced = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: reduced ? 0 : 0.7, delay, ease },
  });

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="section-padding-lg relative overflow-hidden bg-gradient-to-b from-white via-[var(--color-ivory)] to-white"
    >
      {/* soft background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[460px] w-[460px] rounded-full bg-primary-muted/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-gold/15 blur-[110px]"
      />

      <Container className="relative">
        {/* big outlined word behind the text */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-0 hidden select-none font-heading text-[9.5rem] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(82,33,102,0.1)] xl:block"
        >
          FOUNDER
        </span>

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ===================== PORTRAIT ===================== */}
          <div className="relative mx-auto w-full max-w-[420px] pb-10 sm:pb-8">
            <div className="relative aspect-[4/5] w-full">
              {/* slowly turning dashed orbit with a gold dot */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[8%] rounded-full border border-dashed border-primary/25"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_2px_rgba(201,174,120,0.7)]" />
              </motion.div>

              {/* gold outline plate, offset behind the arch */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-b-[32px] rounded-t-[999px] border-2 border-gold/60"
              />

              {/* the arch with the photo (reveals upwards) */}
              <motion.div
                initial={{ clipPath: reduced ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: reduced ? 0 : 1.1, ease }}
                className="relative h-full w-full overflow-hidden rounded-b-[32px] rounded-t-[999px] bg-gradient-to-b from-primary-muted to-primary-dark shadow-[0_40px_90px_-30px_rgba(82,33,102,0.6)]"
              >
                {/* shows only if the photo is missing */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center font-heading text-8xl font-black text-white/20"
                >
                  {FOUNDER.initials}
                </span>
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1.2px,transparent_1.2px)] [background-size:20px_20px]" />
                <Image
                  src='/images/hero/ph1.jpg'
                  alt={`${FOUNDER.fullName}, ${FOUNDER.role}`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover object-top"
                  priority={false}
                />
              </motion.div>

              {/* floating card: views */}
              <motion.div
                {...reveal(0.5)}
                className="absolute -left-4 top-[14%] z-10 sm:-left-10"
              >
                <motion.div
                  animate={reduced ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-[0_16px_44px_rgba(56,32,68,0.18)] backdrop-blur-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-heading text-xl font-extrabold leading-none text-primary">50M+</span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-charcoal/60">
                      Organic views
                    </span>
                  </span>
                </motion.div>
              </motion.div>

              {/* floating card: clients */}
              <motion.div
                {...reveal(0.7)}
                className="absolute -left-2 bottom-[22%] z-10 sm:-left-8"
              >
                <motion.div
                  animate={reduced ? undefined : { y: [0, 8, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="flex items-center gap-3 rounded-2xl border border-gold/50 bg-white/90 px-4 py-3 shadow-[0_16px_44px_rgba(56,32,68,0.18)] backdrop-blur-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/25 text-primary-dark">
                    <UsersRound className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-heading text-xl font-extrabold leading-none text-primary-dark">25+</span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-charcoal/60">
                      Clients served
                    </span>
                  </span>
                </motion.div>
              </motion.div>

              {/* LinkedIn badge with sparkles circling it */}
              <Link
                href={FOUNDER.linkedin as Route}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${FOUNDER.fullName} on LinkedIn`}
                className="absolute -right-3 top-[26%] z-10 h-16 w-16 sm:-right-6"
              >
                {!reduced &&
                  [0, 1.5].map((d) => (
                    <motion.span
                      key={d}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-primary/30"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 3, delay: d, repeat: Infinity, ease: "easeOut" }}
                    />
                  ))}
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute -inset-[34%]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  >
                    {["left-1/2 top-0 -translate-x-1/2", "bottom-[14%] left-[6%]", "bottom-[14%] right-[6%]"].map(
                      (spot, k) => (
                        <motion.svg
                          key={k}
                          viewBox="0 0 24 24"
                          className={`absolute h-3 w-3 text-gold ${spot}`}
                          animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6] }}
                          transition={{ duration: 2 + k * 0.4, delay: k * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path d={STAR_PATH} fill="currentColor" />
                        </motion.svg>
                      ),
                    )}
                  </motion.span>
                )}
                <span className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-[0_10px_30px_rgba(82,33,102,0.25)] transition-transform hover:scale-105">
                  <LinkedInIcon className="h-7 w-7" />
                </span>
              </Link>

              {/* overlapping quote card */}
              <motion.figure
                {...reveal(0.9)}
                className="absolute -bottom-8 right-[-4%] z-20 w-[72%] rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-5 text-white shadow-[0_24px_60px_-18px_rgba(56,32,68,0.7)] sm:right-[-10%]"
              >
                <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
                <blockquote className="mt-2 text-[13px] font-medium leading-relaxed !text-white/90 sm:text-sm">
                  {FOUNDER.quote}
                </blockquote>
              </motion.figure>
            </div>
          </div>

          {/* ===================== TEXT ===================== */}
          <div className="relative">
            <motion.div {...reveal()}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-white/70 px-4 py-2 shadow-[0_6px_20px_rgba(82,33,102,0.08)] backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary sm:text-xs">
                  Meet the Founder
                </span>
              </span>
            </motion.div>

            <motion.h2
              id="founder-heading"
              {...reveal(0.1)}
              className="mt-6 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-charcoal sm:text-5xl"
            >
              Hi, I&apos;m{" "}
              <span className="relative inline-block font-editorial font-normal italic text-primary">
                {FOUNDER.firstName}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full"
                >
                  <motion.path
                    d="M2 8 C 60 1, 140 1, 298 7"
                    fill="none"
                    stroke="var(--color-gold, #c9ae78)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: reduced ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduced ? 0 : 0.9, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h2>

            <motion.p {...reveal(0.15)} className="mt-4 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark">
                {FOUNDER.role}
              </span>
            </motion.p>

            <motion.div {...reveal(0.2)} className="mt-6 space-y-4">
              {FOUNDER.bio.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-text-secondary sm:text-base">
                  {p}
                </p>
              ))}
            </motion.div>

            {/* credentials */}
            <motion.ul {...reveal(0.28)} className="mt-6 grid gap-3 sm:grid-cols-2">
              {FOUNDER.credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-charcoal/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </motion.ul>

            {/* stats */}
            <motion.div
              {...reveal(0.34)}
              className="mt-8 grid max-w-lg grid-cols-3 rounded-[10px] border border-primary/15 bg-white/70 py-4 shadow-[0_10px_30px_rgba(82,33,102,0.06)] backdrop-blur-md"
            >
              {FOUNDER.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-3 sm:px-5 ${i > 0 ? "border-l border-primary/15" : ""}`}
                >
                  <span className="block bg-gradient-to-br from-primary to-primary-muted bg-clip-text font-heading text-2xl font-black text-transparent sm:text-3xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} duration={2.2} />
                  </span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-charcoal/60 sm:text-[11px]">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* signature + buttons */}
            <motion.div {...reveal(0.4)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-6">
              <div>
                <svg aria-hidden="true" viewBox="0 0 190 56" className="h-12 w-40 text-primary" fill="none">
                  <motion.path
                    d="M4 38 C 16 6, 30 4, 28 28 C 27 44, 18 52, 40 30 C 52 18, 58 20, 56 32 C 55 40, 66 36, 76 22 C 84 10, 92 12, 90 26 C 88 40, 104 40, 116 24 C 126 12, 134 14, 132 28 C 130 42, 150 40, 186 18"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: reduced ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduced ? 0 : 2, delay: 0.8, ease: "easeInOut" }}
                  />
                </svg>
                <p className="mt-1 text-xs font-semibold text-charcoal/70">{FOUNDER.fullName}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Let&apos;s Talk
                </Button>
                <Link
                  href={FOUNDER.linkedin as Route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-b border-gold/70 pb-0.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  Connect on LinkedIn
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}