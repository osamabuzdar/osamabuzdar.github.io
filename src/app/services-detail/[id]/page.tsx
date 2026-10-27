import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/ServiceDetailClient";
import { getService, getServices } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id);
  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services-detail/${service.id}`,
    image: service.image
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id).catch(() => undefined);
  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
