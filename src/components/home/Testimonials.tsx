"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = TESTIMONIALS[currentIndex];

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
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="rounded-3xl bg-white/90 backdrop-blur-md p-8 sm:p-12 md:p-16 relative min-h-[380px] sm:min-h-[320px] flex flex-col justify-between shadow-[0_20px_50px_rgba(82,33,102,0.08)] border border-[var(--color-border)] overflow-hidden">
            {/* Top Metallic Gold Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary)]"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-6"
              >
                {/* Rating & Result Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                  <div className="flex items-center gap-1 text-[var(--color-gold)]">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <Badge variant="gold" size="sm" className="font-semibold">
                    {current.resultBadge}
                  </Badge>
                </div>

                {/* Quote Body */}
                <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[var(--color-charcoal)] leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-[var(--color-primary)]">
                      {current.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                      {current.role} · <span className="font-medium text-[var(--color-charcoal)]">{current.company}</span>
                    </p>
                  </div>

                  <span className="hidden sm:inline-block text-xs font-mono text-[var(--color-text-muted)]">
                    Verified Engagement
                  </span>
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
