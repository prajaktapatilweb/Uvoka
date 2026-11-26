"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  FileText,
  Film,
  Heart,
  Layers,
  Lightbulb,
  Link2,
  MessageCircle,
  Newspaper,
  PenTool,
  Play,
  Repeat2,
  Send,
  Target,
  ThumbsUp,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { InstagramIcon, LinkedInIcon } from "@/components/common/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Logo used inside the company-page preview (/public/logo/uvoka-icon.png) */
const LOGO_SRC = "/logo/uvoka-icon.png";
const ease = [0.22, 1, 0.36, 1] as const;

/* =====================================================================
   SERVICE DATA. Edit names, descriptions and links here.
   (You can move this array to "@/data/servicesData" if you prefer.)
   `video` is optional: add { src, poster } to show a muted looping video
   instead of the animated mockup for that service.
   ===================================================================== */
type PreviewKey = "personal" | "company" | "leads" | "instagram" | "content";

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  preview: PreviewKey;
  video?: { src: string; poster?: string };
};

export const SERVICES_DATA: Service[] = [
  {
    id: "linkedin-personal-branding",
    number: "01",
    title: "LinkedIn Personal Branding",
    description:
      "We have built solid personal brands for 25+ clients and generated 50 million views, which led to them being featured in reputed media outlets and even going viral.",
    icon: LinkedInIcon,
    href: "/services",
    preview: "personal",
  },
  {
    id: "linkedin-company-page-branding",
    number: "02",
    title: "LinkedIn Company Page Branding",
    description:
      "We help build your company's brand along with yours, creating a cohesive presence that amplifies your personal authority.",
    icon: Building2,
    href: "/services",
    preview: "company",
  },
  {
    id: "linkedin-lead-generation",
    number: "03",
    title: "LinkedIn Lead Generation",
    description:
      "We help build a sustainable pipeline for you through an organic and personalized outreach method that converts connections into opportunities.",
    icon: Target,
    href: "/services",
    preview: "leads",
  },
  {
    id: "instagram-personal-branding",
    number: "04",
    title: "Instagram Personal Branding",
    description:
      "We help you build a recognizable Instagram presence through strategic content, consistent visual identity, and audience-focused storytelling that turns attention into trust.",
    icon: InstagramIcon,
    href: "/services",
    preview: "instagram",
  },
  {
    id: "content-creation-strategy",
    number: "05",
    title: "Content Creation & Strategy",
    description:
      "We create strategic, engaging content that communicates your expertise, strengthens your brand voice, and keeps your audience connected across digital platforms.",
    icon: PenTool,
    href: "/services",
    preview: "content",
  },
];

/* =====================================================================
   Small building blocks for the previews
   ===================================================================== */
const card =
  "rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_14px_34px_-14px_rgba(82,33,102,0.3)]";

