import { Metadata } from "next";
import { ArrowUpRight, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SERVICES_CATALOG } from "@/data/servicesData";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "Strategic Services | LinkedIn Authority & Lead Generation",
  description:
    "Explore UVOKA's 5 core strategic offerings: LinkedIn Personal Branding, Company Branding, Lead Generation, Thought Leadership, and Social Selling Architecture.",
  alternates: { canonical: "https://www.uvoka.in/services" },
};

export default function ServicesIndexPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Services Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Strategic Offerings
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight text-balance">
            Five Pillars of{" "}
            <span className="gradient-text font-extrabold">Executive Market Dominance</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            Every service is engineered as a bespoke, white-glove sprint tailored to founders and enterprise leaders who require measurable commercial pipeline, not vanity metrics.
          </p>
        </Container>
      </section>

      {/* ── All 5 Service Deep-Dive Cards ── */}
      <section className="section-padding-md bg-white">
        <Container className="space-y-12">
          {SERVICES.map((s, idx) => {
            const detail = SERVICES_CATALOG[s.slug];
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={s.id}
                className="card-premium p-8 sm:p-12 bg-white border-[var(--color-border)] shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  {/* Left Column (7 cols): Title, Description, Deliverables */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[var(--color-gold)]">
                        SERVICE 0{idx + 1}
                      </span>
                      <span className="text-black/20">•</span>
                      <Badge variant="ivory" size="sm">
                        {detail ? detail.heroBadge : "Bespoke Sprint"}
                      </Badge>
                    </div>

                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-charcoal)]">
                      {s.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {detail ? detail.heroDescription : s.shortDesc}
                    </p>

                    {/* Key Deliverables Bullet Points */}
                    {detail && (
                      <div className="space-y-2 pt-2">
                        {detail.deliverables.slice(0, 3).map((d, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-charcoal)]">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                            <span><strong>{d.title}:</strong> {d.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 flex items-center gap-4">
                      <Button
                        href={`/services/${s.slug}`}
                        variant="primary"
                        size="md"
                        icon={<ArrowUpRight className="w-4 h-4" />}
                      >
                        Explore Service Breakdown
                      </Button>
                      <Button href="/contact" variant="outline" size="md">
                        Enquire Scope
                      </Button>
                    </div>
                  </div>

                  {/* Right Column (5 cols): Quantified Outcomes Box */}
                  <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[var(--color-ivory)]/70 border border-[var(--color-border)] space-y-5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-primary-muted)] font-bold block">
                      Targeted Sprint Outcomes
                    </span>

                    {detail ? (
                      <div className="space-y-4">
                        {detail.outcomes.map((out, i) => (
                          <div key={i} className="border-b border-[var(--color-border)] last:border-0 pb-3 last:pb-0">
                            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-primary)] block">
                              {out.metric}
                            </span>
                            <span className="font-bold text-xs text-[var(--color-charcoal)] block mt-0.5">
                              {out.label}
                            </span>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                              {out.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Detailed outcomes will be calibrated based on your industry niche and executive baseline.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* ── Closing CTA ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-charcoal)]">
            Not Sure Which Sprint Fits Your Growth Objectives?
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Our strategic directors conduct a complimentary 30-minute positioning audit to analyze your current profile, audience reach, and competitor moat.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Request Complimentary Audit
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
