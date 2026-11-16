import { Sparkles, Check, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { CURRENT_OFFER } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function SpecialOffer() {
  return (
    <section className="section-padding-lg bg-[var(--color-bg-dark)] text-white relative overflow-hidden">
      {/* Background radial luxury glows */}
      <div
        className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[var(--color-primary)]/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[var(--color-gold)]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle gold border highlight line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  {CURRENT_OFFER.badge}
                </Badge>
                <span className="text-xs font-mono text-[var(--color-gold)] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {CURRENT_OFFER.discountPercentage}
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                {CURRENT_OFFER.title}
              </h2>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {CURRENT_OFFER.subtitle}
              </p>

              {/* Benefit Checklist */}
              <div className="space-y-3 pt-2">
                {CURRENT_OFFER.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-gold)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[var(--color-gold)]" />
                    </div>
                    <span className="text-xs sm:text-sm text-white/90">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Validity Notice */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--color-gold)]/90">
                <ShieldCheck className="w-4 h-4 text-[var(--color-gold)]" />
                <span>{CURRENT_OFFER.validityNotice}</span>
              </div>
            </div>

            {/* Right Card Column (5 cols): Investment & Direct Booking */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-white/[0.08] border border-white/20 text-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-white/60">
                  Sprint Investment
                </span>
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[var(--color-gold)]">
                    {CURRENT_OFFER.discountPrice}
                  </span>
                  <span className="text-sm line-through text-white/40 font-mono">
                    {CURRENT_OFFER.originalPrice}
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  Billed quarterly · Verified deliverables guaranteed
                </p>
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <MagneticButton className="w-full">
                  <Button
                    href="/contact"
                    variant="gold"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4 text-[var(--color-charcoal)]" />}
                    className="w-full justify-center shadow-xl hover:scale-105 transition-transform"
                  >
                    Secure Sprint Privilege
                  </Button>
                </MagneticButton>

                <p className="text-[11px] text-white/50 font-mono">
                  No long-term lock-in · Strict exclusivity per category
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
