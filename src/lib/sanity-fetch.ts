import { client, isSanityConfigured } from "@/sanity/client";
import {
  postsQuery,
  postBySlugQuery,
  relatedPostsQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  postSlugsQuery,
  caseStudySlugsQuery,
} from "@/sanity/queries";
import { BlogPost, CaseStudy } from "@/sanity/types";
import { FALLBACK_BLOG_POSTS } from "@/data/blogData";
import { FALLBACK_CASE_STUDIES } from "@/data/caseStudiesData";

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured) {
    try {
      const posts = await client.fetch<BlogPost[]>(
        postsQuery,
        {},
        { next: { revalidate: 3600 } }
      );
      if (posts && posts.length > 0) return posts;
    } catch (err) {
      console.warn("Failed to fetch blog posts from Sanity, falling back to static data:", err);
    }
  }
  return FALLBACK_BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured) {
    try {
      const post = await client.fetch<BlogPost>(
        postBySlugQuery,
        { slug },
        { next: { revalidate: 3600 } }
      );
      if (post) return post;
    } catch (err) {
      console.warn(`Failed to fetch blog post "${slug}" from Sanity, falling back to static data:`, err);
    }
  }
  return FALLBACK_BLOG_POSTS.find((p) => p.slug.current === slug) || null;
}

export async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  if (isSanityConfigured) {
    try {
      const posts = await client.fetch<BlogPost[]>(
        relatedPostsQuery,
        { currentSlug },
        { next: { revalidate: 3600 } }
      );
      if (posts && posts.length > 0) return posts;
    } catch (err) {
      console.warn("Failed to fetch related posts from Sanity:", err);
    }
  }
  return FALLBACK_BLOG_POSTS.filter((p) => p.slug.current !== currentSlug).slice(0, 3);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (isSanityConfigured) {
    try {
      const caseStudies = await client.fetch<CaseStudy[]>(
        caseStudiesQuery,
        {},
        { next: { revalidate: 3600 } }
      );
      if (caseStudies && caseStudies.length > 0) return caseStudies;
    } catch (err) {
      console.warn("Failed to fetch case studies from Sanity, falling back to static data:", err);
    }
  }
  return FALLBACK_CASE_STUDIES;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (isSanityConfigured) {
    try {
      const cs = await client.fetch<CaseStudy>(
        caseStudyBySlugQuery,
        { slug },
        { next: { revalidate: 3600 } }
      );
      if (cs) return cs;
    } catch (err) {
      console.warn(`Failed to fetch case study "${slug}" from Sanity, falling back to static data:`, err);
    }
  }
  return FALLBACK_CASE_STUDIES.find((c) => c.slug.current === slug) || null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    try {
      const slugs = await client.fetch<string[]>(postSlugsQuery);
      if (slugs && slugs.length > 0) return slugs;
    } catch (err) {
      console.warn("Failed to fetch post slugs from Sanity:", err);
    }
  }
  return FALLBACK_BLOG_POSTS.map((p) => p.slug.current);
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    try {
      const slugs = await client.fetch<string[]>(caseStudySlugsQuery);
      if (slugs && slugs.length > 0) return slugs;
    } catch (err) {
      console.warn("Failed to fetch case study slugs from Sanity:", err);
    }
  }
  return FALLBACK_CASE_STUDIES.map((c) => c.slug.current);
}
