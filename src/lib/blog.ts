import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import type { BlogPost, BlogPostMeta } from "@/types/site";

const blogDir = join(process.cwd(), "content/blog");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().min(1),
  updatedAt: z.string().optional(),
  author: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().optional(),
  draft: z.boolean().default(false)
});

export function getAllPosts(includeDrafts = process.env.NODE_ENV !== "production"): BlogPost[] {
  if (!existsSync(blogDir)) return [];

  return readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPostFile(file))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getPublishedPosts() {
  return getAllPosts(false);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostMeta(): BlogPostMeta[] {
  return getPublishedPosts().map(({ content: _content, ...meta }) => meta);
}

export function getAdjacentPosts(slug: string) {
  const posts = getPublishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined
  };
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return getPublishedPosts()
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

function readPostFile(file: string): BlogPost {
  const source = readFileSync(join(blogDir, file), "utf8");
  const parsed = matter(source);
  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(`Invalid blog frontmatter in ${file}: ${result.error.message}`);
  }

  const meta = result.data;
  return {
    ...meta,
    content: parsed.content.trim(),
    readingTime: readingTime(parsed.content).text
  };
}
