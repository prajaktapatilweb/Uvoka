import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle, AlertCircle } from "lucide-react";
import { SERVICES_CATALOG } from "@/data/servicesData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_CATALOG).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_CATALOG[slug];

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | UVOKA Agency`,
    description: service.heroDescription,
    alternates: { canonical: `https://www.uvoka.in/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_CATALOG[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── 1. Service Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {service.heroBadge}
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight text-balance">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            {service.heroDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enquire This Sprint
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              ← All Services
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 2. Problems We Solve ── */}
      <section className="section-padding-md bg-white">
        <Container>
          <SectionHeading
            eyebrow="The Cost of Inaction"
            title="Executive Challenges We Eradicate"
            highlight="Challenges"
            subtitle="The critical bottlenecks keeping founders and high-growth brands from capturing their category authority on LinkedIn."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.problemsSolved.map((prob, i) => (
              <div
                key={i}
                className="card-premium p-7 bg-white flex flex-col justify-between border-[var(--color-border)] space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[var(--color-charcoal)]">
                    {prob.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Features & Deliverables ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container>
          <SectionHeading
            eyebrow="Scope of Engagement"
            title="Comprehensive Deliverables & Sprints"
            highlight="Deliverables"
            subtitle="Every component is crafted with white-glove precision and delivered through our streamlined client approval portal."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {service.deliverables.map((deliv, i) => (
              <div
                key={i}
                className="card-premium p-8 bg-white space-y-3 hover:border-[var(--color-primary)]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[var(--color-charcoal)]">
                    {deliv.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed pl-7">
                  {deliv.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. Benefits & Measurable Outcomes ── */}
      <section className="section-padding-md bg-white border-t border-[var(--color-border)]">
        <Container>
          <SectionHeading
            eyebrow="Commercial Return"
            title="Quantifiable Business Outcomes"
            highlight="Business Outcomes"
            subtitle="We hold ourselves accountable to real business pipeline, not superficial vanity impressions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.outcomes.map((out, i) => (
              <div
                key={i}
                className="card-premium p-8 bg-[var(--color-ivory)]/30 text-center space-y-2 border-[var(--color-border)]"
              >
                <span className="font-heading font-extrabold text-4xl sm:text-5xl text-[var(--color-primary)] block">
                  {out.metric}
                </span>
                <h4 className="font-heading font-bold text-base text-[var(--color-charcoal)]">
                  {out.label}
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {out.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Process & Methodology ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Step-by-Step Sprint"
            title="How We Execute This Service"
            highlight="How We Execute"
            subtitle="A disciplined, zero-friction workflow engineered to respect your executive calendar."
          />

          <div className="space-y-4 max-w-3xl mx-auto">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="card-premium p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center font-heading font-black text-lg text-[var(--color-primary)] shrink-0">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[var(--color-charcoal)]">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Service Specific FAQs ── */}
      <section className="section-padding-md bg-white border-t border-[var(--color-border)]">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Questions & Clarifications"
            title="Service-Specific Details"
            highlight="Service-Specific"
          />

          <div className="space-y-4 max-w-3xl mx-auto">
            {service.faqs.map((faq, i) => (
              <div key={i} className="card-premium p-6 sm:p-7 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <h4 className="font-heading font-bold text-base text-[var(--color-charcoal)]">
                    {faq.question}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. Booking CTA ── */}
      <section className="section-padding-md bg-[var(--color-bg-dark)] text-white border-t border-[var(--color-border-dark)]">
        <Container size="narrow" className="text-center space-y-6">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Ready to Begin Your {service.title} Sprint?
          </h3>
          <p className="text-sm text-white/75 max-w-xl mx-auto">
            Secure one of our limited quarterly partnership slots. Complete our brief inquiry form and our strategy director will follow up within 24 hours.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Button href="/contact" variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Consultation
            </Button>
            <Button href="/services" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Explore Other Services
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
