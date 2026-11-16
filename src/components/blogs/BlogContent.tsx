import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--color-charcoal)] mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-charcoal)] mt-8 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--color-charcoal)] mt-6 mb-3 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 p-6 rounded-2xl bg-[var(--color-ivory)]/60 border-l-4 border-[var(--color-gold)] font-serif italic text-lg sm:text-xl text-[var(--color-charcoal)] leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-base sm:text-lg text-[var(--color-text-secondary)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-base sm:text-lg text-[var(--color-text-secondary)]">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative my-8 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md aspect-video">
          <Image
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt || "Article illustration"}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-[var(--color-primary)] font-semibold underline underline-offset-4 decoration-[var(--color-gold)] hover:text-[var(--color-primary-dark)]"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-[var(--color-charcoal)]">{children}</strong>
    ),
  },
};

interface BlogContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export function BlogContent({ content }: BlogContentProps) {
  if (!content) return null;
  return (
    <div className="prose prose-lg max-w-none text-[var(--color-charcoal)]">
      <PortableText value={content} components={components} />
    </div>
  );
}
