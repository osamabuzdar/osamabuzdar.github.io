"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { BsShieldCheck } from "react-icons/bs";
import { m } from "motion/react";
import type { SiteEntity } from "@/types/site";

type ServicesClientProps = {
  services: SiteEntity[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const }
  }
};

const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: index * 0.14 }
  })
};

const toText = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
};

const resolveSortValue = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return Number.POSITIVE_INFINITY;
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
      <m.div
        className="overflow-hidden rounded-3xl border border-gray-50 shadow-2xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="relative flex h-[30vh] items-center overflow-hidden xs:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh]">
          <m.img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent" />

          <m.div
            className="relative z-10 flex max-w-[95%] flex-col gap-3 px-6 xs:gap-4 xs:px-8 sm:gap-5 sm:px-12 md:gap-6 md:px-20 lg:gap-8 lg:px-40"
            variants={fadeUp}
          >
            <h2 className="max-w-5xl text-xl font-bold leading-tight text-white drop-shadow-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>

            <div className="w-fit rounded-3xl bg-white/30 px-2 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm xs:px-3 xs:text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:text-base lg:text-base">
              {breadcrumb.split(" / ").map((part, index, array) => {
                if (part.trim().toLowerCase() === "home") {
                  return (
                    <span key={index}>
                      <Link href="/" className="cursor-pointer transition-colors hover:text-cyan-300">
                        {part}
                      </Link>
                      {index < array.length - 1 ? " / " : ""}
                    </span>
                  );
                }

                return (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 ? " / " : ""}
                  </span>
                );
              })}
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}

function ServiceCard({ service }: { service: SiteEntity }) {
  const title = toText(service.raw?.Service, service.title);
  const description = toText(service.raw?.Description, service.description);
  const logoImage = toText(service.raw?.logoImage, "/images/logo-placeholder.webp");
  const mainImage = toText(
    service.raw?.mainImage,
    toText(service.raw?.PImage, service.image ?? "/images/Service-image1.webp")
  );
  const detailHref = `/services-detail/${service.id}`;

  return (
    <div className="group relative h-full">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900 transition-all duration-300 hover:border-cyan-500/60">
        <div className="absolute left-6 top-6 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-cyan-600 shadow-lg 2xl:h-[5.5rem] 2xl:w-[5.5rem]">
          <img src={logoImage} alt={title} className="h-12 w-12 object-contain" />
        </div>

        <Link href={detailHref} className="relative h-[21rem] w-full overflow-hidden px-4 pt-6 lg:h-[18.75rem] 2xl:h-[21.5rem]">
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full rounded-bl-[2.5rem] rounded-br-[10rem] rounded-tl-[10rem] rounded-tr-[2.5rem] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex flex-1 flex-col justify-between px-8 pt-2">
          <div className="flex-1">
            <h3 className="mb-3 mt-2 text-2xl font-bold text-white">{title}</h3>
            <p
              className="text-lg leading-relaxed text-gray-300"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden"
              }}
            >
              {description}
            </p>
          </div>

          <ul className="mt-6 space-y-3 pb-4">
            {[
              "Advanced Security Solutions",
              "24/7 Technical Support",
              "Scalable Infrastructure"
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <BsShieldCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                <span className="text-sm leading-6 text-gray-300 sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-end pb-6">
            <Link
              href={detailHref}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-600 bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-cyan-600"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesClient({ services }: ServicesClientProps) {
  const sortedServices = [...services].sort((a, b) => {
    const seqA = resolveSortValue(a.raw?.Sequence);
    const seqB = resolveSortValue(b.raw?.Sequence);

    if (seqA !== seqB) return seqA - seqB;

    const dateA = toText(a.raw?.createdAt, "").trim();
    const dateB = toText(b.raw?.createdAt, "").trim();
    const timeA = dateA ? new Date(dateA).getTime() : 0;
    const timeB = dateB ? new Date(dateB).getTime() : 0;
    return timeB - timeA;
  });

  return (
    <div className="overflow-x-hidden">
      <HeroSection title="Our IT Services" breadcrumb="Home / Our Services" />

      <section className="mx-auto w-[min(1120px,calc(100%-36px))] px-0 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900 transition-colors md:text-3xl lg:text-4xl">
              Comprehensive IT Solutions
            </h2>
            <p className="text-base leading-relaxed text-gray-600 transition-colors md:text-lg lg:text-xl">
              We offer a wide range of cutting-edge IT services designed to transform your business.
              From web development to cloud solutions, our expert team delivers innovative technology
              services that drive growth and efficiency.
            </p>
          </m.div>
        </div>
      </section>

      <section
        className="relative my-8 bg-cover bg-center bg-no-repeat px-4 py-16 sm:px-8 sm:py-20 md:px-12 2xl:px-16"
        style={{ backgroundImage: "url('/images/service-bg1.webp')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cyan-950/60" />
        <div className="relative z-10 mx-auto max-w-[1600px]">
          <div className="p-2 text-center">
            <SectionHeading>SERVICE WE OFFER</SectionHeading>
          </div>

          <h1 className="mb-12 text-center text-3xl font-bold text-white sm:mb-16 sm:text-4xl md:text-4xl">
            Our Demanding Services
          </h1>

          {sortedServices.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:gap-10 lg:grid-cols-3">
              {sortedServices.map((service, index) => (
                <m.div
                  key={service.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardFade}
                >
                  <ServiceCard service={service} />
                </m.div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-white/80">No services found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
