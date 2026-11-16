"use client";

import { CheckCircle2 } from "lucide-react";
import { TEAM_CAPABILITIES } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

// Abstract geometric avatars for each creative discipline (No fictional photos/names per global rules)
const DISCIPLINE_AVATARS = [
  <div key="1" className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md">
    CS
  </div>,
  <div key="2" className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)] to-[#b8955c] text-[var(--color-charcoal)] flex items-center justify-center font-heading font-extrabold text-xl shadow-md">
    CD
  </div>,
  <div key="3" className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[#1d0e24] text-[var(--color-gold)] flex items-center justify-center font-heading font-extrabold text-xl shadow-md">
    LG
  </div>,
  <div key="4" className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary-muted)] to-[var(--color-primary)] text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md">
    GA
  </div>,
];

export function Team() {
  return (
    <section id="team-section" className="section-padding-lg bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)] relative overflow-hidden">
      {/* Decorative background shape */}
      <div
        className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          eyebrow="Collective Capabilities"
          title="The Multi-Disciplinary Growth Guild"
          italicPhrase="Growth Guild"
          subtitle="Behind every founder's voice is a dedicated squad of investigative strategists, typographers, and outbound pipeline architects."
        />

        {/* 4 Creative Discipline Capability Cards with 3D Mouse Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_CAPABILITIES.map((team, idx) => (
            <AnimatedCard
              key={team.id}
              delay={idx * 0.1}
              enableTilt={true}
              className="p-7 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-5">
                {/* Abstract Avatar & Discipline Count */}
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    {DISCIPLINE_AVATARS[idx % DISCIPLINE_AVATARS.length]}
                  </div>

                  <Badge variant="ivory" size="sm" className="font-mono text-[11px] font-semibold">
                    {team.count}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {team.role}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2.5 leading-relaxed">
                    {team.description}
                  </p>
                </div>
              </div>

              {/* Capabilities bullet list */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-2">
                {(team.capabilities || []).map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2 text-xs text-[var(--color-charcoal)] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
