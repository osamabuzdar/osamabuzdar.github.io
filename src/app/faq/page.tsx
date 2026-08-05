import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getFaqs } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQs",
  description: "Find answers to common questions about Bulk Bytes services, support, and engagement process.",
  path: "/faq"
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions before we start?"
        description="Clear answers about delivery, support, services, and working with Bulk Bytes."
        image="/images/hero-section-image-others.webp"
      />
      <section className="section narrow">
        <SectionHeader title="Frequently asked questions" />
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.id}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
