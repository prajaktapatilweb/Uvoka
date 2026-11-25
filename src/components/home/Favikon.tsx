'use client';

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";
import { SectionHeadingcopy } from "../common/SectionHeadingcopy";

interface FavikonStat {
  id: string;
  top: number;
  label: string;
  note: string;
}

const FAVIKON_STATS: FavikonStat[] = [
  { id: "india-1", top: 6, label: "LinkedIn India", note: "Ahead of 94% of creators" },
  { id: "uae", top: 6, label: "LinkedIn UAE", note: "Ahead of 94% of creators" },
  { id: "india-2", top: 13, label: "LinkedIn India", note: "Ahead of 87% of creators" },
  { id: "india-3", top: 16, label: "LinkedIn India", note: "Ahead of 84% of creators" },
];

export default function FavikonCounter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      aria-label="Favikon creator rankings"
      className="relative overflow-hidden bg-bg-dark py-16 text-white sm:py-20 md:py-28"
    >
      <Container className="relative">
        <SectionHeadingcopy
          eyebrow="Favikon Creator Rankings"
          title="Our Clients Top on Favikon"
          highlight="Top on Favikon"
          highlightColor="gold"
          subtitle="Our clients have achieved remarkable recognition on LinkedIn, being featured among the top creators on Favikon."
          align="left"
          darkTheme
          className="mb-12 max-w-2xl md:mb-16"
        />

        <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {FAVIKON_STATS.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "flex min-w-0 flex-col md:px-8",
                index === 0 ? "md:pl-0" : "md:border-l md:border-white/15",
                index % 2 === 1 && "border-l border-white/15 pl-5 sm:pl-6 md:pl-8"
              )}
            >
              <dt className="text-sm font-medium text-white">{stat.label}</dt>

              <dd className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-white/90 md:text-xl">Top</span>
                  <span className="font-editorial text-6xl font-medium leading-none text-gold sm:text-7xl">
                    <AnimatedCounter
                      value={stat.top}
                      duration={1.4}
                      className="inline-block"
                    />
                    <span className="text-4xl sm:text-5xl">%</span>
                  </span>
                </div>

                <div
                  className="mt-6 h-[3px] w-full rounded-full bg-white/15"
                  role="img"
                  aria-label={`${stat.label}: ${stat.note}`}
                >
                  <motion.div
                    aria-hidden="true"
                    className="relative h-full rounded-full bg-gold"
                    initial={shouldReduceMotion ? false : { width: 0 }}
                    whileInView={{ width: `${100 - stat.top}%` }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 1.4,
                      ease: "easeOut",
                    }}
                  >
                    <span className="absolute -right-1.5 -top-[5px] h-[13px] w-[13px] rounded-full bg-gold ring-4 ring-bg-dark" />
                  </motion.div>
                </div>

                <p className="mt-4 text-sm text-white/80" style={{ color: 'lightgray' }}>{stat.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
