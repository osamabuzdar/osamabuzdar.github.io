"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const [textFade, setTextFade] = useState<boolean>(false);
  const [fadeOutScreen, setFadeOutScreen] = useState<boolean>(false);

  useEffect(() => {
    // Only show splash once per browser session
    try {
      const alreadyShown = sessionStorage.getItem("bulkbytes_splash_shown");
      if (alreadyShown === "true") {
        setShow(false);
        return;
      }
    } catch {
      // ignore
    }

    setShow(true);

    // Lock scrolling while splash screen is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTimer = setTimeout(() => {
      setAnimate(true);
      setTextFade(true);
    }, 2000);

    const fadeTimer = setTimeout(() => {
      setFadeOutScreen(true);
    }, 3800);

    const doneTimer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("bulkbytes_splash_shown", "true");
      } catch {
        // ignore
      }
      document.body.style.overflow = originalOverflow;
      if (onComplete) {
        onComplete();
      }
    }, 4200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!show) {
    return null;
  }

  const text = "BULK BYTES";

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden transition-opacity duration-500 ${
        fadeOutScreen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      aria-hidden="true"
    >
      <div
        className={`relative z-10 flex items-center space-x-3 sm:space-x-4 transition-opacity duration-700 ${
          textFade ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Logo Image */}
        <img
          src="/images/logo.webp"
          alt="BulkBytes Logo"
          className="
            w-14 h-14
            xs:w-16 xs:h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-32 lg:h-32
            xl:w-40 xl:h-40
            object-contain logo-blink
          "
          style={{ animationDelay: "0.2s" }}
        />

        {/* Animated Text */}
        <div className="flex flex-wrap space-x-1">
          {text.split("").map((letter, i) => (
            <span
              key={i}
              className="
                text-white font-bold leading-none select-none
                text-4xl
                xs:text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
                xl:text-9xl
                letter-blink
              "
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>

      {/* Expanding Cyan Wave */}
      <div
        className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 
          w-[200vw] h-[200vw] rounded-full bg-[#0e7490]
          transition-all duration-[2200ms] ease-out pointer-events-none
          ${animate ? "scale-100 opacity-90" : "scale-0 opacity-100"}
        `}
        style={{ transformOrigin: "bottom center" }}
      />
    </div>
  );
}

export default SplashScreen;
