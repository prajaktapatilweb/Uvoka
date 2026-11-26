"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";

const BLOG_COVER_IMAGE = "/images/hero/executive-portrait.jpg";
const SLIDE_GAP = 24;

/* Card shape: a white card with a real cut-out in the bottom-right corner. */
const NOTCH_W = 104; // width of the cut-out
const NOTCH_H = 84; // height of the cut-out
const GAP = 10; // space between the white card and the gold tab
const R_OUT = 20; // curve radius of the two outer corners next to the cut-out

export function BlogsPreview() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();
  const maxIndex = Math.max(0, BLOG_POSTS.length - visibleCount);
  const cardWidth = viewportWidth
    ? (viewportWidth - SLIDE_GAP * (visibleCount - 1)) / visibleCount
    : undefined;
  const cardStep = (cardWidth ?? 0) + SLIDE_GAP;

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

  const pauseOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      id="blogs-section"
      aria-label="Latest articles"
      className="section-padding-lg relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-ivory)]/40"
    >
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Thought Leadership & Insights"
            title="Executive Perspectives on "
            italicPhrase="Executive Perspectives"
            subtitle="Deep-dive essays and strategic teardowns on the creator economy, algorithmic distribution, and founder-led sales."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <Button
            href="/blogs"
            variant="outline"
            size="md"
            icon={<ArrowRight className="h-4 w-4" />}
            className="self-start md:self-end"
          >
            Explore All Articles
          </Button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={pauseOnBlur}
        >
          {/* py/-my gives the card shadows room so overflow-hidden doesn't clip them */}
          <div
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="UVOKA articles carousel"
            className="-my-8 overflow-hidden py-8"
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: -(activeIndex * cardStep) }}
              transition={{ duration: reduced ? 0.01 : 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {BLOG_POSTS.map((post, index) => {
                const isHidden = index < activeIndex || index >= activeIndex + visibleCount;
                const articleHref = `/blogs/${post.slug}` as Route;

                return (
                  <article
                    key={post.id}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${BLOG_POSTS.length}: ${post.title}`}
                    aria-hidden={isHidden}
                    /* drop-shadow (not box-shadow) so the shadow follows the cut-out shape */
                    className="group relative isolate flex min-w-0 shrink-0 flex-col pb-0 transition-[filter] duration-300 [filter:drop-shadow(0_14px_22px_rgba(43,15,58,0.14))] hover:[filter:drop-shadow(0_22px_32px_rgba(43,15,58,0.26))]"
                    style={{ width: cardWidth ? `${cardWidth}px` : `${100 / visibleCount}%` }}
                  >
                    {/* ===== white card shape, built from 3 white pieces (no colour matching) ===== */}
                    {/* 1. top part: full width, stops above the cut-out */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 -z-10 rounded-t-[28px] bg-white"
                      style={{ bottom: NOTCH_H, borderBottomRightRadius: R_OUT }}
                    />
                    {/* 2. left part: runs to the bottom, stops before the cut-out */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 -z-10 rounded-bl-[28px] bg-white"
                      style={{
                        right: NOTCH_W,
                        top: `calc(100% - ${NOTCH_H + 28}px)`,
                        borderBottomRightRadius: R_OUT,
                      }}
                    />
                    {/* 3. rounds the inside corner of the cut-out */}
                    <span
                      aria-hidden="true"
                      className="absolute -z-10"
                      style={{
                        right: NOTCH_W - GAP,
                        bottom: NOTCH_H - GAP,
                        width: GAP,
                        height: GAP,
                        background: `radial-gradient(circle at 100% 100%, transparent ${GAP - 0.5}px, #fff ${GAP}px)`,
                      }}
                    />

                    {/* image */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-t-[28px] border-4 border-[white] bg-[var(--color-primary-dark)]">
                      <Image
                        src={BLOG_COVER_IMAGE}
                        alt=""
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1279px) 45vw, 30vw"
                        className="object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* tag + date */}
                    <div className="mt-5 flex items-center justify-between gap-3 px-5">
                      <span className="inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-ivory)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-charcoal)] sm:text-xs">
                        <span aria-hidden="true" className="h-2.5 w-2.5 bg-gold" />
                        {post.category}
                      </span>
                      <time className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--color-text-muted)] sm:text-xs">
                        {post.date}
                      </time>
                    </div>

                    {/* text: the title link stretches over the whole card */}
                    <div className="flex flex-1 flex-col px-5 pb-24">
                      <h4 className="mt-5 font-heading text-[1.2rem] font-normal leading-[1.2] tracking-tight text-[var(--color-charcoal)] sm:text-[1.55rem]">
                        <Link
                          href={articleHref}
                          tabIndex={isHidden ? -1 : 0}
                          className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[28px] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-[var(--color-gold)]"
                        >
                          {post.title}
                          <span className="sr-only">: read article</span>
                        </Link>
                      </h4>

                      <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                        {post.excerpt}
                      </p>

                      <span
                        aria-hidden="true"
                        className="mt-auto pt-6 font-mono text-sm uppercase tracking-[0.04em] text-[var(--color-charcoal)]"
                      >
                        Read article
                      </span>
                    </div>

                    {/* gold arrow tab, sitting in the cut-out */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 flex items-center justify-center rounded-bl-[18px] rounded-br-[28px] rounded-tl-[18px] rounded-tr-[18px] bg-gold text-[var(--color-bg-dark)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white"
                      style={{ width: NOTCH_W - GAP, height: NOTCH_H - GAP }}
                    >
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </article>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="group" aria-label="Choose an article slide">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show articles starting at ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
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
                aria-label="Previous articles"
                onClick={() => moveSlide(-1)}
                disabled={maxIndex === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-xs)] transition-colors hover:bg-[var(--color-ivory)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next articles"
                onClick={() => moveSlide(1)}
                disabled={maxIndex === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
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