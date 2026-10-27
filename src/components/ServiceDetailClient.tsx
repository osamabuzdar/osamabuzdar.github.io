"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HiMiniCheckBadge } from "react-icons/hi2";
import type { SiteEntity } from "@/types/site";

type ServiceDetailClientProps = {
  service: SiteEntity;
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 }
};

const sectionFade = {
  hidden: { opacity: 0, y: 50 },
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

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const title = toText(service.raw?.Service, service.title);
  const description = toText(
    service.raw?.Description,
    service.description ||
      "Unlock the full potential of your IT infrastructure with our comprehensive service solutions designed to drive innovation and business growth."
  );
  const mainImage = toText(service.raw?.mainImage, service.image ?? "/images/service-bg1.webp");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service.id]);

  return (
    <div className="w-full bg-white text-gray-900 transition-colors duration-300">
      <HeroSection title="Service Details" breadcrumb="Home / Service Details" />

      <motion.section
        className="bg-white py-12 transition-colors sm:py-14 md:py-16 lg:py-24"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-2 px-2 sm:mx-4 sm:px-4">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-20 sm:gap-12">
            <motion.div className="lg:w-1/2" variants={sectionFade} transition={{ duration: 0.6, delay: 0.1 }}>
              <SectionHeading>SERVICE DETAILS</SectionHeading>

              <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                {title}
              </h2>

              <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
                {description}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-600 bg-cyan-600 px-6 py-3 text-base font-bold text-white transition hover:bg-white hover:text-cyan-600"
              >
                Talk To An Expert
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div className="relative lg:w-1/2" variants={sectionFade} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl sm:shadow-2xl">
                <img src={mainImage} alt={title} className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative flex min-h-[80vh] w-full items-center"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 h-full w-full">
          <img src="/images/service-bg.webp" alt="Key Services Background" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 mx-auto w-full px-6">
          <motion.div
            className="max-w-3xl rounded-2xl bg-white/95 p-10 shadow-xl backdrop-blur-sm"
            variants={sectionFade}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className="font-bold text-gray-900"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "30px",
                lineHeight: "36px"
              }}
            >
              Key Services We Provide
            </h3>

            <div className="my-6 h-px w-full bg-gray-300" />

            <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {[
                "Advanced Security Solutions",
                "24/7 Technical Support",
                "Scalable Infrastructure",
                "Cloud Migration Services"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-start gap-3"
                  variants={sectionFade}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HiMiniCheckBadge className="mt-1 h-6 w-6 shrink-0 text-cyan-600" />
                  <span
                    className="text-gray-900"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      lineHeight: "36px"
                    }}
                  >
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="bg-white py-12 transition-colors sm:py-14 md:py-16 lg:py-24"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-3 px-3 sm:mx-4 sm:px-4">
          <motion.div className="mb-10 text-center sm:mb-14 md:mb-16" variants={sectionFade} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeading>OUR WORK PROCESS</SectionHeading>

            <h2 className="mx-auto max-w-4xl text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Modernize Your IT, Maximize Your Business Potential
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
            {[
              {
                number: "01",
                title: "Discovery & Assessment",
                description:
                  "We evaluate your existing IT infrastructure and pinpoint opportunities for improvement and efficiency."
              },
              {
                number: "02",
                title: "Strategy & Planning",
                description:
                  "We craft a tailored roadmap aligned with your business goals to ensure measurable results."
              },
              {
                number: "03",
                title: "Implementation",
                description:
                  "We execute the plan seamlessly, minimizing disruption to your daily operations."
              },
              {
                number: "04",
                title: "Support & Optimization",
                description:
                  "We offer continuous support and proactively optimize your IT systems for peak performance."
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl"
                variants={sectionFade}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,#06b6d4_0%,#67e8f9_15%,white_50%)]" />

                <div className="relative flex min-h-[200px] h-full flex-col justify-center p-6 sm:min-h-[230px] sm:p-8 md:min-h-[250px] md:p-10">
                  <div className="pointer-events-none absolute -bottom-4 -left-6 select-none text-[6rem] font-bold leading-none text-white sm:-bottom-6 sm:-left-8 sm:text-[8rem] md:-left-10 md:text-[10rem] lg:text-[12rem]">
                    {step.number}
                  </div>

                  <div className="relative z-10 pl-10 sm:pl-20 md:pl-32 lg:pl-40">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
