import type { FaqItem, PricingPlan, SiteEntity, TeamMember } from "@/types/site";

// TODO(api): Replace these local records with build-time data from the future Bulk Bytes API.
export const fallbackServices: SiteEntity[] = [
  {
    id: "web-application-development",
    slug: "web-application-development",
    title: "Web Application Development",
    description:
      "Custom dashboards, customer portals, SaaS products, and responsive business websites built for maintainability.",
    image: "/images/Service-image1.webp",
    category: "Development",
    tags: ["Web Development", "React", "Next.js"],
    raw: {}
  },
  {
    id: "mobile-application-development",
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    description:
      "Android, iOS, and cross-platform mobile apps with reliable support URLs, app-store readiness, and clean user flows.",
    image: "/images/Service-image2.webp",
    category: "Mobile Apps",
    tags: ["Android", "iOS", "Flutter"],
    raw: {}
  },
  {
    id: "wordpress-development",
    slug: "wordpress-development",
    title: "WordPress Development",
    description:
      "Fast, editable WordPress websites for service businesses, portfolios, and campaign landing pages.",
    image: "/images/Service-image3.webp",
    category: "CMS",
    tags: ["WordPress", "Web Development"],
    raw: {}
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "SEO, content planning, campaign pages, analytics, and digital growth support for practical business outcomes.",
    image: "/images/growth-image1.webp",
    category: "Growth",
    tags: ["SEO", "Marketing"],
    raw: {}
  }
];

export const fallbackProjects: SiteEntity[] = [
  {
    id: "fleet-tracking-platform",
    slug: "fleet-tracking-platform",
    title: "Fleet Tracking Platform",
    description: "A vehicle tracking and operations experience for teams managing mobile assets and field visibility.",
    image: "/images/hero-section-image2.webp",
    category: "GPS Tracking",
    tags: ["Fleet", "Tracking"],
    raw: {}
  },
  {
    id: "business-website-refresh",
    slug: "business-website-refresh",
    title: "Business Website Refresh",
    description: "A modern marketing website refresh focused on service clarity, fast pages, and conversion paths.",
    image: "/images/about-image1.webp",
    category: "Web",
    tags: ["Website", "SEO"],
    raw: {}
  },
  {
    id: "mobile-support-workflow",
    slug: "mobile-support-workflow",
    title: "Mobile Support Workflow",
    description: "Stable privacy, support, and data-deletion URL handling for mobile app publishing requirements.",
    image: "/images/contact-image.webp",
    category: "Mobile Apps",
    tags: ["Support", "Privacy"],
    raw: {}
  }
];

export const fallbackTeam: TeamMember[] = [
  {
    id: "bulk-bytes-delivery-team",
    slug: "bulk-bytes-delivery-team",
    title: "Bulk Bytes Delivery Team",
    description: "Designers, developers, marketers, and support specialists working together on digital products.",
    image: "/images/Logo_profile.webp",
    category: "Team",
    tags: ["Engineering", "Design", "Marketing"],
    role: "Product and Engineering Team",
    raw: {}
  }
];

export const fallbackPricing: PricingPlan[] = [
  {
    id: "starter",
    title: "Starter",
    price: "Custom",
    billingNote: "Best for small websites, updates, and focused improvements.",
    badge: "Flexible",
    features: ["Discovery call", "Responsive implementation", "Basic SEO setup", "Launch support"],
    highlighted: false,
    raw: {}
  },
  {
    id: "growth",
    title: "Growth",
    price: "Custom",
    billingNote: "Best for apps, dashboards, and growing service businesses.",
    badge: "Popular",
    features: ["Product planning", "Web or mobile development", "Content and SEO support", "Analytics setup", "Ongoing iteration"],
    highlighted: true,
    raw: {}
  },
  {
    id: "scale",
    title: "Scale",
    price: "Custom",
    billingNote: "Best for advanced platforms, integrations, and longer delivery roadmaps.",
    badge: "Enterprise",
    features: ["Architecture planning", "Integrations", "Performance optimization", "Release process", "Priority support"],
    highlighted: false,
    raw: {}
  }
];

export const fallbackTestimonials: SiteEntity[] = [
  {
    id: "customer-operations",
    slug: "customer-operations",
    title: "Operations Client",
    description: "Bulk Bytes helped us turn a scattered workflow into a clearer digital system.",
    image: "/images/testimonial-section-bg.webp",
    category: "Client Feedback",
    tags: [],
    raw: {}
  },
  {
    id: "customer-mobile",
    slug: "customer-mobile",
    title: "Mobile App Client",
    description: "The team understood app-store requirements and kept critical public URLs stable.",
    image: "/images/testimonial-bg.webp",
    category: "Client Feedback",
    tags: [],
    raw: {}
  }
];

export const fallbackFaqs: FaqItem[] = [
  {
    id: "how-do-we-start",
    question: "How do we start a project with Bulk Bytes?",
    answer: "Start with a discovery conversation. We clarify goals, scope, timeline, content, and technical constraints before proposing the first delivery path.",
    category: "Process"
  },
  {
    id: "do-you-build-mobile-apps",
    question: "Do you build Android and iOS apps?",
    answer: "Yes. Bulk Bytes works on mobile app planning, design, development, app-store readiness, and support documentation.",
    category: "Mobile Apps"
  },
  {
    id: "will-policy-urls-change",
    question: "Will existing privacy-policy and support URLs change?",
    answer: "No. The critical .html URLs under clients-policy and support are preserved as direct public files.",
    category: "Legacy URLs"
  }
];
