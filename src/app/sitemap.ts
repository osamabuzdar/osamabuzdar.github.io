import type { MetadataRoute } from "next";
import { criticalLegacyUrls, SITE_URL } from "@/lib/constants";
import { getPostMeta } from "@/lib/blog";
import { getProjects, getServices, getTeam } from "@/lib/api";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, team] = await Promise.all([getServices(), getProjects(), getTeam()]);
  const staticRoutes = ["/", "/about", "/services", "/portfolio", "/pricing", "/team", "/contact", "/faq", "/blog"];
  const dynamicRoutes = [
    ...services.map((item) => `/services-detail/${item.id}`),
    ...projects.map((item) => `/portfolio-details/${item.id}`),
    ...team.map((item) => `/team-details/${item.id}`),
    ...getPostMeta().map((post) => `/blog/${post.slug}`),
    ...criticalLegacyUrls
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date()
  }));
}
