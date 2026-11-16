import { FEATURED_MEDIA } from "@/data/homeData";
import { Container } from "@/components/common/Container";

export function FeaturedIn() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...FEATURED_MEDIA, ...FEATURED_MEDIA, ...FEATURED_MEDIA];

  return (
    <section
      id="featured-section"
      className="py-10 md:py-14 bg-[var(--color-ivory)] border-y border-[var(--color-border)] overflow-hidden relative"
    >
      <Container className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-muted)] font-mono">
          Featured & Recognized Across Leading Business Publications
        </p>
      </Container>

      {/* Marquee Track Container with gradient fade edges */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-8 md:gap-16 py-2">
          {marqueeItems.map((media, idx) => (
            <div
              key={`${media.id}-${idx}`}
              className="flex items-center gap-3 shrink-0 px-4 py-2 rounded-xl hover:bg-white/60 transition-colors duration-200 cursor-default group"
            >
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl md:text-2xl text-[var(--color-charcoal)]/80 tracking-tight transition-colors duration-200 group-hover:text-[var(--color-primary)]">
                  {media.name}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--color-text-muted)]">
                  {media.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
