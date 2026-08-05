import type { Metadata } from "next";
import { company, SITE_URL } from "@/lib/constants";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({ title, description, path = "/", image = "/images/logo.webp", type = "website" }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes("Bulk Bytes") ? title : `${title} | Bulk Bytes`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Bulk Bytes",
      images: [{ url: absoluteUrl(image), alt: title }],
      type
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo.webp"),
    description:
      "Bulk Bytes delivers web application development, mobile application development, WordPress development, digital marketing, and software solutions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office # 9-B IQ Villas Tower, Northern Bypass, Bosan Rd",
      addressLocality: "Multan",
      postalCode: "66000",
      addressCountry: "PK"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "customer service",
      email: company.email
    },
    sameAs: company.socials
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image || "/images/logo.webp"),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    author: {
      "@type": "Organization",
      name: input.author
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo.webp")
      }
    }
  };
}
