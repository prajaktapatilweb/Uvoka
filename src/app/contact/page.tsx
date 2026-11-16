import { Metadata } from "next";
import { Mail, MapPin, ShieldCheck, ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Schedule Executive Strategy Consultation",
  description:
    "Connect with UVOKA's brand strategy directors. Discuss your LinkedIn thought leadership goals, outbound pipeline architecture, and bespoke quarterly sprints.",
  alternates: { canonical: "https://www.uvoka.in/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Contact Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            Executive Inquiries
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight text-balance">
            Let’s Architect Your{" "}
            <span className="gradient-text font-extrabold">Category Authority</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            We partner with a strictly limited cohort of non-competing leaders each quarter.
            Fill out the consultation brief below and our strategy directors will review your profile within 24 hours.
          </p>
        </Container>
      </section>

      {/* ── Contact Grid: Form (7 cols) + Direct Channels (5 cols) ── */}
      <section className="section-padding-md bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Consultation Form (7 cols) */}
            <div className="lg:col-span-7 card-premium p-8 sm:p-10 bg-white border-[var(--color-border)] shadow-xl space-y-6">
              <div className="border-b border-[var(--color-border)] pb-4">
                <h3 className="font-heading font-bold text-xl text-[var(--color-charcoal)]">
                  Executive Consultation Brief
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  Confidential · No obligation · 24-hour response SLA
                </p>
              </div>

              <form className="space-y-5" action="#" method="POST">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--color-charcoal)]" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      type="text"
                      placeholder="e.g. Alex Thorne"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--color-charcoal)]" htmlFor="email">
                      Corporate Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--color-charcoal)]" htmlFor="company">
                      Company Name & Role *
                    </label>
                    <input
                      id="company"
                      name="company"
                      required
                      type="text"
                      placeholder="Apex Labs · CEO"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--color-charcoal)]" htmlFor="linkedin">
                      LinkedIn Profile URL *
                    </label>
                    <input
                      id="linkedin"
                      name="linkedin"
                      required
                      type="url"
                      placeholder="linkedin.com/in/alexthorne"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-charcoal)]" htmlFor="service">
                    Primary Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-charcoal)]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                    <option value="complete-accelerator">Quarterly Authority Accelerator ($3,200/mo)</option>
                    <option value="custom">Other / Bespoke Scope</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-charcoal)]" htmlFor="goals">
                    Current Challenges & Objectives
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    rows={4}
                    placeholder="Briefly describe your commercial goals, target audience, or current bottlenecks..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full justify-center shadow-lg"
                >
                  Submit Consultation Request
                </Button>
              </form>
            </div>

            {/* Direct Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-premium p-7 bg-[var(--color-ivory)]/50 space-y-5">
                <h4 className="font-heading font-bold text-lg text-[var(--color-charcoal)]">
                  Direct Executive Channels
                </h4>

                <div className="space-y-4 text-sm">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[var(--color-charcoal)] block">
                        Direct Email
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)] font-mono">
                        {SITE_CONFIG.email}
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[var(--color-border)]">
                    <Clock className="w-5 h-5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[var(--color-charcoal)] block">
                        Response SLA
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        Guaranteed response within 24 business hours.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[var(--color-border)]">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[var(--color-charcoal)] block">
                        Headquarters & Coverage
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        India · Active Client Sprints across US, UK, UAE, & Singapore.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NDA & Discretion Assurance */}
              <div className="card-premium p-6 bg-white space-y-3 border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-[var(--color-primary)]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-heading font-bold text-sm text-[var(--color-charcoal)]">
                    Strict Confidentiality (NDA)
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  We frequently ghostwrite for C-suite leaders navigating sensitive funding rounds, IPOs, or enterprise M&A. All inquiries and client assets are governed by strict non-disclosure agreements.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
