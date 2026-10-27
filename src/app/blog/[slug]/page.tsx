import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogComments } from "@/components/BlogComments";
import { BlogDetailSidebar } from "@/components/BlogDetailSidebar";
import { JsonLd } from "@/components/JsonLd";
import { getAdjacentBlogPosts, getBlogComments, getBlogPostBySlug, getBlogPostMeta, getRelatedBlogPosts } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPostMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    type: "article",
    keywords: post.seoKeywords
  });
}

function toDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || post.draft) notFound();

  const adjacent = await getAdjacentBlogPosts(post.slug);
  const related = await getRelatedBlogPosts(post);
  const comments = await getBlogComments(post.slug);
  const recentPosts = await getBlogPostMeta();
  const recent = recentPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);
  const gallery = post.galleryImages || [];
  const sidebarGallery = gallery.slice(0, 6);
  const tags = Array.from(new Set(recentPosts.flatMap((item) => item.tags)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          image: post.featuredImage,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          author: post.author
        })}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {post.featuredImage ? (
            <div className="aspect-[16/8] overflow-hidden bg-gray-100">
              <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
            </div>
          ) : null}

          <div className="p-5 sm:p-6 lg:p-8">
            <Breadcrumbs
              items={[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Blog" },
                { href: `/blog/${post.slug}`, label: post.title }
              ]}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700">{post.category}</span>
              <span>{toDate(post.publishedAt)}</span>
              <span>{post.author}</span>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{post.description}</p>

            <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                  {post.author?.slice(0, 2).toUpperCase() || "BB"}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">Author</p>
                  <h2 className="text-lg font-bold text-gray-900">{post.author}</h2>
                  {post.authorBio ? <p className="mt-2 text-sm leading-7 text-gray-600">{post.authorBio}</p> : null}
                </div>
              </div>
            </div>

            <div className="prose prose-gray mt-8 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-7 prose-p:text-gray-600 prose-li:text-gray-600">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {gallery.length ? (
              <section className="mt-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Gallery</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gallery.map((image, index) => (
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${post.title} gallery ${index + 1}`}
                      className="h-56 w-full rounded-2xl object-cover"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {related.length ? (
              <section className="mt-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Posts</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="aspect-[16/9] bg-gray-100">
                        {item.featuredImage ? (
                          <img src={item.featuredImage} alt={item.title} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500">{item.category}</p>
                        <h3 className="mt-1 font-semibold text-gray-900">{item.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 text-sm">
              <div>
                {adjacent.previous ? (
                  <Link href={`/blog/${adjacent.previous.slug}`} className="font-semibold text-violet-600 hover:text-violet-700">
                    Previous Post
                  </Link>
                ) : (
                  <span className="text-gray-400">No previous post</span>
                )}
              </div>
              <div>
                {adjacent.next ? (
                  <Link href={`/blog/${adjacent.next.slug}`} className="font-semibold text-violet-600 hover:text-violet-700">
                    Next Post
                  </Link>
                ) : (
                  <span className="text-gray-400">No next post</span>
                )}
              </div>
            </div>

            <div className="mt-10">
              <BlogComments slug={post.slug} initialComments={comments} />
            </div>
          </div>
        </article>

        <BlogDetailSidebar
          currentSlug={post.slug}
          currentCategory={post.category}
          recentPosts={recent}
          galleryImages={sidebarGallery}
          tags={tags}
        />
      </div>
    </div>
  );
}
