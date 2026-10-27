import Link from "next/link";
import type { ComponentType } from "react";
import type { TeamMember } from "@/types/site";
import { createMetadata } from "@/lib/seo";
import { getProjects, getTeam, getTestimonials } from "@/lib/api";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { TbMessageQuestion, TbWorldStar } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { TiTick } from "react-icons/ti";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiHandHeartLight } from "react-icons/pi";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { SlBadge } from "react-icons/sl";
import { AboutVideoSection } from "@/components/AboutVideoSection";
import { TeamMemberCard } from "@/components/TeamMemberCard";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn about Bulk Bytes and the digital solutions we build for clients.",
  path: "/about",
  image: "/images/hero-section-image-others.webp"
});

type TeamCardMember = TeamMember;

function SectionHeading({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2
      className={`inline-block rounded-full border border-gray-200 bg-white px-4 py-1 text-sm font-light text-cyan-700 transition-colors sm:text-base md:text-lg lg:text-lg 2xl:text-xl ${className}`}
    >
      <span className="mr-1 inline-block h-1 w-1 rounded-full bg-cyan-800 align-middle" />
      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-800 align-middle" />
      {children}
      <span className="ml-2 mr-1 inline-block h-2 w-2 rounded-full bg-cyan-800 align-middle" />
      <span className="ml-1 inline-block h-1 w-1 rounded-full bg-cyan-800 align-middle" />
    </h2>
  );
}

function FeatureBlock({
  icon: Icon,
  title,
  description
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#1C1C25]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#797E88]">{description}</p>
      </div>
    </div>
  );
}

function getField(raw: Record<string, unknown> | undefined, key: string) {
  const value = raw?.[key];
  return typeof value === "string" ? value : "";
}

