import { notFound } from "next/navigation";
import { TeamDetailClient } from "@/components/TeamDetailClient";
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

  return <TeamDetailClient member={member} />;
}
