import type { ContributionWeek } from "@/lib/github";
import { CalendarSkeleton } from "./Skeletons";

interface Props {
  calendar: ContributionWeek[] | null;
}

/** Map contribution count → Signal cyan colour + optional glow */
function cellStyle(count: number, maxCount: number): React.CSSProperties {
  if (count === 0) {
    return {
      background: "rgba(255,255,255,0.05)",
      borderRadius: 2,
    };
  }
  const t = Math.min(count / Math.max(maxCount, 1), 1);
  // 4 intensity levels in Signal cyan
  let bg: string;
  let shadow: string | undefined;
  if (t < 0.25) {
    bg = "rgba(86,232,208,0.22)";
  } else if (t < 0.5) {
    bg = "rgba(86,232,208,0.44)";
  } else if (t < 0.75) {
    bg = "rgba(86,232,208,0.66)";
  } else {
    bg = "rgba(86,232,208,0.92)";
    shadow = "0 0 5px rgba(86,232,208,0.55)";
  }
  return { background: bg, borderRadius: 2, boxShadow: shadow };
}

/** Pull the month from the first day's date in a week */
function monthLabel(week: ContributionWeek): string | null {
  const firstDay = week.contributionDays[0];
  if (!firstDay) return null;
  const d = new Date(firstDay.date + "T00:00:00");
  // Only show label on the first week of each month
  if (d.getDate() > 7) return null;
  return d.toLocaleString("default", { month: "short" });
}

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

export default function CalendarHeatmap({ calendar }: Props) {
  if (!calendar) return <CalendarSkeleton />;

  const allDays = calendar.flatMap((w) => w.contributionDays);
  const maxCount = Math.max(...allDays.map((d) => d.contributionCount), 1);

  return (
    <div style={{ overflowX: "auto", paddingBottom: "8px", marginRight: "-4px" }}>
      {/* Month labels row */}
      <div
        style={{
          display: "flex",
          gap: "3px",
          marginBottom: "4px",
          marginLeft: "28px",
          minWidth: "660px",
        }}
      >
        {calendar.map((week, wi) => {
          const label = monthLabel(week);
          return (
            <div
              key={wi}
              style={{
                width: "11px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "9px",
                color: "rgba(139,147,163,0.6)",
                whiteSpace: "nowrap",
                textAlign: "left",
                overflow: "visible",
              }}
            >
              {label ?? ""}
            </div>
          );
        })}
      </div>

      {/* Grid: day-of-week labels + week columns */}
      <div style={{ display: "flex", gap: "6px", minWidth: "660px" }}>
        {/* Day-of-week labels (left column) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            paddingTop: "1px",
          }}
        >
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              style={{
                height: "11px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "8.5px",
                color: "rgba(139,147,163,0.5)",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                minWidth: "20px",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Week columns */}
        <div style={{ display: "flex", gap: "3px" }}>
          {calendar.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                  style={{
                    width: "11px",
                    height: "11px",
                    ...cellStyle(day.contributionCount, maxCount),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
