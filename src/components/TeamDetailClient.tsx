"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import type { TeamMember } from "@/types/site";

type TeamDetailClientProps = {
  member: TeamMember;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const toText = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="inline-block rounded-full border border-gray-200 bg-white px-4 py-1 text-sm font-light text-cyan-700 sm:text-base md:text-lg lg:text-lg 2xl:text-xl">
      <span className="mr-1 inline-block h-1 w-1 rounded-full bg-cyan-800 align-middle" />
      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-800 align-middle" />
      {children}
      <span className="ml-2 mr-1 inline-block h-2 w-2 rounded-full bg-cyan-800 align-middle" />
      <span className="ml-1 inline-block h-1 w-1 rounded-full bg-cyan-800 align-middle" />
    </h2>
  );
}

function HeroSection({
  title,
  breadcrumb,
  backgroundImage = "/images/hero-section-image-others.webp"
}: {
  title: string;
  breadcrumb: string;
  backgroundImage?: string;
}) {
  return (
    <section className="mx-2 my-6 overflow-hidden rounded-3xl border-4 border-white sm:mx-3 sm:my-8 md:mx-4 md:my-10 lg:mx-5">
      <motion.div
        className="overflow-hidden rounded-3xl border border-gray-50 shadow-2xl"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="relative flex h-[30vh] items-center overflow-hidden xs:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh]">
          <motion.img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent" />

          <motion.div
            className="relative z-10 flex max-w-[95%] flex-col gap-3 px-6 xs:gap-4 xs:px-8 sm:gap-5 sm:px-12 md:gap-6 md:px-20 lg:gap-8 lg:px-40"
            variants={fadeUp}
          >
            <h2 className="max-w-5xl text-xl font-bold leading-tight text-white drop-shadow-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <div className="w-fit rounded-3xl bg-white/30 px-2 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm xs:px-3 xs:text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:text-base lg:text-base">
              {breadcrumb}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function TeamDetailClient({ member }: TeamDetailClientProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [member.id]);

  const raw = member.raw as Record<string, unknown>;
  const memberName = toText(raw.MemberName, member.title || "Team Member");
  const memberDesignation = toText(raw.MemberDesignation, toText(member.role, ""));
  const memberDescription = toText(raw.Description, member.description || "");
  const memberCoreSkill = toText(
    raw.MemberCoreSkill,
    member.description || "Focused on delivering practical, reliable digital solutions."
  );
  const memberImage = toText(raw.MemberImage, member.image ?? "/images/client.webp");

  const socials = [
    { href: toText(raw.FbId, ""), Icon: FaFacebookF },
    { href: toText(raw.GithubId, ""), Icon: FaGithub },
    { href: toText(raw.LinkedinId, ""), Icon: FaLinkedinIn },
    { href: toText(raw.PortfolioId, ""), Icon: IoMdPerson }
  ].filter((item) => item.href);

  return (
    <div className="bg-gray-50 transition-colors">
      <HeroSection title="Team Details" breadcrumb="Home / Team Details" />

      <div className="px-4 py-12 font-inter transition-colors">
        <div className="mx-auto max-w-8xl">
          <motion.div
            className="rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:p-12"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[35%_65%]">
              <motion.div className="flex justify-center lg:justify-start" initial="hidden" animate="show" variants={fadeUp}>
                <div className="w-full max-w-sm lg:max-w-full">
                  <img
                    src={memberImage}
                    alt={memberName}
                    className="h-[clamp(350px,60vw,560px)] w-full rounded-2xl object-cover object-top shadow-md"
                  />
                </div>
              </motion.div>

              <div className="flex flex-col justify-start text-center lg:text-left">
                <motion.div className="mb-6" initial="hidden" animate="show" variants={fadeUp}>
                  <h1 className="text-[36px] font-bold leading-11 text-[#1C1C25]">
                    {memberName}
                  </h1>
                  <p className="mt-2 text-[16px] font-semibold leading-[19px] text-cyan-600">
                    {memberDesignation || "Team Member"}
                  </p>
                </motion.div>

                <motion.div
                  className="mb-8 space-y-4 text-[16px] leading-[26px] text-[#797E88]"
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                >
                  {memberDescription ? <p>{memberDescription}</p> : null}
                  <p>{memberCoreSkill}</p>
                </motion.div>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {member.email ? (
                    <motion.div
                      className="rounded-2xl border border-gray-200 p-6 transition-colors hover:border-cyan-300"
                      initial="hidden"
                      animate="show"
                      variants={fadeUp}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-gray-100 p-4 transition-colors">
                          <Mail className="h-6 w-6 text-cyan-600" />
                        </div>
                        <div>
                          <p className="mb-1 text-[16px] font-normal leading-[26px] text-[#1C1C25]">
                            Email:
                          </p>
                          <a
                            href={`mailto:${member.email}`}
                            className="break-all text-[20px] font-bold leading-[26px] text-[#2d2e2f]"
                          >
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}

                  {member.phone ? (
                    <motion.div
                      className="rounded-2xl border border-gray-200 p-6 transition-colors hover:border-cyan-300"
                      initial="hidden"
                      animate="show"
                      variants={fadeUp}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-gray-100 p-4 transition-colors">
                          <Phone className="h-6 w-6 text-cyan-600" />
                        </div>
                        <div>
                          <p className="mb-1 text-[16px] font-normal leading-[26px] text-[#1C1C25]">
                            Phone Call:
                          </p>
                          <a href={`tel:${member.phone}`} className="text-[20px] font-bold leading-[26px] text-[#2d2e2f]">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </div>

                {socials.length ? (
                  <motion.div
                    className="flex flex-wrap justify-center gap-3 lg:justify-start"
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                  >
                    {socials.map(({ href, Icon }, index) => (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-cyan-600 transition hover:bg-cyan-600 hover:text-white"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </motion.div>
                ) : null}

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-600 bg-cyan-600 px-6 py-3 text-base font-bold text-white transition hover:bg-white hover:text-cyan-600"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

