import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <style>{`
        .footer-link {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.75rem;
          color: var(--color-mist);
          letter-spacing: 0.04em;
          transition: color 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          text-decoration: none;
        }
        .footer-link:hover,
        .footer-link:focus-visible {
          color: var(--color-cyan);
        }
        .footer-copy {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.75rem;
          color: rgba(139, 147, 163, 0.5);
          margin: 0;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {/* Copyright */}
        <p className="footer-copy">
          © {year}{" "}
          <span style={{ color: "var(--color-mist)" }}>zarss</span>
          {" — "}
          <span>built with Next.js · self-hosted</span>
        </p>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul
            role="list"
            style={{
              display: "flex",
              gap: "1.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link
                href="https://github.com/Zars1wali"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
                <ExternalIcon />
              </Link>
            </li>
            <li>
              <Link
                href="mailto:walizar34@gmail.com"
                className="footer-link"
              >
                Email
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
