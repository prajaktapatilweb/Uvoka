export interface SanityImage {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
}

export interface Author {
  _id?: string;
  name: string;
  role?: string;
  image?: SanityImage | string;
  bio?: string;
  linkedin?: string;
}

export interface Category {
  _id?: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  author?: Author;
  featuredImage?: SanityImage | string;
  categories?: Category[];
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  industry: string;
  service: string;
  coverImage?: SanityImage | string;
  summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  challenge: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  solution: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  metrics?: CaseStudyMetric[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  publishedAt: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
