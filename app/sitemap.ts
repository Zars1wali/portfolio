import type { MetadataRoute } from "next";
import { getAllLab, getAllProjects } from "@/lib/content";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const projects = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
  }));
  const lab = getAllLab().map((entry) => ({
    url: `${baseUrl}/lab/${entry.slug}`,
    lastModified,
  }));

  return [
    { url: baseUrl, lastModified },
    ...["about", "projects", "lab", "resume", "contact"].map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified,
    })),
    ...projects,
    ...lab,
  ];
}
