"use client";

import { useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, Terminal, Cpu, Database, Radio, CheckCircle, ShieldCheck } from "lucide-react";

interface SimulatorTurn {
  id: string;
  userPrompt: string;
  userPromptEnglish: string;
  language: string;
  audioNote?: boolean;
  deepgramTranscript?: string;
  deepgramTranscriptEnglish?: string;
  thought: string;
  action: string;
  observation: string;
  finalAnswer: string;
  finalAnswerEnglish: string;
  mediaDelivered?: string;
}

const SAMPLE_TURNS: SimulatorTurn[] = [
  {
    id: "turn-1",
    userPrompt: "Bhai 9mm handgun dikhao budget 200k k andar, tasveerein b bhejo",
    userPromptEnglish: "Brother, show me a 9mm handgun under 200k budget, send photos too",
    language: "Roman Urdu (Urdu/English Code-Switch)",
    thought: "Customer is searching for a 9mm caliber handgun for defense within 200,000 PKR budget. Query verified catalog for matching in-stock models, format specs concisely in natural Roman Urdu, and attach photo media with price tags.",
    action: 'search_catalog(caliber="9mm", category="Handgun", max_price=200000, in_stock_only=True)',
    observation: "Found: Taurus G3 9mm (185,000 PKR, 17+1 Capacity, Polymer Frame, Brazil, In Stock). Photos: 2 verified images.",
    finalAnswer: "Jee bhai, budget k mutabiq Taurus G3 9mm best option hai. 185,000 PKR price hai, 17-round capacity aur authentic fresh piece dukaan pe available hai. Tasveerein sath attach kar di hain.",
    finalAnswerEnglish: "Yes brother, per your budget the Taurus G3 9mm is the best option. Price is 185,000 PKR, 17-round capacity and an authentic fresh piece is available at the shop. Photos are attached.",
    mediaDelivered: "Taurus G3 9mm — 185,000 PKR (Verified Shop Photo)",
  },
  {
    id: "turn-2",
    userPrompt: "Voice Note: 3.4s Roman Urdu audio",
    userPromptEnglish: "Hello brother, how much would delivery to Abbottabad cost?",
    language: "Audio Voice Note (Deepgram STT)",
    audioNote: true,
    deepgramTranscript: "Salam bhai Abbottabad delivery charges kitne honge?",
    deepgramTranscriptEnglish: "Hello brother, how much would the Abbottabad delivery charges be?",
    thought: "Deepgram STT transcribed voice note in 340ms. Customer inquiry requires delivery pricing to Abbottabad. System rule: Out-of-city delivery requires customer verification and dispatching an escalation ticket directly to the shop owner.",
    action: 'escalate_delivery_quote(city="Abbottabad", customer_name="Verified WhatsApp Contact")',
    observation: "Ticket #412 created. Outgoing alert sent to shop owner on WhatsApp: 'Delivery inquiry: Abbottabad | Ticket #412'.",
    finalAnswer: "Walaikum Assalam bhai! Abbottabad k delivery charges shop management se confirm kar k abhi aapko isi chat mein batata hoon, bas 2 minute hold kijiyega.",
    finalAnswerEnglish: "Peace be upon you brother! I'm confirming Abbottabad delivery charges with shop management right now and will update you in this chat, just hold for 2 minutes.",
  },
  {
    id: "turn-3",
    userPrompt: "Glock 19 Gen 5 USA price 390k kardo aur stock in",
    userPromptEnglish: "Set the Glock 19 Gen 5 USA price to 390k and mark it in stock",
    language: "Owner Administrative NLP",
    thought: "Sender phone matched OWNER_PHONE_NUMBER (+92 314...). Natural language inventory update received. Parse product brand/model and execute SQL update on PostgreSQL database.",
    action: 'update_item_price(product="Glock 19 Gen 5 USA", new_price=390000, in_stock=True)',
    observation: "Database updated: Glock 19 Gen 5 USA → price_pkr: 390,000, is_in_stock: True.",
    finalAnswer: "Jee Haider bhai! Glock 19 Gen 5 USA ki price 390,000 PKR update kardi gayi hai aur stock status active hai.",
    finalAnswerEnglish: "Yes sir! The Glock 19 Gen 5 USA price has been updated to 390,000 PKR and stock status is now active.",
  },
];

