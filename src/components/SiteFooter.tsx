import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { company, mainNav } from "@/lib/constants";

export function SiteFooter() {
  return (
    <Reveal as="footer" className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Bulk Bytes</p>
          <p>
            Digital product engineering, mobile applications, web platforms, WordPress, marketing,
            and IT modernization for teams that need reliable delivery.
          </p>
        </div>
        <div>
          <h2>Site Map</h2>
          <div className="footer-links">
            {mainNav.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/faq">FAQs</Link>
          </div>
        </div>
        <div>
          <h2>Contact</h2>
          <p>{company.address}</p>
          <p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <p>
            <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© Bulk Bytes. All rights reserved.</span>
      </div>
    </Reveal>
  );
}
