# UVOKA -- Complete Website Redesign & Development Specification

## 1. Project Overview

**Client:** UVOKA\
**Existing Website:** https://www.uvoka.in/\
**Design Reference:** https://theoceanlabs.com/\
**Animation Reference:**
https://www.skilltechwebdesign.com/htmlthemes/darkstar/home-mega-text-video.html

Redesign UVOKA as a premium, modern, creative and interactive corporate
website. The experience should combine luxury corporate design, bold
typography, scroll-based animations, interactive storytelling, smooth
parallax, content-first layouts and professional business communication.

Take inspiration from Ocean Labs' creative layouts, typography and
motion approach without copying its design. Focus on UVOKA's actual
services, results, achievements and business offerings rather than
excessive photographs or decoration.

## 2. Design Direction & Visual Identity

### Overall Style

-   Modern Luxury Corporate
-   Premium and Elegant
-   Creative and Interactive
-   Content-First Design
-   Bold Typography
-   Light Mode
-   Smooth Parallax Scrolling
-   Minimal but Impactful Graphics

### Brand Colour Palette

The primary brand colour is UVOKA's logo colour: `#522166`.

  -----------------------------------------------------------------------
  Colour                  Hex Code                Usage
  ----------------------- ----------------------- -----------------------
  Royal Purple            `#522166`               Primary brand, buttons
                                                  and highlights

  Deep Aubergine          `#382044`               Dark sections and
                                                  contrast headings

  Muted Purple            `#795A86`               Secondary accents and
                                                  hover effects

  Champagne Gold          `#D2B98B`               Premium highlights and
                                                  decorative details

  Warm Ivory              `#F4EFE7`               Alternate section
                                                  backgrounds

  Pure White              `#FFFFFF`               Main website background

  Charcoal                `#27232A`               Headings and primary
                                                  text
  -----------------------------------------------------------------------

### Colour Distribution

-   White -- 45%
-   Warm Ivory -- 25%
-   Royal Purple -- 18%
-   Charcoal -- 8%
-   Champagne Gold -- 4%

Manage all colours through centralized CSS variables/design tokens.
Changing primary or secondary colour variables should update buttons,
links, active states, highlights, backgrounds, cards, borders and
animations consistently. Keep the website predominantly light, with
selected dark-purple sections for contrast.

### Typography

Typography should be a major visual element: - Bold, expressive headings
and oversized hero typography. - Different heading treatments across
sections. - Modern sans-serif combined with elegant serif typography. -
Selected words highlighted in royal purple or champagne gold. - Animated
line-by-line or word-by-word text reveals.

Suggested fonts: - Main headings: Space Grotesk / Sora / Plus Jakarta
Sans. - Editorial highlights: Playfair Display / Cormorant Garamond. -
Body: DM Sans / Inter.

Maintain strong hierarchy, generous spacing and readability.

## 3. Homepage -- Required Sections

### 01. Hero Section

-   Full-width premium hero with visual background.
-   Minimal photography or abstract graphics.
-   Bold oversized headline and strong UVOKA value proposition.
-   Primary and secondary CTA buttons.
-   Subtle animated background elements and abstract graphic movement.
-   Smooth text entrance and scroll-based parallax.
-   Immediately communicate UVOKA's positioning and expertise.

### 02. Featured In / Media Recognition

-   Showcase publications and media platforms where UVOKA has been
    featured.
-   Clean horizontal logo strip or automatically moving marquee.
-   Subtle continuous movement and minimal background.
-   Use actual publication logos with consistent sizing.

### 03. Counter Results / Achievements

Possible statistics: - Organic Views - Clients Served - Countries
Reached - Media Features - Average Impression Growth

Use count-up animations triggered when the section enters the viewport.
All figures must be verified and approved by the client.

### 04. Top Clients & Recognition

-   Top client achievements and LinkedIn creator rankings.
-   Client growth and performance highlights.
-   Recognition milestones.
-   Interactive achievement cards with subtle hover and entrance
    animations.
-   Present actual achievements, not generic marketing claims.

