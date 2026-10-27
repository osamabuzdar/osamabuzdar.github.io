"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBriefcase, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import type { TeamMember } from "@/types/site";

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const raw = member.raw as Record<string, unknown>;

  const memberName = member.title || (typeof raw.MemberName === "string" ? raw.MemberName : "Team Member");
  const memberDesignation =
    member.role ||
    (typeof raw.MemberDesignation === "string" ? raw.MemberDesignation : "") ||
    (typeof raw.designation === "string" ? raw.designation : "");
  const memberCoreSkill =
    member.description ||
    (typeof raw.MemberCoreSkill === "string" ? raw.MemberCoreSkill : "") ||
    "Focused on delivering practical, reliable digital solutions.";
  const memberImage =
    member.image ||
    (typeof raw.MemberImage === "string" ? raw.MemberImage : "/images/client.webp");
  const detailHref = `/team-details/${member.id}`;

  const socialLinks = [
    {
      Icon: FaFacebook,
      href: typeof raw.FbId === "string" ? raw.FbId : ""
    },
    {
      Icon: FaGithub,
      href: typeof raw.GithubId === "string" ? raw.GithubId : ""
    },
    {
      Icon: FaLinkedin,
      href: typeof raw.LinkedinId === "string" ? raw.LinkedinId : ""
    },
    {
      Icon: FaBriefcase,
      href: typeof raw.PortfolioId === "string" ? raw.PortfolioId : ""
    }
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border p-6 flex flex-col shadow-lg hover:shadow-xl bg-white border-gray-200"
      role="link"
      tabIndex={0}
      onClick={() => router.push(detailHref)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(detailHref);
        }
      }}
    >
      <div
        className="relative group overflow-hidden rounded-3xl w-full shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={memberImage}
          alt={memberName}
          className="w-full h-60 md:h-64 xl:h-72 2xl:h-80 object-cover object-top rounded-3xl shadow-2xl border border-gray-200 transition-colors"
        />

        <div className={`absolute inset-0 bg-cyan-500 transition-opacity duration-500 ${isHovered ? "opacity-30" : "opacity-0"}`} />

        <div className="absolute inset-0 flex items-center justify-center">
          {!isHovered ? (
            <button
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 transform translate-y-9 bg-white"
              aria-label="Share"
            >
              <FiShare2 className="h-5 w-5 text-cyan-500" />
            </button>
          ) : (
            <div className="flex gap-3 2xl:gap-5">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full flex items-center justify-center shadow-lg text-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 bg-white"
                  aria-label="Team social link"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Icon className="w-5 h-5 2xl:w-6 2xl:h-6" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 text-center grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl 2xl:text-xl font-bold transition-colors text-gray-900">
            {memberName}
          </h3>
          <p className="text-cyan-500 font-medium text-base 2xl:text-lg min-h-6">
            {memberDesignation}
          </p>
        </div>

        <p
          className="text-sm 2xl:text-base mt-2 transition-colors min-h-12 text-gray-600 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4
          }}
        >
          {memberCoreSkill}
        </p>
      </div>
    </div>
  );
}
