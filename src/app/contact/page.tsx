import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Bulk Bytes to discuss web development, mobile app development, digital marketing, or IT services.",
  path: "/contact",
  image: "/images/contact-image.webp"
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Schedule your appointment today"
        description="Tell us what you want to build, fix, launch, or grow. We will help shape the next step."
        image="/images/contact-section-background.webp"
      />
      <section className="contact-layout">
        <div className="contact-panel">
          <h2>Company Address</h2>
          <p>{company.address}</p>
          <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
          <p><a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a></p>
          <iframe
            title="Bulk Bytes map"
            src="https://www.google.com/maps?q=Bulk+Bytes+Software+company+30.252324,71.485964&hl=en&z=15&output=embed"
            loading="lazy"
          />
        </div>
        <ContactForm />
      </section>
    </>
  );
}
