import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about Bulk Bytes, an IT company building web, mobile, marketing, and software solutions.",
  path: "/about",
  image: "/images/aboutus-page-bg.webp"
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Bulk Bytes"
        title="Years of excellence in IT and software solutions"
        description="We help companies modernize ideas, workflows, and customer experiences through thoughtful technology."
        image="/images/aboutus-page-bg.webp"
      />
      <section className="split-section">
        <img src="/images/about-image2.webp" alt="Digital product collaboration at Bulk Bytes" />
        <div>
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Practical teams for ambitious digital work"
            description="Our process connects strategy, design, development, and optimization so every project has a clear path from first conversation to launch."
          />
          <div className="stat-grid">
            <div><strong>Web</strong><span>Applications and dashboards</span></div>
            <div><strong>Mobile</strong><span>Android, iOS, and cross-platform apps</span></div>
            <div><strong>Growth</strong><span>SEO and marketing systems</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
