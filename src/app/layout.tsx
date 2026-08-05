import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageProgress } from "@/components/motion/PageProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bulkbytes.org"),
  title: {
    default: "Bulk Bytes | Web, Mobile App Development and Digital Marketing",
    template: "%s | Bulk Bytes"
  },
  description:
    "Bulk Bytes is an IT company delivering web applications, mobile applications, WordPress development, digital marketing, and software solutions.",
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MotionProvider>
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <PageProgress />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
