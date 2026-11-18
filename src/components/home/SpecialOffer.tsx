"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  MailOpen,
  Globe,
  PenTool,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { CURRENT_OFFER, ADD_ONS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ADDON_ICONS = [MailOpen, Globe, PenTool];
const ease = [0.22, 1, 0.36, 1] as const;

export function SpecialOffer() {
  const reduced = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: reduced ? 0 : 0.7, delay, ease },
  });

  return (
    <section
      id="offer"
      className="section-padding-lg relative isolate overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-bg-dark text-white"
    >
      {/* glows + dot texture, same family as the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-primary-muted/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[460px] w-[460px] rounded-full bg-gold/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <Container>
        {/* ============ 1. THE OFFER: a ticket with a price stub ============ */}
        <motion.div
          {...reveal()}
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] shadow-[0_40px_90px_rgba(0,0,0,0.35)] lg:grid-cols-12"
        >
          {/* ticket body */}
          <div className="relative bg-ivory p-8 text-charcoal sm:p-12 lg:col-span-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-primary-muted to-gold" />

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-dark px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                {CURRENT_OFFER.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <Clock className="h-3.5 w-3.5" />
                {CURRENT_OFFER.discountPercentage}
              </span>
            </div>

            <h2 className="mt-6 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight !text-charcoal sm:text-4xl">
              {CURRENT_OFFER.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              {CURRENT_OFFER.subtitle}
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {CURRENT_OFFER.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-charcoal/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 flex items-center gap-2 font-mono text-xs text-primary">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              {CURRENT_OFFER.validityNotice}
            </p>
          </div>

          {/* price stub */}
          <div className="relative flex flex-col justify-between gap-8 bg-gradient-to-b from-primary to-primary-dark p-8 text-center sm:p-10 lg:col-span-4 lg:border-l-2 lg:border-dashed lg:border-white/30">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                Sprint Investment
              </span>
              <div className="mt-3 flex flex-col items-center gap-1">
                <span className="font-heading text-5xl font-extrabold text-gold xl:text-6xl">
                  {CURRENT_OFFER.discountPrice}
                </span>
                <span className="font-mono text-sm text-white/50 line-through">
                  {CURRENT_OFFER.originalPrice}
                </span>
              </div>
              <p className="mt-3 text-xs text-white/70">
                Billed quarterly · Verified deliverables guaranteed
              </p>
            </div>

            <div className="space-y-3">
              <MagneticButton className="w-full">
                <Button
                  href="/contact"
                  variant="gold"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="w-full justify-center shadow-xl"
                >
                  Secure Sprint Privilege
                </Button>
              </MagneticButton>
              <p className="font-mono text-[11px] text-white/60">
                No long-term lock-in · Strict exclusivity per category
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============ connector ============ */}
        <motion.div
          {...reveal(0.1)}
          className="mx-auto my-14 flex max-w-6xl items-center gap-4 md:my-20"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white/[0.07] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-md">
            <Plus className="h-4 w-4" />
            Stack it with add-ons
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
        </motion.div>

        {/* ============ 2. ADD-ONS: open columns, no cards ============ */}
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Specialized Add-ons
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight !text-white md:text-4xl">
              Complementary{" "}
              <span className="font-editorial font-normal italic text-gold">
                High-Impact Capabilities
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed !text-white/70 sm:text-base">
              Beyond core LinkedIn branding, we provide deep-craft ecosystem
              extensions to amplify founder influence across owned channels.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-0">
            {ADD_ONS.map((addon, index) => {
              const Icon = ADDON_ICONS[index % ADDON_ICONS.length];
              return (
                <motion.article
                  key={addon.id}
                  {...reveal(index * 0.12)}
                  className={`group relative flex flex-col md:px-8 ${
                    index === 0 ? "md:pl-0" : "md:border-l md:border-white/15"
                  } ${index === ADD_ONS.length - 1 ? "md:pr-0" : ""}`}
                >
                  {/* big outline number */}
                  <span
                    aria-hidden="true"
                    className="font-heading text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] transition-[-webkit-text-stroke-color] duration-300 group-hover:[-webkit-text-stroke:1px_var(--color-gold)]"
                  >
                    0{index + 1}
                  </span>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/40 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-xl font-bold !text-white transition-colors group-hover:!text-gold">
                      {addon.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed !text-white/70">
                    {addon.shortDesc}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {addon.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-white/85"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={"/contact" as Route}
                    className="mt-7 inline-flex items-center gap-2 self-start border-b border-gold/50 pb-1 text-sm font-semibold text-gold transition-all hover:gap-3 hover:border-gold"
                  >
                    {addon.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}