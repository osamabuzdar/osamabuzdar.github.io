"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import type { FaqItem } from "@/types/site";

type FaqClientProps = {
  faqs: FaqItem[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } }
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
              {breadcrumb.split(" / ").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 ? " / " : ""}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function FaqClient({ faqs }: FaqClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        faqs
          .map((faq) => faq.category?.trim())
          .filter((value): value is string => Boolean(value))
      )
    );
    return ["All", ...unique];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim();
    return faqs.filter((faq) => {
      const category = faq.category?.trim() || "";
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
    });
  }, [activeCategory, faqs, search]);

  const handleCategory = (category: string) => {
    setActiveCategory(category);
    setOpenItem(null);
  };

  return (
    <div className="relative w-full bg-white text-gray-900 transition-colors duration-300">
      <HeroSection title="FAQ" breadcrumb="Home / FAQ" />

      <div className="mx-auto flex max-w-6xl justify-center px-4 py-4">
        <div className="flex w-full items-center gap-4 rounded-xl border border-gray-300 bg-white p-4 pl-5 shadow-sm md:w-4/5 lg:w-2/3">
          <FaSearch className="shrink-0 text-cyan-500" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setOpenItem(null);
            }}
            className="w-full outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 lg:flex-row">
        <div className="block lg:hidden">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden h-fit space-y-4 lg:block lg:w-1/4">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Categories</h3>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategory(category)}
              className={`flex w-full items-center rounded-lg px-4 py-2 text-left transition ${
                activeCategory === category
                  ? "bg-cyan-600 font-semibold text-white"
                  : "text-gray-700 hover:bg-cyan-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className="flex max-h-[75vh] flex-col gap-4 overflow-y-auto pr-2 lg:w-3/4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence initial={false}>
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-center text-gray-600">
                <p>No FAQs found. {search ? "Try a different search term." : ""}</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const uniqueKey = `${faq.id}-${index}`;
                const isOpen = openItem === uniqueKey;

                return (
                  <motion.div
                    key={uniqueKey}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={`rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "border-cyan-500 bg-[#e0f7ff]"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
                      onClick={() => setOpenItem(isOpen ? null : uniqueKey)}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <span className="w-8 text-lg font-semibold text-gray-700 md:w-10 md:text-2xl">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-semibold leading-6 text-gray-900 md:text-lg">
                          {faq.question}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-gray-700 md:text-3xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key={`${uniqueKey}-answer`}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden border-t border-gray-200 px-5 pb-5 text-sm leading-relaxed text-gray-700 md:px-6 md:text-base"
                        >
                          {faq.answer}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-cyan-50 p-6 md:p-8 lg:flex-row"
          >
            <div className="text-center lg:text-left">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
                Didn't find what you're looking for?
              </h3>
              <p className="text-sm text-gray-600 md:text-base">Contact our support team for assistance.</p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-600 bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-cyan-600"
            >
              Contact Support
              <FaArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

