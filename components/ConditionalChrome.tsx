"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Conditionally renders Nav and Footer based on the current route.
 * On the homepage ("/"), Nav and Footer are hidden because the cinematic
 * scroll has its own SceneIndicator navigation and Contact scene.
 * All other pages (projects, lab, resume, contact) keep the traditional layout.
 */
export default function ConditionalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCinematic = pathname === "/";

  return (
    <>
      {!isCinematic && <Nav />}
      <main>{children}</main>
      {!isCinematic && <Footer />}
    </>
  );
}
