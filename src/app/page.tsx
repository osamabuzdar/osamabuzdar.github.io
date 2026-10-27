import { createMetadata } from "@/lib/seo";
import { getPricingPlans, getProjects, getServices, getTeam, getTestimonials } from "@/lib/api";
import { HomeClient } from "@/components/HomeClient";

export const metadata = createMetadata({
  title: "Bulk Bytes | IT Company",
  description:
    "Bulk Bytes builds web applications, mobile applications, WordPress websites, digital marketing campaigns, and modern software solutions.",
  path: "/"
});

export default async function HomePage() {
  const [services, projects, teamMembers, pricing, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getTeam(),
    getPricingPlans(),
    getTestimonials()
  ]);

  return (
    <HomeClient
      services={services}
      projects={projects}
      teamMembers={teamMembers}
      pricing={pricing}
      testimonials={testimonials}
    />
  );
}
