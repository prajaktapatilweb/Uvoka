import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uvoka.in"),
  title: {
    default: "UVOKA | Premium LinkedIn Branding & Growth Agency",
    template: "%s | UVOKA",
  },
  description:
    "Transforming high-performing founders, creators and corporate leaders into influential LinkedIn brands with bespoke content, authority positioning and measurable pipeline growth.",
  keywords: [
    "LinkedIn branding",
    "personal branding agency",
    "lead generation",
    "executive branding",
    "LinkedIn growth",
    "UVOKA",
  ],
  authors: [{ name: "UVOKA Agency", url: "https://www.uvoka.in" }],
  creator: "UVOKA",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.uvoka.in",
    siteName: "UVOKA",
    title: "UVOKA | Premium LinkedIn Branding & Growth Agency",
    description:
      "Transforming high-performing founders, creators and corporate leaders into influential LinkedIn brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UVOKA | Premium LinkedIn Branding & Growth Agency",
    description:
      "Transforming high-performing founders, creators and corporate leaders into influential LinkedIn brands.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#522166",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UVOKA",
  url: "https://www.uvoka.in",
  logo: "https://www.uvoka.in/logo/logo1.png",
  description:
    "Transforming high-performing founders, creators and corporate leaders into influential LinkedIn brands with bespoke content, authority positioning and measurable pipeline growth.",
  sameAs: [
    "https://www.linkedin.com/company/uvoka",
    "https://www.instagram.com/uvoka.in",
    "https://twitter.com/uvoka",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@uvoka.in",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${playfairDisplay.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans antialiased bg-[var(--color-bg)] text-[var(--color-text)]"
        suppressHydrationWarning
      >
        {/* Skip to content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-[var(--color-white)] focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global Smooth Scrolling Provider */}
        <SmoothScrollProvider>
          {/* Site Navigation */}
          <Navbar />

          {/* Main Page Area */}
          <main id="main-content" className="flex-1 pt-20">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* Site Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
