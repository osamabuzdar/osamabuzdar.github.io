import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
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

  return (
    <>
      <PageHero title={service.title} description={service.description} image={service.image || "/images/service-bg1.webp"} />
      <section className="section narrow">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: `/services-detail/${service.id}`, label: service.title }]} />
        <SectionHeader eyebrow="Service Details" title={service.title} description={service.description} />
        <div className="rich-panel">
          <p>{service.description}</p>
          <p>
            Talk to Bulk Bytes about scope, timeline, integrations, support needs, and the most reliable
            launch path for this service.
          </p>
        </div>
      </section>
    </>
  );
}
