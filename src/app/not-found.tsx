import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link className="button primary" href="/">Go Back To Homepage</Link>
    </section>
  );
}
