import { Metadata } from "next";
import { Newspaper, Calendar, ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
import { PRESS_ITEMS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "Press Room & Media Announcements | UVOKA",
  description:
    "Read the latest press releases, media features, and corporate announcements from UVOKA LinkedIn Branding Agency.",
  alternates: { canonical: "https://www.uvoka.in/press" },
};

export default function PressPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Press Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Media & Newsroom
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight text-balance">
            Press Releases &{" "}
            <span className="gradient-text font-extrabold">Media Recognition</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            Stay informed on our agency milestones, methodology innovations, and international executive coverage.
          </p>
        </Container>
      </section>

      {/* ── Press Items Stack ── */}
      <section className="section-padding-md bg-white">
        <Container size="narrow">
          <div className="space-y-6">
            {PRESS_ITEMS.map((item) => (
              <div
                key={item.id}
                className="card-premium p-8 bg-white border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all duration-300 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--color-charcoal)]">
                      {item.publication}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[var(--color-charcoal)] leading-snug">
                  {item.title}
                </h2>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                    Official Corporate Release
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                  >
                    <span>View Media Coverage</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Press Inquiries ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-charcoal)]">
            Media & Editorial Inquiries
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Journalists, conference organizers, and podcast producers seeking executive commentary or founder interviews can reach our media desk directly.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Contact Media Desk
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
