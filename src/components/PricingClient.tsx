"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CiBadgeDollar } from "react-icons/ci";
import { IoRocketOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { Mail } from "lucide-react";
import { MdArrowOutward } from "react-icons/md";
import { Monitor, Rocket, Shield, User } from "lucide-react";
import type { PricingPlan, SiteEntity } from "@/types/site";
import { PricingCard as PricingPlanCard } from "@/components/PricingCard";

type PricingClientProps = {
  plans: PricingPlan[];
  projects: SiteEntity[];
  services: SiteEntity[];
  team: SiteEntity[];
  testimonials: SiteEntity[];
};

type StatCard = {
  id: number;
  icon: typeof Rocket;
  count: string;
  label: string;
};

const planIcons = [IoRocketOutline, CiBadgeDollar, LuCrown];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
} as any;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
} as any;

function getField(raw: Record<string, unknown> | undefined, key: string) {
  const value = raw?.[key];
  return typeof value === "string" ? value : "";
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function normalizePrice(price: string) {
  if (!price) return "Custom";
  return price.startsWith("$") ? price : `$${price}`;
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="inline-block rounded-full border px-4 py-1 font-light text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl border-gray-200 bg-white text-cyan-700">
      <span className="inline-block w-1 h-1 rounded-full mx-1 mb-0.5 bg-cyan-800" />
      <span className="inline-block w-2 h-2 rounded-full ml-1 mr-2 bg-cyan-800" />
      {children}
      <span className="inline-block w-2 h-2 rounded-full ml-2 mr-1 bg-cyan-800" />
      <span className="inline-block w-1 h-1 rounded-full mx-1 mb-0.5 bg-cyan-800" />
    </h2>
  );
}

