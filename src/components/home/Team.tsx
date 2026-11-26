"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { TEAM_CAPABILITIES } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SCENE_TINT, TeamScene, sceneKindFor } from "./TeamScene";

type TeamItem = (typeof TEAM_CAPABILITIES)[number];

function TeamCard({ team, idx }: { team: TeamItem; idx: number }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  // the cartoon only animates while its card is on screen
  const inView = useInView(sceneRef, { margin: "-10% 0px" });
  const kind = sceneKindFor(team.role, idx);

  return (
    <AnimatedCard
      delay={idx * 0.1}
      enableTilt={true}
      className="p-3 flex flex-col justify-between group overflow-hidden"
    >
      <div className="space-y-1">
        {/* Animated cartoon scene + headcount badge */}
        <div
          ref={sceneRef}
          className={`relative h-44 overflow-hidden rounded-[10px] border border-[var(--color-border)] ${SCENE_TINT[kind]}`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-24 w-24 rounded-[10px] border border-[var(--color-gold)]/40"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-6 h-24 w-24 rounded-[10px] bg-[var(--color-primary-muted)]/15 blur-2xl"
          />
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            <TeamScene role={team.role} index={idx} play={inView} />
          </div>
          <Badge
            variant="ivory"
            size="sm"
            className="absolute right-3 top-3 font-mono text-[11px] font-semibold"
          >
            {team.count}
          </Badge>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
            {team.role}
          </h4>
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
  );
}

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
          eyebrow="The Minds Behind UVOKA"
          title="Meet Our Expert Team"
          italicPhrase="Expert Team"
          subtitle="The brilliant minds transforming LinkedIn profiles into powerful personal brands."
        />

        {/* Creative discipline cards with animated cartoon scenes and 3D mouse tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_CAPABILITIES.map((team, idx) => (
            <TeamCard key={team.id} team={team} idx={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}