### 05. Testimonials Slider

-   Premium testimonial cards and smooth horizontal transitions.
-   Client name, designation and company details where approved.
-   Photographs only where necessary.
-   Elegant quote typography.
-   Optional automatic sliding and manual navigation.

### 06. Services -- Five Creative Animated Cards

Create five distinctive service cards instead of a conventional slider.

Currently identified services: 1. LinkedIn Personal Branding. 2.
LinkedIn Company Page Branding. 3. LinkedIn Lead Generation.

The remaining two service names and descriptions must be confirmed by
the client.

Each card should include a service number/identifier, title, short
description, abstract graphic, Explore Service link and subtle
background glow.

Use coordinated but different entrance animations: - Card 1: upward
reveal. - Card 2: horizontal slide-in. - Card 3: scale and fade. - Card
4: subtle rotational entrance. - Card 5: clip-path or masked reveal.

Card effects: - Subtle glossy surfaces. - Abstract graphic elements
behind content. - Continuously moving soft light glow. - Gentle gradient
movement. - Hover elevation and border transitions. - Responsive
layouts.

Avoid excessive colours, bright glow and distracting effects. Each card
links to its service detail page.

### 07. Current Package / Special Discount Offer

UVOKA currently has one active discount offer. Do not create multiple
package comparison cards or fictional pricing plans.

Create one attractive promotional section: - Clearly communicate the
offer and benefits. - Show original/discounted pricing only if
client-approved. - Include validity only when confirmed. - Prominent
enquiry or booking CTA. - Subtle animated promotional graphics. -
Premium card or banner layout.

Make the offer easy to update or expire.

### 08. Add-ons

Show additional services separately from core services.

Examples: - Newsletter Ghostwriting - Website Development - Website
Copywriting

Use minimal interactive cards, short descriptions, clear benefits,
subtle hover effects, small graphics and enquiry links where
appropriate.

### 09. How We Work -- Interactive Journey Map

Create a distinctive interactive client journey: - Curved, wave-like
path across the section. - UVOKA logo icon travels along the wave as the
visitor scrolls. - Milestone points with information cards above or
below. - Reveal the corresponding card when its milestone becomes
active. - Cards contain step title, description and relevant details.

Suggested stages: 1. Onboarding & Discovery. 2. Profile Optimization. 3.
Content Strategy. 4. Content Creation & Calendar. 5. Design & Approval.
6. Performance Tracking & Reporting.

Animation requirements: - SVG-based curved path. - Scroll-controlled
logo movement. - Animated milestone indicators. - Smooth card reveals
and active-stage highlighting. - Responsive mobile layout.

Use SVG path animation and GSAP ScrollTrigger. On mobile, adapt the
horizontal wave into a vertical journey while retaining logo movement
and milestone interactions. It should feel like connected storytelling,
not a numbered timeline.

### 10. About Us -- Company Story, Media & Awards

UVOKA has company photographs, videos and awards. Present these through
an editorial-style company introduction.

Content: - Company introduction and story. - Brand philosophy. - Mission
and vision. - Key achievements and milestones. - What makes UVOKA
different.

Visual presentation: - Use existing company images and videos. -
Showcase awards and recognition. - Selective overlapping image
layouts. - Animated image reveals and subtle parallax. - Video preview
cards with play interactions. - Dedicated awards showcase.

Avoid image overload. Each media item should communicate something
meaningful and build credibility.

### 11. Blogs -- Dynamic Sanity CMS Integration

Build a dynamic blog system using Sanity CMS and Sanity Studio.

Blog listing: - Latest articles and featured blog. - Category
filtering. - Title, summary, featured image where relevant. - Publishing
date and reading time. - Pagination or load more. - Search if required.

Blog detail: - Dynamic title and slug. - Author where available. -
Publishing date and reading time. - Rich-text content, images and
embedded media. - Related articles, categories and tags. - SEO title and
meta description. - Social sharing links.

CMS features: - Create, edit and delete posts. - Rich-text content
management. - Image uploads and optimization. - Category and tag
management. - Draft/published status. - SEO metadata and publishing
date. - Featured blog selection.

