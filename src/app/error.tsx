"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="not-found">
      <h1>Something went wrong</h1>
      <p>The page could not load cleanly. Please try again.</p>
      <button className="button primary" type="button" onClick={reset}>Retry</button>
    </section>
  );
}
