"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/lab",      label: "Lab"      },
  { href: "/resume",   label: "Resume"   },
  { href: "/contact",  label: "Contact"  },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the mobile menu when the route changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      /* Slightly opaque void — the cosmic dust background shows through,
         but NO backdrop blur here: blur on an element sitting over the
         WebGL canvas forces per-frame repaints of the canvas layer on
         every scroll. The void tint keeps nav links legible over bright
         motes without that compositing cost. */
      backgroundColor: "rgba(5,7,12,0.65)",
    }}>
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          aria-label="zarss — home"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "var(--color-cyan)",
            letterSpacing: "-0.03em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          zarss<span style={{ color: "var(--color-mist)" }}>_</span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul
          role="list"
          className="nav-desktop"
          style={{ display: "flex", gap: "0.2rem", listStyle: "none", margin: 0, padding: 0 }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href} active={isActive(href)}>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* ── Hamburger (mobile) ── */}
        <button
          id="nav-hamburger"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
          className="nav-hamburger"
          style={{
            display: "none",
            background: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "6px",
            padding: "0.4rem 0.5rem",
            cursor: "pointer",
            color: "var(--color-fog)",
            lineHeight: 1,
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        id="nav-mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className="nav-mobile-menu"
        style={{
          position: "fixed",
          inset: "64px 0 0 0",
          backgroundColor: "rgba(5,7,12,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
          zIndex: 40,
          padding: "1.5rem",
          overflowY: "auto",
        }}
      >
        <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "1rem",
                  fontWeight: isActive(href) ? 600 : 400,
                  color: isActive(href) ? "var(--color-cyan)" : "var(--color-fog)",
                  backgroundColor: isActive(href) ? "rgba(86,232,208,0.07)" : "transparent",
                  borderLeft: isActive(href) ? "2px solid var(--color-cyan)" : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <hr style={{ margin: "1.5rem 0", borderColor: "rgba(255,255,255,0.08)" }} />
        <p style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "0.75rem", color: "var(--color-mist)", letterSpacing: "0.08em" }}>
          github.com/Zars1wali
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; align-items: center; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function NavLink({ href, active, children }: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      style={{
        display: "block",
        padding: "0.35rem 0.75rem",
        borderRadius: "6px",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "0.82rem",
        fontWeight: active ? 600 : 400,
        letterSpacing: "0.01em",
        color: active
          ? "var(--color-cyan)"
          : hovered
          ? "var(--color-fog)"
          : "var(--color-mist)",
        backgroundColor: active
          ? "rgba(86,232,208,0.08)"
          : hovered
          ? "rgba(255,255,255,0.04)"
          : "transparent",
        borderBottom: active
          ? "1px solid var(--color-cyan)"
          : "1px solid transparent",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const bar = (rotate: string, opacity = 1): React.CSSProperties => ({
    display: "block",
    width: "18px",
    height: "1.5px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
    transition: "transform 0.2s, opacity 0.15s",
    transform: rotate,
    opacity,
    transformOrigin: "center",
  });

  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={bar(open ? "rotate(45deg) translate(4px, 4px)" : "none")} />
      <span style={bar("none", open ? 0 : 1)} />
      <span style={bar(open ? "rotate(-45deg) translate(4px, -4px)" : "none")} />
    </span>
  );
}
