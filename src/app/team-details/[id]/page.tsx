import { Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getTeam, getTeamMember } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const team = await getTeam();
  return team.map((member) => ({ id: member.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getTeamMember(id);
  return createMetadata({
    title: member.title,
    description: member.description,
    path: `/team-details/${member.id}`,
    image: member.image
  });
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getTeamMember(id).catch(() => undefined);
  if (!member) notFound();

  return (
    <>
      <PageHero title={member.title} description={member.role || member.description} image={member.image || "/images/aboutus-page-bg.webp"} />
      <section className="section narrow">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/team", label: "Team" }, { href: `/team-details/${member.id}`, label: member.title }]} />
        <SectionHeader eyebrow="Team Member" title={member.title} description={member.description} />
        <div className="rich-panel contact-lines">
          {member.email ? <a href={`mailto:${member.email}`}><Mail size={18} /> {member.email}</a> : null}
          {member.phone ? <a href={`tel:${member.phone}`}><Phone size={18} /> {member.phone}</a> : null}
        </div>
      </section>
    </>
  );
}
