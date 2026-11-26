"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleColor?: "white";
  highlight?: string;
  highlightColor?: "primary" | "gold" | "gradient" | "white";
  italicPhrase?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  darkTheme?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeadingcopy({
  eyebrow,
  title,
  titleColor,
  highlight,
  highlightColor = "primary",
  italicPhrase,
  subtitle,
  align = "center",
  darkTheme = false,
  className,
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const highlightClass = {
    primary: "text-white",
    gold: "text-[var(--color-gold)]",
    gradient: "gradient-text",
    white: "text-white",
  }[highlightColor];
  const resolvedHighlightClass = titleColor === "white" ? "text-white" : highlightClass;

  useLayoutEffect(() => {
    if (reduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll(".mask-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reduced, title, highlight, italicPhrase]);

  // Render title words wrapped in overflow masks for smooth text reveal
  const renderMaskedTitle = () => {
    // If reduced motion, render without complex mask spans
    if (reduced) {
      if (italicPhrase && title.includes(italicPhrase)) {
        const parts = title.split(italicPhrase);
        return (
          <>
            {parts[0]}
            <span className="font-editorial italic font-normal text-[var(--color-primary)]">
              {italicPhrase}
            </span>
            {parts[1]}
          </>
        );
      }
      if (highlight && title.includes(highlight)) {
        const parts = title.split(highlight);
        return (
          <>
            {parts[0]}
            <span className={cn(resolvedHighlightClass, "font-bold")}>{highlight}</span>
            {parts[1]}
          </>
        );
      }
      return title;
    }

    // Split title into words while honoring italic or highlight phrases
    const words = title.split(" ");
    const italicWords = italicPhrase ? italicPhrase.split(" ") : [];
    const highlightWords = highlight ? highlight.split(" ") : [];

    return words.map((word, idx) => {
      // Check if word is part of italicPhrase
      const isItalic =
        italicPhrase &&
        italicWords.some(
          (iw) => word.toLowerCase().replace(/[^a-z0-9]/g, "") === iw.toLowerCase().replace(/[^a-z0-9]/g, "")
        );

      // Check if word is part of highlight
      const isHighlight =
        highlight &&
        highlightWords.some(
          (hw) => word.toLowerCase().replace(/[^a-z0-9]/g, "") === hw.toLowerCase().replace(/[^a-z0-9]/g, "")
        );

      let wordStyle = "";
      if (isItalic) {
        wordStyle = "font-editorial italic font-normal text-[var(--color-primary)]";
      } else if (isHighlight) {
        wordStyle = cn(resolvedHighlightClass, "font-bold");
      }

      return (
        <span key={idx} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-top">
          <span
            className={cn(
              "inline-block will-change-transform mask-word",
              wordStyle
            )}
          >
            {word}
          </span>
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col w-full max-w-5xl space-y-3 md:space-y-4 mb-10 md:mb-16",
        alignStyles[align],
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs mb-1",
            darkTheme
              ? "bg-white/10 border-white/20 text-[var(--color-gold)]"
              : "bg-[var(--color-ivory)] border-[var(--color-border)] text-[var(--color-primary)]"
          )}
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          <span className="text-xs font-semibold uppercase tracking-wider font-body">
            {eyebrow}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
        </div>
      )}

      <HeadingTag
        ref={headingRef}
        className={cn(
          "whitespace-nowrap font-heading font-extrabold tracking-tight leading-[1.15] text-[clamp(1.25rem,3.4vw,3.25rem)]",
          darkTheme ? "text-[var(--color-white)]" : "text-[var(--color-charcoal)]"
        )}
        style={{ color: 'white'}}
      >
        {renderMaskedTitle()}
      </HeadingTag>

      {subtitle && (
        <p
          ref={subtitleRef}
          className={cn(
            "text-base sm:text-lg max-w-2xl text-balance leading-relaxed",
            darkTheme ? "text-white/70" : "text-[var(--color-text-secondary)]"
          )}
          style={{ color: 'lightgray'}}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
