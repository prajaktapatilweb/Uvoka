import { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | UVOKA",
  description:
    "Review UVOKA's master terms of service, engagement protocols, intellectual property ownership, and client agreements.",
  alternates: { canonical: "https://www.uvoka.in/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Page Header ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/50 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Terms of Engagement
          </Badge>

          <h1 className="text-balance font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight">
            Terms of <span className="gradient-text font-extrabold">Service</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
            Effective Date: January 1, 2026 · Last Updated: January 2026
          </p>
        </Container>
      </section>

      {/* ── Content Section ── */}
      <section className="py-12 md:py-16 bg-white">
        <Container size="narrow">
          <div className="space-y-10 text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
            {/* Preamble */}
            <div className="p-6 rounded-2xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)] space-y-3">
              <h2 className="text-lg font-bold font-heading text-[var(--color-charcoal)] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                Agreement to Terms
              </h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot; or &quot;User&quot;)
                and {SITE_CONFIG.name} (&quot;UVOKA,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing our website,
                booking an executive consultation, or engaging our branding and lead generation services, you agree to be bound by these Terms.
              </p>
            </div>

            {/* 1. Scope of Services */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                1. Scope of Advisory & Branding Services
              </h2>
              <p>
                UVOKA delivers bespoke strategic consulting, creative narrative engineering, profile positioning, and inbound/outbound lead
                generation frameworks tailored for LinkedIn. The exact scope, cadence of deliverables, sprint timelines, and key performance
                metrics are detailed in individual Statement of Work (SOW) agreements executed prior to campaign kickoff.
              </p>
            </div>

            {/* 2. Intellectual Property Rights */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                2. Intellectual Property & Asset Ownership
              </h2>
              <p>
                We believe in full creative clarity and ownership:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-[var(--color-charcoal)]">Client Ownership:</strong> Upon full payment of applicable fees, all
                  ghostwritten posts, custom graphic templates created specifically for the Client, and executive biographies become the
                  exclusive intellectual property of the Client.
                </li>
                <li>
                  <strong className="text-[var(--color-charcoal)]">UVOKA Proprietary Methodology:</strong> UVOKA retains all rights, title,
                  and interest in our proprietary playbooks, internal distribution workflows, automation logic, algorithm tracking tools,
                  and consultative frameworks developed independently of any specific client engagement.
                </li>
              </ul>
            </div>

            {/* 3. Client Collaboration & Review Obligations */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                3. Editorial Approvals & Client Obligations
              </h2>
              <p>
                The efficacy of executive thought leadership requires active alignment. Clients agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Participate in scheduled monthly voice-calibration interviews and strategic alignment sessions.</li>
                <li>Review and provide timely feedback or sign-off on weekly editorial calendars via designated client portals.</li>
                <li>Ensure that all factual assertions, financial statistics, and corporate disclosures provided for ghostwriting are accurate and authorized.</li>
                <li>Comply with LinkedIn&apos;s User Agreement and Professional Community Policies at all times.</li>
              </ul>
            </div>

            {/* 4. Retainers, Invoicing & Payments */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                4. Retainer Terms & Invoicing
              </h2>
              <p>
                Services are provided on a monthly retainer or sprint-based structure. Invoices are issued in advance of each billing cycle
                and are payable within the timeframe stipulated in the SOW. Because our team reserves dedicated creative capacity and
                conducting extensive custom research, fees for completed sprints or ongoing retainer cycles are non-refundable.
              </p>
            </div>

            {/* 5. Confidentiality & Non-Disclosure */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                5. Confidentiality & Non-Disclosure
              </h2>
              <p>
                Both parties agree to treat all business plans, financial projections, unreleased product blueprints, and strategic roadmaps
                disclosed during the engagement as confidential. UVOKA will not publicize the Client&apos;s relationship or performance data
                without prior explicit authorization.
              </p>
            </div>

            {/* 6. Disclaimers & Third-Party Platforms */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                6. Platform Disclaimers & Limitation of Liability
              </h2>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-[var(--color-charcoal)] flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  While UVOKA leverages data-backed frameworks and proven authority strategies, LinkedIn operates as an independent third-party
                  platform with proprietary algorithmic distribution rules. UVOKA does not warrant or guarantee specific algorithmic reach,
                  viral impressions, or third-party sales conversions.
                </p>
              </div>
              <p>
                To the maximum extent permitted by applicable law, UVOKA shall not be liable for indirect, incidental, special, or consequential
                damages resulting from the use of our services or temporary disruptions on third-party digital networks.
              </p>
            </div>

            {/* 7. Term & Termination */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                7. Engagement Term & Cancellation
              </h2>
              <p>
                Either party may terminate an ongoing retainer agreement by delivering written notice according to the period specified in the
                applicable SOW (typically 30 calendar days). Upon termination, all finalized content assets produced up to the date of
                termination will be handed over to the Client.
              </p>
            </div>

            {/* 8. Governing Law & Jurisdiction */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                8. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in
                connection with these Terms shall first be attempted to be resolved amicably through good-faith mediation prior to formal
                legal proceedings.
              </p>
            </div>

            {/* Contact Information */}
            <div className="p-6 rounded-2xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)] space-y-3">
              <h2 className="text-lg font-bold font-heading text-[var(--color-charcoal)] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                Legal & Contractual Queries
              </h2>
              <p>
                For contract inquiries, Master Services Agreement requests, or billing clarifications, please contact our administrative desk:
              </p>
              <div className="text-[var(--color-charcoal)] font-semibold pt-1">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Return Link */}
            <div className="pt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Homepage
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
