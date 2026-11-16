'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

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
      className="border-y border-[var(--color-border)] bg-[var(--color-ivory)] py-10 md:py-14"
    >
      <Container className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(190px,0.7fr)_1.3fr] md:gap-12">
        <div>
          <h2
            id="featured-heading"
            className="font-heading text-3xl font-bold text-[var(--color-charcoal)] md:text-4xl"
          >
            As Featured In
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Recognized by leading publications
          </p>
        </div>

        <motion.ul
          className="grid grid-cols-2 items-stretch gap-x-6 gap-y-8 md:grid-cols-3 md:gap-x-8"
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
              className="flex min-w-0 flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease: "easeOut" }}
            >
              <div className="relative h-24 w-full rounded-sm bg-white p-5 shadow-[var(--shadow-sm)]">
                <a href={logo.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 767px) 40vw, 15vw"
                  className="object-contain"
                />
                </a>
              </div>
           
              {/* <Button
                href={logo.href}
                isExternal
                variant="primary"
                size="sm"
                // icon={<ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
                className="mt-4 self-center text-[15px] focus-visible:outline-[var(--color-primary)]"
              >
                Read article
              </Button> */}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