Routes: `/blogs` and `/blogs/[slug]`. Only published content appears
publicly. The client should manage blogs without changing source code.

### 12. Resources & Tools

Create an expandable section for: - Professional resources. - Guides and
educational content. - Downloadable resources. - Useful tools for
founders and professionals. - Industry insights.

Use resource cards, categories, descriptions and download/access links.

### 13. Our Team -- Creative Team Showcase

Do not display individual employee names or personal designations.
Showcase creative capabilities through role categories, subject to
confirmation against the actual team structure.

Possible categories: - Creative Designers - Content Strategists -
Graphic Designers - Marketing Specialists - Content Creators

Use abstract animated avatars/illustrations, floating design elements,
moving typography, graphic shapes, creative role cards and subtle cursor
interactions. Animate cards with different entrance directions, floating
objects, gentle hover rotations and smooth backgrounds. Do not invent
employee names, photos or LinkedIn links.

### 14. Press Releases

-   Latest press releases and company announcements.
-   Media coverage, recognition and achievements.
-   Publishing dates.
-   Individual press release pages if required.

Use clean editorial layouts, bold typography and minimal decoration.

### 15. Call to Action

-   Bold headline and short persuasive message.
-   Prominent enquiry or booking button.
-   Elegant background and subtle animated decorative elements.
-   Smooth entrance animation.

A selected deep-purple background with champagne-gold highlights can
create contrast.

### 16. FAQ

-   Frequently asked questions.
-   Expandable accordion interface.
-   Smooth open/close animations.
-   Clear, concise answers.
-   Mobile-friendly layout.

Use client-approved questions and answers.

### 17. Footer

Include UVOKA logo and introduction, main navigation, services, contact
details, social links, Privacy Policy, Terms of Service and copyright.
Keep it clean and premium, using deep aubergine or white as appropriate.

## 4. Additional Website Pages

### A. Founder & CEO Page

Create a premium personal profile rather than a standard biography.

Content: - Founder introduction and professional background. - Personal
and professional journey. - Vision and leadership philosophy. -
Achievements and recognition. - Media appearances. - LinkedIn and social
links.

Use editorial typography, professional photos, video introductions where
available, animated milestones, media/award showcases, subtle parallax
and personal achievements.

### B. Common Services Page

Create a central landing page for all five services: - Service
introduction and categories. - Benefits and outcomes. - Relevant case
studies. - Links to individual service pages. - Strong enquiry CTAs and
creative service graphics.

### C. Five Specific Service Pages

Each page has its own content and visual treatment while retaining the
shared design system.

Common structure: 1. Service-specific hero. 2. Service introduction. 3.
Problems UVOKA solves. 4. Features and deliverables. 5. Benefits and
expected outcomes. 6. Process/methodology. 7. Testimonials or case
studies. 8. FAQs. 9. Enquiry CTA.

Use reusable components and unique layouts/animations where appropriate.

### D. Blogs & Case Studies

Use Sanity CMS for both.

Blog management: - Create, edit and delete blogs. - Title, slug and
rich-text content. - Featured image, categories and tags. - SEO title
and meta description. - Draft/published status and publishing date.

Case study management: - Client details, industry and service
category. - Project background and objectives. - Challenges and
solutions. - Results and performance metrics. - Images/supporting media
and SEO information.

Routes: `/case-studies` and `/case-studies/[slug]`. Only published
content should appear publicly. The client manages blogs and case
studies through Sanity Studio without manual code changes.

## 5. Animation & Interaction Requirements

Animations should enhance the experience without compromising
readability or navigation.

### 01. Parallax Hero

-   Background moves at a different speed from foreground.
-   Subtle image zoom and text movement.
-   Cinematic entrance and abstract background elements.

### 02. Pinned Horizontal Scrolling

-   Horizontal movement controlled by vertical scroll.
-   Use selectively for case studies, recognition or portfolio.
-   Smooth transitions; do not force it into every section.

