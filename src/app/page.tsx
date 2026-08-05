import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EntityCard } from "@/components/EntityCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getPricingPlans, getProjects, getServices, getTestimonials } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Bulk Bytes | IT Company",
  description:
    "Bulk Bytes builds web applications, mobile applications, WordPress websites, digital marketing campaigns, and modern software solutions.",
  path: "/"
});

export default async function HomePage() {
  const [services, projects, testimonials, pricing] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
    getPricingPlans()
  ]);

  return (
    <>
      <PageHero
        eyebrow="Bulk Bytes"
        title="Digital products, apps, and platforms built for measurable growth"
        description="We design and deliver web applications, mobile applications, WordPress experiences, marketing systems, and IT modernization for ambitious teams."
        image="/images/Hero-section-image1.webp"
        primaryHref="/contact"
        primaryLabel="Schedule an Appointment"
        secondaryHref="/services"
        secondaryLabel="View Services"
      />

      <section className="section">
        <SectionHeader
          eyebrow="Service We Offer"
          title="Our demanding services"
          description="Reusable delivery teams, practical technology choices, and clean execution from discovery through launch."
        />
        <div className="card-grid">
          {services.slice(0, 3).map((service) => (
            <EntityCard entity={service} href={`/services-detail/${service.id}`} key={service.id} />
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow dark">About Our Company</p>
          <h2>Driving business growth through intelligent digital innovation</h2>
          <p>
            Bulk Bytes combines product thinking, engineering, design, and marketing so your digital
            systems work together instead of becoming another operational burden.
          </p>
          <ul className="check-list">
            <li><CheckCircle2 size={18} /> Web and mobile engineering</li>
            <li><CheckCircle2 size={18} /> Scalable infrastructure and integrations</li>
            <li><CheckCircle2 size={18} /> SEO, content, and digital marketing support</li>
          </ul>
          <Link className="button primary" href="/about">
            Learn About Us
            <ArrowRight size={18} />
          </Link>
        </div>
        <img src="/images/about-image1.webp" alt="Bulk Bytes team planning digital product work" />
      </section>

      <section className="section muted">
        <SectionHeader eyebrow="Our Projects" title="Showcase of our recognized work" />
        <div className="card-grid">
          {projects.slice(0, 3).map((project) => (
            <EntityCard entity={project} href={`/portfolio-details/${project.id}`} label="View Project" key={project.id} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Pricing" title="Affordable pricing plans" />
        <div className="pricing-grid">
          {pricing.slice(0, 3).map((plan) => (
            <article className={`price-card ${plan.highlighted ? "highlighted" : ""}`} key={plan.id}>
              {plan.badge ? <span className="card-kicker">{plan.badge}</span> : null}
              <h3>{plan.title}</h3>
              <p className="price">{plan.price}</p>
              <p>{plan.billingNote}</p>
              <ul>
                {plan.features.slice(0, 5).map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <Link className="button secondary" href="/contact">Get Started</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-band">
        <SectionHeader eyebrow="Customer Feedbacks" title="Hear from our happy customers" />
        <div className="quote-grid">
          {testimonials.slice(0, 2).map((item) => (
            <blockquote key={item.id}>
              <p>“{item.description}”</p>
              <cite>{item.title}</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
