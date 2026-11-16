export interface MediaFeature {
  id: string;
  name: string;
  tagline: string;
}

export const FEATURED_MEDIA: MediaFeature[] = [
  { id: "1", name: "Forbes", tagline: "Agency Spotlight" },
  { id: "2", name: "Business Insider", tagline: "Executive Branding" },
  { id: "3", name: "Entrepreneur", tagline: "Thought Leadership" },
  { id: "4", name: "TechCrunch", tagline: "B2B Social Growth" },
  { id: "5", name: "Outlook Business", tagline: "Creator Economy" },
  { id: "6", name: "YourStory", tagline: "Founder Stories" },
  { id: "7", name: "Mid-Day", tagline: "Leadership Pioneers" },
];

export interface StatisticItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const STATISTICS: StatisticItem[] = [
  {
    id: "views",
    value: 50,
    suffix: "M+",
    label: "Organic Views Generated",
    description: "High-impact narrative distribution across executive networks",
  },
  {
    id: "clients",
    value: 120,
    suffix: "+",
    label: "Founders & Brands Scaled",
    description: "Across technology, SaaS, venture capital, and enterprise B2B",
  },
  {
    id: "countries",
    value: 14,
    suffix: "",
    label: "Countries Reached",
    description: "International thought leadership with global audience resonance",
  },
  {
    id: "growth",
    value: 340,
    suffix: "%",
    label: "Avg. Impression Growth",
    description: "Measured over 90-day custom authority positioning sprints",
  },
];

export interface ClientAchievement {
  id: string;
  category: string;
  creatorRank: string;
  clientTitle: string;
  industry: string;
  metric: string;
  metricLabel: string;
  highlight: string;
}

export const CLIENT_ACHIEVEMENTS: ClientAchievement[] = [
  {
    id: "top-voice",
    category: "Executive Authority",
    creatorRank: "LinkedIn Top Voice",
    clientTitle: "B2B SaaS Founder & CEO",
    industry: "Enterprise Cloud Security",
    metric: "4.8M",
    metricLabel: "Annual Profile Impressions",
    highlight:
      "Positioned founder as the go-to category authority resulting in 28 enterprise inbound RFPs.",
  },
  {
    id: "creator-ranking",
    category: "Thought Leadership",
    creatorRank: "Top 1% Creator in AI",
    clientTitle: "Managing Partner",
    industry: "Venture Capital & Early Stage",
    metric: "185K+",
    metricLabel: "Executive Followers",
    highlight:
      "Built an influential LP and founder deal-flow pipeline through weekly strategic insights.",
  },
  {
    id: "lead-funnel",
    category: "Enterprise Lead Generation",
    creatorRank: "Category Pioneer",
    clientTitle: "VP of Global Sales",
    industry: "Fintech & Cross-border Payments",
    metric: "$2.4M",
    metricLabel: "Qualified Pipeline Generated",
    highlight:
      "Converted outbound executive relationship building into high-ticket enterprise contracts.",
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  resultBadge: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "UVOKA completely transformed how the enterprise SaaS ecosystem perceives our company. Within 4 months, my profile went from sporadic views to being the primary source of inbound enterprise leads for our $15M Series A.",
    author: "Rohan V.",
    role: "Co-Founder & CEO",
    company: "CloudScale Technologies",
    rating: 5,
    resultBadge: "12x Inbound Leads",
  },
  {
    id: "test-2",
    quote:
      "Their team does not write generic fluff. They take the time to interview you, dissect your deep industry domain expertise, and turn it into magnetic thought leadership that our venture partners and founders constantly quote.",
    author: "Elena Rostova",
    role: "General Partner",
    company: "Apex Horizon Ventures",
    rating: 5,
    resultBadge: "Top Voice Recognition",
  },
  {
    id: "test-3",
    quote:
      "The outbound LinkedIn lead generation playbook UVOKA built for our executive team was the highest ROI marketing investment we made this fiscal year. They booked meetings with Fortune 500 decision-makers we could never reach before.",
    author: "David MacIntyre",
    role: "SVP Global Revenue",
    company: "Nexus Financial Infrastructure",
    rating: 5,
    resultBadge: "420% Pipeline Boost",
  },
];