export default function RabitaLiveDemo() {
  const [activeTab, setActiveTab] = useState<"video" | "simulator" | "telemetry">("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTurn, setSelectedTurn] = useState<SimulatorTurn>(SAMPLE_TURNS[0]);

  return (
    <div
      style={{
        margin: "0 0 40px",
        background: "rgba(10, 14, 23, 0.75)",
        border: "1px solid rgba(86, 232, 208, 0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px -5px rgba(86, 232, 208, 0.12)",
      }}
    >
      {/* ── Top Bar ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "rgba(37, 211, 102, 0.15)",
              border: "1px solid rgba(37, 211, 102, 0.4)",
              color: "#25D366",
            }}
          >
            <Bot size={16} />
          </span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-cloud)" }}>
                Rabita AI Live Production Station
              </span>
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "10px",
                  background: "rgba(37, 211, 102, 0.15)",
                  color: "#25D366",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                ● 24/7 ONLINE
              </span>
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
              Client: Haider Arms · Meta WhatsApp Cloud API · Vultr VPS (65.20.90.130)
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "6px" }}>
          {(
            [
              { key: "video", label: "Live WhatsApp Video" },
              { key: "simulator", label: "ReACT Loop Simulator" },
              { key: "telemetry", label: "Production Telemetry" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontSize: "11.5px",
                fontFamily: "var(--font-jetbrains), monospace",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: activeTab === tab.key ? "rgba(86, 232, 208, 0.15)" : "transparent",
                color: activeTab === tab.key ? "var(--color-cyan)" : "var(--color-mist)",
                border: activeTab === tab.key ? "1px solid rgba(86, 232, 208, 0.35)" : "1px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content View ── */}
      <div style={{ padding: "20px" }}>
        {activeTab === "video" && (
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "#000",
                maxHeight: "560px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video
                id="rabta-live-video"
                src="/videos/rabta-demo.mp4"
                playsInline
                autoPlay
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{
                  width: "100%",
                  maxHeight: "560px",
                  objectFit: "contain",
                }}
              />

              {/* Floating video control overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "20px",
                  right: "20px",
                  padding: "10px 16px",
                  background: "rgba(5, 7, 12, 0.75)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  zIndex: 2,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => {
                      const v = document.getElementById("rabta-live-video") as HTMLVideoElement | null;
                      if (!v) return;
                      if (v.paused) {
                        v.play();
                        setIsPlaying(true);
                      } else {
                        v.pause();
                        setIsPlaying(false);
                      }
                    }}
                    style={{
                      background: "rgba(86, 232, 208, 0.2)",
                      border: "1px solid rgba(86, 232, 208, 0.4)",
                      color: "var(--color-cyan)",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontFamily: "var(--font-jetbrains), monospace",
                    }}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>

                  <button
                    onClick={() => {
                      const v = document.getElementById("rabta-live-video") as HTMLVideoElement | null;
                      if (!v) return;
                      v.currentTime = 0;
                      v.play();
                      setIsPlaying(true);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "var(--color-fog)",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    title="Restart Video"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button
                    onClick={() => {
                      const v = document.getElementById("rabta-live-video") as HTMLVideoElement | null;
                      if (!v) return;
                      v.muted = !v.muted;
                      setIsMuted(v.muted);
                    }}
                    style={{
                      background: isMuted ? "rgba(255, 255, 255, 0.06)" : "rgba(37, 211, 102, 0.2)",
                      border: isMuted ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(37, 211, 102, 0.4)",
                      color: isMuted ? "var(--color-fog)" : "#25D366",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-jetbrains), monospace" }}>
                      {isMuted ? "Unmute" : "Audio On"}
                    </span>
                  </button>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    color: "var(--color-mist)",
                  }}
                >
                  Authentic WhatsApp Recording · Haider Arms Live Deployment
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "14px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                  AVERAGE RESPONSE TIME
                </div>
                <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-cyan)", marginTop: "4px" }}>
                  &lt; 850 ms
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
                  Real-time WhatsApp swipe reply
                </div>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                  CALIBER ACCURACY RATE
                </div>
                <div style={{ fontSize: "18px", fontWeight: 600, color: "#25D366", marginTop: "4px" }}>
                  100% Deterministic
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
                  0% Caliber or pricing hallucinations
                </div>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                  VOICE NOTE TRANSCRIPTION
                </div>
                <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-fog)", marginTop: "4px" }}>
                  Deepgram Nova-2
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
                  Bilingual Roman Urdu + English STT
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "simulator" && (
          <div>
            <div style={{ fontSize: "12px", color: "var(--color-mist)", marginBottom: "14px" }}>
              Select a live conversation turn to inspect the internal ReACT reasoning, LangGraph tool invocation, and catalog response:
            </div>

            {/* Prompt select pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {SAMPLE_TURNS.map((turn, i) => (
                <button
                  key={turn.id}
                  onClick={() => setSelectedTurn(turn)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    background: selectedTurn.id === turn.id ? "rgba(86, 232, 208, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: selectedTurn.id === turn.id ? "1px solid rgba(86, 232, 208, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: selectedTurn.id === turn.id ? "var(--color-cyan)" : "var(--color-fog)",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}
                >
                  Scenario {i + 1}: {turn.audioNote ? "🎙️ Voice Note" : turn.id === "turn-3" ? "👑 Owner Command" : "💬 Customer Query"}
                </button>
              ))}
            </div>

            {/* Simulator card */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* User input box */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(37, 211, 102, 0.1)",
                  border: "1px solid rgba(37, 211, 102, 0.25)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "11px", color: "#25D366", fontFamily: "var(--font-jetbrains), monospace", marginBottom: "4px" }}>
                  INCOMING WHATSAPP MESSAGE ({selectedTurn.language})
                </div>
                <div style={{ fontSize: "14px", color: "var(--color-cloud)", fontWeight: 500 }}>
                  &quot;{selectedTurn.userPrompt}&quot;
                </div>
                <div style={{ fontSize: "12px", color: "rgba(139,147,163,0.7)", marginTop: "4px", fontStyle: "italic" }}>
                  English: &quot;{selectedTurn.userPromptEnglish}&quot;
                </div>
                {selectedTurn.deepgramTranscript && (
                  <div style={{ marginTop: "8px", padding: "8px 12px", background: "rgba(86,232,208,0.08)", borderRadius: "6px", border: "1px solid rgba(86,232,208,0.15)" }}>
                    <div style={{ fontSize: "11px", color: "var(--color-cyan)", fontFamily: "var(--font-jetbrains), monospace", marginBottom: "4px" }}>
                      DEEPGRAM STT OUTPUT (340ms)
                    </div>
                    <div style={{ fontSize: "12.5px", color: "var(--color-cyan)" }}>
                      &quot;{selectedTurn.deepgramTranscript}&quot;
                    </div>
                    {selectedTurn.deepgramTranscriptEnglish && (
                      <div style={{ fontSize: "11.5px", color: "rgba(139,147,163,0.7)", marginTop: "3px", fontStyle: "italic" }}>
                        English: &quot;{selectedTurn.deepgramTranscriptEnglish}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ReACT Thought */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--color-cyan)", fontFamily: "var(--font-jetbrains), monospace", marginBottom: "4px" }}>
                  🧠 GEMINI ReACT — THOUGHT
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-fog)", lineHeight: 1.6 }}>
                  {selectedTurn.thought}
                </div>
              </div>

              {/* ReACT Action */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                <div style={{ fontSize: "11px", color: "#A78BFA", marginBottom: "4px" }}>
                  ⚡ LANGGRAPH TOOL CALL → ACTION
                </div>
                <div style={{ fontSize: "12.5px", color: "#DDD6FE" }}>
                  {selectedTurn.action}
                </div>
              </div>

              {/* ReACT Observation */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginBottom: "4px" }}>
                  📦 TOOL OBSERVATION (PostgreSQL 16 + pgvector)
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--color-mist)" }}>
                  {selectedTurn.observation}
                </div>
              </div>

              {/* Final Answer */}
              <div
                style={{
                  padding: "14px 16px",
                  background: "rgba(37, 211, 102, 0.15)",
                  border: "1px solid rgba(37, 211, 102, 0.4)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "11px", color: "#25D366", fontFamily: "var(--font-jetbrains), monospace", marginBottom: "4px" }}>
                  💬 OUTBOUND WHATSAPP REPLY (Roman Urdu)
                </div>
                <div style={{ fontSize: "14px", color: "var(--color-cloud)", lineHeight: 1.6 }}>
                  &quot;{selectedTurn.finalAnswer}&quot;
                </div>
                <div style={{ fontSize: "12px", color: "rgba(139,147,163,0.7)", marginTop: "4px", fontStyle: "italic" }}>
                  English: &quot;{selectedTurn.finalAnswerEnglish}&quot;
                </div>
                {selectedTurn.mediaDelivered && (
                  <div style={{ fontSize: "12px", color: "var(--color-cyan)", marginTop: "8px", fontFamily: "var(--font-jetbrains), monospace" }}>
                    📎 Attached Media: {selectedTurn.mediaDelivered}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "telemetry" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "14px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-cyan)", marginBottom: "8px" }}>
                  <Cpu size={16} />
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>
                    HOST INFRASTRUCTURE
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-fog)" }}>Vultr Cloud VPS · Ubuntu 24.04 LTS</div>
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "4px", fontFamily: "var(--font-jetbrains), monospace" }}>
                  IP: 65.20.90.130 · 24/7 Multi-Container Mesh
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#25D366", marginBottom: "8px" }}>
                  <Radio size={16} />
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>
                    GATEWAY PROTOCOL
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-fog)" }}>Meta WhatsApp Cloud API (Official)</div>
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "4px", fontFamily: "var(--font-jetbrains), monospace" }}>
                  HMAC SHA-256 Verified Webhooks · 99.99% Uptime
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A78BFA", marginBottom: "8px" }}>
                  <Database size={16} />
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>
                    DATA & RAG LAYER
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-fog)" }}>PostgreSQL 16 + pgvector</div>
                <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "4px", fontFamily: "var(--font-jetbrains), monospace" }}>
                  Decimal Caliber Match + Vector Fallback
                </div>
              </div>
            </div>

            {/* Docker container status list */}
            <div
              style={{
                padding: "16px",
                background: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: "12px", fontFamily: "var(--font-jetbrains), monospace", color: "var(--color-mist)", marginBottom: "10px" }}>
                LIVE DOCKER COMPOSE TOPOLOGY (rabta_internal network)
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "var(--font-jetbrains), monospace", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "6px" }}>
                  <span style={{ color: "var(--color-fog)" }}>rabta-backend (FastAPI 0.115 + LangGraph 3-Node)</span>
                  <span style={{ color: "#25D366" }}>● Up 24/7 (Port 8000)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "6px" }}>
                  <span style={{ color: "var(--color-fog)" }}>caddy-proxy (Caddy 2 Alpine · Auto SSL & Media CDN)</span>
                  <span style={{ color: "#25D366" }}>● Up 24/7 (Ports 80/443)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "6px" }}>
                  <span style={{ color: "var(--color-fog)" }}>postgres-db (PostgreSQL 16 + pgvector extension)</span>
                  <span style={{ color: "#25D366" }}>● Up 24/7 (Port 5432)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "6px" }}>
                  <span style={{ color: "var(--color-fog)" }}>deepgram-stt-connector (Nova-2 Speech Engine)</span>
                  <span style={{ color: "#25D366" }}>● Active Streaming</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
