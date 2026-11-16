import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author / Editorial Contributor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Title / Role",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Author Avatar / Portrait",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Biography",
      rows: 3,
    }),
    defineField({
      name: "linkedin",
      type: "url",
      title: "LinkedIn Profile URL",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
