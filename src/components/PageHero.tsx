"use client";

import Link from "next/link";
import { m } from "motion/react";
import { TextReveal } from "@/components/motion/TextReveal";
import { scaleIn } from "@/lib/motion/variants";

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
        {eyebrow ? <m.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{eyebrow}</m.p> : null}
        <h1><TextReveal text={title} /></h1>
        <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>{description}</m.p>
        {(primaryHref || secondaryHref) ? (
          <m.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
            {primaryHref && primaryLabel ? <Link className="button primary" href={primaryHref}>{primaryLabel}</Link> : null}
            {secondaryHref && secondaryLabel ? <Link className="button secondary" href={secondaryHref}>{secondaryLabel}</Link> : null}
          </m.div>
        ) : null}
      </div>
      <m.div className="hero-visual" variants={scaleIn} initial="hidden" animate="visible" aria-hidden="true">
        <div className="interface-card one">
          <strong>Mobile Apps</strong>
          <span>Flutter, Android, iOS</span>
        </div>
        <div className="interface-card two">
          <strong>Cloud APIs</strong>
          <span>Secure data systems</span>
        </div>
        <div className="interface-card three">
          <strong>GPS + AI</strong>
          <span>Tracking and automation</span>
        </div>
      </m.div>
    </section>
  );
}
