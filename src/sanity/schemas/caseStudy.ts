import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Case Study Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      type: "string",
      title: "Client / Founder Archetype",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      type: "string",
      title: "Industry Sector",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "service",
      type: "string",
      title: "Service Category",
      options: {
        list: [
          "LinkedIn Personal Branding",
          "LinkedIn Company Branding",
          "LinkedIn Lead Generation",
          "Executive Thought Leadership",
          "Inbound Pipeline Architecture",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover / Showcase Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Executive Summary",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "challenge",
      type: "array",
      title: "The Strategic Challenge",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      type: "array",
      title: "The UVOKA Solution & Architecture",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "results",
      type: "array",
      title: "Commercial & Strategic Results",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metrics",
      type: "array",
      title: "Key Performance Metrics",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Metric Label" },
            { name: "value", type: "string", title: "Metric Value (e.g., +412%)" },
            { name: "description", type: "string", title: "Short Context" },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonialQuote",
      type: "text",
      title: "Client Testimonial Quote",
      rows: 3,
    }),
    defineField({
      name: "testimonialAuthor",
      type: "string",
      title: "Testimonial Author & Title",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Case Study",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO Title",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO Meta Description",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      industry: "industry",
      media: "coverImage",
    },
    prepare(selection) {
      const { client, industry } = selection;
      return {
        ...selection,
        subtitle: `${client || "Client"} · ${industry || "Sector"}`,
      };
    },
  },
});
