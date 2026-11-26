import { Hero } from "@/components/home/Hero";
import { FeaturedIn } from "@/components/home/FeaturedIn";
import { ResultsCounter } from "@/components/home/ResultsCounter";
import { ClientRecognition} from "@/components/home/ClientRecognition";
import { ClientRecognition11 } from "@/components/oldfile/ClientRecognition11";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { SpecialOffer } from "@/components/home/SpecialOffer";
import { AddOns } from "@/components/home/AddOns";
import { JourneyMap } from "@/components/home/JourneyMap";
import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogsPreview } from "@/components/home/BlogsPreview";
import { Resources } from "@/components/home/Resources";
import { Team } from "@/components/home/Team";
import { PressRelease } from "@/components/home/PressRelease";
import { CTA } from "@/components/home/CTA";
import { FAQ } from "@/components/home/FAQ";
import FavikonCounter from "@/components/home/Favikon";
import { Hero1 } from "@/components/home/Hero1";
import { HeroNew } from "@/components/home/HeroNew";
import { HeroNew1 } from "@/components/home/Hero copy";
import { ResultsCounter1 } from "@/components/home/ResultsCounter copy";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { BlogCard } from "@/components/blogs/BlogCard";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ── 01. Hero Section ── */}
      <HeroNew/>
      
      {/* <Hero /> */}
   
      {/* ── 02. Featured In / Media Recognition ── */}
      <FeaturedIn />

      {/* ── 03. Counter Results / Achievements ── */}
      {/* <ResultsCounter /> */}
      <ResultsCounter1/>
      
      <FavikonCounter />

      {/* ── 06. Services -- Five Creative Animated Cards ── */}
      {/* <Services /> */}
      <ServicesShowcase/>

      {/* ── 09. How We Work -- Interactive Journey Map ── */}
      <JourneyMap />
      {/* ── 04. Top Clients & Recognition ── */}
      <ClientRecognition />



      {/* ── 05. Testimonials Slider ── */}
      <Testimonials />



      {/* ── 07. Current Package / Special Discount Offer ── */}
      {/* <SpecialOffer /> */}

      {/* ── 08. Add-ons ── */}
      {/* <AddOns /> */}



      {/* ── 10. About Us -- Company Story, Media & Awards ── */}
      <AboutPreview />

      {/* ── 13. Our Team -- Creative Team Showcase ── */}
      <Team />

      {/* ── 11. Blogs -- Dynamic Sanity CMS Integration Preview ── */}
      <BlogsPreview />
      {/* ── 12. Resources & Tools ── */}
      <Resources />



      {/* ── 14. Press Releases ── */}
      {/* <PressRelease /> */}
      {/* ── 16. FAQ Accordion ── */}
      <FAQ />

      {/* ── 15. Call to Action ── */}
      <CTA />

      {/* (17. Footer is permanently anchored in RootLayout) */}
    </div>
  );
}
