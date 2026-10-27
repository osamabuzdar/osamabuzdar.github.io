"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FaChevronDown, FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineEdit } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { PhoneCall } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";
import type { SiteEntity } from "@/types/site";

type ContactClientProps = {
  services: SiteEntity[];
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  reasonForEnquiry: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  reasonForEnquiry: "",
  message: ""
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
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
              {breadcrumb.split(" / ").map((part, index, array) => {
                if (part.trim().toLowerCase() === "home") {
                  return (
                    <span key={index}>
                      <a href="/" className="cursor-pointer transition-colors hover:text-cyan-300">
                        {part}
                      </a>
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ServiceDropdown({
  services,
  value,
  open,
  onToggle,
  onSelect
}: {
  services: string[];
  value: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      <div
        onClick={onToggle}
        className="cursor-pointer select-none rounded-xl border border-transparent bg-gray-100 px-4 py-3 pr-10 text-gray-700 transition-colors focus:border-cyan-500 sm:px-5 sm:py-4"
      >
        {value || "Reason for enquiry"}
      </div>

      <FaChevronDown
        size={20}
        onClick={onToggle}
        className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition-transform duration-200 sm:right-4 ${
          open ? "rotate-180" : ""
        }`}
      />

      {open ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {services.map((item) => (
            <div
              key={item}
              onClick={() => onSelect(item)}
              className="cursor-pointer px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 sm:px-5"
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ContactClient({ services }: ContactClientProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Reason for enquiry");
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: ""
  });

  const sortedServiceLabels = useMemo(
    () =>
      [...services]
        .sort((a, b) => {
          const seqA = resolveSortValue(a.raw?.Sequence);
          const seqB = resolveSortValue(b.raw?.Sequence);
          if (seqA !== seqB) return seqA - seqB;

          const dateA = toText(a.raw?.createdAt, "");
          const dateB = toText(b.raw?.createdAt, "");
          return (dateB ? new Date(dateB).getTime() : 0) - (dateA ? new Date(dateA).getTime() : 0);
        })
        .map((service) => toText(service.raw?.Service, service.title))
        .filter(Boolean),
    [services]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus.type) setSubmitStatus({ type: null, message: "" });
  };

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setFormData((prev) => ({ ...prev, reasonForEnquiry: reason }));
    setOpenDropdown(false);
    if (submitStatus.type) setSubmitStatus({ type: null, message: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitStatus({ type: "error", message: "Please fill in name and email fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }

    setSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          serviceCategory: selectedReason !== "Reason for enquiry" ? selectedReason : undefined,
          reasonForEnquiry: selectedReason !== "Reason for enquiry" ? selectedReason : undefined,
          message: formData.message.trim() || undefined
        })
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (response.ok && data.success) {
        setSubmitStatus({ type: "success", message: "Thank you! We'll contact you soon." });
        setFormData(initialForm);
        setSelectedReason("Reason for enquiry");
        window.setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cards = [
    {
      img: "/images/address.webp",
      icon: <FaLocationDot size={28} />,
      title: "Our Address",
      text: (
        <>
          Bulk Bytes
          <br />
          Office # 9-B IQ Villas Tower, Northern Bypass, Bosan Rd, Multan, 66000
        </>
      )
    },
    {
      img: "/images/info.webp",
      icon: <MdEmail size={28} />,
      title: "info@bulkbytes.org",
      text: "Reach out to us anytime for any inquiries."
    },
    {
      img: "/images/hotline.webp",
      icon: <PhoneCall size={28} />,
      title: "Hotline: +92 312 0400975",
      text: "Call us anytime for urgent matters."
    }
  ];

  return (
    <div className="relative z-0 min-h-screen w-full bg-[#f5f7fa] text-gray-900 transition-colors duration-300">
      <HeroSection title="Contact Us" breadcrumb="Home / Contact Us" />

      <div className="mx-auto grid w-[min(1600px,calc(100%-2rem))] grid-cols-1 gap-8 px-4 py-16 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-colors duration-300 lg:p-6 md:p-5 sm:p-4"
          >
            <div className="relative h-60 min-h-48 w-full sm:h-40 sm:min-h-40 md:h-48 md:min-h-48 lg:h-56 lg:min-h-56">
              <img
                src={card.img}
                alt={card.title}
                className="h-full w-full rounded-4xl border border-gray-200 object-cover"
              />

              <div className="absolute bottom-10 left-0 flex h-20 w-20 translate-y-1/2 items-center justify-center rounded-bl-3xl rounded-tr-3xl bg-white text-cyan-500 shadow-md transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white md:h-16 md:w-16 lg:h-20 lg:w-20 sm:h-[4.5rem] sm:w-[4.5rem]">
                {card.icon}
              </div>
            </div>

            <div className="pt-12">
              <h2 className="text-[24px] font-bold leading-[29px] text-gray-900 lg:text-[24px] md:text-[20px] sm:text-[18px]">
                {card.title}
              </h2>

              <div className="mt-1.5 text-[16px] leading-[22px] text-gray-500 lg:text-[16px] md:text-[15px] sm:text-[14px]">
                {card.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-4 rounded-3xl border border-gray-100 bg-white px-6 py-16 shadow-lg lg:mx-4 lg:px-20 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="text-center">
              <SectionHeading>BOOK AN APPOINTMENT</SectionHeading>
            </div>

            <h1 className="my-5 text-center text-3xl font-extrabold leading-snug text-gray-900 sm:text-3xl md:text-4xl lg:text-4xl lg:leading-tight">
              Empowering Your Technology with
              <br />
              Bulk Bytes Solutions
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-transparent bg-gray-100 px-4 py-3 pr-10 text-gray-700 outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-500 sm:px-5 sm:py-4"
                    required
                  />
                  <IoPersonOutline size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4" />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-transparent bg-gray-100 px-4 py-3 pr-10 text-gray-700 outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-500 sm:px-5 sm:py-4"
                    required
                  />
                  <HiOutlineMail size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                    className="w-full rounded-xl border border-transparent bg-gray-100 px-4 py-3 pr-10 text-gray-700 outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-500 sm:px-5 sm:py-4"
                  />
                  <FiPhone size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4" />
                </div>

                <ServiceDropdown
                  services={sortedServiceLabels}
                  value={selectedReason}
                  open={openDropdown}
                  onToggle={() => setOpenDropdown((current) => !current)}
                  onSelect={handleReasonSelect}
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none rounded-xl border border-transparent bg-gray-100 px-4 py-3 pr-10 text-gray-700 outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-500 sm:px-5 sm:py-4"
                />
                <MdOutlineEdit size={20} className="absolute right-3 top-5 text-gray-400 sm:right-4" />
              </div>

              {submitStatus.message ? (
                <div
                  className={`w-full rounded-lg border px-4 py-3 text-center text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "border-green-300 bg-green-100 text-green-700"
                      : "border-red-300 bg-red-100 text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-600 bg-cyan-600 px-6 py-3 text-base font-bold text-white transition hover:bg-white hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Contact Now"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="h-60 overflow-hidden rounded-3xl shadow-lg sm:h-80 md:h-[500px] lg:h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps?q=Bulk+Bytes+Software+company+30.252324,71.485964&hl=en&z=15&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
              title="Bulk Bytes map"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

