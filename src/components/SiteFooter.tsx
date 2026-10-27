"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCircle,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";
import { API_BASE_URL, company } from "@/lib/constants";
import { fallbackBlogs, fallbackServices } from "@/lib/fallback-data";
import type { SiteEntity } from "@/types/site";

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
};

const footerServices = [
  { name: "Web Application development", keywords: ["web development", "web application", "web app"] },
  { name: "Mobile Application development", keywords: ["mobile development", "mobile application", "mobile app", "flutter", "react native"] },
  { name: "WordPress Development", keywords: ["wordpress", "wordpress development"] },
  { name: "Digital Marketing", keywords: ["digital marketing", "marketing", "seo", "social media"] }
];

type FooterBlog = {
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  status?: string;
  publishedAt?: string;
};

export function SiteFooter() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: "" });
  const [services] = useState<SiteEntity[]>(fallbackServices);
  const [recentBlogs, setRecentBlogs] = useState<FooterBlog[]>(() =>
    fallbackBlogs
      .filter((item) => item && item.status === "published")
      .slice(0, 3)
      .map((item) => ({
        title: String(item.title || "Blog"),
        slug: String(item.slug || ""),
        excerpt: String(item.excerpt || "").slice(0, 90),
        featuredImage: (item as any).featuredImage || "",
        category: String(item.category || "")
      }))
  );

  useEffect(() => {
    let mounted = true;
    const fetchRecent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/public`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0 && mounted) {
            const list = json.data
              .slice(0, 3)
              .map((item: any) => ({
                title: String(item.title || "Blog"),
                slug: String(item.slug || ""),
                excerpt: String(item.excerpt || "").slice(0, 90),
                featuredImage: item.featuredImage || item.image || item.PImage || "",
                category: String(item.category || "")
              }))
              .filter((item: any) => item.slug);
            if (list.length > 0) {
              setRecentBlogs(list);
            }
          }
        }
      } catch {
        // fallback remains active
      }
    };
    fetchRecent();
    return () => {
      mounted = false;
    };
  }, []);

  const findServiceByName = (footerService: { name: string; keywords: string[] } | string) => {
    if (!services.length) return undefined;

    const serviceName = typeof footerService === "string" ? footerService : footerService.name;
    const keywords = typeof footerService === "string" ? [] : footerService.keywords;
    const normalizedName = serviceName.toLowerCase().trim();

    for (const keyword of keywords) {
      const matchedByKeyword = services.find((service) => {
        const serviceRecord = service.raw as Record<string, unknown>;
        const name =
          String(serviceRecord.Service ?? service.title ?? "")
            .toLowerCase()
            .trim();
        return Boolean(name) && name.includes(keyword.toLowerCase());
      });
      if (matchedByKeyword) return matchedByKeyword;
    }

    let matched: SiteEntity | undefined = services.find((service) => {
      const name = (service.title || "").toLowerCase().trim();
      return name === normalizedName;
    });

    if (!matched) {
      const mainWords = normalizedName
        .split(/\s+/)
        .filter((word) => !["development", "application", "app"].includes(word))
        .filter((word) => word.length > 2);

      if (mainWords.length) {
        matched = services.find((service) => {
          const name = (service.title || "").toLowerCase();
          return mainWords.every((word) => name.includes(word));
        });
      }
    }

    if (!matched) {
      matched = services.find((service) => {
        const name = (service.title || "").toLowerCase().trim();
        return normalizedName.includes(name) || name.includes(normalizedName);
      });
    }

    return matched;
  };

  const handleServiceClick = (serviceName: string) => {
    const matchedService = findServiceByName(serviceName);
    const serviceId = matchedService?.id;
    if (serviceId) {
      router.push(`/services-detail/${serviceId}`);
      return;
    }
    router.push("/services");
  };

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }

    setSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    window.setTimeout(() => {
      setSubmitStatus({ type: "success", message: "Thank you for subscribing!" });
      setEmail("");
      setSubmitting(false);
      window.setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    }, 450);
  };

  return (
    <footer className="overflow-x-hidden bg-gray-800 px-2 py-10 text-white transition-colors duration-300 sm:px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-screen-2xl space-y-10">
        <div className="grid grid-cols-1 gap-10 border-b border-gray-700 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:border-r lg:border-gray-700 lg:pr-6">
            <div>
              <img
                src="/images/Bulk_Bytes_web_white.webp"
                className="w-36 sm:w-44 lg:w-48 xl:w-52 2xl:w-60"
                alt="Bulk Bytes logo"
                onError={(e) => {
                  e.currentTarget.src = "/images/logo.webp";
                }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base lg:text-base xl:text-lg 2xl:text-2xl">
              We deliver digital solutions that accelerate growth, improve efficiency, and elevate user experiences.
            </p>
            <div className="mt-8 flex space-x-6 sm:space-x-8 md:space-x-10">
              <a
                href={company.socials[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-400"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl sm:text-2xl md:text-3xl" />
              </a>
              <a
                href={company.socials[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-400"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl sm:text-2xl md:text-3xl" />
              </a>
              <a
                href={company.socials[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-400"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl sm:text-2xl md:text-3xl" />
              </a>
              <a
                href={company.socials[3]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl sm:text-2xl md:text-3xl" />
              </a>
            </div>
          </div>

          <div className="lg:border-r lg:border-gray-700 lg:px-6">
            <h3 className="mb-4 text-lg font-semibold text-white sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
              Services
            </h3>
            <ul className="space-y-2 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl">
              {footerServices.map((footerService) => {
                const matchedService = findServiceByName(footerService);
                const serviceId = matchedService?.id;
                const serviceName = footerService.name;

                return (
                  <li key={serviceName}>
                    {serviceId ? (
                      <button
                        type="button"
                        onClick={() => handleServiceClick(serviceName)}
                        className="flex w-full items-center space-x-2 text-left text-gray-400 transition hover:text-cyan-400"
                      >
                        <FaCircle className="text-[4px] text-cyan-400 sm:text-[6px] lg:text-[8px] xl:text-[10px]" />
                        <span>{serviceName}</span>
                      </button>
                    ) : (
                      <Link href="/services" className="flex items-center space-x-2 text-gray-400 transition hover:text-cyan-400">
                        <FaCircle className="text-[4px] text-cyan-400 sm:text-[6px] lg:text-[8px] xl:text-[10px]" />
                        <span>{serviceName}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:pl-6">
            <h3 className="mb-4 text-base font-semibold text-white sm:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
              Company Address
            </h3>
            <ul className="space-y-2 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl">
              <li className="flex items-start space-x-2 text-gray-400 transition hover:text-cyan-400 sm:space-x-3">
                <FaMapMarkerAlt className="mt-1 text-base text-cyan-400 sm:text-lg lg:text-lg xl:text-xl" />
                <span>
                  Bulk Bytes<br />
                  Office # 9-B IQ Villas Tower, Northern Bypass, Bosan Rd, Multan, 66000
                </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 transition hover:text-cyan-400 sm:space-x-3">
                <FaPhoneAlt className="text-base text-cyan-400 sm:text-lg lg:text-lg xl:text-xl" />
                <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 transition hover:text-cyan-400 sm:space-x-3">
                <FaEnvelope className="text-base text-cyan-400 sm:text-lg lg:text-lg xl:text-xl" />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {recentBlogs.length ? (
          <div className="border-b border-gray-700 pb-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl xl:text-3xl">
                  Latest Blog Posts
                </h3>
                <p className="mt-1 text-sm text-gray-400 sm:text-base">
                  Fresh articles from our team.
                </p>
              </div>
              <Link href="/blog" className="text-sm text-cyan-400 transition hover:text-cyan-300">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/60 transition hover:-translate-y-1 hover:border-cyan-500/60"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-800">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-2xl font-bold text-cyan-300">
                        BB
                      </div>
                    )}
                    {blog.category ? (
                      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                        {blog.category}
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4">
                    <h4 className="line-clamp-2 text-base font-semibold text-white transition group-hover:text-cyan-300">
                      {blog.title}
                    </h4>
                    {blog.excerpt ? (
                      <p className="line-clamp-2 text-sm text-gray-400">
                        {blog.excerpt}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-8 border-b border-gray-700 pb-10 md:grid-cols-2">
          <div>
            <h1 className="mb-2 text-lg font-semibold text-white sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              Connect With Us. Innovate Together.
            </h1>
            <h2 className="text-sm text-gray-400 sm:text-base lg:text-base xl:text-lg 2xl:text-xl">
              Collaborate. Create. Elevate.
            </h2>
          </div>

          <form onSubmit={handleSubscribe} className="mt-2 flex w-full max-w-2xl items-center gap-3 rounded-full border border-gray-700 bg-gray-700 p-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submitStatus.type) {
                  setSubmitStatus({ type: null, message: "" });
                }
              }}
              placeholder="Enter Your Email"
              required
              className="h-10 flex-1 !rounded-full !border-0 bg-gray-700 px-5 py-2 text-sm text-white outline-none placeholder:text-gray-400 sm:h-12 sm:px-6 sm:text-base lg:h-12 lg:text-base xl:h-14 xl:text-lg 2xl:h-16 2xl:text-xl"
            />
            <button
              type="submit"
              disabled={submitting}
              className="h-10 !rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-6 sm:text-base lg:h-12 lg:text-base xl:h-14 xl:text-lg 2xl:h-16 2xl:text-xl"
            >
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {submitStatus.message ? (
          <div className={`text-sm sm:text-base ${submitStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {submitStatus.message}
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-between space-y-2 pt-6 text-sm sm:text-base md:flex-row md:space-y-0">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} <span className="font-medium text-white">BULKBYTES</span> - All rights reserved.
          </p>
          <Link href="https://maps.google.com/?q=BulkBytes,+Bosan+Road,+Multan" className="text-gray-400 transition hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
            Site Map
          </Link>
        </div>
      </div>
    </footer>
  );
}
