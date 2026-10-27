"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const pagesMenu = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (menu: string) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-[100] overflow-visible shadow-md bg-linear-to-r from-gray-100 to-white">
      {/* HEADER */}
      <div className="max-w-screen-2xl mx-auto px-6 xl:px-12 flex justify-between items-center h-23">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-end h-full shrink-0 cursor-pointer">
          <span className="relative mt-23 max-sm:-ml-70 max-md:-ml-65 -ml-50 2xl:-ml-80">
            <img
              src="/images/shape-2.webp"
              alt="shape"
              className="w-120 2xl:w-150 h-85 object-contain"
            />

            <img
              src="/images/Bulk_Bytes_web_white.webp"
              alt="logo"
              className="absolute inset-0 mt-25 md:mt-23 ml-65 sm:ml-62 md:ml-45 xl:ml-50 2xl:ml-65 w-auto h-12 md:h-17 object-contain"
            />
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div
          className="hidden xl:flex items-center gap-5 xl:gap-6 2xl:gap-8
          font-semibold tracking-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <Link
            href="/"
            className="text-[16px] md:text-[17px] lg:text-[18px] xl:text-base 2xl:text-xl transition-colors px-3 xl:px-4 py-1 hover:bg-cyan-500 hover:text-white rounded-3xl text-gray-700"
          >
            Home
          </Link>

          {/* Pages Dropdown */}
          <div className="relative z-[110] group">
            <button
              className="text-[16px] md:text-[17px] lg:text-[18px] xl:text-base 2xl:text-xl flex items-center gap-1 px-2 py-1 rounded-3xl transition-colors group-hover:bg-cyan-500 group-hover:text-white text-gray-700"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Company
              <ChevronDown
                size={16}
                className="group-hover:rotate-180 transition-transform xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
              />
            </button>

            <div className="pointer-events-none absolute left-0 top-full z-[120] mt-2 w-56">
              <div className="pointer-events-auto rounded-xl border border-gray-200 bg-white shadow-2xl opacity-0 invisible transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                {pagesMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-5 py-3 text-sm text-gray-900 transition-all hover:pl-6 hover:bg-cyan-50 hover:text-cyan-700 first:rounded-t-xl last:rounded-b-xl xl:text-base 2xl:text-lg"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Services Link */}
          <Link
            href="/services"
            className="text-[16px] md:text-[17px] lg:text-[18px] xl:text-base 2xl:text-xl transition-colors px-3 xl:px-4 py-1 hover:bg-cyan-500 hover:text-white rounded-3xl text-gray-700"
          >
            Services
          </Link>

          <Link
            href="/contact"
            className="text-[16px] md:text-[17px] lg:text-[18px] xl:text-base 2xl:text-xl transition-colors px-3 py-1 hover:bg-cyan-500 hover:text-white rounded-3xl text-gray-700"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Contact
          </Link>

          <Link
            href="/faq"
            className="text-[16px] md:text-[17px] lg:text-[18px] xl:text-base 2xl:text-xl transition-colors px-3 py-1 hover:bg-cyan-500 hover:text-white rounded-3xl text-gray-700"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            FAQs
          </Link>

          <Link
            href="/blog"
            className="text-[16px] md:text-[17px] lg:text-[18px] xl:text-base 2xl:text-xl transition-colors px-3 py-1 hover:bg-cyan-500 hover:text-white rounded-3xl text-gray-700"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Blog
          </Link>
        </div>

        {/* CALL BUTTON */}
        <button
          className="hidden md:block 
          bg-linear-to-r from-[#39569a] to-[#3c5aa1] hover:from-cyan-500 hover:to-blue-600 
          duration-200 text-white 
          px-4 py-3 text-base lg:px-6 lg:py-3 lg:text-base xl:px-4 m-2 xl:py-2 xl:text-base 2xl:px-8 2xl:text-lg 
          rounded-full font-semibold 
          hover:shadow-lg hover:-translate-y-0.5 transition-all
          whitespace-nowrap"
        >
          Call us: +92 312 0400975
        </button>

        {/* HAMBURGER */}
        <motion.button
          onClick={toggleMobileMenu}
          className="rounded-full p-2 transition-colors"
          style={{
            backgroundColor: isMobileMenuOpen ? "#39569a" : "#e5e7eb",
            color: isMobileMenuOpen ? "white" : "#39569a",
          }}
          whileHover={{
            backgroundColor: isMobileMenuOpen ? "#39569a" : "#39569a",
            color: "white",
          }}
        >
          {isMobileMenuOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Menu className="w-7 h-7" />
            </motion.div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Desktop Sidebar */}
            <motion.div
              className="hidden xl:block fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={toggleMobileMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>

              <motion.div
                className="absolute right-0 top-0 h-screen w-96 2xl:w-[700px] shadow-2xl overflow-y-auto bg-white"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Link href="/" onClick={handleNavClick} className="flex items-center space-x-3 cursor-pointer">
                    <img
                      src="/images/logo.webp"
                      alt="BulkBytes Logo"
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900">
                      BulkBytes
                    </span>
                  </Link>
                  <motion.button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-full transition-colors"
                    whileHover={{ rotate: 90, backgroundColor: "#f3f4f6" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </motion.button>
                </div>

                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold mb-4 text-gray-900">
                    Contact Us
                  </h3>

                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-cyan-500 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <div className="text-gray-600">
                      <p>Bulk Bytes</p>
                      <p>Office # 9-B IQ Villas Tower, Northern Bypass, Bosan Rd, Multan, 66000</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* MOBILE SIDEBAR */}
            <motion.div
              className="xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl"
                onClick={toggleMobileMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>

              <motion.div
                className="fixed top-0 right-0 z-60 h-screen w-80 sm:w-96 lg:w-96 xl:w-[450px] 2xl:w-[550px] backdrop-blur-2xl shadow-2xl overflow-y-auto bg-white/90"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Link href="/" onClick={handleNavClick} className="flex items-center space-x-3 cursor-pointer">
                    <img
                      src="/images/logo.webp"
                      alt="BulkBytes Logo"
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-xl xl:text-2xl font-bold text-gray-900">
                      BulkBytes
                    </span>
                  </Link>

                  <motion.button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-full transition-colors"
                    whileHover={{ rotate: 90, backgroundColor: "#f3f4f6" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </motion.button>
                </div>

                {/* Mobile menu list */}
                <div className="p-4 flex flex-col gap-2">
                  <Link
                    href="/"
                    className="px-4 py-3 font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 hover:text-cyan-500"
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>

                  {/* Company dropdown */}
                  <div className="flex flex-col">
                    <button
                      className="flex justify-between items-center px-4 py-3 font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 hover:text-cyan-500"
                      onClick={() => toggleDropdown("pages")}
                    >
                      <span>Company</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${openDropdown === "pages" ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openDropdown === "pages" && (
                      <div className="rounded-lg mt-2 flex flex-col overflow-hidden bg-gray-50">
                        {pagesMenu.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="px-6 py-2 border-l-4 border-transparent hover:border-cyan-500 transition text-gray-800 hover:bg-gray-200 hover:text-cyan-500"
                            onClick={handleNavClick}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Services Link */}
                  <Link
                    href="/services"
                    onClick={handleNavClick}
                    className="px-4 py-3 font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 hover:text-cyan-500"
                  >
                    Services
                  </Link>

                  <Link
                    href="/contact"
                    className="px-4 py-3 font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 hover:text-cyan-500"
                    onClick={handleNavClick}
                  >
                    Contact
                  </Link>

                  <Link
                    href="/faq"
                    className="px-4 py-3 font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 hover:text-cyan-500"
                    onClick={handleNavClick}
                  >
                    FAQs
                  </Link>

                  <Link
                    href="/blog"
                    className="px-4 py-3 font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 hover:text-cyan-500"
                    onClick={handleNavClick}
                  >
                    Blog
                  </Link>

                  {/* Call button */}
                  <button className="bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-full mt-4 w-full px-6 py-3 text-base hover:shadow-lg hover:-translate-y-0.5 transition">
                    Call us: +92 312 0400975
                  </button>

                  {/* Address */}
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Us</h3>
                    <p className="text-gray-600">Bulk Bytes</p>
                    <p className="text-gray-600">Office # 9-B IQ Villas Tower, Northern Bypass, Bosan Rd, Multan, 66000</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
