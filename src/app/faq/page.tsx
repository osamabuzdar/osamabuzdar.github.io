import { FaqClient } from "@/components/FaqClient";
import { getFaqs } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQs",
  description: "Find answers to common questions about Bulk Bytes services, support, and engagement process.",
  path: "/faq"
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  return <FaqClient faqs={faqs} />;
}