function getRating(raw: Record<string, unknown> | undefined) {
  const rating = raw?.stars ?? raw?.Stars ?? raw?.rating ?? raw?.Rating;
  if (typeof rating === "number" && Number.isFinite(rating)) return rating;
  if (typeof rating === "string") {
    const parsed = Number.parseFloat(rating);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 5;
}

const teamPreviewFallback: TeamCardMember[] = [
  {
    id: "afaq-ahmad",
    slug: "afaq-ahmad",
    title: "Afaq Ahmad",
    description: "Intern Mobile App Developer focused on clean, reliable product delivery.",
    image: "/images/Logo_profile.webp",
    category: "Mobile App Developer",
    raw: {
      MemberName: "Afaq Ahmad",
      MemberDesignation: "Intern Mobile App Developer",
      MemberCoreSkill: "Focused on clean, reliable product delivery.",
      MemberImage: "/images/Logo_profile.webp"
    }
  },
  {
    id: "muhammad-waqas-khan",
    slug: "muhammad-waqas-khan",
    title: "Muhammad Waqas Khan",
    description: "Backend and app support with an eye for dependable user experiences.",
    image: "/images/Logo_profile.webp",
    category: "Developer",
    raw: {
      MemberName: "Muhammad Waqas Khan",
      MemberDesignation: "Developer",
      MemberCoreSkill: "Backend and app support with an eye for dependable user experiences.",
      MemberImage: "/images/Logo_profile.webp"
    }
  },
  {
    id: "bulk-bytes-design",
    slug: "bulk-bytes-design",
    title: "Creative Design Team",
    description: "UI, branding, and motion ideas turned into practical interfaces.",
    image: "/images/Logo_profile.webp",
    category: "Design",
    raw: {
      MemberName: "Creative Design Team",
      MemberDesignation: "UI/UX",
      MemberCoreSkill: "UI, branding, and motion ideas turned into practical interfaces.",
      MemberImage: "/images/Logo_profile.webp"
    }
  },
  {
    id: "bulk-bytes-strategy",
    slug: "bulk-bytes-strategy",
    title: "Growth Strategy Team",
    description: "Marketing, planning, and client communication aligned around outcomes.",
    image: "/images/Logo_profile.webp",
    category: "Strategy",
    raw: {
      MemberName: "Growth Strategy Team",
      MemberDesignation: "Marketing",
      MemberCoreSkill: "Marketing, planning, and client communication aligned around outcomes.",
      MemberImage: "/images/Logo_profile.webp"
    }
  }
];

export default async function AboutPage() {
  const [projects, team, testimonials] = await Promise.all([
    getProjects(),
    getTeam(),
    getTestimonials()
  ]);

  const previewTeam = team.length >= 4 ? team.slice(0, 4) : [...team, ...teamPreviewFallback].slice(0, 4);
  const testimonialList = testimonials.length > 0 ? testimonials : [];
  const avatarList = testimonialList.slice(0, 5);
  const averageRating =
    testimonialList.length > 0
      ? testimonialList.reduce((sum, item) => sum + getRating(item.raw as Record<string, unknown>), 0) / testimonialList.length
      : 5;

  const stats = [
    { value: "10+", label: "Years of Excellence", icon: PiHandHeartLight },
    { value: `${projects.length}+`, label: "Project's Complete", icon: LiaClipboardCheckSolid },
    { value: `${team.length}+`, label: "Team Members", icon: TbWorldStar },
    { value: `${Math.max(100, Math.round(testimonials.length * 50))}+`, label: "Total Award Wins", icon: SlBadge }
  ];

  const platformIcons = [
    { name: "React", src: "/images/platforms/React-icon.webp" },
    { name: "MongoDB", src: "/images/platforms/mongodb-icon.webp" },
    { name: "Flutter", src: "/images/platforms/flutter-icon.webp" },
    { name: "Docker", src: "/images/platforms/docker-icon.webp" },
    { name: "AWS", src: "/images/platforms/aws-icon.webp" },
    { name: "Figma", src: "/images/platforms/figma.png" },
    { name: "Firebase", src: "/images/platforms/firebase.png" },
    { name: "PostgreSQL", src: "/images/platforms/pgsql.png" },
    { name: "Photoshop", src: "/images/platforms/photoshop.png" },
    { name: "WordPress", src: "/images/platforms/wordpress.png" }
  ];

  return (
    <div>
      <section className="mx-2 my-6 overflow-hidden rounded-3xl border-4 border-white sm:mx-3 sm:my-8 md:mx-4 md:my-10 lg:mx-5">
        <div className="relative flex h-[30vh] items-center overflow-hidden rounded-3xl sm:h-[35vh] md:h-[50vh] lg:h-[60vh]">
          <img
            src="/images/hero-section-image-others.webp"
            alt="About Bulk Bytes"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent" />

          <div className="relative z-10 flex max-w-[95%] flex-col gap-3 px-6 sm:gap-4 sm:px-12 md:gap-6 md:px-20 lg:gap-8 lg:px-40">
            <h2 className="text-xl font-bold leading-tight text-white drop-shadow-xl sm:text-3xl md:text-4xl lg:text-5xl">
              About Our Company
            </h2>

            <div className="w-fit rounded-3xl bg-white/30 px-2 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm drop-shadow-lg xs:px-3 sm:px-4 sm:py-2 sm:text-sm md:text-base lg:text-base">
              <Link href="/" className="cursor-pointer transition-colors hover:text-cyan-300">
                Home
              </Link>
              {" / "}
              <span>About Us</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative flex w-full max-w-[410px] justify-start transform origin-top-left scale-100 mx-auto sm:max-w-none sm:scale-[0.9] md:scale-[0.95] lg:mx-0 lg:scale-100">
            <img
              src="/images/about-image1.webp"
              alt="Office team working"
              className="h-[300px] w-60 rounded-[32px] object-cover shadow-lg sm:h-[360px] sm:w-[300px] md:h-[430px] md:w-[340px] lg:h-[540px] lg:w-[410px]"
            />

            <img
              src="/images/about-image2.webp"
              alt="Team meeting"
              className="absolute right-4 top-[30%] w-[140px] translate-x-0 rotate-6 rounded-3xl border-4 border-white object-cover shadow-xl sm:top-[28%] sm:w-[170px] md:top-[25%] md:w-[200px] lg:top-[25%] lg:w-60 xl:w-[260px]"
            />
          </div>

          <div className="space-y-6 lg:pr-12">
            <SectionHeading>ABOUT OUR COMPANY</SectionHeading>

            <h1 className="text-2xl font-semibold leading-tight text-[#1C1C25] sm:text-3xl lg:text-3xl xl:text-[2.5rem]">
              Driving Business Growth Through Intelligent Digital Innovation
            </h1>

            <p className="text-justify text-[clamp(0.875rem,2.5vw,1.125rem)] leading-[clamp(1.25rem,3vw,1.75rem)] text-[#797E88]">
              We imagine a future where our clients lead their industries, defining new benchmarks of excellence through the power of our consulting expertise.
            </p>

            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="space-y-4 text-[clamp(0.875rem,2.25vw,1rem)] text-[#797E88]">
                <p className="flex items-center gap-3">
                  <TiTick className="rounded-full bg-cyan-500 text-white" />
                  24/7 System Monitoring & Support
                </p>
                <p className="flex items-center gap-3">
                  <TiTick className="rounded-full bg-cyan-500 text-white" />
                  Data Backup & Disaster Recovery
                </p>
                <p className="flex items-center gap-3">
                  <TiTick className="rounded-full bg-cyan-500 text-white" />
                  Cloud Integration & Scalability
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2 text-[clamp(0.875rem,2.5vw,1rem)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 sm:h-16 sm:w-16">
                  <MdOutlinePhoneInTalk className="h-8 w-8 text-cyan-500" />
                </div>
                <div>
                  <p className="text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-[#1C1C25]">
                    +92 312 0400975
                  </p>
                  <p className="text-[clamp(0.75rem,2vw,1rem)] font-light text-cyan-600">
                    Have any question?
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-600"
            >
              View Our Services
              <FaArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="w-full rounded-[36px] bg-cyan-900 bg-[url('/images/aboutus-page-bg.webp')] bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr_0.7fr] lg:items-center lg:gap-12">
              <div className="space-y-4 text-center text-white lg:text-left">
                <h3 className="text-lg font-bold md:text-base xl:text-lg">
                  Schedule an Appointment
                </h3>

                <div className="flex justify-center lg:justify-start">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    {avatarList.map((testimonial, index) => {
                      const raw = testimonial.raw as Record<string, unknown>;
                      const image =
                        getField(raw, "CImage") || testimonial.image || "/images/Logo_profile.webp";
                      const name = getField(raw, "CName") || testimonial.title;

                      return (
                        <div
                          key={`${testimonial.id}-${index}`}
                          className="h-8 w-8 shrink-0 overflow-hidden rounded-full border-2 border-gray-800 md:h-10 md:w-10 xl:h-12 xl:w-12"
                        >
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-1 sm:gap-2 lg:justify-start">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="relative inline-block h-4 w-4 sm:h-5 sm:w-5">
                      <FaStar className="absolute left-0 top-0 h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                      <FaStar
                        className="absolute left-0 top-0 h-4 w-4 text-yellow-400 sm:h-5 sm:w-5"
                        style={
                          averageRating >= index + 1
                            ? undefined
                            : averageRating >= index + 0.5
                              ? { clipPath: "inset(0 50% 0 0)", WebkitClipPath: "inset(0 50% 0 0)" }
                              : { clipPath: "inset(0 100% 0 0)", WebkitClipPath: "inset(0 100% 0 0)" }
                        }
                      />
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs font-semibold text-white sm:text-sm xl:text-base lg:text-left">
                  {testimonialList.length > 0 ? `${testimonialList.length}+ Client Reviews` : "0 Client Reviews"}
                </p>
              </div>

              <div className="flex w-full flex-col items-center space-y-4 text-center lg:items-start lg:text-left">
                <h2 className="text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl">
                  Schedule Your Appointment Today
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-gray-300 sm:text-base lg:text-base">
                  We are committed to fostering long-term partnerships with our clients, supporting their success at every stage of their business journey.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-600"
                >
                  Schedule Now
                </Link>
              </div>

              <div className="flex w-full flex-col items-center space-y-2 text-white lg:items-start">
                <div className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  {testimonialList.length > 0 ? `${testimonialList.length}+` : "0+"}
                </div>
                <div className="text-center text-xs font-semibold tracking-wider sm:text-sm lg:text-left">
                  HAPPY CLIENTS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl text-center space-y-6 sm:space-y-8">
          <div className="flex justify-center">
            <SectionHeading>ABOUT OUR COMPANY</SectionHeading>
          </div>

          <h2 className="mx-auto mb-12 max-w-5xl text-2xl font-bold leading-tight text-[#1C1C25] sm:mb-16 sm:text-3xl lg:text-4xl">
            Explore Our Cutting-Edge Services
            <br />
            See Success Stories in Action
            <br />
            Through Engaging Video Demonstrations
          </h2>

          <AboutVideoSection
            title="About Bulk Bytes"
            thumbnailSrc="/images/thumbnail.webp"
            videoSrc="/videos/demo.mp4"
          />
        </div>
      </section>

      <section className="w-full bg-[url('/images/aboutus-page-bg.webp')] bg-cover bg-center bg-no-repeat">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-4 py-8 text-white sm:px-8 sm:py-12 ${
                index < 3 ? "border-b border-gray-300 sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
                <Icon className="h-10 w-10 text-white sm:h-12 sm:w-12" />
              </div>
              <div>
                <div className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                  {value}
                </div>
                <div className="text-sm text-white">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-16 transition-colors sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <SectionHeading>WHY CHOOSE US</SectionHeading>
              </div>

              <h2 className="text-2xl font-bold leading-tight text-[#1C1C25] sm:text-3xl md:text-4xl lg:text-5xl">
                Why People Love Working
                <br />
                With Us
              </h2>

              <p className="text-sm leading-relaxed text-[#797E88] sm:text-base md:text-lg">
                Our clients are at the core of everything we do.
                <br />
                We listen, understand, and deliver tailored solutions that exceed expectations.
              </p>

              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-600"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <FeatureBlock
                icon={IoPeopleOutline}
                title="Realtime Conversation"
                description="Engage instantly with your customers through seamless, interactive communication channels."
              />
              <FeatureBlock
                icon={TbMessageQuestion}
                title="Personalized Chat Visual"
                description="Deliver customized, visually rich chat experiences that resonate with each user."
              />
              <FeatureBlock
                icon={TfiHeadphoneAlt}
                title="Higher Response Rate"
                description="Boost engagement and satisfaction with faster, more effective customer interactions."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[url('/images/aboutus-page-bg.webp')] bg-cover bg-center bg-no-repeat py-12">
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-scroll whitespace-nowrap">
              {[...platformIcons, ...platformIcons].map((platform, index) => (
                <div key={`${platform.name}-${index}`} className="flex items-center gap-3 px-8">
                  <img
                    src={platform.src}
                    alt={platform.name}
                    className="h-12 w-12 object-contain"
                  />
                  <span className="text-lg font-bold text-white">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center p-2">
            <SectionHeading>OUR TEAM</SectionHeading>
          </div>

          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-6xl text-2xl font-bold text-[#1C1C25] md:text-3xl 2xl:text-4xl">
              Modernize Your IT. Maximize Business Potential.
            </h2>
          </div>

          <div className="grid w-full justify-center gap-6 2xl:gap-12" style={{ gridTemplateColumns: `repeat(${Math.min(previewTeam.length, 4)}, minmax(300px, 1fr))` }}>
            {previewTeam.map((member) => (
              <div key={member.id} className="w-full max-w-md">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
