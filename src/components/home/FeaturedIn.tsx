'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";

const featuredLogos = [
  {
    src: "/images/featured/logo4.png",
    alt: "Al Jazeera",
    href: "https://www.aljazeera.com/news/2025/7/1/why-is-prada-caught-in-a-sandal-scandal-in-india",
  },
  {
    src: "/images/featured/logo1.png",
    alt: "Deccan Business",
    href: "https://deccanbusiness.com/personal-branding-is-more-than-a-buzzword-and-uvoka-is-proving-it-every-day/",
  },
  {
    src: "/images/featured/logo3.png",
    alt: "The Telegraph News",
    href: "https://thetelegraphnews.com/personal-branding-is-more-than-a-buzzword-and-uvoka-is-proving-it-every-day/",
  },
];

export function FeaturedIn() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="featured-section"
      aria-labelledby="featured-heading"
      className="relative overflow-hidden bg-bg-dark py-12 text-white md:py-16"
    >
      {/* soft glow, same family as the hero's curved shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl"
      />
      {/* thin gold line along the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <Container className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(220px,0.7fr)_1.3fr] md:gap-14">
        <div>
          <h2
            id="featured-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl" style={{ color: "white" }}
          >
            As Featured In
          </h2>
          <p className="mt-3 font-serif text-lg italic text-gold md:text-xl">
            Recognized by leading publications
          </p>
        </div>

        <motion.ul
          className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
        >
          {featuredLogos.map((logo) => (
            <motion.li
              key={logo.src}
              className="min-w-0"
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease: "easeOut" }}
            >
              {/* The whole white plate is the link, not just the logo */}
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-24 w-full rounded-xl bg-white p-5 shadow-lg ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 767px) 40vw, 15vw"
                  className="object-contain p-5"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-bg-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}