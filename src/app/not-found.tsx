import Link from "next/link";
import { Compass, Home, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 bg-gradient-to-b from-[var(--color-ivory)]/40 via-white to-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10 text-center space-y-8">
        <div className="inline-flex justify-center">
          <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            Error 404 · Destination Lost
          </Badge>
        </div>

        <div className="space-y-4">
          <span className="font-heading font-extrabold text-7xl sm:text-8xl md:text-9xl tracking-tight text-[var(--color-primary)] opacity-90 select-none block">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[var(--color-charcoal)]">
            This Executive Route Does Not Exist
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
            The page you are looking for may have been repositioned, archived, or does not exist in our published directory.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2" />
            Return to Homepage
          </Button>

          <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
            Explore Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Quick Directory Links */}
        <div className="pt-8 border-t border-[var(--color-border)] max-w-lg mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Direct Access Pathways
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Link
              href="/about"
              className="p-2.5 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-all font-medium"
            >
              About UVOKA
            </Link>
            <Link
              href="/founder"
              className="p-2.5 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-all font-medium"
            >
              Founder Story
            </Link>
            <Link
              href="/resources"
              className="p-2.5 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-all font-medium"
            >
              Toolkits
            </Link>
            <Link
              href="/contact"
              className="p-2.5 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-all font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
