import { MailOpen, Globe, PenTool, CheckCircle2, ArrowRight } from "lucide-react";
import { ADD_ONS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const ADDON_ICONS = [
  <MailOpen key="1" className="w-5 h-5 text-[var(--color-primary)]" />,
  <Globe key="2" className="w-5 h-5 text-[var(--color-primary)]" />,
  <PenTool key="3" className="w-5 h-5 text-[var(--color-primary)]" />,
];

export function AddOns() {
  return (
    <section className="section-padding-lg bg-[var(--color-ivory)]/60 border-t border-[var(--color-border)] relative">
      <Container>
        <SectionHeading
          eyebrow="Specialized Add-ons"
          title="Complementary High-Impact Capabilities"
          italicPhrase="High-Impact Capabilities"
          subtitle="Beyond core LinkedIn branding, we provide deep-craft ecosystem extensions to amplify founder influence across owned channels."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ADD_ONS.map((addon, index) => (
            <AnimatedCard
              key={addon.id}
              delay={index * 0.1}
              enableTilt={true}
              className="p-8 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center transition-transform group-hover:scale-105">
                    {ADDON_ICONS[index % ADDON_ICONS.length]}
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--color-gold)]">
                    ADD-ON 0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
                    {addon.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                    {addon.shortDesc}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2">
                  {addon.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--color-border)]">
                <Button
                  href="/contact"
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors"
                >
                  {addon.ctaLabel}
                </Button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
