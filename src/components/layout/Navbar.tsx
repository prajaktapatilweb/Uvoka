"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs py-3"
            : "bg-transparent py-5"
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 rounded-lg"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-ivory)] p-1 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/logo1.png"
                alt="UVOKA Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-tight text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-primary-dark)]">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-text-muted)] hidden sm:block">
                Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-primary)] font-semibold bg-[var(--color-ivory)]"
                      : "text-[var(--color-charcoal)] hover:text-[var(--color-primary)] hover:bg-[var(--color-ivory)]/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Enquire Now
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)] border border-[var(--color-border)] transition-colors focus-visible:outline-2"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
