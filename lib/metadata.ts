import type { Metadata } from "next";

export function pageMetadata(title: string, description?: string): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
    openGraph: { type: "website", title, ...(description ? { description } : {}) },
    twitter: { card: "summary_large_image", title, ...(description ? { description } : {}) },
  };
}
