"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Mail } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from "@/components/common/Icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

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
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[var(--color-charcoal)]/60 backdrop-blur-md lg:hidden"
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
                const isActive = pathname === link.href;
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
