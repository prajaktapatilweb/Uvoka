"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHeroOverlay = pathname === "/" && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  // Link colours change depending on whether we sit on top of the hero or on a white bar
  const linkClass = (active: boolean) =>
    isHeroOverlay
      ? active
        ? "bg-white/15 font-semibold text-white"
        : "text-white/85 hover:bg-white/10 hover:text-white"
      : active
        ? "bg-[var(--color-ivory)] font-semibold text-[var(--color-primary)]"
        : "text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)]/60 hover:text-[var(--color-primary)]";

  const linkBase =
    "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-5 xl:text-base";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-[var(--color-border)] bg-white/90 py-3 shadow-xs backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        {/* Full-width wrapper (no Container). Left padding lines up with the hero text */}
        <div className="flex w-full items-center justify-between px-5 sm:px-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-16">
          {/* Logo Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3 justify-self-start rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/30 bg-white p-1 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/logo1.png"
                alt="UVOKA Logo"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`font-heading text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  isHeroOverlay
                    ? "text-white"
                    : "text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)]"
                }`}
              >
                {SITE_CONFIG.name}
              </span>
              <span
                className={`hidden text-[10px] font-mono uppercase tracking-widest sm:block ${
                  isHeroOverlay ? "text-white/70" : "text-[var(--color-text-muted)]"
                }`}
              >
                Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation: sits in a solid pill so it stays readable on the dark and light halves of the hero */}
          <nav
            aria-label="Main"
            className={`hidden items-center gap-1 rounded-full p-1.5 transition-all duration-300 lg:flex ${
              isHeroOverlay
                ? "bg-[var(--color-primary-dark)]/85 shadow-lg ring-1 ring-white/15 backdrop-blur-md"
                : ""
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/services"
                  ? pathname.startsWith("/services")
                  : pathname === link.href;

              if (link.href === "/services") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    onFocus={() => setIsServicesOpen(true)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setIsServicesOpen(false);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setIsServicesOpen(false);
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isServicesOpen}
                      aria-controls="desktop-services-menu"
                      onClick={() => setIsServicesOpen(true)}
                      className={`${linkBase} ${linkClass(isActive)}`}
                    >
                      Services
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isServicesOpen && (
                      <div
                        id="desktop-services-menu"
                        className="absolute left-0 top-full z-50 mt-3 w-72 rounded-xl border border-[var(--color-border)] bg-white p-2 text-[var(--color-charcoal)] shadow-lg"
                      >
                        <Link
                          href="/services"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-ivory)]"
                        >
                          All Services
                          <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                        <div className="my-1 border-t border-[var(--color-border)]" />
                        {SERVICES.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}` as Route}
                            onClick={() => setIsServicesOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--color-ivory)] hover:text-[var(--color-primary)]"
                          >
                            {service.title.replace(/\s*\[Placeholder\]/, "")}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className={`${linkBase} ${linkClass(isActive)}`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                        isHeroOverlay
                          ? "bg-[var(--color-gold,#d4b06a)]"
                          : "bg-[var(--color-primary)]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 lg:justify-self-end">
            <Button
              href="/contact"
              variant={isHeroOverlay ? "gold" : "primary"}
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
              className="hidden sm:inline-flex"
            >
              Enquire Now
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 lg:hidden ${
                isHeroOverlay
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)]"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}