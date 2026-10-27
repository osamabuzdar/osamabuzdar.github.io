"use client";

import { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

type AboutVideoSectionProps = {
  title: string;
  thumbnailSrc: string;
  videoSrc: string;
};

export function AboutVideoSection({ title, thumbnailSrc, videoSrc }: AboutVideoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative mx-auto max-w-full overflow-hidden rounded-3xl border-4 border-gray-200 shadow-2xl sm:max-w-5xl">
        <div className="relative h-[48vh] w-full overflow-hidden rounded-2xl bg-gray-800 sm:h-[56vh] md:h-[64vh] lg:h-[72vh]">
          <img src={thumbnailSrc} alt={title} className="h-full w-full object-cover" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-0 overflow-hidden rounded-full transition-colors"
            aria-label={`Watch ${title}`}
          >
            <span className="bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-white group-hover:text-cyan-600 sm:px-6 sm:py-3 sm:text-base md:text-lg">
              WATCH OUR VIDEO
            </span>
            <span className="flex items-center justify-center bg-white px-3 py-2 transition-colors group-hover:bg-cyan-600 sm:px-4 sm:py-3">
              <FaRegCirclePlay className="h-5 w-5 text-cyan-600 transition-colors group-hover:text-white sm:h-6 sm:w-6" />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white backdrop-blur hover:bg-white/20"
              aria-label="Close video"
            >
              &times;
            </button>

            <video
              src={videoSrc}
              controls
              autoPlay
              muted
              playsInline
              className="h-full w-full max-h-[70vh] object-contain bg-black"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
