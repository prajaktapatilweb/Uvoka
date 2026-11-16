export interface ServiceDetail {
  slug: string;
  title: string;
  heroBadge: string;
  heroDescription: string;
  problemsSolved: { title: string; desc: string }[];
  deliverables: { title: string; desc: string }[];
  outcomes: { metric: string; label: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_CATALOG: Record<string, ServiceDetail> = {
  "linkedin-personal-branding": {
    slug: "linkedin-personal-branding",
    title: "LinkedIn Personal Branding for Executives",
    heroBadge: "Executive Authority Sprints",
    heroDescription:
      "Transforming high-performing founders, C-suite executives, and partners into the undisputed category authorities of their industries on LinkedIn.",
    problemsSolved: [
      {
        title: "Invisible Founder Dilemma",
        desc: "Having industry-leading technology or services, yet remaining unknown to the tier-1 venture funds, partners, and enterprise buyers in your sector.",
      },
      {
        title: "Sanitized Corporate PR Fatigue",
        desc: "Corporate communications teams publishing lifeless press releases that receive single-digit engagement and zero organic reach.",
      },
      {
        title: "Time-Starved Leadership",
        desc: "Wanting to publish high-conviction thought leadership consistently, but lacking the 15+ hours weekly required to research, write, and format content.",
      },
    ],
    deliverables: [
      {
        title: "Proprietary Executive Voice Dossier",
        desc: "Deep-dive voice extraction interview distilling your authentic tonality, lived career stories, and proprietary industry theses.",
      },
      {
        title: "12 Monthly High-Craft Content Pieces",
        desc: "Ghostwritten carousels, data breakdowns, and opinion frameworks designed to stimulate high-caliber C-suite discourse.",
      },
      {
        title: "Complete Profile Conversion Architecture",
        desc: "Direct-response headline, 3D branded banner, featured media funnel, and recommendation positioning.",
      },
      {
        title: "Algorithm Optimization & Timing",
        desc: "Precision distribution timing and formatting tuned specifically to LinkedIn's latest distribution heuristics.",
      },
    ],
    outcomes: [
      { metric: "8x–15x", label: "Organic Reach Growth", desc: "Average increase in quarterly impression reach across key executive accounts." },
      { metric: "Top 1%", label: "Creator Ranking", desc: "Positioning into the elite top tier of industry voices within 90 days." },
      { metric: "25+", label: "Inbound Enterprise Leads", desc: "Qualified executive discovery calls booked directly via inbound thought leadership." },
    ],
    process: [
      { step: "01", title: "Voice Extraction & Audit", desc: "60-minute recorded interview examining your mental models, career history, and positioning goals." },
      { step: "02", title: "Editorial Architecture", desc: "Developing your 3 core narrative pillars and a 90-day publishing calendar." },
      { step: "03", title: "Creation & Review", desc: "Fortnightly batches of ghostwritten content delivered through our streamlined client portal for 1-click approval." },
      { step: "04", title: "Distribution & Iteration", desc: "Publishing, comment framing, and analytics tracking with monthly executive review calls." },
    ],
    faqs: [
      {
        question: "Will the content truly sound like me?",
        answer: "Yes. We conduct extensive recorded interviews before writing a single word, analyzing speech cadence, vocabulary, and core beliefs so the writing is an exact extension of your mind.",
      },
      {
        question: "How much of my time is required?",
        answer: "Only 30 to 45 minutes every fortnight for review and approval. We handle research, drafting, visual design, and scheduling.",
      },
    ],
  },

  "linkedin-company-branding": {
    slug: "linkedin-company-branding",
    title: "LinkedIn Company Page & Enterprise Branding",
    heroBadge: "Enterprise Page Architecture",
    heroDescription:
      "Transforming corporate LinkedIn company pages from dormant announcement boards into magnetic talent and pipeline conversion hubs.",
    problemsSolved: [
      {
        title: "Ghost-Town Company Pages",
        desc: "Corporate pages posting generic product updates with minimal engagement and negligible follower growth.",
      },
      {
        title: "Talent Acquisition Headwinds",
        desc: "Struggling to attract world-class engineering, sales, and executive talent without burning excessive recruiter budgets.",
      },
      {
        title: "Disjointed Brand Identity",
        desc: "A fragmented digital presence that fails to project enterprise credibility to Fortune 500 procurement teams.",
      },
    ],
    deliverables: [
      {
        title: "Enterprise Page Architecture",
        desc: "Complete overhaul of tagline, overview, custom lead generation buttons, and showcase pages.",
      },
      {
        title: "Employer Brand Narrative Campaigns",
        desc: "Culture spotlight carousels and behind-the-scenes engineering frameworks that attract tier-1 talent.",
      },
      {
        title: "Product Innovation Breakdowns",
        desc: "Visually striking infographics and case-study carousels illustrating product value without sales jargon.",
      },
      {
        title: "Employee Advocacy Playbook",
        desc: "Internal templates empowering your team members to amplify corporate announcements organically.",
      },
    ],
    outcomes: [
      { metric: "350%", label: "Follower Growth Rate", desc: "Accelerating verified enterprise follower acquisition in target ICP accounts." },
      { metric: "4.2x", label: "Talent Inbound Increase", desc: "High-caliber candidate inbound applications directly via LinkedIn company channels." },
      { metric: "18+", label: "Target Account Engagements", desc: "Regular executive engagement from Fortune 1000 buying committees." },
    ],
    process: [
      { step: "01", title: "Corporate Narrative Audit", desc: "Auditing existing company page performance, competitor benchmarks, and target buyer personas." },
      { step: "02", title: "Visual & Content Framework", desc: "Creating bespoke graphic templates, brand tone guidelines, and publishing cadences." },
      { step: "03", title: "Execution & Advocacy", desc: "Deploying high-impact company content and training internal leaders on advocacy amplification." },
      { step: "04", title: "Pipeline Analytics", desc: "Tracking visitor demographics, job applicant quality, and lead button conversion rates." },
    ],
    faqs: [
      {
        question: "How does this coordinate with our existing marketing team?",
        answer: "We seamlessly collaborate with your in-house marketing or PR team, handling the specialized LinkedIn creative execution and content ghostwriting while aligning with your overall corporate roadmap.",
      },
      {
        question: "Can you manage showcase pages for different product lines?",
        answer: "Yes, our enterprise package includes architecture and content workflows for segmented product lines and subsidiary brands.",
      },
    ],
  },

  "linkedin-lead-generation": {
    slug: "linkedin-lead-generation",
    title: "LinkedIn Executive Lead Generation & Pipeline",
    heroBadge: "B2B Outbound Architecture",
    heroDescription:
      "Combining inbound executive thought leadership with high-credibility outbound relationship building to book high-ticket enterprise discovery meetings.",
    problemsSolved: [
      {
        title: "Cold Email Ineffectiveness",
        desc: "Diminishing returns from traditional cold email outreach due to spam filters, generic templates, and buyer skepticism.",
      },
      {
        title: "Unqualified Discovery Calls",
        desc: "Sales teams wasting dozens of hours weekly on discovery calls with low-budget or non-decision-making prospects.",
      },
      {
        title: "Slow Enterprise Sales Cycles",
        desc: "Lack of executive trust prolonging enterprise negotiation and closing timelines.",
      },
    ],
    deliverables: [
      {
        title: "ICP & Buying Committee Mapping",
        desc: "Targeted lists of senior decision-makers based on revenue, tech stack, and strategic buying triggers.",
      },
      {
        title: "Peer-to-Peer Dialogue Frameworks",
        desc: "Bespoke executive messaging cadences that initiate consultative conversations without tacky pitch slaps.",
      },
      {
        title: "Inbound Comment Authority Funnels",
        desc: "Converting active comment engagers on executive posts into warm discovery conversations.",
      },
      {
        title: "Calendar Hand-off & CRM Sync",
        desc: "Pre-qualified sales discovery meetings booked directly into your sales directors' calendars.",
      },
    ],
    outcomes: [
      { metric: "$2M+", label: "Average Pipeline Generated", desc: "Net-new qualified enterprise opportunities attributed over 90-day sprints." },
      { metric: "24–35%", label: "Executive Response Rate", desc: "Consistently outperforming industry cold email response benchmarks by 10x." },
      { metric: "15–20", label: "Qualified Meetings / Month", desc: "Pre-vetted decision-maker discovery conversations booked reliably." },
    ],
    process: [
      { step: "01", title: "ICP & Offer Calibration", desc: "Defining the exact decision-maker titles, company triggers, and compelling value proposition." },
      { step: "02", title: "Message Cadence Engineering", desc: "Crafting multi-touch conversational scripts that sound authentic, consultative, and executive." },
      { step: "03", title: "Outbound & Inbound Sprints", desc: "Executing relationship outreach and nurturing high-value connections." },
      { step: "04", title: "Meeting Hand-off & Reporting", desc: "Booking pre-qualified discovery meetings and delivering weekly pipeline attribution metrics." },
    ],
    faqs: [
      {
        question: "Does this involve automated bot spam?",
        answer: "Never. We use human-guided, personalized relationship outreach that adheres 100% to LinkedIn terms of service, protecting your reputation and account integrity.",
      },
      {
        question: "What constitutes a 'qualified' meeting?",
        answer: "A decision-maker matching your exact ICP parameters who has confirmed a documented business challenge that your solution directly addresses.",
      },
    ],
  },

  "service-four": {
    slug: "service-four",
    title: "Executive Thought Leadership & Ghostwriting [Placeholder]",
    heroBadge: "Keynote & Op-Ed Sprints",
    heroDescription:
      "Bespoke executive ghostwriting, keynote repurposing, and media spotlight campaigns tailored to industry pioneers. [Confirmed details to be provided by client].",
    problemsSolved: [
      { title: "Unshared Intellectual Property", desc: "Valuable proprietary frameworks remaining locked inside executive minds." },
      { title: "Conference Talk Under-utilization", desc: "Keynote presentations seen by a few hundred people rather than hundreds of thousands." },
      { title: "Lack of Editorial Polish", desc: "Insightful ideas that fail to resonate due to suboptimal narrative structuring." },
    ],
    deliverables: [
      { title: "Long-Form Op-Ed Ghostwriting", desc: "Deep-dive essays and industry manifestos formatted for high engagement." },
      { title: "Keynote Repurposing Engine", desc: "Deconstructing recorded conference speeches into viral multi-slide carousels." },
      { title: "Executive Podcast Prep & Framing", desc: "Talking points and soundbites engineered for viral audio/video distribution." },
      { title: "Media Cross-Pollination", desc: "Adapting top-performing LinkedIn essays for submission to Forbes, Fast Company, and Substack." },
    ],
    outcomes: [
      { metric: "500K+", label: "Annual Readers", desc: "Broader circulation of founder intellectual property across global markets." },
      { metric: "10+", label: "Keynote Invites", desc: "Inbound invitations to speak at premier international industry conferences." },
      { metric: "Tier-1", label: "Media Quotations", desc: "Journalists citing founder insights in leading trade publications." },
    ],
    process: [
      { step: "01", title: "Thesis Discovery", desc: "Unearthing your unique counter-intuitive industry viewpoints." },
      { step: "02", title: "Drafting & Fact-Checking", desc: "Writing comprehensive essays backed by verified market research." },
      { step: "03", title: "Visual Transmutation", desc: "Designing accompanying infographic frameworks." },
      { step: "04", title: "Multi-Platform Syndication", desc: "Publishing across LinkedIn, Substack, and syndicate media." },
    ],
    faqs: [
      { question: "Can this content be repurposed for our newsletter?", answer: "Yes, all essays are drafted with multi-channel syndication in mind." },
      { question: "What is the turnaround time?", answer: "Each essay sprint is completed and ready for review within 5 business days." },
    ],
  },

  "service-five": {
    slug: "service-five",
    title: "B2B Social Selling Architecture [Placeholder]",
    heroBadge: "Sales Team Enablement",
    heroDescription:
      "End-to-end enablement equipping founder-led sales teams with systematic playbook workflows and social selling tools. [Confirmed details to be provided by client].",
    problemsSolved: [
      { title: "Disorganized Sales Outreach", desc: "Account executives using inconsistent, low-converting LinkedIn outreach messages." },
      { title: "Lack of Sales & Marketing Alignment", desc: "Marketing producing content that sales reps never share with active prospects." },
      { title: "Unmeasured Social Pipeline", desc: "Inability to track whether sales team social activity contributes to closed revenue." },
    ],
    deliverables: [
      { title: "Custom Social Selling Playbook", desc: "Comprehensive step-by-step SOP for sales reps from connection to booked call." },
      { title: "Content Enablement Hub", desc: "Monthly library of pre-approved posts and comment templates for sales reps." },
      { title: "Live Executive Training Workshops", desc: "Interactive training sessions on warm outbound engagement and objection handling." },
      { title: "Sales Navigator Optimization", desc: "Advanced boolean search filters and lead list architecture." },
    ],
    outcomes: [
      { metric: "65%", label: "Pipeline Velocity Increase", desc: "Accelerating the time from initial prospect contact to closed-won deal." },
      { metric: "3.8x", label: "Rep Inbound Opportunities", desc: "Sales reps receiving warm inbound inquiries directly on their profiles." },
      { metric: "100%", label: "Team Alignment", desc: "Unified brand messaging across all client-facing revenue team members." },
    ],
    process: [
      { step: "01", title: "Sales Process Audit", desc: "Reviewing current outreach metrics and CRM pipeline conversion stages." },
      { step: "02", title: "Playbook Authoring", desc: "Writing custom outreach scripts, profile templates, and engagement cadences." },
      { step: "03", title: "Team Enablement & Rollout", desc: "Conducting hands-on workshops with account executives and SDRs." },
      { step: "04", title: "Monthly Coaching & Auditing", desc: "Reviewing outreach data and refining scripts for maximum deal velocity." },
    ],
    faqs: [
      { question: "How many sales reps can participate?", answer: "Our standard program supports sales cohorts from 3 up to 25 representatives." },
      { question: "Do reps need LinkedIn Sales Navigator?", answer: "Sales Navigator is recommended for optimal lead list filtering, but not mandatory." },
    ],
  },
};
