"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/site";

export function BlogExplorer({ posts }: { posts: BlogPostMeta[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
  const tags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))];

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((postTag) => postTag.toLowerCase().includes(query));
      const matchesCategory = category === "All" || post.category === category;
      const matchesTag = tag === "All" || post.tags.includes(tag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [category, posts, search, tag]);

  return (
    <div className="blog-explorer">
      <div className="blog-controls">
        <label>
          Search
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Fleet, mobile, SEO..." />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Tag
          <select value={tag} onChange={(event) => setTag(event.target.value)}>
            {tags.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="blog-grid">
          {filtered.map((post) => (
            <article className="blog-card" key={post.slug}>
              {post.featuredImage ? <img src={post.featuredImage} alt={post.title} /> : <div className="image-fallback">BB</div>}
              <div className="card-body">
                <span className="card-kicker">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="meta-line">
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>Read article</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">No articles match those filters.</p>
      )}
    </div>
  );
}
