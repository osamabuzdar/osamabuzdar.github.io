export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://bulkbytes.org";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://api.bulkbytes.org/api";

export const company = {
  name: "Bulk Bytes",
  phone: "+92 312 0400975",
  email: "info@bulkbytes.org",
  address: "Office # 9-B IQ Villas Tower, Northern Bypass, Bosan Rd, Multan, 66000",
  mapUrl: "https://maps.google.com/?q=BulkBytes,+Bosan+Road,+Multan",
  socials: [
    "https://www.facebook.com/bulkbytesofficial",
    "https://www.instagram.com/bbofficial62/",
    "https://github.com/bulk-bytes",
    "https://www.linkedin.com/company/bulkbytes"
  ]
};

export const criticalLegacyUrls = [
  "/clients-policy/udrive-privacy.html",
  "/clients-policy/utrack-privacy.html",
  "/support/udrive-support.html"
];

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];
