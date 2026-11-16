import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG, SERVICES, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/common/Container";
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from "@/components/common/Icons";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-white/90 pt-16 md:pt-24 pb-12 border-t border-[var(--color-border-dark)] relative overflow-hidden">
      {/* Subtle luxury background glow orb */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[var(--color-primary)]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 space-y-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 bg-white/10 p-1">
                <Image
                  src="/logo/logo1.png"
                  alt="UVOKA Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white group-hover:text-[var(--color-gold)] transition-colors">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Transforming high-performing founders, creators and corporate
              leaders into influential LinkedIn brands with bespoke content,
              authority positioning and measurable pipeline growth.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="UVOKA on LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="UVOKA on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="UVOKA on Twitter"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--color-primary)] hover:border-transparent transition-all"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-[var(--color-gold)]">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}` as Route}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation / Company Column */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-[var(--color-gold)]">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/press"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  <span>Press Releases</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-[var(--color-gold)]">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                <span>{SITE_CONFIG.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>India · Global Client Coverage</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[#c4a06a] transition-all shadow-sm"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 {SITE_CONFIG.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
