export const SITE_CONFIG = {
  name: "UVOKA",
  tagline: "LinkedIn Branding & Lead Generation Agency",
  description:
    "Transforming high-performing founders, creators and corporate leaders into influential LinkedIn brands with bespoke content, authority positioning and measurable pipeline growth.",
  url: "https://www.uvoka.in",
  email: "contact@uvoka.in",
  social: {
    linkedin: "https://www.linkedin.com/company/uvoka",
    instagram: "https://www.instagram.com/uvoka.in",
    twitter: "https://twitter.com/uvoka",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: "01",
    slug: "linkedin-personal-branding",
    title: "LinkedIn Personal Branding",
    shortDesc:
      "Position founder and C-suite authority with high-engagement narratives, profile optimization and strategic thought leadership.",
  },
  {
    id: "02",
    slug: "linkedin-company-branding",
    title: "LinkedIn Company Branding",
    shortDesc:
      "Transform your enterprise page into a high-converting hub that attracts top talent, partners and premium enterprise opportunities.",
  },
  {
    id: "03",
    slug: "linkedin-lead-generation",
    title: "LinkedIn Lead Generation",
    shortDesc:
      "Precision outbound strategies and inbound authority funnels that book qualified executive discovery meetings reliably.",
  },
  {
    id: "04",
    slug: "service-four",
    title: "Executive Thought Leadership [Placeholder]",
    shortDesc:
      "Bespoke executive ghostwriting, keynote repurposing, and media spotlight campaigns tailored to industry pioneers.",
  },
  {
    id: "05",
    slug: "service-five",
    title: "B2B Social Selling Architecture [Placeholder]",
    shortDesc:
      "End-to-end enablement equipping founder-led sales teams with systematic playbook workflows and social selling tools.",
  },
] as const;
