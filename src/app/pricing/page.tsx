import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getPricingPlans } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Review Bulk Bytes pricing plans for digital product, web, mobile, and support services.",
  path: "/pricing"
});

export default async function PricingPage() {
  const plans = await getPricingPlans();

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Affordable pricing plans"
        description="Choose a practical starting point, then shape the scope around your business goals."
        image="/images/pricing-bg.webp"
      />
      <section className="section">
        <SectionHeader title="Plans designed for delivery" />
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`price-card ${plan.highlighted ? "highlighted" : ""}`} key={plan.id}>
              {plan.badge ? <span className="card-kicker">{plan.badge}</span> : null}
              <h2>{plan.title}</h2>
              <p className="price">
                {plan.price}
                {plan.billingCycle ? <span className="price-cycle"> / {plan.billingCycle}</span> : null}
              </p>
              <p>{plan.billingNote}</p>
              {plan.platformLimit ? <p className="platform-limit">{plan.platformLimit}</p> : null}
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <Link className="button primary" href="/contact">{plan.buttonText || "Request a Demo"}</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
