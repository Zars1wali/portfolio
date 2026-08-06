/**
 * Skeleton shimmer components for the GitHub dashboard.
 * Rendered when GITHUB_TOKEN is not set.
 * Uses the "skeleton" CSS class defined in globals.css.
 * Never shows fake/hardcoded numbers.
 */

/* ── Primitive ── */
function Sk({ w = "100%", h = 16, r = 6 }: { w?: string | number; h?: number; r?: number }) {
  return (
    <div
      className="skeleton"
      style={{
        width: w,
        height: h,
        borderRadius: r,
      }}
    />
  );
}

/* ── Metric row skeleton ── */
export function MetricRowSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            padding: "20px 20px 18px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Sk w="60%" h={10} />
          <Sk w="50%" h={28} r={4} />
        </div>
      ))}
      <style>{`
        @media (max-width: 640px) {
          .metric-row-sk { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Calendar skeleton ── */
export function CalendarSkeleton() {
  return (
    <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
      <div style={{ display: "flex", gap: "3px", minWidth: "660px", height: "96px" }}>
        {Array.from({ length: 53 }, (_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {Array.from({ length: 7 }, (_, j) => (
              <div
                key={j}
                className="skeleton"
                style={{ width: "11px", height: "11px", borderRadius: "2px" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Languages skeleton ── */
export function LanguagesSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[80, 60, 45, 30, 20, 15].map((pct, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Sk w={72} h={11} r={3} />
          <div style={{ flex: 1, height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
            <div className="skeleton" style={{ width: `${pct}%`, height: "100%", borderRadius: "4px" }} />
          </div>
          <Sk w={30} h={11} r={3} />
        </div>
      ))}
    </div>
  );
}

/* ── Pinned repos skeleton ── */
export function PinnedReposSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "12px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            padding: "18px 20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Sk w="55%" h={13} />
          <Sk w="90%" h={10} />
          <Sk w="70%" h={10} />
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <Sk w={40} h={10} />
            <Sk w={50} h={10} />
          </div>
        </div>
      ))}
    </div>
  );
}
