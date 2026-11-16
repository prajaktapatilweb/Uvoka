"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, KeyRound, Sparkles, Target, UserCheck, Workflow } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SERVICE_ICONS = [
  <UserCheck key="1" className="w-6 h-6 text-[var(--color-primary)]" />,
  <Building2 key="2" className="w-6 h-6 text-[var(--color-primary)]" />,
  <Target key="3" className="w-6 h-6 text-[var(--color-primary)]" />,
  <KeyRound key="4" className="w-6 h-6 text-[var(--color-primary)]" />,
  <Workflow key="5" className="w-6 h-6 text-[var(--color-primary)]" />,
];

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();
  const maxIndex = Math.max(0, SERVICES.length - visibleCount);
  const gap = 24;
  const cardWidth = viewportWidth
    ? (viewportWidth - gap * (visibleCount - 1)) / visibleCount
    : undefined;
  const cardStep = (cardWidth ?? 0) + gap;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateSize = () => {
      setViewportWidth(carousel.clientWidth);
      setVisibleCount(window.innerWidth >= 1280 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(carousel);
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (reduced || isPaused || maxIndex === 0) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index >= maxIndex ? 0 : index + 1));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, maxIndex, reduced]);

  const moveSlide = (step: number) => {
    setActiveIndex((index) => (index + step + maxIndex + 1) % (maxIndex + 1));
  };

  const selectSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="services-section" aria-label="Strategic services" className="section-padding-lg relative overflow-hidden bg-[var(--color-white)]">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 -left-20 w-[30rem] h-[30rem] rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-20 w-[32rem] h-[32rem] rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          eyebrow="Core Specializations"
          title="Five Distinct Strategic Service Offerings"
          italicPhrase="Strategic Service Offerings"
          subtitle="Bespoke LinkedIn architecture engineered to build authority, scale enterprise company pages, and capture high-intent executive pipelines."
        />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >
          <div
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="UVOKA services carousel"
            className="overflow-hidden"
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: -(activeIndex * cardStep) }}
              transition={{ duration: reduced ? 0.01 : 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {SERVICES.map((service, index) => (
                <article
                  key={service.id}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${SERVICES.length}: ${service.title}`}
                  aria-hidden={index < activeIndex || index >= activeIndex + visibleCount}
                  className="group relative flex min-h-[400px] shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
                  style={{ width: cardWidth ? `${cardWidth}px` : `${100 / visibleCount}%` }}
                >
                  <div className="relative isolate flex flex-1 flex-col overflow-hidden rounded-t-lg">
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-1/2 z-0"
                      style={{
                        background:
                          "conic-gradient(var(--color-primary) 0deg, var(--color-primary) 250deg, var(--color-gold) 335deg, var(--color-primary) 360deg)",
                      }}
                      animate={{ rotate: reduced ? 0 : 360 }}
                      transition={reduced ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div aria-hidden="true" className="absolute inset-[1.5px] z-0 rounded-t-[18.5px] bg-white" />
                    <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-ivory)]">
                        {SERVICE_ICONS[index]}
                      </div>
                      <h3 className="pt-1 font-heading text-lg font-bold leading-snug text-[var(--color-charcoal)] transition-colors group-hover:text-[var(--color-primary)] sm:text-xl">
                        {service.title.replace(/\s*\[Placeholder\]/, "")}
                      </h3>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {service.shortDesc}
                    </p>
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}` as Route}
                    tabIndex={index >= activeIndex && index < activeIndex + visibleCount ? 0 : -1}
                    className="group/link relative isolate flex min-h-20 items-center justify-between overflow-hidden bg-[var(--color-bg-dark)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-gold)] sm:px-6"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute -right-5 -top-14 h-28 w-28 rounded-full border border-white/10" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 left-1/3 h-24 w-24 rounded-full border border-[var(--color-gold)]/25" />
                    <Sparkles aria-hidden="true" className="pointer-events-none absolute right-16 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-gold)]/70" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Explore Service
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </span>
                    <span className="relative z-10 font-editorial text-xl italic text-[var(--color-gold)]">
                      {service.id}
                    </span>
                  </Link>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
           
            <div className="flex items-center gap-2" role="group" aria-label="Choose a service slide">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show services starting at ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => selectSlide(index)}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] motion-reduce:transition-none ${
                    index === activeIndex
                      ? "w-8 bg-[var(--color-primary)]"
                      : "w-2.5 bg-[var(--color-border-hover)] hover:bg-[var(--color-primary-muted)]"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => moveSlide(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-xs)] transition-colors hover:bg-[var(--color-ivory)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => moveSlide(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
