"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Database,
  Filter,
  Cpu,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Layers,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

export default function RabtaRAGPipelineDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      badge: "STEP 01",
      title: "Customer WhatsApp Ingress",
      subtitle: "Official Meta Cloud API · Real-time Debounce",
      accent: "#25D366",
      icon: MessageSquare,
      summary: "Customer sends raw text or bilingual Roman Urdu voice notes directly on WhatsApp.",
      details: [
        { label: "Incoming Query", val: '"Salam bhai, Glock 19 Gen 5 Austria ya Tisas Zigana price aur stock kya hai?"' },
        { label: "Voice Pipeline", val: "Deepgram Nova-3 STT converts Roman Urdu .ogg voice notes to text in <320ms." },
        { label: "Sliding Debounce", val: "15-second debounce groups rapid multi-text bursts into a single coherent prompt." },
      ],
    },
    {
      id: 2,
      badge: "STEP 02",
      title: "Phonetic Typo Normalizer",
      subtitle: "Pakistani Roman Urdu & Brand Entity Resolver",
      accent: "#38BDF8",
      icon: Search,
      summary: "Normalizes slang, phonetic Urdu spellings, and brand variations before querying the catalog.",
      details: [
        { label: "Brand Mapping", val: '"glok" / "g-19" ➔ Glock 19 | "bereta" ➔ Beretta 92FS | "tisas" ➔ Tisas Zigana' },
        { label: "Caliber Atomicity", val: 'Strictly preserves atomic caliber tokens: "9mm", "5.56 NATO", ".308 WIN" (never split by tokenizers).' },
        { label: "Dialect Handling", val: 'Resolves Pakistani trade phrasing: "kitne ka hai" ➔ Price inquiry | "dastiyab" ➔ In-stock status.' },
      ],
    },
    {
      id: 3,
      badge: "STEP 03",
      title: "Hybrid Search Engine (PostgreSQL)",
      subtitle: "60% Exact Lexical Match + 40% Dense Vector Math",
      accent: "#818CF8",
      icon: Database,
      summary: "Executes a balanced hybrid query inside a single unified PostgreSQL 16 database.",
      details: [
        { label: "60% Lexical (tsvector)", val: "Exact token matching on brand, model, caliber, and origin (e.g. Glock Austria vs USA)." },
        { label: "40% Semantic (pgvector)", val: "gemini-embedding-002 (768-dim) cosine distance (<=>) for intent matching without exact keywords." },
        { label: "Zero Stack Bloat", val: "No external vector database (Pinecone/Milvus) needed. Eliminates cross-system sync latency." },
      ],
    },
    {
      id: 4,
      badge: "STEP 04",
      title: "Deterministic Hard Pre-Filters",
      subtitle: "SQL-Level Security & Price Lock Verification",
      accent: "#F59E0B",
      icon: Filter,
      summary: "Enforces non-negotiable business rules at the SQL layer before any candidate reaches the LLM.",
      details: [
        { label: "Multi-Tenant Isolation", val: "WHERE tenant_id = 'haider_arms_uuid' ensures zero cross-dealership catalog leakage." },
        { label: "Live Availability", val: "WHERE in_stock = TRUE prevents hallucinating sold-out firearms." },
        { label: "Daily Rate Lock", val: "PRICES_CONFIRMED_TODAY: YES. If unconfirmed, halts automated quotes and emits OWNER_QUERY." },
      ],
    },
    {
      id: 5,
      badge: "STEP 05",
      title: "Agentic Tool Calling (LLM)",
      subtitle: "Google Gemini 3.5 Flash Lite ReACT Loop",
      accent: "#00F0FF",
      icon: Cpu,
      summary: "LLM dynamically invokes search_catalog tool, receiving only the top 3–5 verified SKUs.",
      details: [
        { label: "Context Protection", val: "Injects ~1,200 words (~2,400 tokens), using <0.25% of the 1M token window for zero TTFT lag." },
        { label: "Zero Hallucination", val: "Model is architecturally grounded: it can only quote the exact PKR prices returned by SQL." },
        { label: "Merchant Persona", val: "Generates authentic, polite, 1–3 sentence Pakistani retail response in Roman Urdu/English." },
      ],
    },
    {
      id: 6,
      badge: "STEP 06",
      title: "Multimodal Media Delivery",
      subtitle: "Gemini Vision Rollmark-Audited Photos",
      accent: "#10B981",
      icon: Camera,
      summary: "Dispatches authenticated studio photos over HTTPS with dynamic price tag captions.",
      details: [
        { label: "Rollmark Inspection", val: "Photos pre-audited by Gemini Vision: verifies slide markings, manufacturer stamp & caliber." },
        { label: "Static CDN / Caddy", val: "Delivered over HTTPS via Caddy 2 reverse proxy with ultra-fast edge caching." },
        { label: "Dynamic Tagging", val: "WhatsApp media message includes product model, caliber, and current confirmed PKR rate." },
      ],
    },
  ];

  return (
    <div
      style={{
        margin: "1.5rem 0",
        background: "rgba(10, 14, 23, 0.9)",
        border: "1px solid rgba(0, 240, 255, 0.25)",
        borderRadius: "16px",
        padding: "24px 20px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px -5px rgba(0, 240, 255, 0.12)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* ── Top Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-cyan)",
                boxShadow: "0 0 10px var(--color-cyan)",
              }}
            />
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--color-cloud)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Rabita AI: Agentic Hybrid Search RAG Pipeline
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--color-mist)", lineHeight: "1.5" }}>
            PostgreSQL 16 + pgvector · 60/40 Hybrid Scoring · Deterministic Catalog Grounding · Gemini Vision
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-jetbrains), monospace",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(37, 211, 102, 0.15)",
              color: "#25D366",
              border: "1px solid rgba(37, 211, 102, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={12} /> Haider Arms Production Stack
          </span>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-jetbrains), monospace",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(0, 240, 255, 0.1)",
              color: "var(--color-cyan)",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              fontWeight: 600,
            }}
          >
            Human-Readable Architecture
          </span>
        </div>
      </div>

      {/* ── Visual Flowchart Pipeline ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          const isExpanded = activeStep === step.id;

          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => setActiveStep(isExpanded ? null : step.id)}
                style={{
                  background: isExpanded ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.025)",
                  border: isExpanded ? `1px solid ${step.accent}` : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "16px 18px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isExpanded ? `0 10px 25px -10px ${step.accent}33` : "none",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "260px" }}>
                    {/* Icon container */}
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: `${step.accent}1A`,
                        border: `1px solid ${step.accent}55`,
                        color: step.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={20} />
                    </div>

                    {/* Step Title & Badge */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--font-jetbrains), monospace",
                            fontWeight: 700,
                            color: step.accent,
                            background: `${step.accent}18`,
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {step.badge}
                        </span>
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "var(--color-cloud)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {step.title}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--color-mist)",
                          fontFamily: "var(--font-jetbrains), monospace",
                          marginTop: "2px",
                        }}
                      >
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Summary Snippet & Click prompt */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: step.accent,
                        fontFamily: "var(--font-jetbrains), monospace",
                        background: `${step.accent}12`,
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {isExpanded ? "Collapse Specs ▲" : "View Technical Data ▼"}
                    </span>
                  </div>
                </div>

                {/* Summary line */}
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: "13.5px",
                    color: "var(--color-fog)",
                    lineHeight: "1.55",
                  }}
                >
                  {step.summary}
                </p>

                {/* Expanded Details Box */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: "14px",
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      animation: "fadeIn 0.2s ease-out",
                    }}
                  >
                    {step.details.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "13px",
                          lineHeight: "1.6",
                          background: "rgba(0, 0, 0, 0.3)",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.04)",
                        }}
                      >
                        <span
                          style={{
                            minWidth: "140px",
                            fontFamily: "var(--font-jetbrains), monospace",
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: step.accent,
                          }}
                        >
                          {item.label}:
                        </span>
                        <span style={{ color: "var(--color-fog)", flex: 1 }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Connector arrow between steps */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "-4px 0",
                    color: "rgba(0, 240, 255, 0.4)",
                  }}
                >
                  <ArrowDown size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Bottom Summary Footer ── */}
      <div
        style={{
          marginTop: "20px",
          padding: "14px 16px",
          background: "rgba(0, 240, 255, 0.06)",
          border: "1px solid rgba(0, 240, 255, 0.25)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Sparkles size={16} color="var(--color-cyan)" />
          <span style={{ fontSize: "12.5px", color: "var(--color-fog)" }}>
            <strong>100% Accurate Architecture:</strong> No external vector database or out-of-scope layers. Built natively with PostgreSQL 16 pgvector &amp; Gemini 3.5 Flash Lite.
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            color: "var(--color-cyan)",
          }}
        >
          Response Latency: &lt;850ms
        </span>
      </div>
    </div>
  );
}
