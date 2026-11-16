import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Briefcase, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { CaseStudyContent } from "@/components/case-studies/CaseStudyContent";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/sanity-fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | UVOKA",
    };
  }

  const title = caseStudy.seoTitle || `${caseStudy.title} | UVOKA`;
  const description =
    caseStudy.seoDescription || caseStudy.summary || "Executive client outcomes architected by UVOKA.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.uvoka.in/case-studies/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: caseStudy.publishedAt,
      url: `https://www.uvoka.in/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full pb-24">
      {/* ── Header ── */}
      <header className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white border-b border-[var(--color-border)]">
        <Container size="narrow">
          <div className="space-y-6">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to All Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" size="sm">
                {caseStudy.industry}
              </Badge>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {caseStudy.client}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                {caseStudy.service}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[var(--color-charcoal)] leading-tight text-balance">
              {caseStudy.title}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>
        </Container>
      </header>

      {/* ── Case Study Body / Modules ── */}
      <section className="py-12 md:py-16 bg-white">
        <Container size="narrow">
          <CaseStudyContent caseStudy={caseStudy} />
        </Container>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-16 bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="sm" className="font-bold uppercase tracking-wider">
            Replicate These Results
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-charcoal)]">
            Ready to Accelerate Your Executive Influence?
          </h2>

          <p className="text-base text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Schedule a high-level strategic alignment session with our founding partners.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Consultation
            </Button>
            <Button href="/case-studies" variant="outline" size="lg">
              Explore More Case Studies
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
