"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Mail, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from "@/components/common/Icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(pathname.startsWith("/services/"));

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
    setIsServicesOpen(pathname.startsWith("/services/"));
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[var(--color-charcoal)]/60 backdrop-blur-md xl:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--color-bg)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
              <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-ivory)] p-0.5">
                  <Image
                    src="/logo/logo1.png"
                    alt="UVOKA Logo"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <span className="font-heading font-bold text-lg text-[var(--color-primary)]">
                  {SITE_CONFIG.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)] transition-colors focus-visible:outline-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="my-auto py-6 space-y-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = link.href === "/services"
                  ? pathname.startsWith("/services")
                  : pathname === link.href;

                if (link.href === "/services") {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2">
                        <Link
                          href="/services"
                          onClick={onClose}
                          className={`flex flex-1 items-center justify-between rounded-xl px-4 py-3 font-heading text-lg font-medium transition-all ${
                            isActive
                              ? "bg-[var(--color-ivory)] pl-5 font-bold text-[var(--color-primary)]"
                              : "text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)]/50 hover:pl-5"
                          }`}
                        >
                          <span>Services</span>
                          <ArrowRight aria-hidden="true" className="h-4 w-4 opacity-40" />
                        </Link>
                        <button
                          type="button"
                          aria-label="Toggle service links"
                          aria-expanded={isServicesOpen}
                          aria-controls="mobile-services-menu"
                          onClick={() => setIsServicesOpen((open) => !open)}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[var(--color-primary)] transition-colors hover:bg-[var(--color-ivory)] focus-visible:outline-2"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className={`h-5 w-5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      {isServicesOpen && (
                        <div id="mobile-services-menu" className="ml-4 mt-1 space-y-1 border-l border-[var(--color-border)] pl-3">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}` as Route}
                              onClick={onClose}
                              className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                pathname === `/services/${service.slug}`
                                  ? "bg-[var(--color-ivory)] font-semibold text-[var(--color-primary)]"
                                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-ivory)]/60 hover:text-[var(--color-primary)]"
                              }`}
                            >
                              {service.title.replace(/\s*\[Placeholder\]/, "")}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href as Route}
                      onClick={onClose}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl font-heading text-lg font-medium transition-all ${
                        isActive
                          ? "bg-[var(--color-ivory)] text-[var(--color-primary)] font-bold pl-5"
                          : "text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)]/50 hover:pl-5"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions & Social */}
            <div className="space-y-6 pt-6 border-t border-[var(--color-border)]">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={onClose}
              >
                Enquire Now
              </Button>

              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] pt-2">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{SITE_CONFIG.email}</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-7 h-7 rounded-full bg-[var(--color-ivory)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-7 h-7 rounded-full bg-[var(--color-ivory)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-7 h-7 rounded-full bg-[var(--color-ivory)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    <TwitterXIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
