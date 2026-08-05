export type ApiRecord = Record<string, unknown>;

export type SiteEntity = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  tags?: string[];
  raw: ApiRecord;
};

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  billingNote: string;
  badge?: string;
  features: string[];
  highlighted: boolean;
  raw: ApiRecord;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export type TeamMember = SiteEntity & {
  role?: string;
  email?: string;
  phone?: string;
};

export type BlogPostMeta = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  draft: boolean;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};
