import { API_BASE_URL } from "@/lib/constants";
import { fallbackBlogs } from "@/lib/fallback-data";
import { slugify, stripHtml } from "@/lib/utils";
import type { BlogComment, BlogPost, BlogPostMeta } from "@/types/site";

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
};

function readingTimeFromHtml(html: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

async function fetchBlogs(endpoint: string) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn(`Blog fetch returned ${res.status} for ${endpoint}`);
      return { success: false, data: [] };
    }
    return res.json() as Promise<ApiResponse<unknown>>;
  } catch (error) {
    console.warn(`Blog fetch failed for ${endpoint}:`, error);
    return { success: false, data: [] };
  }
}

function normalize(record: any): BlogPost {
  const tags = Array.isArray(record.tags) ? record.tags : [];
  const content = String(record.content || "");
  const publishedAt = record.publishedAt ? new Date(record.publishedAt).toISOString() : new Date(record.createdAt || Date.now()).toISOString();
  return {
    title: String(record.title || "Blog"),
    slug: String(record.slug || slugify(record.title || "blog")),
    description: String(record.excerpt || record.metaDescription || ""),
    publishedAt,
    updatedAt: record.updatedAt ? new Date(record.updatedAt).toISOString() : undefined,
    author: String(record.author || "Bulk Bytes"),
    authorBio: record.authorBio ? String(record.authorBio) : undefined,
    category: String(record.category || "General"),
    tags,
    featuredImage: record.featuredImage || undefined,
    galleryImages: Array.isArray(record.galleryImages) ? record.galleryImages.filter(Boolean).map(String) : undefined,
    featuredPost: Boolean(record.featuredPost),
    canonicalUrl: record.canonicalUrl || undefined,
    seoKeywords: Array.isArray(record.seoKeywords) ? record.seoKeywords.map(String) : undefined,
    draft: record.status !== "published",
    readingTime: readingTimeFromHtml(content),
    content
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await fetchBlogs("/blogs/public");
  if (result.success && Array.isArray(result.data) && result.data.length > 0) {
    return (result.data as any[]).map(normalize);
  }
  const fallbackResult = await fetchBlogs("/blogs");
  if (fallbackResult.success && Array.isArray(fallbackResult.data) && fallbackResult.data.length > 0) {
    return (fallbackResult.data as any[]).map(normalize);
  }
  return fallbackBlogs.map(normalize);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const result = await fetchBlogs(`/blogs/slug/${slug}`);
  if (result.success && result.data) {
    return normalize(result.data);
  }
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getBlogPostMeta(): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts();
  return posts.map(({ content: _content, ...meta }) => meta);
}

export async function getAdjacentBlogPosts(slug: string) {
  const posts = await getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined
  };
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const posts = await getAllBlogPosts();
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score:
        (candidate.category === post.category ? 3 : 0) +
        candidate.tags.filter((tag) => post.tags.includes(tag)).length
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}

export async function getBlogComments(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${slug}/comments`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse<unknown>;
    return Array.isArray(json.data) ? (json.data as BlogComment[]) : [];
  } catch {
    return [];
  }
}

export async function addBlogComment(slug: string, input: { name: string; email: string; message: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    const json = (await res.json()) as ApiResponse<unknown>;
    if (!res.ok) throw new Error((json as any).message || "Failed to post comment");
    return json.data as BlogComment;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to post comment");
  }
}