function PricingCard({
  plan,
  iconIndex
}: {
  plan: PricingPlan;
  iconIndex: number;
}) {
  const Icon = planIcons[iconIndex] || planIcons[0];
  const raw = plan.raw as Record<string, unknown>;
  const title = getField(raw, "planName") || plan.title;
  const price = normalizePrice(getField(raw, "price") || plan.price);
  const description = getField(raw, "billingNote") || getField(raw, "description") || plan.billingNote;
  const badge = getField(raw, "planBadge") || plan.badge || "";
  const platformLimit = getField(raw, "platformLimit") || plan.platformLimit || "";
  const billingCycle = getField(raw, "billingCycle") || plan.billingCycle || "month";
  const rawFeatures = asArray(raw.features);
  const features = rawFeatures.length > 0 ? rawFeatures.map((item) => String(item)) : plan.features;
  const highlighted = plan.highlighted;

  return (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full ${
        highlighted
          ? "bg-linear-to-br from-slate-900 via-cyan-900 to-slate-900 text-white shadow-2xl"
          : "bg-white text-gray-900 shadow-lg"
      }`}
    >
      <div className="px-4 sm:px-6">
        {badge ? (
          <span className="inline-block px-4 sm:px-6 ml-10 sm:ml-20 py-1 rounded-bl-2xl rounded-br-2xl text-xs sm:text-sm font-bold bg-cyan-500 text-white">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="px-4 sm:px-6 pt-6 sm:pt-8">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border mt-4 mb-4 sm:mb-6 mx-auto transition-colors ${
            highlighted ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className={`text-2xl sm:text-3xl ${highlighted ? "text-cyan-600" : "text-cyan-500"}`}>
            <Icon />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h3>
      </div>

      <div className="px-6 sm:px-10 text-center mb-2">
        <span className="text-3xl sm:text-4xl font-bold">{price}</span>
        <span
          className={`text-base sm:text-lg transition-colors ${
            highlighted ? "text-white" : "text-gray-600"
          }`}
        >
          /{billingCycle.replace("-", " ")}
        </span>
      </div>

      <div className="px-4 sm:px-8 text-center mb-6">
        <p
          className={`text-xs sm:text-sm transition-colors ${
            highlighted ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>

      {platformLimit ? (
        <div className="px-4 sm:px-8 text-center mb-6">
          <span
            className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-light transition-colors border ${
              !highlighted ? "shadow-lg [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.3)]" : ""
            } ${
              highlighted ? "text-black bg-white border-gray-100" : "text-black bg-white border-gray-100"
            }`}
          >
            {platformLimit}
          </span>
        </div>
      ) : null}

      <div className="px-4 sm:px-8 grow mb-6 sm:mb-8">
        <ul className="space-y-2 sm:space-y-3">
          {features.slice(0, 5).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <span
                className={`text-base sm:text-lg leading-none transition-colors ${
                  highlighted ? "text-white" : "text-gray-400"
                }`}
              >
                •
              </span>
              <span
                className={`transition-colors ${
                  highlighted ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        <Link href="/contact">
          <span
            className={`block rounded-full border border-cyan-600 px-6 py-3 text-center text-sm font-medium transition-all duration-300 sm:text-base ${
              highlighted
                ? "bg-white text-cyan-600 hover:bg-cyan-600 hover:text-white"
                : "bg-cyan-600 text-white hover:bg-white hover:text-cyan-600"
            }`}
          >
            Get Started
          </span>
        </Link>
      </div>
    </div>
  );
}

function PricingHero() {
  return (
    <section className="mx-2 my-6 border-4 border-white rounded-3xl sm:mx-3 sm:my-8 md:mx-4 md:my-10 lg:mx-5">
      <motion.div
        className="border border-gray-50 shadow-2xl rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative w-full h-[30vh] xs:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh] flex items-center overflow-hidden">
          <motion.img
            src="/images/hero-section-image-others.webp"
            alt="Pricing hero"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent z-10" />
          <div className="relative z-10 flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-6 xs:px-8 sm:px-12 md:px-20 lg:px-40 max-w-[95%]">
            <h2 className="font-bold drop-shadow-xl leading-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
              Our Pricing
            </h2>
            <div className="text-white text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-base font-semibold bg-white/30 px-2 xs:px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-3xl backdrop-blur-sm w-fit drop-shadow-lg">
              <Link href="/" className="hover:text-cyan-300 transition-colors cursor-pointer">
                Home
              </Link>
              {" / "}
              <span>Pricing</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MovingPlatforms() {
  const platforms = [
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
    <div className="relative w-full overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-10 animate-scroll items-center justify-center w-max">
        {platforms.concat(platforms).map((platform, i) => (
          <div key={i} className="shrink-0 flex items-center justify-center min-w-max">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 2xl:gap-6 px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-10 py-2 sm:py-3 md:py-4 lg:py-5 2xl:py-6 border rounded-full border-gray-200 bg-white">
              <img
                src={platform.src}
                alt={platform.name}
                className="w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 object-contain"
              />
              <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl whitespace-nowrap text-gray-800">
                {platform.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function PricingClient({ plans, projects, services, team, testimonials }: PricingClientProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const visiblePlans = plans.slice(0, 3);

  const now = new Date();
  const projectRecords = projects.map((project) => project.raw as Record<string, unknown>);
  const completedProjects = projectRecords.filter((project) => {
    const endDate = project.endDate ? new Date(String(project.endDate)) : null;
    return Boolean(endDate && !Number.isNaN(endDate.getTime()) && endDate < now);
  }).length;
  const activeProjects = projectRecords.filter((project) => {
    const endDate = project.endDate ? new Date(String(project.endDate)) : null;
    return !endDate || Number.isNaN(endDate.getTime()) || endDate >= now;
  }).length;
  const satisfiedClients = testimonials.length;
  const trustedPartners = new Set(
    projectRecords
      .map((project) => String(project.clientName ?? "").trim())
      .filter(Boolean)
  ).size;

  const stats: StatCard[] = [
    { id: 1, icon: Rocket, count: `${completedProjects > 0 ? completedProjects : projects.length}+`, label: "COMPLETED PROJECTS" },
    { id: 2, icon: User, count: `${satisfiedClients > 0 ? satisfiedClients : team.length}+`, label: "SATISFIED CLIENTS" },
    { id: 3, icon: Monitor, count: `${activeProjects > 0 ? activeProjects : services.length}+`, label: "ACTIVE PROJECTS" },
    { id: 4, icon: Shield, count: `${trustedPartners > 0 ? trustedPartners : plans.length}+`, label: "TRUSTED PARTNERS" }
  ];

  return (
    <div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
        <PricingHero />
      </motion.div>

      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            className="text-center mb-2"
          >
            <SectionHeading>OUR PRICING PLANS</SectionHeading>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center text-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            Affordable Pricing Plans
          </motion.h2>

          <div className="mt-12 md:mt-20">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 2xl:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {visiblePlans.map((plan, index) => (
                <motion.div key={`${plan.id}-${index}`} custom={index} variants={sectionVariants} style={{ opacity: 1 }}>
                  <PricingPlanCard plan={plan} iconIndex={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-10 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl p-12 sm:p-16 lg:p-20 text-center overflow-hidden"
            style={{
              backgroundImage: "url('/images/aboutus-page-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.6)_30%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0)_100%)]" />
            <div className="absolute inset-y-0 left-0 w-1/4 z-0 pointer-events-none bg-linear-to-r from-cyan-500/25 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-1/4 z-0 pointer-events-none bg-linear-to-l from-cyan-500/25 to-transparent" />

            <div className="relative z-10">
              <motion.div variants={sectionVariants}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
                  Ready to Elevate Your Business?
                </h2>
              </motion.div>

              <motion.div variants={sectionVariants}>
                <p className="text-gray-200 text-lg mb-10 max-w-3xl mx-auto">
                  Book a personalized strategy session with our expert team to explore your goals, address challenges, and discover the best ways to grow your brand.
                </p>
              </motion.div>

              <motion.div
                variants={sectionVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
              >
                <div className="grid w-full grid-cols-[56px_minmax(0,1fr)] overflow-hidden rounded-xl border border-white bg-white/95 shadow-lg sm:flex-1">
                  <div className="flex items-center justify-center">
                    <Mail className="h-5 w-5 text-cyan-600" />
                  </div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="min-w-0 w-full bg-transparent py-4 pr-4 text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none"
                  />
                </div>

                <Link
                  href="/contact"
                  className="relative inline-block rounded-4xl px-6 py-3 text-base sm:text-lg font-medium overflow-hidden transition-all duration-300 group border border-cyan-600 cursor-pointer bg-cyan-600 text-white hover:bg-white hover:text-cyan-600"
                >
                  <span className="absolute left-1/2 top-[120%] w-[160%] h-[160%] rounded-full transition-all duration-500 ease-out group-hover:top-[-20%] group-hover:scale-100 -translate-x-1/2 bg-cyan-500/30 group-hover:bg-cyan-100/40" />
                  <span className="relative z-10 flex items-center gap-2 font-bold">
                    Request a demo
                    <MdArrowOutward className="w-5 h-5" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-white transition-colors duration-300">
        <motion.div
          className="max-w-7xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <SectionHeading>OUR COMPANIES GROWTH</SectionHeading>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto text-gray-900">
            Excellence That Delivers Unmatched Results.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredCard === stat.id;

            return (
              <motion.div
                key={stat.id}
                onMouseEnter={() => setHoveredCard(stat.id)}
                onMouseLeave={() => setHoveredCard(null)}
                variants={sectionVariants}
                className={`rounded-xl transition-all duration-300 overflow-hidden border-2 bg-white ${
                  isHovered ? "border-cyan-600 shadow-lg" : "border-transparent"
                }`}
              >
                <div
                  className={`w-30 h-30 -top-1 -left-1 rounded-br-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isHovered ? "bg-cyan-600 border-none" : "bg-transparent border-b border-r border-gray-300"
                  }`}
                >
                  <IconComponent
                    className={`sm:w-10 sm:h-10 md:w-12 md:h-12 lg:h-14 lg:w-14 transition-all duration-300 ${
                      isHovered ? "text-white" : "text-cyan-600"
                    }`}
                    strokeWidth={2}
                  />
                </div>
                <div className="my-12 mx-12">
                  <h3 className="text-4xl font-bold text-gray-900">{stat.count}</h3>
                  <p className="font-semibold text-sm text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
