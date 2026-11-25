"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { InstagramIcon, LinkedInIcon } from "../common/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: 50, suffix: "M+", label: "Organic views" },
  { value: 25, suffix: "+", label: "Clients served" },
  { value: 7, suffix: "+", label: "Countries" },
];

export function HeroNew1() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[820px] overflow-hidden bg-[var(--brand-white)] pt-28 md:min-h-[760px] md:pt-32 lg:min-h-[780px] lg:pt-36">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-36 top-20 h-[520px] w-[520px] rounded-full bg-[var(--brand-muted)]/[0.10] blur-[120px]" />
        <div className="absolute right-[-14%] top-[-10%] h-[760px] w-[760px] rounded-full border border-[var(--brand-purple)]/[0.08]" />
        <div className="absolute right-[4%] top-[18%] h-[500px] w-[500px] rounded-full border border-[var(--brand-purple)]/[0.06]" />
      </div>

      <Container className="relative z-10 h-full">
        <div className="grid min-h-[620px] items-center gap-8 lg:grid-cols-[52%_48%] lg:gap-0">
          <div className="relative z-20 pb-10 pt-4 text-center lg:pb-16 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease }}
              className="mb-6 flex items-center justify-center gap-3 lg:justify-start"
            >
              <span className="h-px w-10 bg-[var(--brand-purple)]" />
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-purple)] sm:text-xs">
                Leading LinkedIn branding agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : 0.08, ease }}
              className="mx-auto max-w-[720px] text-balance font-heading text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[0.88] tracking-[-0.065em] text-[var(--brand-charcoal)] lg:mx-0 lg:text-[clamp(4.5rem,6.4vw,7.25rem)]"
            >
              <span className="block">Brands.</span>
              <span className="block">We build</span>
              <span className="block font-editorial font-normal italic text-[var(--brand-purple)]">
                Legacies.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.2, ease }}
              className="mx-auto mt-7 max-w-xl text-base leading-[1.65] text-[var(--brand-charcoal)]/75 sm:text-lg lg:mx-0"
            >
              We help founders, executives, professionals and companies build LinkedIn presences that lead, influence and last.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.32, ease }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <MagneticButton>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                >
                  Build your legacy
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.48 }}
              className="mt-9 grid max-w-xl grid-cols-3 border-y border-[var(--brand-purple)]/10 py-4 sm:mt-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex min-w-0 flex-col ${index > 0 ? "border-l border-[var(--brand-purple)]/10" : ""}`}
                >
                  <span className="font-heading text-2xl font-black text-[var(--brand-purple)] sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.2} />
                  </span>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--brand-charcoal)]/55 sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative hidden h-[620px] items-end justify-center lg:flex">
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.22, ease }}
              className="relative h-full w-full"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 620 620"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="uvokaMonolith" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#795A86" />
                    <stop offset="0.52" stopColor="#522166" />
                    <stop offset="1" stopColor="#382044" />
                  </linearGradient>
                  <linearGradient id="uvokaMonolithFace" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F9F7FB" />
                    <stop offset="1" stopColor="#EDE6F4" />
                  </linearGradient>
                  <filter id="uvokaShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="18" dy="24" stdDeviation="18" floodColor="#382044" floodOpacity="0.20" />
                  </filter>
                </defs>

                <ellipse cx="390" cy="566" rx="210" ry="32" fill="#382044" opacity="0.14" />

                <g filter="url(#uvokaShadow)">
                  <path d="M230 500V202L350 178V510Z" fill="url(#uvokaMonolith)" />
                  <path d="M350 178L520 112V430L350 510Z" fill="#522166" />
                  <path d="M230 202L350 178L520 112L390 137Z" fill="url(#uvokaMonolithFace)" />
                  <path d="M230 202L390 137V450L230 500Z" fill="#F7F4FA" opacity="0.96" />
                  <path d="M390 137L520 112V430L390 450Z" fill="#795A86" opacity="0.28" />

                  <path d="M215 510L350 510L520 430L390 450Z" fill="#382044" />
                  <path d="M215 510V530L390 470V450Z" fill="#522166" />
                </g>

                <motion.g
                  animate={reduced ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="390" cy="224" r="48" fill="#FFFFFF" opacity="0.96" />
                  <image href="/logo/journeylogo.png" x="360" y="194" width="60" height="60" />
                </motion.g>

                <motion.g
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "390px 224px" }}
                >
                  <circle cx="390" cy="224" r="82" fill="none" stroke="#522166" strokeOpacity="0.22" />
                  <circle cx="472" cy="224" r="7" fill="#522166" />
                  <circle cx="390" cy="142" r="5" fill="#FFFFFF" stroke="#522166" strokeOpacity="0.35" />
                </motion.g>
              </svg>

              <motion.div
                animate={reduced ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute right-[2%] top-[29%] flex h-20 w-20 items-center justify-center rounded-2xl border border-white bg-white/95 text-[var(--brand-purple)] shadow-[0_18px_50px_rgba(56,32,68,0.16)]"
              >
                <InstagramIcon className="h-8 w-8"  />
              </motion.div>

              <motion.div
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute left-[22%] top-[52%] flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--brand-purple)]/10 bg-white text-[var(--brand-purple)] shadow-[0_18px_50px_rgba(56,32,68,0.16)]"
              >
                <LinkedInIcon className="h-10 w-10" />
              </motion.div>

              <motion.div
                animate={reduced ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-[11%] right-[17%] rounded-full border border-[var(--brand-purple)]/10 bg-white px-5 py-3 shadow-[0_12px_35px_rgba(56,32,68,0.12)]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-purple)]">Category leader</span>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative mt-4 h-[420px] lg:hidden">
            <Image
              src="/logo/journeylogo.png"
              alt="UVOKA"
              fill
              priority
              className="object-contain p-16"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
