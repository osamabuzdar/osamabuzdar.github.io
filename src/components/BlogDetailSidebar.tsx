"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/site";

export function BlogDetailSidebar({
  currentSlug,
  currentCategory,
  recentPosts,
  galleryImages,
  tags
}: {
  currentSlug: string;
  currentCategory: string;
  recentPosts: BlogPostMeta[];
  galleryImages: string[];
  tags: string[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => Array.from(new Set([currentCategory, ...recentPosts.map((item) => item.category)])).filter(Boolean),
    [currentCategory, recentPosts]
  );

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = search.trim();
    router.push(q ? `/blog?search=${encodeURIComponent(q)}` : "/blog");
  };

  return (
    <aside className="space-y-6">
      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Search Here</h3>
        <form onSubmit={submitSearch} className="flex">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Enter Keyword"
            className="w-full rounded-l-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-cyan-500"
          />
          <button type="submit" className="rounded-r-xl bg-violet-600 px-4 text-white">
            Search
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.filter((item) => item.slug !== currentSlug).slice(0, 3).map((post) => (
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
                <p className="text-xs text-gray-500">By {post.author}</p>
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
          {categories.slice(0, 6).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => router.push(`/blog?category=${encodeURIComponent(item)}`)}
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
              <div key={`${image}-${index}`} className="aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md">
                <img src={image} alt={`Sidebar gallery ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 10).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => router.push(`/blog?tag=${encodeURIComponent(item)}`)}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
