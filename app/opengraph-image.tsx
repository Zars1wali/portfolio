import { ImageResponse } from "next/og";

export const alt = "zarss — Cybersecurity & Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#071013", color: "#f4f7fb", display: "flex", height: "100%", width: "100%", padding: "64px", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ color: "#56e8d0", display: "flex", fontSize: 24, letterSpacing: 5 }}>SIGNAL / SECURITY ENGINEERING</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -3 }}>Umer Wali</div>
          <div style={{ color: "#a9b4c7", display: "flex", fontSize: 32, marginTop: 18 }}>Cybersecurity · Software · Applied AI</div>
        </div>
        <div style={{ color: "#8b7cf6", display: "flex", fontSize: 26, letterSpacing: 3 }}>zarss</div>
      </div>
      <div style={{ border: "2px solid #56e8d0", borderRadius: 999, height: 18, position: "absolute", right: 104, top: 104, width: 18 }} />
      <div style={{ background: "#8b7cf6", borderRadius: 999, bottom: 128, height: 12, position: "absolute", right: 210, width: 12 }} />
      <div style={{ background: "#56e8d0", height: 2, position: "absolute", right: 118, top: 118, transform: "rotate(142deg)", width: 188 }} />
    </div>,
    size
  );
}
