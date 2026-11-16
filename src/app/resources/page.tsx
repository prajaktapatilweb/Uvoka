import { Metadata } from "next";
import { Download, FileText, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { RESOURCES } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "Executive Resources & Toolkits | UVOKA Agency",
  description:
    "Download proprietary LinkedIn hook vaults, profile optimization blueprints, and social selling matrices designed by UVOKA brand directors.",
  alternates: { canonical: "https://www.uvoka.in/resources" },
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Resources Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Toolkits
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight text-balance">
            Proprietary Frameworks &{" "}
            <span className="gradient-text font-extrabold">Executive Toolkits</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto text-balance">
            Access our tested playbooks, hook vaults, and profile optimization blueprints to elevate your personal brand and outbound pipeline.
          </p>
        </Container>
      </section>

      {/* ── Toolkits Grid ── */}
      <section className="section-padding-md bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {RESOURCES.map((res) => (
              <div
                key={res.id}
                className="card-premium bg-white p-8 flex flex-col justify-between group hover:border-[var(--color-primary)]/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <Badge variant="ivory" size="sm" className="font-semibold">
                      {res.category}
                    </Badge>
                    <span className="text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      {res.type}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {res.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary-muted)]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{res.downloadCount}</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--color-border)]">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="sm"
                    icon={<Download className="w-3.5 h-3.5" />}
                    className="w-full justify-center"
                  >
                    Download Resource
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Custom Blueprint CTA ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/40 border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-charcoal)]">
            Need a Bespoke Audit for Your Executive Profile?
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Our strategic team conducts complimentary 15-minute profile teardowns for verified founders and corporate leaders.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Request Profile Teardown
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
