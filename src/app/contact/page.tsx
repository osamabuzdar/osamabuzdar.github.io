import { ContactClient } from "@/components/ContactClient";
import { getServices } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Bulk Bytes to discuss web development, mobile app development, digital marketing, or IT services.",
  path: "/contact",
  image: "/images/contact-image.webp"
});

export default async function ContactPage() {
  const services = await getServices();

  return <ContactClient services={services} />;
}

