"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import type { SiteEntity } from "@/types/site";

type PortfolioClientProps = {
  projects: SiteEntity[];
};

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
} as any;

const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
} as any;

function PortfolioCard({ project }: { project: SiteEntity }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-[300px] overflow-hidden rounded-3xl shadow-xl sm:h-[360px] md:h-[440px] lg:h-[500px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${project.image || "/images/Logo_profile.webp"})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/50 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-5 sm:p-7 md:p-9">
        <h3 className="mb-4 text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl lg:text-[28px]">
          {project.title}
        </h3>

        <div className="translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/portfolio-details/${project.id}`}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-4xl border border-cyan-600 bg-cyan-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-cyan-600"
          >
            <span className="absolute left-1/2 top-full h-[180%] w-[140%] -translate-x-1/2 rounded-full bg-cyan-500/40 transition-all duration-500 ease-[cubic-bezier(0.55,0,0.1,1)] hover:top-[-35%] hover:scale-[0.8]" />
            <span className="relative z-10 flex items-center gap-2">
              View Project <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioHero() {
  return (
    <section className="mx-2 my-6 overflow-hidden rounded-3xl border-4 border-white sm:mx-3 sm:my-8 md:mx-4 md:my-10 lg:mx-5">
      <motion.div
        className="overflow-hidden rounded-3xl border border-gray-50 shadow-2xl"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative flex h-[30vh] items-center overflow-hidden xs:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh]">
          <motion.img
            src="/images/hero-section-image-others.webp"
            alt="Portfolio background"
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent" />

          <motion.div
            className="relative z-10 flex max-w-[95%] flex-col gap-3 px-6 xs:gap-4 xs:px-8 sm:gap-5 sm:px-12 md:gap-6 md:px-20 lg:gap-8 lg:px-40"
            variants={heroVariants}
          >
            <h2 className="font-bold leading-tight text-xl text-white drop-shadow-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Our Recent Projects
            </h2>

            <div className="w-fit rounded-3xl bg-white/30 px-2 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm drop-shadow-lg xs:px-3 sm:px-4 sm:py-2 sm:text-sm md:text-base lg:text-base">
              <Link href="/" className="cursor-pointer transition-colors hover:text-cyan-300">
                Home
              </Link>
              {" / "}
              <span>Our Project</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const totalPages = Math.ceil(projects.length / projectsPerPage) || 1;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen">
      <PortfolioHero />

      <section className="py-12 px-4 md:px-8 xl:px-12 transition-colors bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Our Portfolio of Excellence
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-600">
              Explore our diverse portfolio of successful projects that showcase our expertise and commitment to excellence.
              Each project represents our dedication to delivering innovative solutions and exceeding client expectations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 transition-colors bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15 }}
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              type="button"
              onClick={() => handlePageChange(index + 1)}
              className={`h-10 w-10 rounded-full font-semibold text-sm transition-all duration-300 sm:h-12 sm:w-12 sm:text-base md:h-14 md:w-14 md:text-lg ${
                currentPage === index + 1
                  ? "bg-cyan-500 text-white shadow-lg scale-110"
                  : "bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-500"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12 md:h-14 md:w-14 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-white text-gray-700 hover:bg-cyan-500 hover:text-white"
            }`}
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