/** A card that fades in, then floats gently. */
function Float({
  children,
  className = "",
  delay = 0,
  amp = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amp?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -amp, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <span className={`block h-2 rounded-full bg-charcoal/15 ${className}`} style={{ width: w }} />
);

/** Draws a design at 440x330 and scales it to fit any width. */
function PreviewFrame({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / 440);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[#f7f2fb] via-white to-[var(--color-ivory)]"
    >
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(82,33,102,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold/40" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary-muted/15 blur-3xl" />
      <div
        className="absolute left-0 top-0 h-[330px] w-[440px] origin-top-left"
        style={{ transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

/* =====================================================================
   01  LinkedIn personal branding
   ===================================================================== */
function PersonalPreview() {
  const reduced = useReducedMotion();
  return (
    <>
      <Float className="left-[58px] top-[30px]" amp={4}>
        <div className={`${card} w-[220px] overflow-hidden`}>
          <div className="relative h-[64px] bg-gradient-to-r from-primary to-primary-muted">
            <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md bg-white/90 text-primary">
              <LinkedInIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="px-4 pb-4">
            <span className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-dark to-primary font-heading text-sm font-bold text-white">
              UV
            </span>
            <p className="mt-2 flex items-center gap-1 font-heading text-[15px] font-bold text-charcoal">
              Industry Leader <BadgeCheck className="h-4 w-4 text-primary" />
            </p>
            <p className="text-[11px] text-text-secondary">Founder &amp; CEO | Building What&apos;s Next</p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-primary px-4 py-1.5 text-[11px] font-semibold text-white">Connect</span>
              <span className="rounded-full border border-primary px-4 py-1.5 text-[11px] font-semibold text-primary">Message</span>
            </div>
            <div className="mt-3 flex justify-between rounded-lg bg-ivory px-3 py-2 text-[10px] font-medium text-primary-dark">
              <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />12.4K</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />860</span>
              <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3" />2.1K</span>
            </div>
          </div>
        </div>
      </Float>

      <Float className="left-[292px] top-[24px]" delay={0.15} amp={7}>
        <div className={`${card} w-[132px] p-3`}>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-text-muted">Profile views</p>
          <p className="font-heading text-xl font-extrabold text-primary">+312%</p>
          <svg viewBox="0 0 100 30" className="mt-1 h-7 w-full" fill="none">
            <motion.path
              d="M2 26 L18 20 L34 23 L50 12 L68 15 L98 3"
              stroke="var(--color-gold, #c9ae78)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0 : 1.4, delay: 0.6 }}
            />
          </svg>
        </div>
      </Float>

      <Float className="left-[302px] top-[122px]" delay={0.3} amp={6}>
        <div className={`${card} w-[124px] p-3`}>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-text-muted">Followers</p>
          <p className="font-heading text-xl font-extrabold text-primary-dark">12.4K</p>
          <div className="mt-1 flex h-8 items-end gap-1">
            {[30, 45, 40, 65, 80, 100].map((h, i) => (
              <motion.span
                key={i}
                className="w-full origin-bottom rounded-sm bg-primary/70"
                style={{ height: `${h}%` }}
                initial={{ scaleY: reduced ? 1 : 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </Float>

      <Float className="left-[262px] top-[236px]" delay={0.45} amp={5}>
        <div className="flex items-center gap-2 rounded-full border border-gold/60 bg-white px-3 py-2 shadow-[0_10px_26px_-12px_rgba(82,33,102,0.3)]">
          <Newspaper className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-semibold text-primary-dark">Featured in media</span>
        </div>
      </Float>

      <Float className="left-[14px] top-[262px]" delay={0.6} amp={5}>
        <div className="flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-white shadow-lg">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
          <span className="text-[11px] font-semibold">Profile optimized</span>
        </div>
      </Float>
    </>
  );
}

/* =====================================================================
   02  LinkedIn company page branding
   ===================================================================== */
function CompanyPreview() {
  const reduced = useReducedMotion();
  return (
    <>
      <svg className="absolute inset-0 h-[330px] w-[440px]" fill="none" aria-hidden="true">
        <motion.path
          d="M 68 118 C 68 176, 150 184, 214 154"
          stroke="var(--color-primary)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="5 6"
          animate={reduced ? undefined : { strokeDashoffset: [0, -22] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <Float className="left-[10px] top-[32px]" amp={4}>
        <div className={`${card} w-[116px] p-3`}>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">Founder</span>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-dark to-primary" />
            <span className="space-y-1.5"><Bar w="38px" /><Bar w="26px" /></span>
          </div>
        </div>
      </Float>

      <Float className="left-[168px] top-[20px]" delay={0.15} amp={5}>
        <div className={`${card} w-[256px] overflow-hidden`}>
          <div className="h-[48px] bg-gradient-to-r from-primary-dark to-primary-muted" />
          <div className="px-4 pb-3">
            <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-xl border-4 border-white bg-gradient-to-br from-primary to-primary-dark shadow">
              <Image src={LOGO_SRC} alt="" width={28} height={28} className="h-6 w-6 object-contain" />
            </span>
            <div className="mt-1.5 flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-bold text-charcoal">Your Company</p>
                <p className="text-[10px] text-text-secondary">Technology · 12K followers</p>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-white">Follow</span>
            </div>
          </div>
        </div>
      </Float>

      <Float className="left-[84px] top-[168px]" delay={0.3} amp={3}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-primary-dark shadow-md">
          <Link2 className="h-3.5 w-3.5 text-primary" /> One cohesive brand
        </span>
      </Float>

      <Float className="left-[14px] top-[222px]" delay={0.4} amp={5}>
        <div className={`${card} flex w-[200px] items-center gap-3 p-3`}>
          <span className="h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br from-primary to-primary-muted" />
          <span className="flex-1 space-y-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">Company update</span>
            <Bar w="100%" /><Bar w="60%" />
          </span>
        </div>
      </Float>

      <Float className="left-[226px] top-[222px]" delay={0.55} amp={5}>
        <div className={`${card} flex w-[200px] items-center gap-3 p-3`}>
          <span className="h-11 w-11 shrink-0 rounded-lg bg-gold/50" />
          <span className="flex-1 space-y-1.5">
            <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-primary">
              <Heart className="h-3 w-3" /> 1.8K
            </span>
            <Bar w="100%" /><Bar w="70%" />
          </span>
        </div>
      </Float>
    </>
  );
}

/* =====================================================================
   03  LinkedIn lead generation
   ===================================================================== */
const LEAD_STAGES = [
  { icon: Send, label: "Outreach" },
  { icon: UserPlus, label: "Connections" },
  { icon: MessageCircle, label: "Conversations" },
  { icon: Target, label: "Opportunities" },
];
const FUNNEL = [
  { w: "100%", text: "120 personalised messages" },
  { w: "78%", text: "46 new connections" },
  { w: "58%", text: "18 conversations" },
  { w: "40%", text: "7 opportunities" },
];

function LeadsPreview() {
  const reduced = useReducedMotion();
  return (
    <>
      {/* stage row */}
      <div className="absolute left-[62px] top-[43px] h-[3px] w-[316px] rounded bg-primary/15">
        <motion.div
          className="h-full origin-left rounded bg-primary"
          animate={reduced ? { scaleX: 1 } : { scaleX: [0, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
        />
      </div>
      {LEAD_STAGES.map(({ icon: Icon, label }, i) => (
        <div key={label} className="absolute top-[20px]" style={{ left: 18 + i * 110 }}>
          <motion.span
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-primary/30 bg-white text-primary shadow-md"
            animate={reduced ? undefined : { scale: [1, 1.18, 1], backgroundColor: ["#ffffff", "#f1e8f6", "#ffffff"] }}
            transition={{ duration: 1, delay: i * 1.5, repeat: Infinity, repeatDelay: 5 }}
          >
            <Icon className="h-5 w-5" />
          </motion.span>
          <p className="mt-1.5 w-[90px] -translate-x-[22px] text-center text-[10px] font-semibold text-primary-dark">{label}</p>
        </div>
      ))}

      {/* funnel */}
      <div className="absolute left-[20px] top-[118px] w-[400px] space-y-2">
        {FUNNEL.map((f, i) => (
          <motion.div
            key={f.text}
            className="mx-auto flex h-[30px] items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-muted px-3 text-[11px] font-semibold text-white shadow"
            initial={{ width: reduced ? f.w : "0%", opacity: reduced ? 1 : 0 }}
            animate={{ width: f.w, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease }}
          >
            <span className="truncate">{f.text}</span>
          </motion.div>
        ))}
      </div>

      {/* new lead notification */}
      <motion.div
        className="absolute left-[150px] top-[270px] flex items-center gap-2 rounded-2xl border border-gold/60 bg-white px-3 py-2 shadow-[0_14px_34px_-14px_rgba(82,33,102,0.4)]"
        animate={reduced ? undefined : { opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.15, 0.8, 1] }}
      >
        <span className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary-muted" />
        <span>
          <span className="block text-[11px] font-bold text-charcoal">New qualified lead</span>
          <span className="block text-[9px] text-text-secondary">Replied to your message</span>
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-white">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      </motion.div>
    </>
  );
}

/* =====================================================================
   04  Instagram personal branding
   ===================================================================== */
const TILES = [
  "bg-primary", "bg-gold/50", "bg-primary-muted",
  "bg-ivory border border-[var(--color-border)]", "bg-primary-dark", "bg-gold/30",
  "bg-primary/60", "bg-primary-muted/60", "bg-gold/70",
];

function InstagramPreview() {
  const reduced = useReducedMotion();
  return (
    <>
      <Float className="left-[132px] top-[12px]" amp={4}>
        <div className="h-[306px] w-[176px] overflow-hidden rounded-[28px] border-[6px] border-primary-dark bg-white p-3 shadow-[0_24px_50px_-18px_rgba(56,32,68,0.5)]">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[conic-gradient(from_0deg,var(--color-gold,#c9ae78),#522166,var(--color-gold,#c9ae78))] p-[2px]">
              <span className="block rounded-full bg-white p-[2px]">
                <span className="block h-10 w-10 rounded-full bg-gradient-to-br from-primary-dark to-primary" />
              </span>
            </span>
            <span className="grid flex-1 grid-cols-3 text-center">
              {[["128", "Posts"], ["24.6K", "Followers"], ["310", "Following"]].map(([n, l]) => (
                <span key={l}>
                  <span className="block text-[10px] font-bold text-charcoal">{n}</span>
                  <span className="block text-[7px] text-text-muted">{l}</span>
                </span>
              ))}
            </span>
          </div>
          <div className="mt-2 space-y-1"><Bar w="70%" /><Bar w="50%" /></div>
          <div className="mt-2 rounded-md bg-primary py-1 text-center text-[10px] font-semibold text-white">Follow</div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {TILES.map((t, i) => (
              <motion.span
                key={i}
                className={`relative flex aspect-square items-center justify-center rounded-[4px] ${t}`}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
              >
                {(i === 1 || i === 5) && <Play className="h-3 w-3 fill-white text-white" />}
              </motion.span>
            ))}
          </div>
        </div>
      </Float>

      <Float className="left-[14px] top-[66px]" delay={0.2} amp={6}>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_10px_26px_-12px_rgba(82,33,102,0.35)]">
          <motion.span animate={reduced ? undefined : { scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}>
            <Heart className="h-4 w-4 fill-primary text-primary" />
          </motion.span>
          <span className="text-[11px] font-bold text-primary-dark">2.4K likes</span>
        </div>
      </Float>
      <Float className="left-[318px] top-[108px]" delay={0.35} amp={6}>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_10px_26px_-12px_rgba(82,33,102,0.35)]">
          <Play className="h-4 w-4 fill-primary text-primary" />
          <span className="text-[11px] font-bold text-primary-dark">86K plays</span>
        </div>
      </Float>
      <Float className="left-[10px] top-[210px]" delay={0.5} amp={5}>
        <div className="flex items-center gap-2 rounded-full border border-gold/60 bg-white px-3 py-2 shadow-md">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-bold text-primary-dark">+4.2K followers</span>
        </div>
      </Float>
      <Float className="left-[318px] top-[238px]" delay={0.65} amp={5}>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md">
          <span className="h-3.5 w-3.5 rounded-full bg-primary" />
          <span className="h-3.5 w-3.5 rounded-full bg-primary-muted" />
          <span className="h-3.5 w-3.5 rounded-full bg-gold" />
          <span className="text-[10px] font-semibold text-primary-dark">Brand identity</span>
        </div>
      </Float>
    </>
  );
}

/* =====================================================================
   05  Content creation and strategy
   ===================================================================== */
const STAGES = [
  { icon: Lightbulb, label: "Ideas" },
  { icon: CalendarDays, label: "Plan" },
  { icon: Film, label: "Create" },
  { icon: Send, label: "Publish" },
];
const POSTS = [
  { icon: Layers, label: "Carousel", tint: "from-primary to-primary-muted" },
  { icon: Film, label: "Reel", tint: "from-primary-dark to-primary" },
  { icon: FileText, label: "Article", tint: "from-gold to-primary-muted" },
];

function ContentPreview() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(2);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 6), 2000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <>
      {STAGES.map(({ icon: Icon, label }, k) => (
        <div
          key={label}
          className="absolute top-[22px] h-[232px] w-[100px] rounded-xl border border-[var(--color-border)] bg-white/70"
          style={{ left: 14 + k * 106 }}
        >
          <div className="flex flex-col items-center gap-1 pt-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-[10px] font-semibold text-primary-dark">{label}</span>
          </div>
        </div>
      ))}

      {POSTS.map(({ icon: Icon, label, tint }, j) => {
        const col = (((tick - 2 * j) % 6) + 6) % 6;
        const visible = col <= 3;
        const c = Math.min(col, 3);
        return (
          <motion.div
            key={label}
            className={`absolute top-[96px] w-[88px] rounded-xl p-2 ${card}`}
            initial={false}
            animate={{ left: 20 + c * 106, opacity: visible ? 1 : 0 }}
            transition={{ left: { duration: col === 0 ? 0 : 0.8, ease }, opacity: { duration: 0.4 } }}
          >
            <span className={`flex h-12 items-center justify-center rounded-lg bg-gradient-to-br ${tint}`}>
              <Icon className="h-5 w-5 text-white" />
            </span>
            <span className="mt-1.5 block text-[10px] font-semibold text-charcoal">{label}</span>
            <Bar w="70%" className="mt-1" />
          </motion.div>
        );
      })}

      <Float className="left-[14px] top-[270px]" delay={0.3} amp={3}>
        <div className="flex w-[412px] items-center gap-3 rounded-full border border-gold/50 bg-white px-4 py-2 shadow-md">
          <PenTool className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-semibold text-primary-dark">Your brand voice, every post</span>
          <span className="ml-auto h-1.5 w-24 overflow-hidden rounded-full bg-primary/15">
            <motion.span
              className="block h-full origin-left rounded-full bg-primary"
              animate={reduced ? { scaleX: 0.8 } : { scaleX: [0.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          </span>
        </div>
      </Float>
    </>
  );
}

const PREVIEWS: Record<PreviewKey, () => React.JSX.Element> = {
  personal: PersonalPreview,
  company: CompanyPreview,
  leads: LeadsPreview,
  instagram: InstagramPreview,
  content: ContentPreview,
};

function ServicePreview({ service }: { service: Service }) {
  const reduced = useReducedMotion();

  if (service.video) {
    return (
      <video
        className="aspect-[4/3] w-full rounded-2xl border border-[var(--color-border)] object-cover"
        src={service.video.src}
        poster={service.video.poster}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        aria-label={`${service.title} preview video`}
      />
    );
  }

  const Preview = PREVIEWS[service.preview];
  return (
    <PreviewFrame>
      <Preview />
    </PreviewFrame>
  );
}

/* =====================================================================
   THE SECTION
   ===================================================================== */
export function ServicesShowcase() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = SERVICES_DATA.length;
  const service = SERVICES_DATA[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % count;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="services-showcase"
      aria-label="Our services"
      className="section-padding-lg relative overflow-hidden bg-gradient-to-b from-white via-[var(--color-ivory)]/60 to-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 -z-0 h-[420px] w-[420px] rounded-full bg-primary-muted/15 blur-[110px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Expert Solutions"
          title="Our Services"
          italicPhrase="Services"
          subtitle="Transforming LinkedIn profiles into powerful business assets through strategic branding and authentic engagement."
          className="mb-10 md:mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(290px,340px)_1fr] lg:gap-10">
          {/* ================= left: vertical navigation ================= */}
          <div className="relative [--icon-center:1.75rem] [--item-h:3.5rem] lg:[--icon-center:2.25rem] lg:[--item-h:4.5rem]">
            {/* connecting line + active progress */}
            <span
              aria-hidden="true"
              className="absolute bottom-[calc(var(--item-h)/2)] left-[var(--icon-center)] top-[calc(var(--item-h)/2)] w-px -translate-x-1/2 bg-primary/15"
            >
              <motion.span
                className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-primary to-gold"
                initial={false}
                animate={{ scaleY: active / (count - 1) }}
                transition={{ duration: reduced ? 0 : 0.5, ease }}
              />
            </span>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Services"
              onKeyDown={onKeyDown}
              className="relative flex flex-col gap-2"
            >
              {SERVICES_DATA.map((s, i) => {
                const isActive = i === active;
                const Icon = s.icon;
                return (
                  <motion.button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`service-tab-${s.id}`}
                    aria-selected={isActive}
                    aria-controls="services-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.08, ease }}
                    whileHover={reduced || isActive ? undefined : { x: 4 }}
                    className={`relative z-10 flex h-[var(--item-h)] w-full items-center gap-3 rounded-2xl border pl-2 pr-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:pl-3 ${
                      isActive
                        ? "border-primary/25 bg-white shadow-[0_14px_36px_-16px_rgba(82,33,102,0.35)]"
                        : "border-transparent hover:border-[var(--color-border)] hover:bg-white/70"
                    }`}
                  >
                    <span className="relative shrink-0">
                      {isActive && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute -inset-1.5 rounded-2xl bg-primary/30 blur-md"
                          animate={reduced ? { opacity: 0.5 } : { opacity: [0.35, 0.8, 0.35] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span
                        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 lg:h-12 lg:w-12 ${
                          isActive
                            ? "bg-gradient-to-br from-primary to-primary-dark text-white"
                            : "border border-[var(--color-border)] bg-white text-primary"
                        }`}
                      >
                        <Icon className="h-5 w-5 lg:h-[22px] lg:w-[22px]" />
                      </span>
                    </span>

                    <span className="min-w-0">
                      <span
                        className={`block font-mono text-[10px] font-semibold tracking-[0.18em] ${
                          isActive ? "text-gold" : "text-text-muted"
                        }`}
                      >
                        {s.number}
                      </span>
                      <span
                        className={`block font-heading text-[13px] font-semibold leading-tight sm:text-sm lg:text-[15px] ${
                          isActive ? "text-primary-dark" : "text-charcoal/70"
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ================= right: dynamic content panel ================= */}
          <div
            id="services-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${service.id}`}
            className="relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(82,33,102,0.25)] sm:p-8 lg:min-h-[500px] lg:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-ivory)] blur-2xl"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: reduced ? 0 : 28, scale: reduced ? 1 : 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: reduced ? 0 : -28, scale: reduced ? 1 : 0.98, transition: { duration: 0.22 } }}
                transition={{ duration: 0.5, ease }}
                className="relative grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10"
              >
                {/* text */}
                <div>
                  <span
                    aria-hidden="true"
                    className="block font-heading text-7xl font-black leading-none text-transparent opacity-40 [-webkit-text-stroke:1.5px_var(--color-primary)] sm:text-8xl"
                  >
                    {service.number}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-text-secondary sm:text-base">
                    {service.description}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button
                      href={service.href as Route}
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="h-4 w-4" />}
                    >
                      Explore Service
                    </Button>
                    <Link
                      href={"/contact" as Route}
                      className="border-b border-gold/70 pb-0.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
                    >
                      Let&apos;s Discuss
                    </Link>
                  </div>
                </div>

                {/* animated preview */}
                <ServicePreview service={service} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}