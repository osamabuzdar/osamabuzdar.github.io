import Link from "next/link";
import Image from "next/image";
import { Mail, Menu, Phone } from "lucide-react";
import { company, mainNav } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="site-header">
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
        <Link href="/" className="brand-link" aria-label="Bulk Bytes home">
          <Image src="/images/logo.webp" width={44} height={44} alt="" priority />
          <span>Bulk Bytes</span>
        </Link>
        <input className="nav-toggle" type="checkbox" id="nav-toggle" aria-label="Toggle navigation" />
        <label className="nav-toggle-label" htmlFor="nav-toggle">
          <Menu size={22} aria-hidden="true" />
        </label>
        <div className="nav-links">
          {mainNav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
