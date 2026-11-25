"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Layers,
  MessagesSquare,
  PhoneCall,
  TrendingUp,
  UserCog,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Put the white logo at /public/logo/uvoka-icon-white.png */
const LOGO_SRC = "/logo/uvoka-icon-white.png";

/* How tall the desktop scroll area is. The circle stays in view while you scroll
   through (DESKTOP_SCROLL_VH - 100)vh. Lower = shorter, higher = slower. */
const DESKTOP_SCROLL_VH = 260;

const STEPS = [
  {
    icon: PhoneCall,
    title: "Onboarding Call",
    text: "We ask you 50–60 questions about your personal and professional life to help us get into your shoes and understand your stories.",
  },
  {
    icon: UserCog,
    title: "Profile Optimization",
    text: "Our team will then work on your headline, bio, banner etc. and give you your optimization in the next 24 hours.",
  },
  {
    icon: Layers,
    title: "Content Pillars",
    text: "We use frameworks like TOFU, MOFU, BOFU to give you the perfect mix of topics that you will love.",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    text: "We share a Notion board with you with content every Monday. Which means zero follow-ups. Only 15–20 minutes of your time to approve content.",
  },
  {
    icon: MessagesSquare,
    title: "Graphics Approval",
    text: "To communicate with you in real time and churn content as per your requirements, we create a WhatsApp/Slack group to communicate with you faster.",
  },
  {
    icon: TrendingUp,
    title: "Progress Report",
    text: "We track your progress weekly to understand what's working and then deep dive every month to give you a detailed analysis.",
  },
];

type StepState = "idle" | "active" | "done";
const stateOf = (i: number, active: number, complete: boolean): StepState =>
  complete || i < active ? "done" : i === active ? "active" : "idle";

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- desktop: scroll positions (0 to 1 of the pinned area) ---------- */
const T = [0.06, 0.205, 0.35, 0.495, 0.64, 0.785]; // when each step becomes active
const COMPLETE = 0.93; // when the whole journey is finished

/* node positions on the circle (percent of the square box), starting at 12 o'clock */
const RADIUS = 42;
const NODES = STEPS.map((_, i) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  return {
    x: +(50 + RADIUS * Math.cos(a)).toFixed(2),
    y: +(50 + RADIUS * Math.sin(a)).toFixed(2),
  };
});

const nodeStyle: Record<StepState, string> = {
  idle: "border border-white/20 bg-white/10 text-white/50 backdrop-blur-sm",
  active:
    "border border-white bg-white text-primary-dark shadow-[0_0_40px_rgba(255,255,255,0.45),0_0_0_7px_rgba(255,255,255,0.15)]",
  done: "border border-white/40 bg-white/20 text-white",
};

/* =====================================================================
   DESKTOP: circular journey (1024px and up)
   ===================================================================== */
