"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const linkClass = (active: boolean) =>
    active
      ? "font-semibold text-[var(--brand-purple)] bg-[var(--brand-purple)]/[0.08]"
      : "text-[var(--brand-charcoal)] hover:text-[var(--brand-purple)] hover:bg-[var(--brand-purple)]/[0.05]";

  const linkBase =
    "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-4 xl:text-[15px]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out border-none ${
          isScrolled
            ? "bg-white/95 py-2.5 shadow-sm backdrop-blur-xl"
            : "bg-transparent py-4 lg:py-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo on Left */}
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 py-1"
          >
            <div className="relative shrink-0 transition-all duration-300 group-hover:scale-105">
              <Image
                src="/images/uvokalogo2.png"
                alt="UVOKA Logo"
                width={115}
                height={115}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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
                        className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-3 w-72 rounded-xl border border-[var(--color-border)] bg-white/95 p-2 text-[var(--color-charcoal)] shadow-xl backdrop-blur-xl"
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
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--brand-purple)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Get Started Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[var(--brand-purple)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(82,33,102,0.20)] transition-all hover:bg-[var(--brand-purple-dark)] hover:shadow-[0_10px_25px_rgba(82,33,102,0.28)]"
            >
              Get Started
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--brand-purple)]/20 text-[var(--brand-charcoal)] hover:bg-[var(--brand-purple)]/10 focus-visible:outline-2"
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
