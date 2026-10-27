import { createMetadata } from "@/lib/seo";
import { getPricingPlans, getProjects, getServices, getTeam, getTestimonials } from "@/lib/api";
import { PricingClient } from "@/components/PricingClient";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Review Bulk Bytes pricing plans for digital product, web, mobile, and support services.",
  path: "/pricing",
  image: "/images/pricing-bg.webp"
});

export default async function PricingPage() {
  const [plans, projects, services, team, testimonials] = await Promise.all([
    getPricingPlans(),
    getProjects(),
    getServices(),
    getTeam(),
    getTestimonials()
  ]);

  return (
    <PricingClient
      plans={plans}
      projects={projects}
      services={services}
      team={team}
      testimonials={testimonials}
    />
  );
}
