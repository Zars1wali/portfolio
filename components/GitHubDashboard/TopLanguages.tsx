import type { ProcessedLanguage } from "@/lib/github";
import { LanguagesSkeleton } from "./Skeletons";

interface Props {
  languages: ProcessedLanguage[] | null;
}

export default function TopLanguages({ languages }: Props) {
  if (!languages) return <LanguagesSkeleton />;

  if (languages.length === 0) {
    return (
      <p
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "12px",
          color: "var(--color-mist)",
        }}
      >
        No language data available.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {languages.map((lang) => (
        <div
          key={lang.name}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {/* Language name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              minWidth: "110px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: lang.color,
                flexShrink: 0,
                boxShadow: `0 0 6px ${lang.color}60`,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11.5px",
                color: "var(--color-fog)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lang.name}
            </span>
          </div>

          {/* Bar */}
          <div
            style={{
              flex: 1,
              height: "7px",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${lang.percentage}%`,
                height: "100%",
                borderRadius: "4px",
                background: lang.color,
                boxShadow: `0 0 8px ${lang.color}50`,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Percentage */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              color: "var(--color-mist)",
              minWidth: "32px",
              textAlign: "right",
            }}
          >
            {lang.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}
