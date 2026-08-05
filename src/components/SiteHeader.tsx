"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, m, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { company, mainNav } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const compact = useTransform(scrollY, [0, 120], [0, 1]);

  useEffect(() => {
    const id = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <m.header className="site-header" style={{ "--header-compact": compact } as React.CSSProperties}>
      <div className="topbar">
        <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
          <Phone size={15} aria-hidden="true" />
          {company.phone}
        </a>
        <a href={`mailto:${company.email}`}>
          <Mail size={15} aria-hidden="true" />
          {company.email}
        </a>
      </div>
      <nav className="nav-shell" aria-label="Main navigation">
        <m.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/" className="brand-link" aria-label="Bulk Bytes home">
          <Image src="/images/logo.webp" width={44} height={44} alt="" priority />
          <span>Bulk Bytes</span>
        </Link>
        </m.div>
        <button className="nav-toggle-label" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <div className="nav-links">
          {mainNav.map((item, index) => (
            <m.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * index }} key={item.href}>
            <Link href={item.href} className={pathname === item.href ? "active" : undefined}>
              {item.label}
            </Link>
            </m.span>
          ))}
        </div>
        <AnimatePresence>
          {open ? (
            <m.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <m.div className="mobile-nav-panel" initial={{ opacity: 0, y: -14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}>
                {mainNav.map((item, index) => (
                  <m.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * index }} key={item.href}>
                    <Link href={item.href} className={pathname === item.href ? "active" : undefined}>
                      {item.label}
                    </Link>
                  </m.div>
                ))}
              </m.div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </m.header>
  );
}