function DesktopJourney({ heading, reduced }: { heading: React.ReactNode; reduced: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "120px" });
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const compute = (p: number) => {
    let a = -1;
    T.forEach((t, i) => {
      if (p >= t) a = i;
    });
    setActive(a);
    setComplete(p >= COMPLETE);
  };
  useMotionValueEvent(scrollYProgress, "change", compute);
  useEffect(() => compute(scrollYProgress.get()), []); // eslint-disable-line react-hooks/exhaustive-deps

  // the path reaches step i exactly when step i activates (i / 6 of the circle)
  const path = useTransform(scrollYProgress, [T[0], T[5], COMPLETE], [0, 5 / 6, 1]);
  const smooth = useSpring(path, { stiffness: 110, damping: 24, mass: 0.5 });
  const pathLength = reduced ? path : smooth;

  const completedCount = complete ? 6 : Math.max(0, active);
  const animateLoops = inView && !reduced;
  const step = active >= 0 ? STEPS[active] : null;
  const Icon = step?.icon;

  return (
    <div
      ref={wrapRef}
      className="relative hidden lg:block"
      style={{ height: `${DESKTOP_SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center pb-6 pt-24">
        {heading}

        <div className="mt-4 grid min-h-0 grid-cols-[1fr_auto_1fr] items-center gap-6 xl:gap-12">
          {/* ---------- left: small legend ---------- */}
          <div className="justify-self-end text-right">
            <ul className="space-y-3">
              {STEPS.map((s, i) => {
                const st = stateOf(i, active, complete);
                return (
                  <li
                    key={s.title}
                    className={`flex items-center justify-end gap-3 text-[15px] transition-colors duration-500 ${
                      st === "active"
                        ? "font-semibold text-white"
                        : st === "done"
                          ? "text-white/70"
                          : "text-white/35"
                    }`}
                  >
                    {s.title}
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-500 ${
                        st === "active"
                          ? "scale-125 bg-white text-primary-dark"
                          : st === "done"
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white/40"
                      }`}
                    >
                      {st === "done" ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                  </li>
                );
              })}
            </ul>
            <motion.p
              animate={{ opacity: complete ? 0 : active < 0 ? 1 : 0.5 }}
              className="mt-8 flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60"
            >
              Scroll to explore
              <ChevronDown className={`h-4 w-4 ${animateLoops ? "animate-bounce" : ""}`} />
            </motion.p>
          </div>

          {/* ---------- centre: the circle ---------- */}
          <div
            className="relative aspect-square text-white"
            style={{ width: "min(calc(100svh - 17rem), 44vw, 620px)" }}
          >
            {/* slow dashed orbit */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[4%] rounded-full border border-dashed border-white/20"
              animate={animateLoops ? { rotate: 360 } : undefined}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            />

            {/* the connecting path */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 1000"
              className="absolute inset-0 h-full w-full overflow-visible"
              style={{
                filter: complete ? "drop-shadow(0 0 12px rgba(201,174,120,0.85))" : "none",
                transition: "filter 0.8s",
              }}
            >
              <circle cx="500" cy="500" r="420" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="6" />
              <g transform="rotate(-90 500 500)">
                <motion.circle
                  cx="500"
                  cy="500"
                  r="420"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                {/* turns gold when the whole journey is done */}
                <motion.circle
                  cx="500"
                  cy="500"
                  r="420"
                  fill="none"
                  stroke="var(--color-gold, #c9ae78)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ opacity: complete ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />
              </g>
            </svg>

            {/* centre disc */}
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white/[0.07] text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/20 backdrop-blur-md">
              <motion.div
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-dashed border-white/20"
                animate={animateLoops ? { rotate: -360 } : undefined}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-muted to-primary shadow-[0_10px_26px_rgba(0,0,0,0.4)] ring-2 ring-white/70 xl:h-16 xl:w-16">
                <Image src={LOGO_SRC} alt="" width={36} height={36} className="h-8 w-8 object-contain xl:h-9 xl:w-9" />
              </span>
              <p className="relative mt-3 max-w-[78%] font-heading text-base font-bold leading-tight !text-white xl:text-xl">
                Your Journey to{" "}
                <span className="font-editorial font-normal italic text-gold">Influence</span>
              </p>
              <p className="relative mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
                {completedCount} of 6 complete
              </p>

              <AnimatePresence>
                {complete && (
                  <motion.span
                    initial={{ scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="absolute -top-1 right-[12%] flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-[0_8px_24px_rgba(201,174,120,0.7)]"
                  >
                    <Check className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* the six step indicators */}
            {STEPS.map((s, i) => {
              const st = stateOf(i, active, complete);
              const StepIcon = s.icon;
              return (
                <div
                  key={s.title}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${NODES[i].x}%`, top: `${NODES[i].y}%`, width: "clamp(56px, 13%, 78px)" }}
                  aria-current={st === "active" ? "step" : undefined}
                >
                  {st === "active" && !reduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border-2 border-white/60"
                      animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <motion.div
                    animate={{ scale: st === "active" ? 1.28 : 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className={`relative flex aspect-square w-full flex-col items-center justify-center gap-0.5 rounded-full transition-colors duration-500 ${nodeStyle[st]}`}
                  >
                    <span className="text-[11px] font-bold leading-none tracking-wider">{pad(i + 1)}</span>
                    {st === "done" ? (
                      <Check className="h-5 w-5" strokeWidth={3} />
                    ) : (
                      <motion.span
                        animate={
                          st === "active" && !reduced
                            ? { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }
                            : { rotate: 0, scale: 1 }
                        }
                        transition={{ duration: 1.2, repeat: st === "active" ? Infinity : 0, repeatDelay: 1.6 }}
                      >
                        <StepIcon className="h-5 w-5" />
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ---------- right: the active step card ---------- */}
          <div className="relative min-h-[19rem] w-full max-w-[22rem] justify-self-start xl:max-w-[26rem]">
            <AnimatePresence mode="wait">
              {step && Icon ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: reduced ? 0 : 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduced ? 0 : -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl xl:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="bg-gradient-to-br from-white to-gold bg-clip-text font-heading text-6xl font-black leading-none text-transparent xl:text-7xl">
                      {pad(active + 1)}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-dark shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  {/* <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Step {pad(active + 1)} of 06
                  </p> */}
                  <h3 className="mt-2 font-heading text-2xl font-bold !text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed !text-white/75 xl:text-base">{step.text}</p>

                  <div className="mt-6 flex gap-1.5" aria-hidden="true">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                          i <= active ? "bg-white" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  {complete && active === 5 && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm font-semibold text-gold"
                    >
                      <Check className="h-4 w-4" /> All six steps complete
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="rounded-3xl border border-dashed border-white/25 bg-white/5 p-8 text-center"
                >
                  <p className="font-heading text-lg font-bold !text-white">Six steps to authority</p>
                  <p className="mt-2 text-sm !text-white/70">Keep scrolling and each step will open here.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   TABLET + MOBILE: vertical timeline (below 1024px)
   ===================================================================== */
function MobileTimeline({ reduced }: { reduced: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [marks, setMarks] = useState<number[]>([]);
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);

  // progress 0 to 1 = how far the line tip (kept at 55% of the screen) has travelled down the list
  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ["start 0.55", "end 0.55"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const lineScale = reduced ? scrollYProgress : smooth;

  // where each step's circle sits, as a fraction of the list height
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight || 1;
      setMarks(stepRefs.current.map((li) => (li ? (li.offsetTop + 28) / h : 1)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compute = (p: number) => {
    let a = -1;
    marks.forEach((t, i) => {
      if (p >= t) a = i;
    });
    setActive(a);
    setComplete(p >= 0.97);
  };
  useMotionValueEvent(scrollYProgress, "change", compute);
  useEffect(() => compute(scrollYProgress.get()), [marks]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={boxRef} className="relative mx-auto mt-10 max-w-xl md:max-w-2xl">
      {/* continuous line + progress */}
      <span aria-hidden="true" className="absolute bottom-0 left-[27px] top-0 w-0.5 -translate-x-1/2 rounded bg-white/15">
        <motion.span
          className={`absolute inset-0 origin-top rounded transition-colors duration-700 ${
            complete ? "bg-gold" : "bg-gradient-to-b from-white to-white/60"
          }`}
          style={{ scaleY: lineScale }}
        />
      </span>

      <ol className="space-y-6 md:space-y-8">
        {STEPS.map((s, i) => {
          const st = stateOf(i, active, complete);
          const Icon = s.icon;
          return (
            <li
              key={s.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              aria-current={st === "active" ? "step" : undefined}
              className="relative pl-[4.5rem] md:pl-24"
            >
              {/* numbered circle */}
              <motion.span
                animate={{ scale: st === "active" ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className={`absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg font-bold transition-colors duration-500 ${nodeStyle[st]}`}
              >
                {st === "active" && !reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-2 border-white/60"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {st === "done" ? <Check className="h-6 w-6" strokeWidth={3} /> : pad(i + 1)}
              </motion.span>

              {/* card */}
              <motion.div
                animate={{ opacity: st === "idle" ? 0.55 : 1, y: st === "active" ? -2 : 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl border p-5 transition-all duration-500 md:p-6 ${
                  st === "active"
                    ? "border-white/40 bg-white/[0.10] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)]"
                    : st === "done"
                      ? "border-white/15 bg-white/[0.05]"
                      : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                      st === "idle" ? "bg-white/10 text-white/50" : "bg-white text-primary-dark"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                      Step {pad(i + 1)} of 06
                    </p>
                    <h3 className="font-heading text-lg font-bold !text-white md:text-xl">{s.title}</h3>
                  </div>
                </div>
                <motion.p
                  animate={{ opacity: st === "idle" ? 0.45 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 text-[15px] leading-relaxed !text-white/75 md:text-base"
                >
                  {s.text}
                </motion.p>
              </motion.div>
            </li>
          );
        })}
      </ol>

      {/* completion mark at the end of the line */}
      <AnimatePresence>
        {complete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="absolute -bottom-4 left-[27px] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-white shadow-[0_8px_24px_rgba(201,174,120,0.7)]"
          >
            <Check className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =====================================================================
   SECTION
   ===================================================================== */
export function JourneyMap() {
  const reduced = useReducedMotion();

  const heading = (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-gold" />
          Our Process
        </span>
        <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight !text-white md:text-5xl">
          Our Proven{" "}
          <span className="font-editorial font-normal italic text-gold">Process</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm !text-white/70 sm:text-base">
          Six clear steps from the first call to measurable growth.
        </p>
      </div>
    </motion.div>
  );

  return (
    <section
      id="process"
      aria-label="Our proven process"
      className="relative isolate overflow-x-clip bg-gradient-to-br from-primary-dark via-primary to-bg-dark py-16 text-white md:py-24 lg:py-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[460px] w-[460px] rounded-full bg-primary-muted/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <Container>
        {/* below 1024px: vertical timeline */}
        <div className="lg:hidden">
          {heading}
          <MobileTimeline reduced={reduced} />
        </div>

        {/* 1024px and up: circular journey */}
        <DesktopJourney heading={heading} reduced={reduced} />
      </Container>
    </section>
  );
}