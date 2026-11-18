"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Phone,
  UserCog,
  Layers,
  CalendarDays,
  MessageSquareText,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Put the white logo file at /public/logo/uvoka-icon-white.png
const LOGO_SRC = "/images/uvoka-icon.png";
const AUTOPLAY_MS = 6000;

const steps = [
  {
    icon: Phone,
    title: "Onboarding Call",
    text: "We ask you 50-60 questions about your personal and professional life to help us get into your shoes and understand your stories.",
  },
  {
    icon: UserCog,
    title: "Profile Optimization",
    text: "Our team will then work on your headline, bio, banner etc and give you, your optimisation in the next 24 hours.",
  },
  {
    icon: Layers,
    title: "Content Pillars",
    text: "We use frameworks like TOFU, MOFU, BOFU to give you the perfect mix of topics that you will love.",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    text: "We share a notion board with you with content every Monday. Which means 0 follow ups. Only 15-20 mins of your time to approve content.",
  },
  {
    icon: MessageSquareText,
    title: "Graphics Approval",
    text: "To communicate with you in real-time & churn content as per your requirements, we create a WhatsApp/slack group to communicate with you faster.",
  },
  {
    icon: BarChart3,
    title: "Progress Report",
    text: "We track your progress weekly to understand what's working & then deep dive every month to give you a detailed analysis.",
  },
];

/* ---- Desktop path geometry (viewBox units; nodes are placed by % of this box) ---- */
const VB_W = 1200;
const VB_H = 440;
const LOW = 290;
const HIGH = 150;
const points = steps.map((_, i) => ({
  x: 100 + i * 200,
  y: i % 2 === 0 ? LOW : HIGH,
}));

const pathD = points.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const prev = points[i - 1];
  const mid = (p.x - prev.x) / 2;
  return `${d} C ${prev.x + mid} ${prev.y}, ${p.x - mid} ${p.y}, ${p.x} ${p.y}`;
}, "");

export function JourneyMap() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  // 0 → 1 along the whole wave. Drives the gold line AND the logo position
  const travel = useMotionValue(0);

  const pointAt = (v: number) => {
    const el = pathRef.current;
    if (!el) return points[0];
    return el.getPointAtLength(v * el.getTotalLength());
  };
  const logoLeft = useTransform(travel, (v) => `${(pointAt(v).x / VB_W) * 100}%`);
  const logoTop = useTransform(travel, (v) => `${(pointAt(v).y / VB_H) * 100}%`);

  // move the logo along the curve whenever the step changes
  useEffect(() => {
    const target = active / (steps.length - 1);
    if (reduced) {
      travel.set(target);
      return;
    }
    const controls = animate(travel, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, reduced, travel]);

  // autoplay (re-keyed on `active`, so a manual click restarts the timer)
  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative isolate overflow-hidden  bg-gradient-to-br from-primary-dark via-primary to-bg-dark py-20 text-white md:py-35"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-primary-muted/25 blur-[110px]"
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Our Process
          </span>
          <h2
            id="journey-heading"
            className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight !text-white md:text-5xl"
          >
            Your journey to{" "}
            <span className="font-editorial font-normal italic text-gold">
              category authority
            </span>
          </h2>
        </div>

        {/* ================= DESKTOP: logo travels along the wave ================= */}
        <div
          className="relative mx-auto mt-16 hidden w-full max-w-[1200px] lg:block"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="white"
              strokeOpacity="0.2"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: travel }}
            />
          </svg>

          {/* the travelling logo */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: logoLeft, top: logoTop }}
          >
            <span className="absolute inset-0 rounded-full bg-gold/40 motion-safe:animate-ping" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-primary-dark shadow-[0_0_0_8px_rgba(255,255,255,0.08)]">
              <Image
                src={LOGO_SRC}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-bg-dark">
                {active + 1}
              </span>
            </div>
          </motion.div>

          {steps.map((s, i) => {
            const p = points[i];
            const isActive = i === active;
            const isDone = i <= active;
            const below = p.y === HIGH; // high nodes: card opens below, low nodes: above
            const shift = i === 0 ? "-15%" : i === steps.length - 1 ? "-85%" : "-50%";
            const Icon = s.icon;

            return (
              <div key={s.title}>
                {/* stop on the path */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={isActive ? "step" : undefined}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  style={{
                    left: `${(p.x / VB_W) * 100}%`,
                    top: `${(p.y / VB_H) * 100}%`,
                  }}
                >
                  <span
                    className={`block h-4 w-4 rounded-full border-2 transition-colors duration-500 ${
                      isDone
                        ? "border-gold bg-gold"
                        : "border-white/60 bg-primary-dark"
                    }`}
                  />
                </button>

                {/* idle label (hidden while its card is open) */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute w-36 -translate-x-1/2 text-center text-sm font-medium text-white/70 transition-colors hover:text-white"
                    style={{
                      left: `${(p.x / VB_W) * 100}%`,
                      top: `${((p.y + (below ? 30 : -50)) / VB_H) * 100}%`,
                    }}
                  >
                    {s.title}
                  </button>
                )}

                {/* card: opens just after the logo arrives */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="card"
                      role="group"
                      aria-label={s.title}
                      initial={{ opacity: 0, y: reduced ? 0 : below ? -12 : 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                      transition={{
                        duration: reduced ? 0 : 0.5,
                        delay: reduced ? 0 : 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute z-20 w-[300px] overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-5 backdrop-blur-xl"
                      style={{
                        left: `${(p.x / VB_W) * 100}%`,
                        transform: `translateX(${shift})`,
                        ...(below
                          ? { top: `calc(${(p.y / VB_H) * 100}% + 56px)` }
                          : { bottom: `calc(${100 - (p.y / VB_H) * 100}% + 56px)` }),
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                            Step {String(i + 1).padStart(2, "0")}
                          </p>
                          <h3 className="font-heading text-lg font-bold !text-white">
                            {s.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed !text-white/80">
                        {s.text}
                      </p>
                      {!reduced && (
                        <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                          <motion.div
                            key={`${active}-${paused}`}
                            className="h-full bg-gold"
                            initial={{ width: paused ? "100%" : "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: paused ? 0 : (AUTOPLAY_MS - 600) / 1000,
                              delay: paused ? 0 : 0.6,
                              ease: "linear",
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ================= MOBILE / TABLET: vertical timeline ================= */}
        <ol className="relative mx-auto mt-12 max-w-xl lg:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[23px] top-4 w-px bg-white/20"
          />
          {steps.map((s, i) => {
            const isActive = i === active;
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative pl-16">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center"
                >
                  {isActive ? (
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-primary-dark shadow-[0_0_0_6px_rgba(255,255,255,0.08)]">
                      <Image
                        src={LOGO_SRC}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-bg-dark">
                        {i + 1}
                      </span>
                    </span>
                  ) : (
                    <span
                      className={`h-4 w-4 rounded-full border-2 ${
                        i < active
                          ? "border-gold bg-gold"
                          : "border-white/60 bg-primary-dark"
                      }`}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`block w-full pb-1 pt-2.5 text-left font-heading text-lg font-bold transition-colors ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {s.title}
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mb-6 mt-2 rounded-2xl border border-white/20 bg-white/[0.08] p-4 backdrop-blur-xl">
                        <Icon className="mb-2 h-5 w-5 text-gold" />
                        <p className="text-sm leading-relaxed !text-white/80">{s.text}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isActive && <div className="h-6" />}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
