"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);

  const current = TESTIMONIALS[currentIndex];

  useEffect(() => {
    setIsQuoteExpanded(false);
  }, [current.id]);

  const quoteWords = current.quote.trim().split(/\s+/);
  const hasMoreQuote = quoteWords.length > 100;
  const displayedQuote = hasMoreQuote && !isQuoteExpanded
    ? `${quoteWords.slice(0, 100).join(" ")}…`
    : current.quote;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance slider every 6s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  return (
    <section className="section-padding-md bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)] relative overflow-hidden">
      {/* Decorative luxury quotes watermark */}
      <Quote
        className="absolute top-10 right-10 w-64 h-64 text-[var(--color-primary)]/5 pointer-events-none -rotate-12"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          eyebrow="Client Testimonials"
          title="What High-Performing Founders Say"
          italicPhrase="High-Performing Founders"
          subtitle="Real executive leaders, category pioneers, and venture partners sharing the direct commercial impact of UVOKA's brand architecture."
        />

        {/* Carousel Container */}
        <div
          className="relative mx-auto mt-20 max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative mt-8 min-h-[280px] rounded-3xl rounded-tr-none border border-[var(--color-border)] bg-white/90 px-6 pb-6 pt-8 shadow-[0_20px_50px_rgba(82,33,102,0.08)] backdrop-blur-md sm:px-8 sm:pb-8">
            {/* Top Metallic Gold Accent Bar */}
            <div
              className="absolute left-0 right-0 top-0 h-[3px] rounded-tl-3xl bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary)]"
              aria-hidden="true"
            />
            <div className="absolute left-1/2 -top-12 z-20 flex h-24 w-24 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--color-gold)] bg-[var(--color-ivory)] font-heading text-2xl font-bold text-[var(--color-primary)] shadow-md sm:-top-14 sm:h-28 sm:w-28 sm:text-3xl">
              {current.avatar ? (
                <Image
                  src={current.avatar}
                  alt={current.author}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                />
              ) : (
                <span aria-label={`${current.author} avatar`} role="img">
                  {current.author
                    .split(/\s+/)
                    .map((namePart) => namePart[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute left-1/2 top-14 z-20 w-[calc(100%-2rem)] max-w-[90%] -translate-x-1/2 text-center sm:top-18">
              <h4 className="font-heading text-sm font-bold leading-tight text-[var(--color-primary)] sm:text-base">
                {current.author}
              </h4>
              <p className="mt-1 text-[10px] leading-tight text-[var(--color-text-secondary)] sm:text-xs">
                {current.role}
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-4 pt-36"
              >
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  {Array.from({ length: current.rating }).map((_, index) => (
                    <Star key={index} aria-hidden="true" className="h-4 w-4 fill-[var(--color-gold)] text-[var(--color-gold)] sm:h-5 sm:w-5" />
                  ))}
                </div>

                <blockquote className="border-l-2 border-[var(--color-primary)] pl-4 sm:pl-5">
                  <p className="text-sm leading-relaxed text-[var(--color-charcoal)] sm:text-base">
                    &ldquo;{displayedQuote}&rdquo;
                  </p>
                </blockquote>

                {hasMoreQuote && (
                  <button
                    type="button"
                    aria-expanded={isQuoteExpanded}
                    onClick={() => setIsQuoteExpanded((expanded) => !expanded)}
                    className="ml-4 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-gold)] underline-offset-4 hover:text-[var(--color-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {isQuoteExpanded ? "Read less" : "Read more"}
                  </button>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pl-4 sm:pl-5">
                  {current.company && (
                    <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                      {current.company}
                    </span>
                  )}
                  <Badge variant="gold" size="sm" className="font-semibold">
                    {current.resultBadge}
                  </Badge>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Pagination */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[var(--color-primary)]"
                      : "w-2.5 bg-[var(--color-border)] hover:bg-[var(--color-primary-muted)]"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
