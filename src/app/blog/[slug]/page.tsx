import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MdxContent } from "@/components/MdxContent";
import { getAdjacentPosts, getPostBySlug, getPublishedPosts, getRelatedPosts } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();
  const adjacent = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post);

  return (
    <article className="article-shell">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <JsonLd data={articleJsonLd({
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        image: post.featuredImage,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        author: post.author
      })} />
      <header className="article-hero">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { href: `/blog/${post.slug}`, label: post.title }]} />
        <p className="eyebrow dark">{post.category}</p>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="meta-line">
          <span>{post.author}</span>
          <span>{post.publishedAt}</span>
          <span>{post.readingTime}</span>
        </div>
        {post.featuredImage ? <img src={post.featuredImage} alt={post.title} /> : null}
      </header>
      <div className="article-content">
        <MdxContent source={post.content} />
      </div>
      <footer className="article-footer">
        <div className="adjacent-links">
          {adjacent.previous ? <Link href={`/blog/${adjacent.previous.slug}`}>Previous: {adjacent.previous.title}</Link> : <span />}
          {adjacent.next ? <Link href={`/blog/${adjacent.next.slug}`}>Next: {adjacent.next.title}</Link> : <span />}
        </div>
        {related.length ? (
          <div>
            <h2>Related articles</h2>
            <div className="related-grid">
              {related.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}>{item.title}</Link>)}
            </div>
          </div>
        ) : null}
      </footer>
    </article>
  );
}
