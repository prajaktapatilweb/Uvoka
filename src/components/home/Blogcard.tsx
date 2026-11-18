"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/common/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO, e.g. "2025-09-04"
  image: string;
};

// Replace with your real posts (or pass `posts` as a prop)
const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "linkedin-authority-framework",
    title: "The authority framework behind our fastest-growing founder profiles",
    excerpt:
      "A look at how we combine positioning, content pillars and consistent publishing to turn a LinkedIn profile into an inbound lead engine.",
    category: "Case Study",
    date: "2025-09-04",
    image: "/images/blog/post-1.jpg",
  },
  {
    id: "2",
    slug: "tofu-mofu-bofu-content-mix",
    title: "TOFU, MOFU, BOFU: the content mix that actually converts",
    excerpt:
      "Why most executives post only top-of-funnel content, and how a balanced pillar mix moves followers into real business conversations.",
    category: "Insights",
    date: "2025-08-18",
    image: "/images/blog/post-2.jpg",
  },
  {
    id: "3",
    slug: "profile-optimisation-checklist",
    title: "A 24-hour profile optimisation checklist for founders",
    excerpt:
      "Headline, banner, bio and featured section. The small changes that make a profile read as category authority at first glance.",
    category: "Guides",
    date: "2025-07-29",
    image: "/images/blog/post-3.jpg",
  },
  {
    id: "4",
    slug: "zero-follow-up-content-calendar",
    title: "How a zero follow-up content calendar saves 10 hours a month",
    excerpt:
      "Our Monday Notion board workflow: approve in 15 minutes, publish all week, and never chase a draft again.",
    category: "Insights",
    date: "2025-07-02",
    image: "/images/blog/post-4.jpg",
  },
  {
    id: "5",
    slug: "reading-your-linkedin-analytics",
    title: "Reading your LinkedIn analytics like an operator, not a marketer",
    excerpt:
      "Which numbers matter every week, which only matter monthly, and which are vanity metrics you can safely ignore.",
    category: "Guides",
    date: "2025-06-11",
    image: "/images/blog/post-5.jpg",
  },
];

const GAP = 24; // gap-6
const NOTCH_W = 104;
const NOTCH_H = 84;
const R = 24;

/** Page background behind the cards. The notch must be the same colour. */
const BG = "var(--color-ivory)";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function BlogCard({ post }: { post: BlogPost }) {
  const cornerStyle = {
    width: R,
    height: R,
    background: `radial-gradient(circle at 0 0, transparent ${R - 1}px, ${BG} ${R}px)`,
  } as const;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-3 pb-0 shadow-[0_10px_40px_-18px_rgba(43,15,58,0.25)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(43,15,58,0.4)] sm:p-4 sm:pb-0">
      {/* image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-primary-dark">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 639px) 86vw, (max-width: 1023px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* tag + date */}
      <div className="mt-5 flex items-center justify-between gap-3 px-1">
        <span className="inline-flex items-center gap-2.5 rounded-xl bg-ivory px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-charcoal sm:text-xs">
          <span className="h-2.5 w-2.5 bg-gold" />
          {post.category}
        </span>
        <time
          dateTime={post.date}
          className="font-mono text-[11px] uppercase tracking-[0.06em] text-text-muted sm:text-xs"
        >
          {formatDate(post.date)}
        </time>
      </div>

      {/* text */}
      <div className="flex flex-1 flex-col px-1 pb-24">
        <h3 className="mt-5 font-heading text-[1.4rem] font-normal leading-[1.2] tracking-tight text-charcoal sm:text-[1.55rem]">
          <Link
            href={`/blog/${post.slug}` as Route}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-text-secondary">
          {post.excerpt}
        </p>
        <span className="mt-auto pt-6 font-mono text-sm uppercase tracking-[0.04em] text-charcoal">
          Read article
        </span>
      </div>

      {/* notched arrow tab (bottom-right) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 rounded-tl-[28px]"
        style={{ width: NOTCH_W, height: NOTCH_H, background: BG, paddingLeft: 8, paddingTop: 8 }}
      >
        <span className="flex h-full w-full items-center justify-center rounded-tl-[22px] rounded-tr-[22px] rounded-bl-[22px] bg-gold text-bg-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      {/* inverse corners that round the cut-out */}
      <span
        aria-hidden="true"
        className="absolute right-0"
        style={{ ...cornerStyle, bottom: NOTCH_H, transform: "scaleX(-1)" }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0"
        style={{ ...cornerStyle, right: NOTCH_W, transform: "scaleY(-1)" }}
      />
    </article>
  );
}

export function BlogSlider({ posts = SAMPLE_POSTS }: { posts?: BlogPost[] }) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  const [edges, setEdges] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0.33);
  const [index, setIndex] = useState(1);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const visible = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + GAP : el.clientWidth;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
    setProgress(Math.min(1, (el.scrollLeft + el.clientWidth) / el.scrollWidth));
    setIndex(Math.round(el.scrollLeft / step) + 1);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, visible.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + GAP : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
  };

  const changeFilter = (c: string) => {
    setFilter(c);
    trackRef.current?.scrollTo({ left: 0 });
  };

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="section-padding-lg overflow-hidden"
      style={{ background: BG }}
    >
      <Container>
        {/* header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Latest Insights
            </p>
            <h2
              id="blog-heading"
              className="mt-3 font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-charcoal md:text-7xl"
            >
              News{" "}
              <span className="font-editorial text-4xl font-normal italic text-primary md:text-6xl">
                &amp; Stories
              </span>
            </h2>
          </div>

          {/* filters */}
          <div
            role="tablist"
            aria-label="Filter posts"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => changeFilter(c)}
                className={`shrink-0 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-[0.06em] transition-colors sm:text-sm ${
                  filter === c
                    ? "bg-charcoal text-white"
                    : "bg-white text-charcoal hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* slider track: 1 card on mobile, 2 on tablet, 3 on desktop */}
        <div
          ref={trackRef}
          onScroll={update}
          tabIndex={0}
          aria-label="Blog posts"
          className="-mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 py-6 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((post) => (
            <div
              key={post.id}
              className="min-w-0 shrink-0 basis-[86%] snap-start sm:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)]"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center gap-5">
          <span className="font-mono text-sm text-text-muted">
            {String(Math.min(index, visible.length)).padStart(2, "0")} /{" "}
            {String(visible.length).padStart(2, "0")}
          </span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-charcoal/10">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={edges.start}
              aria-label="Previous posts"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 bg-white text-charcoal transition-colors hover:bg-charcoal hover:text-white disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-charcoal"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={edges.end}
              aria-label="Next posts"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-bg-dark transition-colors hover:bg-primary hover:text-white disabled:opacity-35 disabled:hover:bg-gold disabled:hover:text-bg-dark"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}