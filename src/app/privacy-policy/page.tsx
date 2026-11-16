import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | UVOKA",
  description:
    "Review UVOKA's privacy policy and data governance practices. Learn how we safeguard executive data, confidentiality, and client information.",
  alternates: { canonical: "https://www.uvoka.in/privacy-policy" },
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            Legal & Governance
          </Badge>

          <h1 className="text-balance font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight">
            Privacy <span className="gradient-text font-extrabold">Policy</span>
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
            {/* Overview / Introduction */}
            <div className="p-6 rounded-2xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)] space-y-3">
              <h2 className="text-lg font-bold font-heading text-[var(--color-charcoal)] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[var(--color-primary)]" />
                Our Commitment to Executive Confidentiality
              </h2>
              <p>
                At {SITE_CONFIG.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we provide executive LinkedIn branding,
                thought leadership architecture, and pipeline acceleration services. We recognize that our clients entrust us with sensitive
                business ideas, executive perspectives, and strategic career narratives. We treat your privacy and proprietary information
                with the highest standards of discretion and security.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                1. Information We Collect
              </h2>
              <p>
                We collect personal and professional information necessary to provide our bespoke advisory and content services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-[var(--color-charcoal)]">Contact Information:</strong> Full name, professional email address,
                  telephone number, and company affiliation submitted via inquiry forms or calendar bookings.
                </li>
                <li>
                  <strong className="text-[var(--color-charcoal)]">Executive Profile Data:</strong> LinkedIn profile URLs, CV/résumé details,
                  professional bios, publication histories, and strategic business goals shared during onboarding or consultation.
                </li>
                <li>
                  <strong className="text-[var(--color-charcoal)]">Communications & Transcripts:</strong> Recorded interview notes, briefing
                  documents, strategic voice calibration recordings, and written communications exchanged during our engagement.
                </li>
                <li>
                  <strong className="text-[var(--color-charcoal)]">Technical & Usage Data:</strong> IP addresses, browser types, device
                  information, pages visited, and interaction data collected through standard cookies to optimize site performance.
                </li>
              </ul>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                2. How We Use Your Information
              </h2>
              <p>We use the information gathered solely for legitimate commercial and advisory purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To architect bespoke LinkedIn content, editorial calendars, and executive narratives tailored to your industry positioning.</li>
                <li>To conduct qualitative onboarding audits, audience analyses, and inbound lead conversion strategies.</li>
                <li>To communicate service updates, strategic recommendations, invoice receipts, and scheduled review sessions.</li>
                <li>To maintain, analyze, and optimize website security, responsiveness, and user experience.</li>
              </ul>
            </div>

            {/* 3. Strict Non-Disclosure & Intellectual Property */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                3. Strict Non-Disclosure & Confidentiality
              </h2>
              <p>
                All ghostwritten materials, executive interviews, and corporate insights shared with {SITE_CONFIG.name} are treated under
                strict non-disclosure obligations. We never publish case studies, mention client partnerships, or showcase performance metrics
                without obtaining explicit written prior consent.
              </p>
            </div>

            {/* 4. Data Sharing & Third-Party Service Providers */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                4. Data Sharing & Third-Party Processors
              </h2>
              <p>
                We do not sell, rent, or trade your personal or executive information. We share data only with trusted infrastructure providers
                under rigorous data protection agreements:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cloud hosting and deployment infrastructure (Vercel, Sanity CMS).</li>
                <li>Secure calendar scheduling and CRM systems for consultation dispatch.</li>
                <li>Analytics engines used strictly for aggregate website performance monitoring.</li>
                <li>Legal compliance bodies when strictly required by enforceable judicial order or applicable statute.</li>
              </ul>
            </div>

            {/* 5. Cookies & Tracking Technologies */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                5. Cookies & Tracking Technologies
              </h2>
              <p>
                Our website utilizes necessary and performance cookies to remember user preferences, ensure session stability, and evaluate
                aggregate traffic patterns. You may instruct your browser to refuse all cookies or notify you when a cookie is issued, though
                certain interactive features may function with reduced responsiveness.
              </p>
            </div>

            {/* 6. Data Security & Storage */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                6. Data Security & Retention
              </h2>
              <p>
                We implement industry-standard encryption protocols (TLS/SSL in transit and AES-256 at rest) alongside role-based access
                controls. Client records and editorial assets are retained only for the duration necessary to satisfy the commercial agreement
                or fulfill regulatory obligations.
              </p>
            </div>

            {/* 7. Your Statutory Rights */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-charcoal)]">
                7. Your Rights
              </h2>
              <p>
                Depending on your geographic jurisdiction, you hold specific rights regarding your personal information, including the right
                to access, rectify, restrict, or request permanent erasure of your data held in our systems.
              </p>
            </div>

            {/* 8. Contact & Legal Inquiries */}
            <div className="p-6 rounded-2xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)] space-y-3">
              <h2 className="text-lg font-bold font-heading text-[var(--color-charcoal)] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                Contacting Our Privacy Officer
              </h2>
              <p>
                If you have inquiries regarding this Privacy Policy, wish to exercise your data rights, or request an NDA execution before a
                discovery session, please contact our legal desk directly:
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

            {/* Back to Home Button */}
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
