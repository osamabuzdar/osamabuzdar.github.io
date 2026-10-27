import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { createMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/api";
import type { TeamMember } from "@/types/site";
import { TeamMemberCard } from "@/components/TeamMemberCard";

export const metadata = createMetadata({
  title: "Team",
  description: "Meet the Bulk Bytes team building web, mobile, and digital solutions.",
  path: "/team",
  image: "/images/aboutus-page-bg.webp"
});

function sortTeam(team: TeamMember[]) {
  return [...team].sort((a, b) => {
    const rawA = a.raw as Record<string, unknown>;
    const rawB = b.raw as Record<string, unknown>;
    const seqA = Number(rawA.Sequence ?? rawA.sequence ?? 999999);
    const seqB = Number(rawB.Sequence ?? rawB.sequence ?? 999999);
    if (seqA !== seqB) return seqA - seqB;
    const dateA = new Date(String(rawA.createdAt ?? rawA.CreatedAt ?? 0)).getTime();
    const dateB = new Date(String(rawB.createdAt ?? rawB.CreatedAt ?? 0)).getTime();
    return dateB - dateA;
  });
}

export default async function TeamPage() {
  const team = sortTeam(await getTeam());

  return (
    <div>
      <section className="mx-2 my-6 border-4 border-white rounded-3xl sm:mx-3 sm:my-8 md:mx-4 md:my-10 lg:mx-5">
        <div className="border border-gray-50 shadow-2xl rounded-3xl overflow-hidden">
          <div className="relative w-full h-[30vh] xs:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh] flex items-center overflow-hidden">
            <img
              src="/images/aboutus-page-bg.webp"
              alt="Team hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent z-10" />
            <div className="relative z-10 flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-6 xs:px-8 sm:px-12 md:px-20 lg:px-40 max-w-[95%]">
              <h2 className="font-bold drop-shadow-xl leading-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                Our Team Members
              </h2>
              <div className="text-white text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-base font-semibold bg-white/30 px-2 xs:px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-3xl backdrop-blur-sm w-fit drop-shadow-lg">
                <Link href="/" className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Home
                </Link>
                {" / "}
                <span>Team Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 xl:px-12 bg-white transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Meet Our Expert Team
          </h2>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-600">
            Our team is composed of passionate professionals dedicated to delivering exceptional results.
            We bring together diverse expertise and innovative thinking to help our clients achieve their goals.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 xl:px-12 bg-white transition-colors">
        <div className="w-full mx-auto">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-2
              lg:grid-cols-4
              xl:grid-cols-4
              2xl:grid-cols-4
              gap-6
              xl:gap-10
              2xl:gap-12
              w-full
            "
          >
            {team.map((member, index) => (
              <div
                key={member.id}
                className="w-full transition-transform duration-300 hover:scale-[1.02]"
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-600"
            >
              Join Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