export interface SpecialDiscountOffer {
  badge: string;
  title: string;
  subtitle: string;
  originalPrice: string;
  discountPrice: string;
  discountPercentage: string;
  validityNotice: string;
  benefits: string[];
}

export const CURRENT_OFFER: SpecialDiscountOffer = {
  badge: "Quarterly Executive Sprint",
  title: "Exclusive Authority & Growth Accelerator Package",
  subtitle:
    "A complete 90-day executive sprint combining bespoke founder branding, multi-channel LinkedIn ghostwriting, and dedicated outbound enterprise pipeline architecture.",
  originalPrice: "$4,500/mo",
  discountPrice: "$3,200/mo",
  discountPercentage: "Limited 30% Privilege",
  validityNotice: "Strictly limited to 5 vetted founder partnerships this quarter.",
  benefits: [
    "Full Executive Brand Positioning & Profile Architecture",
    "12 High-Engagement Thought Leadership Posts per Month",
    "Dedicated Outbound Pipeline Generation & Lead Discovery",
    "Custom Graphic Frameworks & Visual Carousels",
    "Fortnightly Performance & Revenue Analytics Reviews",
    "Direct WhatsApp Hotline with Lead Strategy Director",
  ],
};

export interface AddOnService {
  id: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  ctaLabel: string;
}

export const ADD_ONS: AddOnService[] = [
  {
    id: "addon-1",
    title: "Newsletter Ghostwriting",
    shortDesc:
      "Deep-dive weekly executive newsletters that convert casual LinkedIn followers into an owned, high-intent subscriber community.",
    deliverables: [
      "Substack/Beehiiv setup",
      "Editorial calendar",
      "Bi-weekly deep-dive issues",
      "Audience cross-pollination",
    ],
    ctaLabel: "Enquire for Newsletter",
  },
  {
    id: "addon-2",
    title: "High-Converting Website Development",
    shortDesc:
      "Ultra-fast, luxury bespoke corporate websites built with Next.js and creative animations that establish instant founder credibility.",
    deliverables: [
      "Custom Next.js & Tailwind architecture",
      "GSAP scroll animations",
      "Sanity CMS integration",
      "Speed & SEO optimization",
    ],
    ctaLabel: "Enquire for Website",
  },
  {
    id: "addon-3",
    title: "Executive Website Copywriting",
    shortDesc:
      "Persuasive, high-converting brand messaging and sales page copy crafted specifically for B2B executives and enterprise buyers.",
    deliverables: [
      "Value proposition distillation",
      "High-converting landing pages",
      "Case study deep-dives",
      "Brand messaging guide",
    ],
    ctaLabel: "Enquire for Copywriting",
  },
];

export interface JourneyStage {
  step: string;
  title: string;
  timeline: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: "01",
    title: "Onboarding & Discovery",
    timeline: "Week 1",
    tagline: "Deep Strategic Alignment",
    description:
      "Comprehensive executive discovery interview dissecting domain expertise, core commercial goals, competitive positioning, and unique founder voice tone.",
    deliverables: ["Executive Voice Dossier", "ICP Mapping Document", "Industry Narrative Framework"],
  },
  {
    step: "02",
    title: "Profile Optimization",
    timeline: "Week 1–2",
    tagline: "Converting Digital Hub",
    description:
      "Transforming personal and enterprise profiles into high-converting digital storefronts with direct-response headline copy, custom 3D banner, and featured funnel.",
    deliverables: ["3D Header Banner", "Conversion-Focused Headline", "Authority Featured Grid"],
  },
  {
    step: "03",
    title: "Content Strategy",
    timeline: "Week 2",
    tagline: "Category Dominance Roadmap",
    description:
      "Developing a 90-day editorial themes architecture, controversial industry thesis hooks, and executive thought leadership pillars tailored for high engagement.",
    deliverables: ["3 Narrative Pillars", "Hook Architecture Library", "Cadence Schedule"],
  },
  {
    step: "04",
    title: "Content Creation & Calendar",
    timeline: "Week 3 Ongoing",
    tagline: "High-Craft Ghostwriting",
    description:
      "Ghostwriting high-conviction carousels, data breakdowns, and leadership insights that establish trust and stimulate debate with enterprise buyers.",
    deliverables: ["12 Monthly Custom Posts", "Visual Carousel Assets", "Pre-approved Content Bank"],
  },
  {
    step: "05",
    title: "Design & Approval",
    timeline: "Ongoing Sprints",
    tagline: "Zero-Friction Workflow",
    description:
      "Review drafts, graphic layouts, and strategic iterations via our streamlined private client portal with rapid turnaround and zero executive time wasted.",
    deliverables: ["One-Click Approval", "Private Client Portal", "24-Hour Iteration Cycle"],
  },
  {
    step: "06",
    title: "Performance Tracking & Reporting",
    timeline: "Fortnightly & Monthly",
    tagline: "Revenue & Reach Analytics",
    description:
      "Transparent reporting tracking organic executive impressions, inbound opportunity velocity, engagement quality, and verifiable commercial pipeline ROI.",
    deliverables: ["Fortnightly Review Calls", "Executive Pipeline Metrics", "Narrative Refinement"],
  },
];

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: string;
}

