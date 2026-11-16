import { Metadata } from "next";
import { Trophy, Play, ArrowRight, Globe2, Sparkles } from "lucide-react";
import { AWARDS, STATISTICS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "About Us | Executive Brand Architects",
  description:
    "Discover UVOKA's story, brand philosophy, and methodology behind architecting executive authority on LinkedIn for founders and enterprise leaders across 14 countries.",
  alternates: { canonical: "https://www.uvoka.in/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Page Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/50 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage & Conviction
          </Badge>

          <h1 className="text-balance font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight">
            We Build moats around{" "}
            <span className="gradient-text font-extrabold">Executive Conviction</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            UVOKA was founded on a simple, uncompromising premise: in a digital ecosystem saturated
            with automated fluff, authentic founder conviction is the single most valuable commercial asset a business possesses.
          </p>
        </Container>
      </section>

      {/* ── Company Story & Editorial Narrative ── */}
      <section className="section-padding-md bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow">The Origin Story</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[var(--color-charcoal)]">
                Rejecting Superficial Growth Hacks in Favor of Lasting Authority
              </h2>

              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Over the past four years, we watched brilliant founders build transformative enterprise products,
                yet remain completely invisible to the venture partners, media journalists, and Fortune 500 buyers who needed them most.
              </p>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Meanwhile, competitors with inferior offerings captured outsized market share simply because their leadership communicated with
                unrelenting conviction on LinkedIn. We built UVOKA to level the playing field—not with superficial engagement pods or copy-paste
                platitudes, but through disciplined investigative ghostwriting and strategic pipeline architecture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-[var(--color-ivory)]/60 border border-[var(--color-border)] space-y-2">
                  <h4 className="font-heading font-bold text-base text-[var(--color-primary)]">
                    Our Mission
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    To elevate authentic leadership voices into influential category institutions that drive measurable, compound commercial value.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--color-ivory)]/60 border border-[var(--color-border)] space-y-2">
                  <h4 className="font-heading font-bold text-base text-[var(--color-primary)]">
                    Our Vision
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    To be the global benchmark in bespoke executive personal branding and founder-led sales enablement across the technology landscape.
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping Visual Card & Reel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-premium p-6 bg-[var(--color-ivory)]/40 relative group">
                <div className="relative h-60 w-full rounded-2xl bg-[var(--color-primary-dark)] flex items-center justify-center overflow-hidden shadow-lg">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--color-gold)] text-[var(--color-charcoal)] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/80 font-mono">
                    <span>Executive Agency Reel</span>
                    <span className="text-[var(--color-gold)]">Play Video</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                  <span>Filmed at UVOKA Global Sprints</span>
                  <span>14 Countries Covered</span>
                </div>
              </div>

              {/* Verified Metrics Card */}
              <div className="card-premium p-6 bg-white space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold font-heading uppercase text-[var(--color-charcoal)]">
                  <Globe2 className="w-4 h-4 text-[var(--color-primary)]" />
                  Global Influence Footprint
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {STATISTICS.slice(0, 2).map((s) => (
                    <div key={s.id}>
                      <span className="font-heading font-black text-2xl text-[var(--color-primary)]">
                        {s.value}{s.suffix}
                      </span>
                      <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Awards & Recognition Showcase ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/50 border-t border-[var(--color-border)]">
        <Container>
          <SectionHeading
            eyebrow="Industry Recognition"
            title="Awards & Milestones That Validate Our Craft"
            highlight="Awards & Milestones"
            subtitle="Honored by premier marketing forums and creator summits for groundbreaking executive brand architecture and pipeline conversion."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {AWARDS.map((award) => (
              <div
                key={award.id}
                className="card-premium bg-white p-7 flex flex-col justify-between group hover:border-[var(--color-primary)]/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <Trophy className="w-6 h-6 text-[var(--color-gold)]" />
                    <Badge variant="outline" size="sm" className="font-mono">
                      {award.year}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
                      {award.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      Conferred by {award.organization}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--color-border)] text-[11px] font-mono text-[var(--color-primary)] font-semibold">
                  Category: {award.category}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Closing CTA ── */}
      <section className="section-padding-md bg-white border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-charcoal)]">
            Explore the Visionary Leadership Behind UVOKA
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Discover our founder&apos;s personal trajectory, editorial philosophy, and media perspectives.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Button href="/founder" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Meet the Founder
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Start Conversation
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