### 03. Text Mask Reveal

-   Word-by-word and line-by-line reveals.
-   Clipping/masking transitions.
-   Staggered entrances.

### 04. Image Reveal

-   Clip-path reveals and expanding transitions.
-   Subtle zoom and selective overlapping layouts.

### 05. Premium Interactive Cards

-   Subtle glossy surfaces.
-   Abstract graphic elements.
-   Soft moving light glow and gentle gradients.
-   Hover states, elevation and border transitions.
-   Glow must remain elegant and restrained.

### 06. Animated Counters

-   Count-up triggered on viewport entry.
-   Natural number transitions and verified figures.

### 07. Journey Map

-   Logo icon along curved SVG path.
-   Scroll-controlled movement.
-   Animated milestones and interactive information cards.
-   Active-stage highlighting.

### 08. Page Transitions

-   Subtle opacity and vertical movement.
-   Consistent transitions without unnecessary navigation delays.

### 09. Service Card Animations

-   Different entrance animations for five cards.
-   Progressive scroll reveal.
-   Floating graphics, subtle glow and hover interactions.

### 10. About & Media Animations

-   Animated video previews.
-   Image clipping transitions.
-   Staggered awards reveals.
-   Subtle parallax and interactive media cards.

### 11. Team Animations

-   Floating design elements.
-   Animated typography.
-   Creative role cards.
-   Gentle continuous movement and hover effects.

### Performance Considerations

-   Prefer GPU-friendly transforms and opacity.
-   Avoid excessive simultaneous animations.
-   Respect reduced-motion preferences.
-   Optimize scroll-triggered animations.
-   Use lighter animation treatments on mobile.
-   Ensure smooth scrolling does not interfere with accessibility or
    navigation.

## 6. Visual Design Guidelines

Follow a content-first approach: 1. Avoid excessive photographs and
generic stock images. 2. Use images only when they add meaningful value.
3. Focus on actual services, results, achievements and business
information. 4. Use typography, numbers, shapes and abstract graphics
for visual interest. 5. Maintain generous whitespace. 6. Avoid excessive
gradients and bright colours. 7. Use purple and champagne gold
selectively. 8. Maintain a consistent card design system. 9. Ensure
animations support content rather than distract. 10. Maintain a premium
appearance on desktop, tablet and mobile.

Take inspiration from Ocean Labs' content-led storytelling and motion,
while retaining UVOKA's own visual identity.

## 7. Technology Stack

### Frontend

-   Next.js with App Router.
-   React.
-   TypeScript.
-   CSS Modules or Tailwind CSS.

### Animation

-   GSAP.
-   GSAP ScrollTrigger.
-   Framer Motion.
-   Lenis for smooth scrolling, where appropriate.
-   SVG animations for the journey map.

### CMS & Content Management

-   Sanity CMS for blogs and case studies.
-   Sanity Studio for content editing.
-   Sanity image pipeline for optimized media.
-   Next.js dynamic routes for published content.

### Technical Requirements

-   Fully responsive and SEO-friendly architecture.
-   Optimized images/assets and lazy loading where appropriate.
-   Fast page loading.
-   Accessible navigation and interactions.
-   Reduced-motion support.
-   Cross-browser compatibility.
-   Clean component architecture and reusable page sections.

## 8. Next.js Project Structure & Architecture

Build this multi-page website using Next.js App Router, reusable
components and separate route files. Keep components, public assets,
page routes, CMS configuration and styles organized independently.