export const AWARDS: AwardItem[] = [
  {
    id: "award-1",
    year: "2025",
    title: "B2B Brand Agency of the Year",
    organization: "Global Digital Agency Awards",
    category: "Executive Positioning",
  },
  {
    id: "award-2",
    year: "2024",
    title: "Top Corporate Influence Partner",
    organization: "LinkedIn Creator Leaders Summit",
    category: "Thought Leadership",
  },
  {
    id: "award-3",
    year: "2024",
    title: "Excellence in Enterprise Social Selling",
    organization: "Marketing Innovation Forum",
    category: "Pipeline Architecture",
  },
];

export interface BlogPostPreview {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPostPreview[] = [
  {
    id: "post-1",
    slug: "the-death-of-corporate-fluff-linkedin-playbook",
    title: "The Death of Corporate Fluff: Why Raw Founder Opinions Outperform PR Releases by 800%",
    excerpt:
      "How top B2B executives are ditching sanitized corporate jargon in favor of polarizing, high-conviction industry theses that attract Tier-1 capital.",
    category: "Thought Leadership",
    date: "Feb 18, 2026",
    readingTime: "5 min read",
    featured: true,
  },
  {
    id: "post-2",
    slug: "linkedin-inbound-lead-engine-b2b",
    title: "Building an Inbound Enterprise Lead Engine on LinkedIn: The 90-Day Math",
    excerpt:
      "A quantitative breakdown of how targeted executive commentary and authority carousels drive $2M+ in pipeline without cold outreach.",
    category: "Lead Generation",
    date: "Jan 28, 2026",
    readingTime: "7 min read",
  },
  {
    id: "post-3",
    slug: "ceo-personal-brand-multiplies-valuation",
    title: "Why Investors Now Scrutinize the CEO’s LinkedIn Presence Before Series B Term Sheets",
    excerpt:
      "Venture partners reveal how founder digital authority correlates with talent attraction velocity, enterprise deal closing, and overall exit valuation multiples.",
    category: "Executive Strategy",
    date: "Jan 12, 2026",
    readingTime: "4 min read",
  },
];

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  downloadCount: string;
}

export const RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "The 2026 Executive LinkedIn Hook Vault",
    category: "Playbook",
    type: "PDF Guide",
    description: "50 high-performing headline frameworks used by Top Voices to capture C-suite scroll attention in the first 3 lines.",
    downloadCount: "2,400+ Downloads",
  },
  {
    id: "res-2",
    title: "Enterprise Profile Optimization Blueprint",
    category: "Architecture",
    type: "Checklist",
    description: "The 12-point inspection checklist to audit your headline, featured media, banner, and experience section for pipeline conversion.",
    downloadCount: "1,850+ Downloads",
  },
  {
    id: "res-3",
    title: "B2B Social Selling Operating Cadence",
    category: "Operations",
    type: "Spreadsheet",
    description: "A plug-and-play weekly calendar matrix outlining post formats, optimal timing, engagement cadences, and comment funnels.",
    downloadCount: "3,100+ Downloads",
  },
];

export interface TeamCategory {
  id: string;
  role: string;
  count: string;
  description: string;
  capabilities: string[];
}

