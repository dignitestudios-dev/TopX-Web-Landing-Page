import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/features", priority: 0.8 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
