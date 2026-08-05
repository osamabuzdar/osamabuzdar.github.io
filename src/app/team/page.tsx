import { EntityCard } from "@/components/EntityCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getTeam } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Team",
  description: "Meet the Bulk Bytes team building web, mobile, and digital solutions.",
  path: "/team"
});

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Meet our expert team"
        description="A focused group of builders, designers, and problem solvers."
        image="/images/aboutus-page-bg.webp"
      />
      <section className="section">
        <SectionHeader title="People behind the work" />
        <div className="card-grid">
          {team.map((member) => (
            <EntityCard entity={member} href={`/team-details/${member.id}`} label="View Profile" key={member.id} />
          ))}
        </div>
      </section>
    </>
  );
}
