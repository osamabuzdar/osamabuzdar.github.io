"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/site";

function toDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function BlogExplorer({
  posts,
  initialSearch = "",
  initialCategory = "All",
  initialTag = "All"
}: {
  posts: BlogPostMeta[];
  initialSearch?: string;
  initialCategory?: string;
  initialTag?: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);

  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))];
  const tags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags || [])))];

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return posts
      .filter((post) => {
        const matchesSearch =
          !query ||
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((postTag) => postTag.toLowerCase().includes(query));
        const matchesCategory = category === "All" || post.category === category;
        const matchesTag = tag === "All" || post.tags.includes(tag);
        return matchesSearch && matchesCategory && matchesTag;
      })
      .sort((a, b) => Number(Boolean(b.featuredPost)) - Number(Boolean(a.featuredPost)) || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [category, posts, search, tag]);

  const recentPosts = useMemo(() => [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3), [posts]);
  const galleryImages = useMemo(() => {
    const images = posts.flatMap((post) => post.galleryImages || []).filter(Boolean);
    return Array.from(new Set(images)).slice(0, 6);
  }, [posts]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">Search Here</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Enter keyword"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">Category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">Tag</span>
                <select
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
                >
                  {tags.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filtered.length ? (
            <div className="space-y-8">
              {filtered.map((post) => (
                <article key={post.slug} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 text-4xl font-bold text-cyan-600">
                          BB
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5 sm:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700">{post.category}</span>
                      <span>{toDate(post.publishedAt)}</span>
                      <span>{post.readingTime}</span>
                      {post.featuredPost ? <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">Featured</span> : null}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      <Link href={`/blog/${post.slug}`} className="transition hover:text-cyan-600">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">{post.description}</p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{post.author}</span>
                        {post.authorBio ? <span className="block line-clamp-1 text-xs text-gray-400">{post.authorBio}</span> : null}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                      >
                        Read Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
              No articles match those filters.
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 text-xs font-bold text-cyan-700">
                        BB
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{post.author}</p>
                    <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 transition group-hover:text-cyan-600">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Categories</h3>
            <div className="space-y-3">
              {categories.filter((item) => item !== "All").slice(0, 6).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <span>{item}</span>
                  <span>→</span>
                </button>
              ))}
            </div>
          </section>

          {galleryImages.length ? (
            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                    <img src={image} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.filter((item) => item !== "All").slice(0, 12).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTag(item)}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
