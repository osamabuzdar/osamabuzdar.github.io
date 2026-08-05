import { BlogExplorer } from "@/components/BlogExplorer";
import { PageHero } from "@/components/PageHero";
import { getPostMeta } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: "SEO-focused articles from Bulk Bytes about mobile apps, web development, GPS tracking, and digital growth.",
  path: "/blog"
});

export default function BlogPage() {
  const posts = getPostMeta();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights for better digital products"
        description="Practical articles for teams building apps, platforms, tracking products, and marketing systems."
        image="/images/hero-section-image-others.webp"
      />
      <section className="section">
        <BlogExplorer posts={posts} />
      </section>
    </>
  );
}
