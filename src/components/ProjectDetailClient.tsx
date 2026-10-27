"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { BsFillPersonFill } from "react-icons/bs";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { FaCalendarDays } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import type { SiteEntity } from "@/types/site";
import { pickString } from "@/lib/utils";

type ProjectDetailClientProps = {
  project: SiteEntity;
  relatedProjects: SiteEntity[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
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

function toProjectFields(project: SiteEntity) {
  const raw = project.raw;
  return {
    image: project.image || "/images/pricing-bg.webp",
    title: project.title,
    description: project.description,
    category: project.category || pickString(raw, ["PType", "projectCategory"], "Other"),
    client: pickString(raw, ["clientName"], "Client Name"),
    address: pickString(raw, ["address"], "Address"),
    date: pickString(raw, ["startDate"])
      ? new Date(String(raw.startDate)).toLocaleDateString()
      : pickString(raw, ["createdAt"])
        ? new Date(String(raw.createdAt)).toLocaleDateString()
        : "N/A",
    challenge: pickString(raw, ["challengeDescription"], "Challenge description"),
    clientReview:
      raw.clientReview && typeof raw.clientReview === "object"
        ? (raw.clientReview as Record<string, unknown>)
        : undefined,
    relatedImages: [project.image || "/images/pricing-bg.webp"]
  };
}

export function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const fields = toProjectFields(project);
  const review = fields.clientReview;
  const reviewDescription = review ? pickString(review, ["reviewDescription"]) : "";
  const reviewName = review ? pickString(review, ["clientName"], "Client") : "";
  const reviewRole = review ? pickString(review, ["designation"], "Client") : "";
  const reviewStars = review ? Number(pickString(review, ["reviewStars"], "5")) : 0;
  const reviewImage = review ? pickString(review, ["clientImage"], "/images/Logo_profile.webp") : "";

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors">
      <HeroSection title="Project Details" breadcrumb="Home / Project Details" />

      <div className="mx-auto w-full px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14 grid grid-cols-1 gap-6 font-inter md:gap-8 lg:mb-16 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <div className="h-[260px] overflow-hidden rounded-3xl shadow-lg sm:h-[380px] md:h-[460px] lg:h-[500px]">
              <img src={fields.image} alt={fields.title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="flex h-full flex-col rounded-3xl border border-gray-300 bg-white p-6 shadow-lg transition-colors sm:p-8">
              <h3 className="mb-6 text-xl font-bold text-gray-900 sm:mb-8 sm:text-2xl">
                Project Information
              </h3>

              <div className="flex flex-1 flex-col justify-start space-y-4 sm:space-y-6">
                {[
                  { label: "Clients", value: fields.client, icon: <BsFillPersonFill /> },
                  { label: "Category", value: fields.category, icon: <HiSquare3Stack3D /> },
                  { label: "Date", value: fields.date, icon: <FaCalendarDays /> },
                  { label: "Address", value: fields.address, icon: <IoLocationSharp /> }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-cyan-600 sm:h-14 sm:w-14">
                      <span className="text-xl sm:text-2xl md:text-3xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm text-gray-500 sm:text-base">{item.label}:</p>
                      <p className="text-base font-bold text-gray-900 sm:text-lg md:text-xl">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 sm:mb-16"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">{fields.title}</h2>
          <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg">{fields.description}</p>

          <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">The challenge of project</h3>
          <p className="mb-10 text-base leading-relaxed text-gray-600 sm:text-lg">{fields.challenge}</p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {fields.relatedImages.map((img, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="h-52 overflow-hidden rounded-2xl shadow-md transition hover:shadow-xl sm:h-60 md:h-64"
              >
                <img
                  src={img}
                  alt={fields.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {reviewDescription ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="mb-8">
              <SectionHeading>CLIENT TESTIMONIAL</SectionHeading>
              <h2 className="my-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                We appreciate our clients feedback
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-10">
              <div className="flex flex-col items-start gap-8 md:flex-row">
                <div className="w-full md:w-1/3 lg:w-1/4">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={reviewImage || "/images/Logo_profile.webp"}
                      alt={reviewName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="w-full md:w-2/3 lg:w-3/4">
                  <p className="mb-4 text-base italic leading-relaxed text-black sm:text-lg md:text-xl lg:text-2xl">
                    &quot;{reviewDescription}&quot;
                  </p>

                  <hr className="my-8 border-gray-300" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-full sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18">
                        <img
                          src={reviewImage || "/images/Logo_profile.webp"}
                          alt={reviewName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
                          {reviewName}
                        </h4>
                        <p className="text-xs text-gray-500 sm:text-sm lg:text-base">{reviewRole}</p>
                        {reviewStars > 0 ? (
                          <div className="mt-1 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < reviewStars ? "text-yellow-400" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <BiSolidQuoteAltRight className="h-14 w-14 text-cyan-500 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {relatedProjects.length > 0 ? (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row sm:mb-12">
              <div>
                <SectionHeading>NEW PROJECTS</SectionHeading>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Most Related Projects
                </h2>
              </div>

              <Link
                href="/portfolio"
                className="relative inline-block rounded-4xl border border-cyan-600 bg-white px-6 py-2.5 text-sm font-semibold text-cyan-600 transition-all duration-300 hover:bg-cyan-600 hover:text-white sm:px-8 sm:py-3 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View More Projects <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 sm:gap-8">
              {relatedProjects.map((relProject) => (
                <motion.div
                  key={relProject.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group relative h-[260px] overflow-hidden rounded-3xl shadow-lg sm:h-80 md:h-[360px] lg:h-[380px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${relProject.image || "/images/pricing-bg.webp"})` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="relative flex h-full flex-col justify-end p-6 sm:p-8 md:p-10">
                    <h3 className="mb-3 text-lg font-bold leading-tight text-white sm:mb-4 sm:text-xl md:text-2xl">
                      {relProject.title}
                    </h3>

                    <div className="translate-y-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Link
                        href={`/portfolio-details/${relProject.id}`}
                        className="relative inline-flex items-center gap-2 overflow-hidden rounded-4xl border border-cyan-600 bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-cyan-600 sm:px-8 sm:py-3 sm:text-base"
                      >
                        <span className="absolute left-1/2 top-full h-[180%] w-[140%] -translate-x-1/2 rounded-full bg-cyan-500/40 transition-all duration-500 ease-[cubic-bezier(0.55,0,0.1,1)] hover:top-[-35%] hover:scale-[0.8]" />
                        <span className="relative z-10 flex items-center gap-2">
                          View Project <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
