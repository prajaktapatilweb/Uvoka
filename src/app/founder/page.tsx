import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Quote, CheckCircle2, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/common/Icons";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Founder & CEO Profile | Executive Vision",
  description:
    "Explore the journey, leadership philosophy, and editorial architecture of UVOKA's Founder & CEO — architecting executive personal brands on LinkedIn.",
  alternates: { canonical: "https://www.uvoka.in/founder" },
};

export default function FounderPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* ── Founder Editorial Hero ── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-ivory)]/60 via-white to-white overflow-hidden border-b border-[var(--color-border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="gold" size="md" className="gap-1.5 uppercase font-bold tracking-wider">
                Founder & Chief Executive Officer
              </Badge>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--color-charcoal)] leading-tight text-balance">
                Pioneering the Science of{" "}
                <span className="gradient-text font-extrabold">Executive Conviction</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed text-balance">
                &ldquo;Your LinkedIn presence is no longer a static CV—it is your personal boardroom, your primary investment thesis distribution channel, and the highest-leverage sales funnel you will ever own.&rdquo;
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Consultation
                </Button>
                <Button
                  href={SITE_CONFIG.social.linkedin}
                  variant="outline"
                  size="md"
                  isExternal
                  icon={<LinkedInIcon className="w-4 h-4" />}
                >
                  Connect on LinkedIn
                </Button>
              </div>
            </div>

            {/* Right Column (5 cols): Founder Portrait Area */}
            <div className="lg:col-span-5">
              <div className="card-premium p-8 bg-[var(--color-ivory)]/40 text-center relative overflow-hidden group">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-2">
                  <Image
                    src="/logo/logo1.png"
                    alt="UVOKA Founder Seal"
                    fill
                    sizes="224px"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                <div className="mt-6 space-y-1">
                  <h3 className="font-heading font-bold text-2xl text-[var(--color-charcoal)]">
                    Founder & CEO
                  </h3>
                  <p className="text-xs uppercase tracking-widest font-mono text-[var(--color-primary)] font-semibold">
                    UVOKA Brand Architects
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-around text-xs font-mono text-[var(--color-text-secondary)]">
                  <span>50M+ Views</span>
                  <span>•</span>
                  <span>14 Countries</span>
                  <span>•</span>
                  <span>Top 1% Voice</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Editorial Trajectory & Philosophy ── */}
      <section className="section-padding-md bg-white">
        <Container size="narrow" className="space-y-12">
          <div className="space-y-6">
            <span className="eyebrow">The Leadership Philosophy</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[var(--color-charcoal)]">
              Why Executive Thought Leadership Dictates Market Share
            </h2>

            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              In an era where software features are replicated in weeks and AI can generate infinite mediocre prose, the only defensible asset is authentic human credibility.
            </p>

            <div className="p-8 rounded-2xl bg-[var(--color-ivory)]/50 border border-[var(--color-border)] relative my-8">
              <Quote className="w-10 h-10 text-[var(--color-primary)]/20 absolute top-4 left-4" />
              <p className="font-editorial italic text-lg sm:text-xl text-[var(--color-charcoal)] relative z-10 leading-relaxed pl-6">
                &ldquo;When a CEO speaks with authentic conviction on LinkedIn, their customer acquisition costs drop, recruitment cycles compress by half, and enterprise procurement barriers dissolve.&rdquo;
              </p>
            </div>

            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              At UVOKA, we built a bespoke studio framework designed specifically for C-suite time constraints. We extract your proprietary insights through rigorous 1-on-1 interviews, shape them into magnetic narrative frameworks, and distribute them to the decision-makers that move your business needle.
            </p>
          </div>

          {/* Core Principles */}
          <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
            <h3 className="font-heading font-bold text-xl text-[var(--color-charcoal)]">
              Core Guiding Principles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "No Vanilla Consensus", desc: "If everyone in your industry agrees with your post, you haven't written a thought leadership piece—you've written filler." },
                { title: "Revenue Over Vanity", desc: "Likes and reposts mean nothing if they don't convert into qualified pipeline, partnerships, or capital." },
                { title: "Radical Specificity", desc: "Concrete data, actual decision frameworks, and authentic lived lessons outperform general advice every single time." },
                { title: "Zero Time Waste", desc: "The executive's responsibility is vision; our studio's responsibility is research, drafting, design, and analytics." },
              ].map((p, i) => (
                <div key={i} className="card-premium p-5 bg-white space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <h4 className="font-heading font-bold text-sm text-[var(--color-charcoal)]">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing Contact ── */}
      <section className="section-padding-md bg-[var(--color-ivory)]/50 border-t border-[var(--color-border)]">
        <Container size="narrow" className="text-center space-y-6">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-charcoal)]">
            Schedule a Confidential Executive Discovery Call
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Discuss your sector positioning, personal authority goals, and quarterly sprint deliverables directly with our leadership team.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Consultation
            </Button>
            <Button href={`mailto:${SITE_CONFIG.email}`} variant="outline" size="md" icon={<Mail className="w-4 h-4" />}>
              Direct Email
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
