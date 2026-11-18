"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, ShieldCheck, ArrowRight, MessageSquareQuote } from "lucide-react";
import { FAQS } from "@/data/homeData";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq-section"
      className="section-padding-lg bg-gradient-to-b from-[var(--color-white)] via-[var(--color-ivory)]/30 to-[var(--color-white)] border-t border-[var(--color-border)] relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/3 -left-32 w-[32rem] h-[32rem] rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10">
        {/* Editorial Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] font-body">
              Frequently Asked Questions
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--color-charcoal)] tracking-tight leading-snug text-balance"
          >
            Everything You Need to Know About Our{" "}
            <span className="font-editorial italic font-normal text-[var(--color-primary)]">
              Executive Sprints
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Direct, transparent answers regarding voice architecture, executive time commitments,
            confidentiality governance, and measurable pipeline ROI.
          </motion.p>
        </div>

        {/* Accordion Item Stack with Viewport Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemNumber = (index + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={faq.id}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                className={`relative rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden group ${
                  isOpen
                    ? "bg-white border-[var(--color-primary)]/40 shadow-[0_12px_36px_rgba(82,33,102,0.08)] scale-[1.005]"
                    : "bg-white/80 backdrop-blur-md border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-[0_8px_24px_rgba(82,33,102,0.04)]"
                }`}
              >
                {/* Active Top Gradient Accent Ribbon */}
                {isOpen && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary-muted)]"
                    aria-hidden="true"
                  />
                )}

                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-7 flex items-center justify-between gap-4 sm:gap-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 rounded-2xl"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                    {/* Index Monogram */}
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-xs "
                          : "bg-[var(--color-ivory)] text-[var(--color-gold)] border-[var(--color-border)] group-hover:border-[var(--color-gold)]"
                      }`}
                    >
                      {itemNumber}
                    </span>

                    <h4 className="font-heading font-bold text-base sm:text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                      {faq.question}
                    </h4>
                  </div>

                  {/* Smooth Rotating Toggle Button */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm rotate-45"
                        : "bg-[var(--color-ivory)] text-[var(--color-primary)] border-[var(--color-border)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)]"
                    }`}
                  >
                    <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300" />
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-[var(--color-border)]/60">
                        <div className="pt-4 flex items-center gap-2 mb-3">
                          <Badge variant="ivory" size="sm" className="font-semibold text-[11px] gap-1">
                            <MessageSquareQuote className="w-3 h-3 text-[var(--color-primary)]" />
                            {faq.category || "Sprint Protocol"}
                          </Badge>
                          <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                            Verified Methodology
                          </span>
                        </div>

                        <div className="border-l-2 border-[var(--color-gold)]/60 pl-4 py-0.5">
                          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Executive Concierge Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[var(--color-ivory)]/60 to-white border border-[var(--color-border)] shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-[var(--color-charcoal)] font-heading">
                Have a confidential executive inquiry?
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Our founders conduct private, NDA-protected onboarding briefings.
              </p>
            </div>
          </div>

          <Button
            href="/contact"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shrink-0 shadow-md"
          >
            Request Private Briefing
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
