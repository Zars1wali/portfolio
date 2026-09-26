"use client";

import React, { useState } from "react";
import {
  Server,
  Network,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";

export default function RabtaDockerTopologyDiagram() {
  const [activeTab, setActiveTab] = useState<"containers" | "volumes">("containers");

  const containers = [
    {
      name: "rabta_caddy",
      image: "caddy:2-alpine",
      role: "Auto-TLS Reverse Proxy & Media Edge",
      ports: "Ports 80 / 443 (Public Ingress)",
      accent: "#38BDF8",
      status: "Up (healthy) · Auto-TLS",
      description: "Terminates HTTPS with automated Let's Encrypt certificates. Reverse proxies WhatsApp webhooks to gateway and API requests to backend. Serves verified studio catalog photos with edge cache headers.",
      specs: ["Reverse Proxy", "Auto Let's Encrypt", "HTTP/2 & HTTP/3", "Static Photo CDN"],
    },
    {
      name: "rabta_gateway",
      image: "node:20-alpine",
      role: "Official Meta WhatsApp Gateway",
      ports: "Port 3001 (rabta_internal bridge)",
      accent: "#10B981",
      status: "Up (healthy) · Official Meta",
      description: "Direct Meta Graph API webhook endpoint. Validates HMAC SHA-256 signatures, manages 15-second sliding debounce for burst messages, enforces the 2-hour owner takeover mute guard, and emits WhatsApp typing presence.",
      specs: ["Meta Official Cloud API", "15s Burst Debouncer", "2hr Takeover Guard", "Typing Presence (LID)"],
    },
    {
      name: "rabta_backend",
      image: "python:3.14-slim",
      role: "FastAPI + LangGraph ReACT Engine",
      ports: "Port 8000 (rabta_internal bridge)",
      accent: "#818CF8",
      status: "Up (healthy) · Uvicorn Async",
      description: "Core intelligence node. Executes LangGraph 3-node state machine, orchestrates Gemini 3.5 Flash Lite tool-calling loops, streams audio to Deepgram Nova-3 via async WebSockets, and validates catalog grounding.",
      specs: ["Python 3.14 + FastAPI", "LangGraph State Machine", "google-genai SDK", "Deepgram Nova-3 STT"],
    },
    {
      name: "rabta_postgres",
      image: "postgres:16-alpine",
      role: "Relational & pgvector Storage Engine",
      ports: "Internal Only (Zero Public Exposure)",
      accent: "#F59E0B",
      status: "Up (healthy) · Internal Bridge",
      description: "Unified database engine. Stores multi-tenant customer records, daily confirmed prices, pgvector 768-dim embeddings for hybrid search, and escalation tickets. Isolated completely from public internet for maximum security.",
      specs: ["PostgreSQL 16", "pgvector Extension", "Async SQLAlchemy Pool (5-15)", "Zero External Exposure"],
    },
  ];

  const volumes = [
    {
      name: "postgres_data",
      mount: "/var/lib/postgresql/data",
      purpose: "ACID persistent storage for product catalog, prices, pgvector embeddings, and #ESC-XX tickets.",
      security: "Encrypted at rest · Daily automated snapshot",
      accent: "#F59E0B",
    },
    {
      name: "gateway_auth",
      mount: "/app/auth_data",
      purpose: "Encrypted session tokens, webhook secrets, and phone LID resolution mappings.",
      security: "Strict POSIX permissions 0600",
      accent: "#10B981",
    },
    {
      name: "caddy_data",
      mount: "/data/caddy",
      purpose: "Let's Encrypt automated TLS certificates, private keys, and OCSP staples.",
      security: "Auto-renewed SSL/TLS keys",
      accent: "#38BDF8",
    },
    {
      name: "catalog_images",
      mount: "/static/catalog_images",
      purpose: "High-resolution studio firearm photography audited by Gemini Vision rollmark detection.",
      security: "Read-only web delivery via Caddy",
      accent: "#818CF8",
    },
  ];

  return (
    <div
      style={{
        margin: "1.5rem 0",
        background: "rgba(10, 14, 23, 0.9)",
        border: "1px solid rgba(86, 232, 208, 0.25)",
        borderRadius: "16px",
        padding: "24px 20px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px -5px rgba(86, 232, 208, 0.1)",
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
            <Server size={18} color="var(--color-cyan)" />
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--color-cloud)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Docker Compose Production Topology
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--color-mist)", lineHeight: "1.5" }}>
            Host: Vultr Cloud VPS (Ubuntu 24.04 LTS) · Isolated <code style={{ color: "var(--color-cyan)" }}>rabta_internal</code> Bridge Network
          </p>
        </div>

        {/* View Switcher */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(255, 255, 255, 0.05)", padding: "4px", borderRadius: "8px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("containers")}
            style={{
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains), monospace",
              cursor: "pointer",
              border: "none",
              background: activeTab === "containers" ? "rgba(0, 240, 255, 0.2)" : "transparent",
              color: activeTab === "containers" ? "var(--color-cyan)" : "var(--color-mist)",
              fontWeight: activeTab === "containers" ? 600 : 400,
              transition: "all 0.15s ease",
            }}
          >
            4 Microservice Containers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("volumes")}
            style={{
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains), monospace",
              cursor: "pointer",
              border: "none",
              background: activeTab === "volumes" ? "rgba(0, 240, 255, 0.2)" : "transparent",
              color: activeTab === "volumes" ? "var(--color-cyan)" : "var(--color-mist)",
              fontWeight: activeTab === "volumes" ? 600 : 400,
              transition: "all 0.15s ease",
            }}
          >
            4 Persistent Volumes
          </button>
        </div>
      </div>

      {/* ── Network Banner ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: "rgba(0, 240, 255, 0.05)",
          border: "1px solid rgba(0, 240, 255, 0.18)",
          borderRadius: "8px",
          marginBottom: "16px",
          fontSize: "12px",
          fontFamily: "var(--font-jetbrains), monospace",
          color: "var(--color-fog)",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Network size={14} color="var(--color-cyan)" />
          <span>Internal Subnet: <strong>rabta_internal</strong> (172.28.0.0/16 virtual bridge)</span>
        </div>
        <span style={{ color: "#10B981", display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <CheckCircle2 size={12} /> Live VPS Deployment (Haider Arms)
        </span>
      </div>

      {/* ── Content: Containers ── */}
      {activeTab === "containers" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "14px" }}>
          {containers.map((c, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255, 255, 255, 0.025)",
                border: `1px solid ${c.accent}40`,
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <code
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: c.accent,
                        fontFamily: "var(--font-jetbrains), monospace",
                      }}
                    >
                      {c.name}
                    </code>
                    <div style={{ fontSize: "11px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace" }}>
                      Image: {c.image}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      padding: "2px 7px",
                      borderRadius: "4px",
                      background: "rgba(37, 211, 102, 0.15)",
                      color: "#25D366",
                      border: "1px solid rgba(37, 211, 102, 0.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ● Healthy
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--color-cloud)",
                    marginBottom: "6px",
                  }}
                >
                  {c.role}
                </div>

                <p style={{ margin: 0, fontSize: "12.5px", color: "var(--color-fog)", lineHeight: "1.55" }}>
                  {c.description}
                </p>
              </div>

              {/* Specs & Ports */}
              <div>
                <div
                  style={{
                    padding: "6px 10px",
                    background: "rgba(0, 0, 0, 0.35)",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    fontSize: "11.5px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: c.accent,
                    marginBottom: "8px",
                  }}
                >
                  {c.ports}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {c.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: "10.5px",
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "var(--color-mist)",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.07)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Content: Volumes ── */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "14px" }}>
          {volumes.map((v, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255, 255, 255, 0.025)",
                border: `1px solid ${v.accent}40`,
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <HardDrive size={16} color={v.accent} />
                  <code
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: v.accent,
                      fontFamily: "var(--font-jetbrains), monospace",
                    }}
                  >
                    {v.name}
                  </code>
                </div>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: "var(--color-cyan)",
                    marginBottom: "8px",
                  }}
                >
                  Mount: {v.mount}
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "var(--color-fog)", lineHeight: "1.55" }}>
                  {v.purpose}
                </p>
              </div>

              <div
                style={{
                  padding: "6px 10px",
                  background: "rgba(0, 0, 0, 0.35)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  fontSize: "11px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "#10B981",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={13} />
                <span>{v.security}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