``` text
uvoka/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── awards/
│   │   ├── founder/
│   │   ├── services/
│   │   ├── clients/
│   │   ├── testimonials/
│   │   ├── team/
│   │   ├── blogs/
│   │   └── case-studies/
│   ├── videos/
│   │   ├── about/
│   │   └── founder/
│   ├── logo/
│   │   ├── uvoka-logo.svg
│   │   ├── uvoka-icon.svg
│   │   └── favicon.ico
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── founder/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── linkedin-personal-branding/page.tsx
│   │   │   ├── linkedin-company-branding/page.tsx
│   │   │   ├── linkedin-lead-generation/page.tsx
│   │   │   ├── service-four/page.tsx
│   │   │   └── service-five/page.tsx
│   │   ├── blogs/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── press/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageTransition.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedIn.tsx
│   │   │   ├── ResultsCounter.tsx
│   │   │   ├── ClientRecognition.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── SpecialOffer.tsx
│   │   │   ├── AddOns.tsx
│   │   │   ├── JourneyMap.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Blogs.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── PressRelease.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── FAQ.tsx
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── ServiceHero.tsx
│   │   │   ├── ServiceFeatures.tsx
│   │   │   └── ServiceCTA.tsx
│   │   ├── blogs/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogGrid.tsx
│   │   │   └── BlogContent.tsx
│   │   ├── case-studies/
│   │   │   ├── CaseStudyCard.tsx
│   │   │   └── CaseStudyContent.tsx
│   │   ├── animations/
│   │   │   ├── TextReveal.tsx
│   │   │   ├── ParallaxImage.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   └── AnimatedCounter.tsx
│   │   └── common/
│   │       ├── SectionHeading.tsx
│   │       ├── Button.tsx
│   │       ├── Container.tsx
│   │       └── AnimatedCard.tsx
│   │
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   ├── queries.ts
│   │   └── schemas/
│   │       ├── post.ts
│   │       ├── category.ts
│   │       ├── author.ts
│   │       └── caseStudy.ts
│   │
│   ├── data/
│   │   ├── services.ts
│   │   ├── journey.ts
│   │   ├── testimonials.ts
│   │   ├── team.ts
│   │   └── faqs.ts
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   └── useReducedMotion.ts
│   ├── styles/
│   │   ├── variables.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── utilities.css
│   └── lib/
│       ├── utils.ts
│       └── constants.ts
│
├── sanity.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

### Architecture Guidelines

-   Every website page has its own route file.
-   Keep reusable UI components inside `components`.
-   Organize homepage sections separately.
-   Keep animation utilities reusable.
-   Store images, videos, logos and icons inside `public`.
-   Keep service information and static content in `data`.
-   Use Sanity for dynamic blog and case study content.
-   Centralize colour variables and typography tokens.
-   Avoid putting the entire website into one large page component.
-   Separate client components from server components appropriately.

### Important Routes

-   `/`
-   `/about`
-   `/founder`
-   `/services`
-   `/services/[service-slug]`
-   `/blogs`
-   `/blogs/[slug]`
-   `/case-studies`
-   `/case-studies/[slug]`
-   `/resources`
-   `/press`
-   `/contact`

Use the actual approved service names and slugs for all five service
routes. Sanity Studio can be integrated at `/studio`, with appropriate
authentication and access protection.

## 9. Final Design & Development Expectations

The website should communicate: - Professionalism and credibility. -
Premium brand positioning. - Creative and innovative thinking. - Strong
business expertise. - Measurable results and achievements. - Clear
service offerings. - Trust and authority.

### Final Design Objective

Create a website that feels like a premium, modern digital experience
rather than a conventional corporate website.

**Bold Typography + Light Luxury Colours + Interactive Storytelling +
Creative Parallax + Animated Graphics + Meaningful Content.**

The overall design must remain elegant, responsive, fast and easy to
navigate. Make UVOKA stand out through its presentation of actual
business expertise and creative execution, not excessive images or
unnecessary animations.

The final website should have its own recognizable identity while
maintaining the professional credibility of an established corporate
brand.

## 10. Details to Confirm Before Development

  Item             Confirmation Needed
  ---------------- -------------------------------------------------
  Five services    Actual names and descriptions of all five
  Discount offer   Current price, discount and validity
  Team             Actual creative roles to display
  Journey map      Confirmed six-stage client process
  About section    Existing company videos, photographs and awards
  Case studies     Available projects and approved results

**Technical recommendation:** Use Sanity for both Blogs and Case Studies
instead of building a separate custom dashboard. This provides one place
to manage content, images, SEO information and publishing.
