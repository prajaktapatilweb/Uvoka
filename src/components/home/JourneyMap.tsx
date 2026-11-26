"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CalendarDays,
  Check,
  Layers,
  MessagesSquare,
  PhoneCall,
  TrendingUp,
  UserCog,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeadingcopy } from "../common/SectionHeadingcopy";

/* Put the logo at /public/logo/uvoka-icon.png (white logo with a transparent background) */
const LOGO_SRC = "/images/uvoka-icon.png";

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
const angleOf = (i: number) => -90 + i * 60;
const NODES = STEPS.map((_, i) => {
  const a = (angleOf(i) * Math.PI) / 180;
  return {
    x: +(50 + RADIUS * Math.cos(a)).toFixed(2),
    y: +(50 + RADIUS * Math.sin(a)).toFixed(2),
  };
});

/* the round purple badge that holds the logo */
const logoBadge =
  "bg-gradient-to-br from-primary-muted to-primary ring-2 ring-white shadow-[0_0_0_7px_rgba(255,255,255,0.14),0_12px_32px_rgba(0,0,0,0.45)]";

const nodeStyle: Record<StepState, string> = {
  idle: "border-2 border-white/25 bg-white/10 text-white/60 backdrop-blur-sm",
  active: "border-2 border-white bg-white text-primary-dark",
  done: "border-2 border-white/45 bg-white/20 text-white",
};

/* =====================================================================
   Live scroll progress.
   It measures the element on every scroll (and whenever the page layout
   changes), so it never goes out of date and it works the same way
   scrolling down, up, and again.
   ===================================================================== */
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/* desktop: 0 when the pinned area starts, 1 when it ends */
const deskProgress = (r: DOMRect, vh: number) => clamp01(-r.top / Math.max(1, r.height - vh));
/* mobile: the line tip is kept at 55% of the screen height */
const mobProgress = (r: DOMRect, vh: number) => clamp01((0.55 * vh - r.top) / Math.max(1, r.height));

function useLiveProgress(
  ref: React.RefObject<HTMLElement | null>,
  calc: (r: DOMRect, vh: number) => number,
) {
  const mv = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (el) mv.set(calc(el.getBoundingClientRect(), window.innerHeight));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    const ro = new ResizeObserver(schedule);
    if (ref.current) ro.observe(ref.current);
    ro.observe(document.body); // content above changed height
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      ro.disconnect();
    };
  }, [ref, calc, mv]);
  return mv;
}

/* =====================================================================
   DESKTOP: circular journey (1024px and up)
   ===================================================================== */
