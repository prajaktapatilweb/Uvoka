"use client";

import Image from "next/image";
import { Award, Trophy, Play, CheckCircle2, ArrowRight } from "lucide-react";
import { AWARDS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function AboutPreview() {
  return (
    <section id="about-section" className="section-padding-lg bg-[var(--color-white)] relative overflow-hidden">
      {/* Background ambient decorative orb */}
      <div
        className="absolute top-1/2 -right-24 w-[32rem] h-[32rem] rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols): Editorial Company Story */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="About UVOKA"
              title="Architecting Influence for the World's Boldest Leaders"
              italicPhrase="Architecting Influence"
              align="left"
              className="mb-0"
            />

            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Founded on the belief that founder conviction is the ultimate
              competitive moat, UVOKA serves as the strategic brand architects
              behind Tier-1 tech founders, corporate executives, and visionary
              creators across 14 countries.
            </p>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              We reject sanitized corporate PR releases and superficial algorithmic
              hacks. Instead, we combine deep investigative journalism, executive
              positioning frameworks, and outbound pipeline architecture to convert
              genuine domain expertise into commercial dominance.
            </p>

            {/* Philosophy Pillars */}
            <div className="space-y-3 pt-2">
              {[
                "Human-Led Craft: Zero automated AI templates or generic ghostwriting.",
                "Direct Pipeline Attribution: Executive positioning directly tied to business revenue.",
                "Discreet White-Glove Execution: Complete confidentiality and private portal workflows.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[var(--color-charcoal)]">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button
                  href="/about"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-md"
                >
                  Read Full Story
                </Button>
              </MagneticButton>
              <Button href="/founder" variant="outline" size="md">
                Meet the Founder
              </Button>
            </div>
          </div>

          {/* Right Column (6 cols): Overlapping Parallax Media, Video & Awards Card Layout */}
          <div className="lg:col-span-6 space-y-6">
            {/* Parallax Container 1: Editorial Showcase Card with Video Preview Interaction */}
            <ParallaxImage speed={0.15}>
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-ivory)]/50 backdrop-blur-md p-6 sm:p-8 shadow-[0_16px_40px_rgba(82,33,102,0.06)] relative overflow-hidden group">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--color-border)] bg-white p-1 shadow-xs">
                      <Image
                        src="/logo/logo1.png"
                        alt="UVOKA Seal"
                        fill
                        sizes="44px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[var(--color-charcoal)]">
                        Executive Agency Reel
                      </h4>
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                        Inside UVOKA&apos;s Positioning Methodology
                      </span>
                    </div>
                  </div>

                  <Badge variant="gold" size="sm" className="font-mono text-xs">
                    Documentary
                  </Badge>
                </div>

                {/* Video Preview Card with Play interaction */}
                <div className="relative h-48 sm:h-56 w-full rounded-2xl bg-[var(--color-primary-dark)] flex items-center justify-center overflow-hidden group/video shadow-md cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--color-gold)] text-[var(--color-charcoal)] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/video:scale-110">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/80 font-mono">
                    <span>Runtime: 2m 14s</span>
                    <span className="text-[var(--color-gold)] font-medium">Watch Preview →</span>
                  </div>
                </div>
              </div>
            </ParallaxImage>

            {/* Parallax Container 2: Verified Awards Row */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 backdrop-blur-md p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-xs font-heading font-bold text-[var(--color-charcoal)] uppercase tracking-wider">
                    Industry Milestones & Recognition
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--color-primary)] font-bold">
                  2023–2026
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AWARDS.slice(0, 2).map((awd, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)] flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[var(--color-gold)] shadow-xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[var(--color-charcoal)] line-clamp-1">
                        {awd.title}
                      </h5>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                        {awd.organization} • {awd.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
