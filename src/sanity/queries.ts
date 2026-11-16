import { groq } from "next-sanity";

// All published blog posts ordered by published date descending
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    "readingTime": round(length(pt::text(body)) / 1000) + 1,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    "categories": categories[]-> { title, slug },
    "author": author-> { name, role, image, bio, linkedin },
    seoTitle,
    seoDescription
  }
`;

// Single blog post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    "readingTime": round(length(pt::text(body)) / 1000) + 1,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    "categories": categories[]-> { title, slug },
    "author": author-> { name, role, image, bio, linkedin },
    body,
    seoTitle,
    seoDescription
  }
`;

// Recent / Related blog posts (excluding current slug)
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $currentSlug && publishedAt <= now()]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "readingTime": round(length(pt::text(body)) / 1000) + 1,
    featuredImage {
      asset-> {
        url,
        metadata { lqip }
      },
      alt
    },
    "categories": categories[]-> { title, slug }
  }
`;

// All published case studies
export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    industry,
    service,
    summary,
    metrics,
    publishedAt,
    featured,
    coverImage {
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    seoTitle,
    seoDescription
  }
`;

// Single case study by slug
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    slug,
    client,
    industry,
    service,
    summary,
    challenge,
    solution,
    results,
    metrics,
    testimonialQuote,
    testimonialAuthor,
    publishedAt,
    coverImage {
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    seoTitle,
    seoDescription
  }
`;

// Slugs for generateStaticParams
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()][].slug.current
`;

export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current) && publishedAt <= now()][].slug.current
`;
