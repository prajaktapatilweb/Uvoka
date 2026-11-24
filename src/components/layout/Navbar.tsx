"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES, SITE_CONFIG } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHeroOverlay = pathname === "/" && !isScrolled;
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

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
        ? "bg-white/20 font-semibold text-white"
        : "text-white hover:bg-white/15"
      : active
        ? "bg-[var(--color-ivory)] font-semibold text-[var(--color-primary)]"
        : "text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)]/60 hover:text-[var(--color-primary)]";

  const linkBase =
    "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-5 xl:text-base";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out border-none ${
          isScrolled
            ? "bg-white/95 py-2.5 shadow-sm backdrop-blur-xl"
            : "bg-transparent py-4 lg:py-6"
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between transition-all duration-500 ease-out ${
            isScrolled
              ? "max-w-7xl px-5 sm:px-8 lg:px-10"
              : "max-w-7xl px-4 sm:px-6 lg:px-8"
          }`}
        >
          {/* Unified Floating Island Capsule that morphs smoothly into full-width header on scroll */}
          <div
            className={`relative flex w-full items-center justify-between transition-all duration-500 ease-out ${
              isScrolled
                ? "rounded-none border-0 bg-transparent px-0 py-0 shadow-none ring-0 backdrop-blur-none"
                : "rounded-[15px] border border-white/30 bg-white/[0.18] px-3.5 sm:px-5 py-1.5 sm:py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.35)] ring-1 ring-white/15 backdrop-blur-2xl"
            }`}
          >
            {/* Glossy top specular reflection line */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-opacity duration-300 ${
                isScrolled ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Logo Brand on Left (included inside the glossy background) */}
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 py-1 pl-1 pr-3"
            >
              <div className="relative shrink-0 transition-all duration-300 group-hover:scale-105">
                <Image
                  src={isHeroOverlay ? "/logo/logo2.png" : "/images/uvokalogo2.png"}
                  alt="UVOKA Logo"
                  width={110}
                  height={110}
                  priority
                />
              </div>
              {/* <span
                className={`font-heading text-lg sm:text-xl font-bold  tracking-tight transition-colors duration-300 ${
                  isHeroOverlay
                    ? "text-white"
                    : "text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)]"
                }`}
              >
                {SITE_CONFIG.name}
              </span> */}
            </Link>

            {/* Desktop Navigation Links on Right */}
            <nav
              aria-label="Main"
              className="hidden items-center gap-1 xl:flex"
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
                          className="absolute right-0 top-full z-50 mt-3 w-72 rounded-xl border border-[var(--color-border)] bg-white/95 p-2 text-[var(--color-charcoal)] shadow-xl backdrop-blur-xl"
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
                            ? "bg-[var(--color-white/10,#d4b06a)]"
                            : "bg-[var(--color-white/10)]"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 ${
                  isHeroOverlay
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-ivory)]"
                }`}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}
