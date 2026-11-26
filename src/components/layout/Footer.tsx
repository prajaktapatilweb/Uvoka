import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
            
              <Image
                            src= "/images/uvokalogo1.png"
                            alt="UVOKA Logo"
                            width={ 44}
                            height={ 44}
                            priority
                          />
                       
                        <div className='h-11 items-center'>
                          <span
                            className='font-heading text-2xl leading-11 font-bold tracking-tight transition-colors duration-300 '
                            
                          >
                            {SITE_CONFIG.name}
                          </span>
                          </div>
            
            </Link>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed" style={{color:'lightgray'}}>
             Building LinkedIn legacies that lead, influence, and last. We transform professionals into thought leaders.
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
          <div className="space-y-4 text-white">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-white" style={{color:'white'}}>
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
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-white" style={{color:'white'}}>
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
            
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-white" style={{color:'white'}}>
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <a
                href="mailto:srihita@uvoka.co.in"
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-white/70 group-hover:text-white shrink-0 transition-colors" />
                <span>srihita@uvoka.co.in</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="tel:+917702141838"
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-white/70 group-hover:text-white shrink-0 transition-colors" />
                <span>+91 7702141838</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                <span>Hyderabad, India</span>
              </div>
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
