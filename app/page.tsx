import type { Metadata } from "next";
import CinematicHome from "@/components/CinematicHome";

export const metadata: Metadata = {
  title: "zarss — Cybersecurity & Software",
  description:
    "Personal portfolio of Umer (zarss) — BS Cybersecurity @ GIKI, Co-Founder/COO of Zero Point Intel. AI systems engineer, full-stack developer, and cybersecurity specialist.",
};

export default function HomePage() {
  return <CinematicHome />;
}
