import Link from "next/link";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/Hero-section-image1.webp",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel
}: PageHeroProps) {
  return (
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(3, 22, 46, .88), rgba(3, 22, 46, .44)), url("${image}")` }}>
      <div className="hero-content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{description}</p>
        {(primaryHref || secondaryHref) ? (
          <div className="hero-actions">
            {primaryHref && primaryLabel ? <Link className="button primary" href={primaryHref}>{primaryLabel}</Link> : null}
            {secondaryHref && secondaryLabel ? <Link className="button secondary" href={secondaryHref}>{secondaryLabel}</Link> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
