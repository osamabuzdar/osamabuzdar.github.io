"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextReveal } from "@/components/motion/TextReveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 }
  }
};

export function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/hero-section-image-others.webp",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel
}: PageHeroProps) {
  return (
    <section className="mx-2 my-6 overflow-hidden rounded-3xl border-4 border-white sm:mx-3 sm:my-8 md:mx-4 md:my-10 lg:mx-5">
      <motion.div
        className="overflow-hidden rounded-3xl border border-gray-50 shadow-2xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="relative flex h-[30vh] items-center overflow-hidden xs:h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh]">
          <motion.img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-cyan-900/60 via-cyan-600/30 to-transparent" />

          <motion.div
            className="relative z-10 flex max-w-[95%] flex-col gap-3 px-6 xs:gap-4 xs:px-8 sm:gap-5 sm:px-12 md:gap-6 md:px-20 lg:gap-8 lg:px-40"
            variants={fadeUp}
          >
            {eyebrow ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200 xs:text-xs sm:text-sm md:text-base">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="max-w-5xl text-xl font-bold leading-tight text-white drop-shadow-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <TextReveal text={title} />
            </h2>

            {description ? (
              <p className="max-w-3xl text-[10px] font-semibold text-white xs:text-xs sm:text-sm md:text-base lg:text-base">
                {description}
              </p>
            ) : null}

            {(primaryHref || secondaryHref) ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {primaryHref && primaryLabel ? (
                  <Link className="button primary" href={primaryHref}>
                    {primaryLabel}
                  </Link>
                ) : null}
                {secondaryHref && secondaryLabel ? (
                  <Link className="button secondary" href={secondaryHref}>
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
