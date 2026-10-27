"use client";

import { useState, useTransition, type FormEvent } from "react";
import { addBlogComment } from "@/lib/blog";
import type { BlogComment } from "@/types/site";

export function BlogComments({ slug, initialComments }: { slug: string; initialComments: BlogComment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all comment fields.");
      return;
    }

    startTransition(async () => {
      try {
        const created = await addBlogComment(slug, form);
        setComments((prev) => [created, ...prev]);
        setForm({ name: "", email: "", message: "" });
        setSuccess("Your comment was posted successfully.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to post comment");
      }
    });
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
          <p className="mt-1 text-sm text-gray-500">
            {comments.length} comment{comments.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email Address"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <textarea
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Tell us about your project..."
          rows={6}
          className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Posting..." : "Submit Comment"}
        </button>

        {error ? <p className="mt-3 text-sm font-medium text-red-500">{error}</p> : null}
        {success ? <p className="mt-3 text-sm font-medium text-green-600">{success}</p> : null}
      </form>

      <div className="mt-8 space-y-4">
        {comments.length ? comments.map((comment) => (
          <article key={comment._id || `${comment.name}-${comment.createdAt}`} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <strong className="block text-sm font-bold text-gray-900">{comment.name}</strong>
                {comment.createdAt ? <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span> : null}
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Reply</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-gray-600">{comment.message}</p>
          </article>
        )) : (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-500">
            No comments yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </section>
  );
}
