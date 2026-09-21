"use client";

import { useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  Cpu,
  Database,
  Radio,
  Bot,
  Terminal,
  Zap,
  Clock,
  ArrowRight,
  ArrowDown,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
  PhoneCall,
  FileCheck,
  Truck,
  Scale,
} from "lucide-react";

export default function RabtaArchitectureDiagram() {
  const [activeView, setActiveView] = useState<"architecture" | "hitl" | "specs">("architecture");
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  return (
    <div
      style={{
        margin: "2rem 0",
        background: "rgba(10, 15, 26, 0.85)",
        border: "1px solid rgba(86, 232, 208, 0.25)",
        borderRadius: "16px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(86, 232, 208, 0.1)",
      }}
    >
      {/* ── Header & Mode Switcher ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(86, 232, 208, 0.15)",
              border: "1px solid rgba(86, 232, 208, 0.4)",
              color: "var(--color-cyan)",
            }}
          >
            <Layers size={18} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--color-cloud)" }}>
                Rabta AI Architecture &amp; Responsible AI Blueprint
              </span>
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#F59E0B",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ShieldCheck size={11} /> RESPONSIBLE AI (HITL)
              </span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-mist)", marginTop: "2px" }}>
              Google Gemini 3.5 Flash Lite · Deepgram Nova-3 · Meta Official WhatsApp Business Platform
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(0, 0, 0, 0.3)", padding: "4px", borderRadius: "8px" }}>
          {[
            { id: "architecture", label: "System Architecture (6 Layers)" },
            { id: "hitl", label: "Responsible AI & Human-in-the-Loop" },
            { id: "specs", label: "Live Tech Specifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-jetbrains), monospace",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: activeView === tab.id ? "rgba(86, 232, 208, 0.18)" : "transparent",
                color: activeView === tab.id ? "var(--color-cyan)" : "var(--color-mist)",
                border: activeView === tab.id ? "1px solid rgba(86, 232, 208, 0.4)" : "1px solid transparent",
                fontWeight: activeView === tab.id ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── View 1: Architecture Blueprint ── */}
      {activeView === "architecture" && (
        <div style={{ padding: "24px 20px" }}>
          {/* Quick Flow Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              background: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--color-mist)",
              overflowX: "auto",
            }}
          >
            <span style={{ color: "#38BDF8", fontWeight: 600 }}>1. WhatsApp Client</span>
            <ArrowRight size={13} />
            <span style={{ color: "#10B981", fontWeight: 600 }}>2. Meta Official Gateway</span>
            <ArrowRight size={13} />
            <span style={{ color: "#818CF8", fontWeight: 600 }}>3. FastAPI + LangGraph Core</span>
            <ArrowRight size={13} />
            <span style={{ color: "#FB923C", fontWeight: 600 }}>4. Gemini 3.5 Flash Lite</span>
            <ArrowRight size={13} />
            <span style={{ color: "#F59E0B", fontWeight: 700, background: "rgba(245,158,11,0.15)", padding: "2px 6px", borderRadius: "4px" }}>
              5. HITL Owner Node
            </span>
            <ArrowRight size={13} />
            <span style={{ color: "#4ADE80", fontWeight: 600 }}>6. ReACT Tools &amp; DB</span>
          </div>

          {/* Layer Cards Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* ── LAYER 1: CLIENT INTERFACE ── */}
            <div
              style={{
                background: "rgba(30, 41, 59, 0.4)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "12px",
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "rgba(56, 189, 248, 0.15)",
                      color: "#38BDF8",
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    LAYER 1
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-cloud)" }}>
                    Client Interface (WhatsApp Native)
                  </span>
                </div>
                <span style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                  Dual-Channel User Surface
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                {/* Customer Box */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(56, 189, 248, 0.2)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#38BDF8", marginBottom: "6px" }}>
                    <Bot size={15} />
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>Public Customer Channel</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "var(--color-fog)", lineHeight: "1.6" }}>
                    <li>Rapid burst messaging (3–6 short texts in sequence)</li>
                    <li>Firearm catalog lookups, budget queries, caliber checks</li>
                    <li>Voice notes in Roman Urdu &amp; English</li>
                    <li>Verified studio photo requests with price tags</li>
                  </ul>
                </div>

                {/* Owner Box (HITL) */}
                <div
                  style={{
                    background: "rgba(45, 26, 3, 0.4)",
                    border: "1px solid rgba(245, 158, 11, 0.35)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#F59E0B", marginBottom: "6px" }}>
                    <UserCheck size={15} />
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>Store Owner / Boss (Human-in-the-Loop)</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "var(--color-fog)", lineHeight: "1.6" }}>
                    <li><strong>Human-in-the-Loop decision maker</strong> for legal &amp; delivery talks</li>
                    <li>Authoritative manual reply takeovers (auto-mutes AI)</li>
                    <li>Natural language catalog mutations (pricing, stock in/out)</li>
                    <li>Direct two-way customer escalation resolution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0", color: "var(--color-cyan)" }}>
              <ArrowDown size={18} />
            </div>

            {/* ── LAYER 2: WHATSAPP EDGE GATEWAY ── */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                borderRadius: "12px",
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10B981",
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    LAYER 2
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-cloud)" }}>
                    WhatsApp Edge Gateway (Official Meta Cloud Platform)
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#10B981",
                    fontFamily: "var(--font-jetbrains), monospace",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Meta Official Webhooks (Not Baileys)
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
                <div style={{ background: "rgba(0, 0, 0, 0.35)", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#10B981", marginBottom: "4px" }}>
                    Meta Official Platform
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Direct Meta Graph Cloud API. HMAC SHA-256 signed webhooks, official green-tick support, 99.99% uptime.
                  </div>
                </div>

                <div style={{ background: "rgba(0, 0, 0, 0.35)", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-cyan)", marginBottom: "4px" }}>
                    15s Sliding Debounce
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Aggregates customer burst payloads into 1 prompt. Resets on new keystrokes. Owner fast lane: 1.5s.
                  </div>
                </div>

                <div style={{ background: "rgba(0, 0, 0, 0.35)", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#F59E0B", marginBottom: "4px" }}>
                    2-Hour Takeover Guard
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Auto-mutes AI if owner sends a message to that customer thread. Cancels pending buffers to prevent collisions.
                  </div>
                </div>

                <div style={{ background: "rgba(0, 0, 0, 0.35)", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#A78BFA", marginBottom: "4px" }}>
                    Typing &amp; LID Resolver
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Renders <em>"Haider Arms is typing..."</em> via official presence events; maps 15-digit LIDs to verified SIMs.
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0", color: "var(--color-cyan)" }}>
              <ArrowDown size={18} />
            </div>

            {/* ── LAYER 3: APPLICATION CORE & DUAL-AGENT ENGINE ── */}
            <div
              style={{
                background: "rgba(49, 46, 129, 0.3)",
                border: "1px solid rgba(129, 140, 248, 0.35)",
                borderRadius: "12px",
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "rgba(129, 140, 248, 0.15)",
                      color: "#818CF8",
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    LAYER 3
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-cloud)" }}>
                    Application Core &amp; Dual-Agent Router (FastAPI / LangGraph)
                  </span>
                </div>
                <span style={{ fontSize: "11px", color: "#818CF8", fontFamily: "var(--font-jetbrains), monospace" }}>
                  Voice + State Machine Routing
                </span>
              </div>

              {/* Sub-routing items */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px", marginBottom: "12px" }}>
                <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "12px 14px", borderRadius: "8px", border: "1px solid rgba(129, 140, 248, 0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#A855F7", marginBottom: "4px" }}>
                    <Bot size={15} />
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>Customer Sales Engine (Temp: 0.5)</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Friendly Pakistani Roman Urdu sales persona. Concise 1–3 sentence messages, budget discovery, and proactive deal closing. Never invents calibers or pricing.
                  </div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "12px 14px", borderRadius: "8px", border: "1px solid rgba(129, 140, 248, 0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#38BDF8", marginBottom: "4px" }}>
                    <Terminal size={15} />
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>Owner Co-Pilot Engine (Temp: 0.2)</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Deterministic administrative assistant. Translates natural language messages from the boss (e.g. <em>"Tisas 1911 out of stock kardo"</em>) directly into SQL database mutations.
                  </div>
                </div>
              </div>

              {/* Speech to text banner */}
              <div
                style={{
                  background: "rgba(124, 45, 18, 0.25)",
                  border: "1px solid rgba(251, 146, 60, 0.3)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FB923C", fontWeight: 600, fontSize: "12px", fontFamily: "var(--font-jetbrains), monospace" }}>
                    🎙️ Voice Ingress: Deepgram Nova-3
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--color-fog)" }}>
                    Streams .ogg Opus audio → code-switched Roman Urdu &amp; English text in &lt;400ms.
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "10.5px",
                    background: "rgba(251, 146, 60, 0.2)",
                    color: "#FB923C",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}
                >
                  Nova-3 Speech Engine
                </span>
              </div>
            </div>

            {/* Connection Arrow */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0", color: "#F59E0B" }}>
              <ArrowDown size={18} />
            </div>

            {/* ── LAYER 4: RESPONSIBLE AI — HUMAN-IN-THE-LOOP (HITL) ── */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(69, 26, 3, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)",
                border: "2px solid #F59E0B",
                borderRadius: "12px",
                padding: "18px 20px",
                boxShadow: "0 0 25px -5px rgba(245, 158, 11, 0.2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "rgba(245, 158, 11, 0.2)",
                      color: "#F59E0B",
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(245, 158, 11, 0.4)",
                    }}
                  >
                    RESPONSIBLE AI CORE
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#FEF3C7" }}>
                    Human-in-the-Loop (HITL) Store Owner Supervision Layer
                  </span>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#FDE68A", background: "rgba(245, 158, 11, 0.15)", padding: "2px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Scale size={12} /> Legal Compliance
                  </span>
                  <span style={{ fontSize: "11px", color: "#FDE68A", background: "rgba(245, 158, 11, 0.15)", padding: "2px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Truck size={12} /> Delivery Logistics
                  </span>
                </div>
              </div>

              <div style={{ fontSize: "13px", color: "var(--color-fog)", lineHeight: "1.6", marginBottom: "14px" }}>
                <strong>Why Rabta AI is a Responsible AI System:</strong> In regulated arms commerce, delivery legality, government NOCs, buyer license verification, and fluctuating shop stock depend on physical conditions, local regulations, and human discretion. <strong>The AI is strictly prohibited from making automated delivery or legal commitments.</strong>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                <div style={{ background: "rgba(0, 0, 0, 0.4)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#F59E0B", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileCheck size={14} /> 1. Detection &amp; Safeguard
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Agent flags inquiries involving out-of-city shipping, arms license verification, discounts, or custom inventory queries.
                  </div>
                </div>

                <div style={{ background: "rgba(0, 0, 0, 0.4)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#F59E0B", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <PhoneCall size={14} /> 2. WhatsApp Owner Alert
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    Generates <code>escalate_inquiry</code> ticket. Dispatches immediate WhatsApp push to the Owner with customer context and intent.
                  </div>
                </div>

                <div style={{ background: "rgba(0, 0, 0, 0.4)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#F59E0B", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldCheck size={14} /> 3. Human Authority &amp; Mute
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                    2-Hour Auto-Mute Guard freezes AI responses for that customer. Store owner handles sensitive legal/delivery terms directly with 100% human accountability.
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0", color: "var(--color-cyan)" }}>
              <ArrowDown size={18} />
            </div>

            {/* ── LAYER 5: FOUNDATION MODEL & REASONING ── */}
            <div
              style={{
                background: "rgba(124, 45, 18, 0.2)",
                border: "1px solid rgba(251, 146, 60, 0.35)",
                borderRadius: "12px",
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "rgba(251, 146, 60, 0.15)",
                      color: "#FB923C",
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    LAYER 5
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-cloud)" }}>
                    Foundation Model Layer: Google Gemini 3.5 Flash Lite
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#FB923C",
                    fontFamily: "var(--font-jetbrains), monospace",
                    background: "rgba(251, 146, 60, 0.1)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Sub-Second Native ReACT
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px", fontSize: "12px", color: "var(--color-fog)" }}>
                <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "10px 12px", borderRadius: "8px" }}>
                  <div style={{ fontWeight: 600, color: "#FB923C", marginBottom: "3px" }}>Native Function Calling</div>
                  No brittle regex string scrapers. Gemini 3.5 Flash Lite emits structured JSON tool arguments directly into LangGraph state nodes.
                </div>
                <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "10px 12px", borderRadius: "8px" }}>
                  <div style={{ fontWeight: 600, color: "#FB923C", marginBottom: "3px" }}>Bilingual Code-Switching</div>
                  Zero-shot understanding of Pakistani Roman Urdu (e.g. <em>"bhai 9mm handgun dikhao budget 200k k andar"</em>) seamlessly combined with English gun specs.
                </div>
                <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "10px 12px", borderRadius: "8px" }}>
                  <div style={{ fontWeight: 600, color: "#FB923C", marginBottom: "3px" }}>Low Latency &amp; Efficiency</div>
                  Delivers first token in under 450ms, allowing full ReACT loop completion, database query, and photo attachment in &lt;850ms on WhatsApp.
                </div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0", color: "var(--color-cyan)" }}>
              <ArrowDown size={18} />
            </div>

            {/* ── LAYER 6: NATIVE TOOLS & PERSISTENCE ── */}
            <div
              style={{
                background: "rgba(20, 83, 45, 0.25)",
                border: "1px solid rgba(74, 222, 128, 0.35)",
                borderRadius: "12px",
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "rgba(74, 222, 128, 0.15)",
                      color: "#4ADE80",
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    LAYER 6
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-cloud)" }}>
                    Active ReACT Tools &amp; Grounded Data Layer
                  </span>
                </div>
                <span style={{ fontSize: "11px", color: "#4ADE80", fontFamily: "var(--font-jetbrains), monospace" }}>
                  PostgreSQL 16 + Caddy Media CDN
                </span>
              </div>

              {/* Active Tools Grid */}
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11.5px", fontFamily: "var(--font-jetbrains), monospace", color: "var(--color-mist)", marginBottom: "8px" }}>
                  ZERO-HALLUCINATION TOOL REGISTRY:
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px" }}>
                  {[
                    { name: "search_catalog", desc: "Atomic caliber & price lookups" },
                    { name: "get_product_photos", desc: "Verified studio rollmarks" },
                    { name: "check_delivery_policy", desc: "Dealership delivery terms" },
                    { name: "get_payment_bank_terms", desc: "Advance bank accounts" },
                    { name: "escalate_inquiry", desc: "Generates ESC-XX ticket for Owner" },
                    { name: "update_product_price", desc: "Owner SQL price mutations" },
                    { name: "toggle_in_stock", desc: "Owner real-time stock switch" },
                  ].map((tool) => (
                    <div
                      key={tool.name}
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        padding: "8px 10px",
                        borderRadius: "6px",
                        border: "1px solid rgba(74, 222, 128, 0.2)",
                      }}
                    >
                      <div style={{ fontSize: "11.5px", fontFamily: "var(--font-jetbrains), monospace", color: "#4ADE80", fontWeight: 600 }}>
                        {tool.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
                        {tool.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DB & Media */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px", marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <Database size={16} style={{ color: "#F472B6", marginTop: "2px" }} />
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-fog)" }}>PostgreSQL 16 Database</div>
                    <div style={{ fontSize: "11px", color: "var(--color-mist)", lineHeight: "1.4" }}>
                      Holds multi-tenant configs, firearms SKUs, prices (PKR), active escalation tickets, and 2-hour mute records.
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <Radio size={16} style={{ color: "#38BDF8", marginTop: "2px" }} />
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-fog)" }}>Static Media CDN (/static/catalog_images/)</div>
                    <div style={{ fontSize: "11px", color: "var(--color-mist)", lineHeight: "1.4" }}>
                      Authenticated studio photos served via Caddy with HTTPS. Delivered directly into WhatsApp with dynamic product captions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── View 2: Responsible AI & Human-in-the-Loop Deep Dive ── */}
      {activeView === "hitl" && (
        <div style={{ padding: "24px 20px" }}>
          {/* Header Banner */}
          <div
            style={{
              padding: "16px 18px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F59E0B", fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>
              <ShieldCheck size={18} />
              Responsible AI Architecture: Why Human-in-the-Loop is Mandatory
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "var(--color-fog)", lineHeight: "1.6" }}>
              Rabta AI operates in licensed firearms and defense commerce in Pakistan (Pilot: Haider Arms). Delivering weapons or quoting legal compliance cannot rely solely on probabilistic language models. Unpredictable factors such as <strong>provincial licensing laws, police NOC transit requirements, customer identity verification, and volatile stock availability</strong> mandate direct human oversight.
            </p>
          </div>

          {/* 4 Pillars of Responsible AI */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginBottom: "22px" }}>
            <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F59E0B", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>
                <Scale size={16} /> Legal &amp; Licensing Compliance
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-mist)", lineHeight: "1.6" }}>
                Under Pakistani arms regulations, purchases require valid CNIC identity cards, verified district licenses, and government record keeping. The AI provides factual product data but immediately transfers legal ownership discussions to the licensed dealer.
              </div>
            </div>

            <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#38BDF8", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>
                <Truck size={16} /> Delivery &amp; Transit Logistics
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-mist)", lineHeight: "1.6" }}>
                Firearms cannot be shipped via ordinary couriers. Delivery depends on secure dealer-managed transit, city-specific police checkpoints, and advance deposit clearance. The AI never guarantees automatic shipping; it routes inquiries to the owner.
              </div>
            </div>

            <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10B981", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>
                <Clock size={16} /> Real-Time Stock &amp; Human Factors
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-mist)", lineHeight: "1.6" }}>
                In physical stores, customers walk in and purchase inventory on the spot. Rapid turnover means stock status can change within minutes. The store owner can immediately intervene or update stock via WhatsApp commands.
              </div>
            </div>

            <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A855F7", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>
                <Lock size={16} /> 2-Hour Auto-Mute Safety Guard
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-mist)", lineHeight: "1.6" }}>
                The moment the store owner texts the customer from the business number, the gateway detects the intervention, cancels all pending AI response queues, and mutes autonomous replies for 2 hours to prevent human/AI collision.
              </div>
            </div>
          </div>

          {/* Step-by-Step Escalation Walkthrough */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(86, 232, 208, 0.2)",
              borderRadius: "12px",
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-cyan)", marginBottom: "12px", fontFamily: "var(--font-jetbrains), monospace" }}>
              HITL ESCALATION PROTOCOL (STEP-BY-STEP SEQUENCE)
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  step: "01",
                  title: "Inquiry Ingress & Intent Classification",
                  desc: "Customer asks: 'Can you deliver this Glock 19 to Peshawar and what license documents are required?' The LangGraph customer node classifies the query as containing sensitive legal & delivery intent.",
                },
                {
                  step: "02",
                  title: "Tool Trigger: escalate_inquiry",
                  desc: "Customer Sales Agent halts automated sales commitment. It executes escalate_inquiry(topic='Delivery & Legal', city='Peshawar', product='Glock 19 Gen 5').",
                },
                {
                  step: "03",
                  title: "Ticket Generation & Instant WhatsApp Owner Push",
                  desc: "PostgreSQL creates ticket #ESC-419. An automated high-priority WhatsApp alert is dispatched to Haider (Store Owner) containing the customer's phone, city, and exact request.",
                },
                {
                  step: "04",
                  title: "Customer Bridge Message",
                  desc: "The AI sends a polite, culturally natural Roman Urdu message: 'Jee bhai! Delivery aur legal formalities dukan k owner (Haider bhai) khud handle kartay hain. Unhein aapki inquiry forward kardi hai, woh abhi direct guide karein gay.'",
                },
                {
                  step: "05",
                  title: "2-Hour Mute & Direct Human Closing",
                  desc: "Haider opens WhatsApp, sees the ticket, and replies directly to the customer thread. The 2-Hour Takeover Guard silences the AI so the licensed dealer can finalize the legal paperwork safely.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    borderLeft: "3px solid var(--color-cyan)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontWeight: 800,
                      color: "var(--color-cyan)",
                      background: "rgba(86, 232, 208, 0.1)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  >
                    STEP {item.step}
                  </span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-cloud)", marginBottom: "3px" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-fog)", lineHeight: "1.5" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── View 3: Live Tech Specifications ── */}
      {activeView === "specs" && (
        <div style={{ padding: "24px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
            <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                FOUNDATION REASONING MODEL
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#FB923C", marginTop: "4px" }}>
                Google Gemini 3.5 Flash Lite
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-fog)", marginTop: "8px", lineHeight: "1.5" }}>
                Native function calling without regex parsing. Sub-450ms token latency. High token efficiency and bilingual code-switching comprehension for Pakistani Roman Urdu.
              </div>
            </div>

            <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                SPEECH-TO-TEXT INTELLIGENCE
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#38BDF8", marginTop: "4px" }}>
                Deepgram Nova-3
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-fog)", marginTop: "8px", lineHeight: "1.5" }}>
                Transcribes voice notes in under 400ms. Exceptional acoustic robustness against street noise, Urdu accents, and colloquial arms nomenclature.
              </div>
            </div>

            <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                INGRESS GATEWAY
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#10B981", marginTop: "4px" }}>
                Meta Official WhatsApp Business Platform
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-fog)", marginTop: "8px", lineHeight: "1.5" }}>
                Cloud API with HMAC SHA-256 webhooks. Replaced Baileys WebSocket scraping for enterprise 99.99% uptime and zero account disconnection risk.
              </div>
            </div>

            <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                RESPONSIBLE AI GOVERNANCE
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#F59E0B", marginTop: "4px" }}>
                Human-in-the-Loop (HITL) Guard
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-fog)", marginTop: "8px", lineHeight: "1.5" }}>
                Owner escalation tickets for legal compliance &amp; shipping verification. 2-Hour Auto-Mute Guard preventing AI hallucinations in regulated commerce.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Bar ── */}
      <div
        style={{
          padding: "12px 20px",
          background: "rgba(0, 0, 0, 0.4)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "11.5px",
          fontFamily: "var(--font-jetbrains), monospace",
          color: "var(--color-mist)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#10B981" }}>●</span>
          <span>HAIDER ARMS PRODUCTION CLUSTER · 24/7 LIVE ON VULTR VPS (65.20.90.130)</span>
        </div>
        <div style={{ color: "var(--color-cyan)" }}>
          ZERO-HALLUCINATION CATALOG GROUNDING ACTIVE
        </div>
      </div>
    </div>
  );
}
