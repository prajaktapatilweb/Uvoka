import { Metadata } from "next";
import { Trophy, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { getCaseStudies } from "@/lib/sanity-fetch";

export const metadata: Metadata = {
  title: "Case Studies & Client Outcomes | UVOKA",
  description:
    "Explore how UVOKA transforms founder personal profiles and enterprise company pages into authoritative, multi-million-dollar inbound pipeline engines.",
  alternates: { canonical: "https://www.uvoka.in/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  const featuredCaseStudy = caseStudies.find((c) => c.featured) || caseStudies[0];
  const remainingCaseStudies = caseStudies.filter((c) => c._id !== featuredCaseStudy?._id);

  return (
    <div className="flex flex-col w-full pb-24">
      {/* ── Page Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Verified Case Studies
          </Badge>

          <h1 className="text-balance font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight">
            Proof in <span className="gradient-text font-extrabold">Executive Pipeline</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            We don&apos;t measure success in vanity likes. We measure it in enterprise contract pipeline, qualified inbound discovery calls, and industry category leadership.
          </p>
        </Container>
      </section>

      {/* ── Case Studies Showcase ── */}
      <section className="py-12 md:py-16 bg-white">
        <Container className="space-y-12">
          {/* Flagship Case Study */}
          {featuredCaseStudy && (
            <CaseStudyCard caseStudy={featuredCaseStudy} variant="featured" />
          )}

          {/* Remaining Case Studies Grid */}
          {remainingCaseStudies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingCaseStudies.map((cs) => (
                <CaseStudyCard key={cs._id} caseStudy={cs} variant="standard" />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── Bottom Strategic CTA ── */}
      <section className="py-16 bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="primary" size="sm">
            Tailored Engagement
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-charcoal)]">
            Ready to Engineer Your Own Category Moat?
          </h2>

          <p className="text-base text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Book a confidential 30-minute executive briefing to review your target market positioning and potential inbound reach.
          </p>

          <div className="pt-2 flex justify-center">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Request Executive Audit
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