export const TEAM_CAPABILITIES: TeamCategory[] = [
  {
    id: "team-1",
    role: "Content Strategists",
    count: "4 Specialists",
    description: "Ex-journalists, tier-1 copywriters, and sector researchers who interview founders and distill complex domain insights into magnetic hooks.",
    capabilities: ["Narrative Architecture", "ICP Research", "Executive Ghostwriting"],
  },
  {
    id: "team-2",
    role: "Creative Designers",
    count: "3 Designers",
    description: "Visual storytellers crafting bespoke typographic carousels, 3D branded graphics, and bespoke frameworks that stop the scroll.",
    capabilities: ["Brand Typography", "Visual Carousels", "3D Profile Architecture"],
  },
  {
    id: "team-3",
    role: "Lead Generation Specialists",
    count: "3 Directors",
    description: "Outbound and inbound funnel strategists managing high-touch executive discovery, comment funnels, and enterprise meeting booking.",
    capabilities: ["Relationship Nurturing", "Pipeline Attribution", "Outbound Strategy"],
  },
  {
    id: "team-4",
    role: "Growth & Analytics Analysts",
    count: "2 Analysts",
    description: "Data specialists continuously dissecting LinkedIn algorithm changes, engagement retention, and demographic audience resonance.",
    capabilities: ["Algorithm Tracking", "Audience Demographics", "ROI Attribution"],
  },
];

export interface PressItem {
  id: string;
  date: string;
  publication: string;
  title: string;
  summary: string;
}

export const PRESS_ITEMS: PressItem[] = [
  {
    id: "press-1",
    date: "January 2026",
    publication: "Forbes Business Council",
    title: "UVOKA Crosses 50 Million Organic Impressions Milestone for B2B Clients",
    summary: "Recognized as one of the fastest-growing executive personal branding agencies serving venture-backed tech pioneers and corporate leaders.",
  },
  {
    id: "press-2",
    date: "November 2025",
    publication: "Business Insider",
    title: "How UVOKA Architects Executive Authority in the Age of Generative AI",
    summary: "An in-depth profile detailing why bespoke human ghostwriting and authentic founder perspective outperform automated content generation.",
  },
  {
    id: "press-3",
    date: "September 2025",
    publication: "TechNode Global",
    title: "Expanding Cross-Border Executive Positioning Across 14 Countries",
    summary: "UVOKA expands its proprietary LinkedIn positioning sprint architecture to international founders in London, Singapore, Dubai, and San Francisco.",
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much of the founder or executive's time does this require?",
    answer:
      "We design our workflow specifically for busy C-suite leaders. Following an initial 60-minute strategic onboarding interview, your ongoing time commitment is just 30 to 45 minutes every fortnight for content review and approval. We handle all ideation, research, writing, graphic design, and performance analytics.",
    category: "Workflow",
  },
  {
    id: "faq-2",
    question: "How do you capture my authentic tone of voice without sounding generic?",
    answer:
      "We do not use generic AI templates or outsourced junior copywriters. Your dedicated senior content strategist conducts an in-depth voice extraction interview, analyzing your speech patterns, previous writing, industry philosophy, and lived experiences to build an Executive Voice Dossier that ensures every post sounds authentically like you.",
    category: "Content",
  },
  {
    id: "faq-3",
    question: "How soon do we begin seeing measurable traction and inbound pipeline?",
    answer:
      "Most clients see an immediate 2x to 5x spike in profile views and high-value connection requests within the first 30 days. Qualified inbound discovery meetings, podcast invitations, and enterprise RFPs typically manifest consistently between day 45 and day 75 as your authority moat consolidates.",
    category: "Results",
  },
  {
    id: "faq-4",
    question: "Do you also manage outbound lead generation and message outreach?",
    answer:
      "Yes. Our LinkedIn Lead Generation service combines inbound thought leadership with targeted, white-glove executive relationship outreach. We identify your ideal customer profile, initiate high-credibility conversations, and hand over pre-qualified discovery calls directly to your calendar.",
    category: "Services",
  },
  {
    id: "faq-5",
    question: "What is the minimum contract term or commitment?",
    answer:
      "We operate primarily on 90-day executive sprint cycles. Authority positioning and pipeline velocity require momentum and algorithmic compounding. After the initial 90-day sprint, clients can transition to flexible quarterly retainers with no punitive long-term lock-in.",
    category: "Commercials",
  },
];
