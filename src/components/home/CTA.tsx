"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { LinkedInIcon } from "@/components/common/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowPurpleRef = useRef<HTMLDivElement>(null);
  const glowGoldRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (glowPurpleRef.current) {
        gsap.to(glowPurpleRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (glowGoldRef.current) {
        gsap.to(glowGoldRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="section pb-10  text-white relative overflow-hidden"
    >
      {/* Background radial luxury glows with Parallax Scrub */}
      <div
        ref={glowPurpleRef}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full bg-[var(--color-primary)]/40 blur-3xl pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={glowGoldRef}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-[var(--color-gold)]/20 blur-3xl pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      <Container  className="relative z-10 text-center space-y-8 bg-[var(--color-bg-dark)] py-10 rounded-4xl">
        <div className="inline-flex items-center gap-2">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-charcoal)]" />
            Limited Executive Partnerships
          </Badge>
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight text-balance" style={{ color: "white" }}>
        Let's build your unforgettable brand today!
         
        </h2>

        {/* <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed text-balance" style={{ color: "lightgray" }}>
          Stop losing enterprise market share and top-tier talent to competitors with
          inferior products who simply communicate with more conviction. Let UVOKA architect
          your definitive LinkedIn authority.
        </p> */}

        {/* Action Button & Contact Direct with Magnetic Physics */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <Button
              href="/contact"
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 text-[var(--color-charcoal)]" />}
              className="w-full sm:w-auto shadow-2xl hover:scale-105 transition-transform"
            >
             Start Your Journey
            </Button>
          </MagneticButton>

          <Button
            href='/services'
            variant="outline"
            size="lg"
            isExternal
            // icon={<Mail className="w-4 h-4" />}
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white"
          >
           Explore Services
          </Button>
        </div>

        {/* Direct Contact Channels */}
       

        {/* Security & Confidentiality Tag */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-xs text-white/60 font-mono">
         <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="mailto:srihita@uvoka.co.in"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 hover:border-white/35 transition-all text-xs sm:text-sm font-medium backdrop-blur-xs group"
          >
            <Mail className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
            <span>srihita@uvoka.co.in</span>
          </a>

          <a
            href="tel:+917702141838"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 hover:border-white/35 transition-all text-xs sm:text-sm font-medium backdrop-blur-xs group"
          >
            <Phone className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
            <span>+91 7702141838</span>
          </a>

          <a
            href="https://www.linkedin.com/company/uvoka/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 hover:border-white/35 transition-all text-xs sm:text-sm font-medium backdrop-blur-xs group"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
            <span>LinkedIn</span>
          </a>
        </div></div>
      </Container>
    </section>
  );
}
