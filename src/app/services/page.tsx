import { ServicesClient } from "@/components/ServicesClient";
import { getServices } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description: "Explore Bulk Bytes services for web apps, mobile apps, WordPress, digital marketing, and IT modernization.",
  path: "/services"
});

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesClient services={services} />;
}