function DesktopJourney({ heading, reduced }: { heading: React.ReactNode; reduced: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "120px" });
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);

  const progress = useLiveProgress(wrapRef, deskProgress);

  const compute = (p: number) => {
    let a = -1;
    T.forEach((t, i) => {
      if (p >= t) a = i;
    });
    setActive(a);
    setComplete(p >= COMPLETE);
  };
  useMotionValueEvent(progress, "change", compute);
  useEffect(() => compute(progress.get()), []); // eslint-disable-line react-hooks/exhaustive-deps

  // the path reaches step i exactly when step i activates (i / 6 of the circle)
  const path = useTransform(progress, [T[0], T[5], COMPLETE], [0, 5 / 6, 1]);
  const smoothPath = useSpring(path, { stiffness: 110, damping: 24, mass: 0.5 });
  const pathLength = reduced ? path : smoothPath;

  // the logo marker glides around the ring to the active step
  const angle = useMotionValue(angleOf(0));
  const smoothAngle = useSpring(angle, { stiffness: 80, damping: 18, mass: 0.6 });
  const markerAngle = reduced ? angle : smoothAngle;
  useEffect(() => {
    angle.set(angleOf(Math.max(0, active)));
  }, [active, angle]);
  const markerLeft = useTransform(markerAngle, (a) => `${50 + RADIUS * Math.cos((a * Math.PI) / 180)}%`);
  const markerTop = useTransform(markerAngle, (a) => `${50 + RADIUS * Math.sin((a * Math.PI) / 180)}%`);

  /* click a step: scroll to the exact place where that step is active */
  const goTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const next = i < 5 ? T[i + 1] : COMPLETE;
    window.scrollTo({
      top: top + scrollable * ((T[i] + next) / 2),
      behavior: reduced ? "auto" : "smooth",
    });
  };

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
          {/* ---------- left: legend (click a title to jump) ---------- */}
          <div className="justify-self-end text-right">
            <ul className="space-y-3">
              {STEPS.map((s, i) => {
                const st = stateOf(i, active, complete);
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`group flex w-full items-center justify-end gap-3 text-[15px] transition-colors duration-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                        st === "active"
                          ? "font-semibold text-white"
                          : st === "done"
                            ? "text-white/70"
                            : "text-white/35"
                      }`}
                    >
                      {s.title}
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-500 ${
                          st === "active"
                            ? "scale-125 bg-white text-primary-dark"
                            : st === "done"
                              ? "bg-white/20 text-white"
                              : "bg-white/10 text-white/40 group-hover:bg-white/25"
                        }`}
                      >
                        {st === "done" ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* scroll hint: a small mouse, not an arrow */}
            <motion.div
              animate={{ opacity: complete ? 0 : active < 0 ? 1 : 0.55 }}
              className="mt-8 flex items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60"
            >
              Scroll or click a step
              <span className="relative flex h-8 w-5 justify-center rounded-full border border-white/40 pt-1.5">
                <motion.span
                  className="h-1.5 w-1 rounded-full bg-white/80"
                  animate={animateLoops ? { y: [0, 10, 0], opacity: [1, 0.2, 1] } : undefined}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </motion.div>
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
              {/* gold glow ring when the journey is finished */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-gold/70"
                initial={false}
                animate={{ opacity: complete ? [0.9, 0.3, 0.9] : 0 }}
                transition={{ duration: 2.4, repeat: complete ? Infinity : 0, ease: "easeInOut" }}
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-muted to-primary shadow-[0_10px_26px_rgba(0,0,0,0.4)] ring-2 ring-white/70 xl:h-16 xl:w-16">
                <Image src={LOGO_SRC} alt="" width={36} height={36} className="h-8 w-8 object-contain xl:h-9 xl:w-9" />
              </span>
              <p className="relative mt-3 max-w-[78%] font-heading text-base font-bold leading-tight !text-white xl:text-xl">
                Your Journey to{" "}
                <span className="font-editorial font-normal italic text-gold">Influence</span>
              </p>
              {/* <p
                className={`relative mt-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-500 ${
                  complete ? "text-gold" : "text-white/60"
                }`}
              >
                {complete ? "Journey complete" : `${completedCount} of 6 complete`}
              </p> */}
            </div>

            {/* the six numbered circles (click to jump) */}
            {STEPS.map((s, i) => {
              const st = stateOf(i, active, complete);
              const StepIcon = s.icon;
              return (
                <div
                  key={s.title}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${NODES[i].x}%`, top: `${NODES[i].y}%`, width: "clamp(60px, 14%, 84px)" }}
                >
                  <motion.button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    aria-current={st === "active" ? "step" : undefined}
                    whileHover={reduced ? undefined : { scale: 1.1 }}
                    whileTap={reduced ? undefined : { scale: 0.95 }}
                    animate={{ opacity: st === "active" ? 0 : 1 }}
                    className={`relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${nodeStyle[st]}`}
                  >
                    <span className="text-base font-bold leading-none">{pad(i + 1)}</span>
                    <StepIcon className="h-4 w-4 opacity-80" />
                    {st === "done" && (
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-white shadow-md">
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                    )}
                  </motion.button>
                </div>
              );
            })}

            {/* the logo marker: glides around the ring and sits on the active step */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: markerLeft, top: markerTop, width: "clamp(72px, 17%, 100px)" }}
            >
              <motion.div
                initial={false}
                animate={{ scale: active >= 0 ? 1 : 0, opacity: active >= 0 ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="relative aspect-square w-full"
              >
                {!reduced && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-white/60"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className={`absolute inset-0 flex items-center justify-center rounded-full ${logoBadge} ${
                    complete ? "ring-gold" : ""
                  }`}
                >
                  <Image src={LOGO_SRC} alt="" width={48} height={48} className="h-[52%] w-[52%] object-contain" />
                </span>
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white font-heading text-xs font-bold text-primary-dark shadow-lg">
                  {pad(Math.max(0, active) + 1)}
                </span>
              </motion.div>
            </motion.div>
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
                      <Check className="h-4 w-4" strokeWidth={3} /> All six steps complete
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
                  <p className="mt-2 text-sm !text-white/70">Keep scrolling, or click any number, and that step will open here.</p>
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

  const progress = useLiveProgress(boxRef, mobProgress);
  const smooth = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.4 });
  const lineScale = reduced ? progress : smooth;

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
  useMotionValueEvent(progress, "change", compute);
  useEffect(() => compute(progress.get()), [marks]); // eslint-disable-line react-hooks/exhaustive-deps

  /* tap a step: scroll so that the line tip lands just past that step */
  const goTo = (i: number) => {
    const el = boxRef.current;
    if (!el || !marks.length) return;
    const next = i < 5 ? marks[i + 1] : 0.97;
    const target = marks[i] + Math.min(0.02, (next - marks[i]) / 3);
    const rect = el.getBoundingClientRect();
    const wanted = 0.55 * window.innerHeight - target * el.offsetHeight;
    window.scrollTo({
      top: window.scrollY + (rect.top - wanted),
      behavior: reduced ? "auto" : "smooth",
    });
  };

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
              {/* round numbered circle (the logo when active). Tap to jump */}
              <motion.button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                animate={{ scale: st === "active" ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className={`absolute left-0 top-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full font-heading text-lg font-bold transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  st === "active" ? logoBadge : nodeStyle[st]
                }`}
              >
                {st === "active" && !reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-2 border-white/60"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {st === "active" ? (
                  <>
                    <Image src={LOGO_SRC} alt="" width={32} height={32} className="h-7 w-7 object-contain" />
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-primary-dark shadow-md">
                      {i + 1}
                    </span>
                  </>
                ) : st === "done" ? (
                  <>
                    {pad(i + 1)}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-white shadow-md">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                  </>
                ) : (
                  pad(i + 1)
                )}
              </motion.button>

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
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className="text-left font-heading text-lg font-bold !text-white md:text-xl"
                    >
                      {s.title}
                    </button>
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
            <Check className="h-5 w-5" strokeWidth={3} />
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
        <SectionHeadingcopy
          eyebrow=" Our Proven Process"
          title=" Your Journey to LinkedIn Success"
          highlight="LinkedIn Success"
          highlightColor="gold"
          subtitle="Our streamlined process ensures a seamless experience from onboarding to ongoing optimization."
          align="center"
          darkTheme
          className="mb-12 max-w-2xl md:mb-16"
        />
     
    </motion.div>
  );

  return (
    <section
      id="process"
      aria-label="Our proven process"
      className="relative isolate overflow-x-clip bg-gradient-to-br from-primary-dark via-primary to-bg-dark py-16 text-white md:py-24 lg:py-0 lg:pb-23"
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