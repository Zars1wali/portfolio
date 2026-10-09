"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  ExternalLink,
  Layers,
  ShieldCheck,
  Cpu,
  Database,
  Radio,
  Sparkles,
  Move,
  X,
  CheckCircle2,
  Server,
  ArrowRight,
} from "lucide-react";

export default function RabtaArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<"flowchart" | "hitl" | "docker">("flowchart");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.6));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const handleActualSize = () => {
    setZoom(2.0);
    setPan({ x: 0, y: 0 });
  };

  const handleOpenFullscreen = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsFullscreen(false);
  };

  // Drag to pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3.5));
    } else {
      setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.6));
    }
  };

  // Keyboard navigation & ESC handler for fullscreen
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseFullscreen();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll during fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullscreen]);

  const activeImageSrc =
    activeTab === "flowchart"
      ? "/images/rabta-system-architecture.png"
      : activeTab === "hitl"
      ? "/images/rabta-hitl-workflow.jpg"
      : "/images/rabta-docker-topology.jpg";

  return (
    <div
      style={{
        margin: "2.5rem 0",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* ── Main Blueprint Deck ── */}
      <div
        ref={containerRef}
        style={{
          background: "rgba(10, 15, 26, 0.92)",
          border: "1px solid rgba(86, 232, 208, 0.3)",
          borderRadius: "20px",
          overflow: "hidden",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 45px -10px rgba(86, 232, 208, 0.12)",
        }}
      >
        {/* ── Header Deck ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            background: "rgba(255, 255, 255, 0.03)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          {/* Title & Metadata */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(86, 232, 208, 0.12)",
                border: "1px solid rgba(86, 232, 208, 0.35)",
                color: "var(--color-cyan)",
              }}
            >
              <Layers size={22} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "var(--color-cloud)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Rabta AI — Full System Architecture
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(56, 189, 248, 0.15)",
                    color: "#38BDF8",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  PRODUCTION V2 · 6 LAYERS
                </span>
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--color-mist)",
                  marginTop: "3px",
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                Meta WhatsApp Platform · FastAPI + LangGraph Dual Agents · Google Gemini 3.5 ReAct · PostgreSQL
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              background: "rgba(0, 0, 0, 0.4)",
              padding: "4px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {[
              { id: "flowchart", label: "Master Architecture Flowchart" },
              { id: "hitl", label: "Responsible AI (HITL)" },
              { id: "docker", label: "Docker Topology" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  handleResetZoom();
                }}
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  padding: "7px 14px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: activeTab === tab.id ? "rgba(86, 232, 208, 0.18)" : "transparent",
                  color: activeTab === tab.id ? "var(--color-cyan)" : "var(--color-mist)",
                  border:
                    activeTab === tab.id
                      ? "1px solid rgba(86, 232, 208, 0.4)"
                      : "1px solid transparent",
                  fontWeight: activeTab === tab.id ? 600 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Viewport Control Deck ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            background: "rgba(15, 23, 42, 0.6)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "12px",
            color: "var(--color-mist)",
          }}
        >
          {/* Left: Diagram Status & Hint */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10B981",
                boxShadow: "0 0 8px #10B981",
                display: "inline-block",
              }}
            />
            <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {activeTab === "flowchart"
                ? "4K Master Diagram (3619 × 2632 px)"
                : activeTab === "hitl"
                ? "Responsible AI Human Guardrail Workflow"
                : "Docker Multi-Container Service Topology"}
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <span style={{ fontSize: "11px", color: "var(--color-mist)" }}>
              {zoom > 1 ? "Drag to pan · Double-click to reset" : "Click Fullscreen for 100% monitor scale"}
            </span>
          </div>

          {/* Right: Interactive Zoom & Fullscreen Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "var(--color-fog)",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              <ZoomIn size={14} />
            </button>

            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "var(--color-fog)",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              <ZoomOut size={14} />
            </button>

            <button
              onClick={handleActualSize}
              title="100% Native 4K Pixel Size"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "var(--color-fog)",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "11.5px",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              1:1 4K
            </button>

            <button
              onClick={handleResetZoom}
              title="Reset Zoom & Pan"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "var(--color-fog)",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              <RotateCcw size={13} /> Fit
            </button>

            <button
              onClick={handleOpenFullscreen}
              title="Fullscreen Lightbox Mode"
              style={{
                background: "rgba(86, 232, 208, 0.15)",
                border: "1px solid rgba(86, 232, 208, 0.4)",
                color: "var(--color-cyan)",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              <Maximize2 size={13} /> Whole Page (Fullscreen)
            </button>

            <a
              href={activeImageSrc}
              download={activeTab === "flowchart" ? "Rabta_AI_Architecture_Master_4K.png" : undefined}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Master Image"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "var(--color-fog)",
                padding: "6px 10px",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              <Download size={13} />
            </a>
          </div>
        </div>

        {/* ── Interactive Image Canvas ── */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleResetZoom}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "520px",
            maxHeight: "850px",
            overflow: "hidden",
            background: "#070A12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            userSelect: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImageSrc}
            alt="Rabta AI System Architecture Diagram"
            draggable={false}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              maxWidth: "none",
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* ── Interactive Footer Controls & Flow Summary ── */}
        <div
          style={{
            padding: "16px 24px",
            background: "rgba(255, 255, 255, 0.02)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* 6-Layer Path Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--color-mist)",
              overflowX: "auto",
            }}
          >
            <span style={{ color: "#38BDF8", fontWeight: 700 }}>1. WhatsApp Client</span>
            <ArrowRight size={12} />
            <span style={{ color: "#10B981", fontWeight: 700 }}>2. WhatsApp Gateway</span>
            <ArrowRight size={12} />
            <span style={{ color: "#818CF8", fontWeight: 700 }}>3. FastAPI + LangGraph Core</span>
            <ArrowRight size={12} />
            <span style={{ color: "#FB923C", fontWeight: 700 }}>4. Gemini 2.5 / 3.5 ReAct</span>
            <ArrowRight size={12} />
            <span style={{ color: "#4ADE80", fontWeight: 700 }}>5. ReAct Tool Registry</span>
            <ArrowRight size={12} />
            <span style={{ color: "#F472B6", fontWeight: 700 }}>6. PostgreSQL 16 &amp; Media</span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleOpenFullscreen}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-jetbrains), monospace",
                color: "var(--color-cyan)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Open Fullscreen Lightbox ↗
            </button>
          </div>
        </div>
      </div>

      {/* ── 3 High-Level Architectural Specification Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {/* Card 1: Edge Gateway */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "6px",
                background: "rgba(56, 189, 248, 0.15)",
                color: "#38BDF8",
                fontSize: "11px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontWeight: 700,
              }}
            >
              LAYER 2
            </span>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#38BDF8" }}>
              ⚡ WhatsApp Gateway Layer
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "16px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--color-mist)",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>15s Sliding Burst Debounce:</strong> Aggregates rapid
              multi-bubble customer messages into a single prompt context before triggering LLM generation.
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Live Typing Interceptor:</strong> Listens for WhatsApp{" "}
              <code>presence.update</code> (composing / recording) and dynamically extends debounce windows.
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>2-Hour Auto-Mute Guard:</strong> Automatically silences
              AI for 2 hours if store owner manually replies to a customer thread.
            </li>
            <li>
              <strong style={{ color: "var(--color-fog)" }}>LID &amp; Contact Resolver:</strong> Resolves 15-digit
              WhatsApp privacy LIDs to verified customer records and escalation tickets.
            </li>
          </ul>
        </div>

        {/* Card 2: Dual-Agent Core */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "6px",
                background: "rgba(168, 85, 247, 0.15)",
                color: "#C084FC",
                fontSize: "11px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontWeight: 700,
              }}
            >
              LAYER 3 &amp; 4
            </span>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#C084FC" }}>
              🧠 Dual-Agent Intelligence Core
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "16px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--color-mist)",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Customer Sales Agent (Temp: 0.5):</strong> Fast, warm
              Pakistani salesman persona. Delivers punchy 1–3 sentence responses and closes orders.
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Owner Co-Pilot Node (Temp: 0.2):</strong> Deterministic
              ReAct assistant for real-time catalog price updates, stock toggling, and margin controls.
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Zero-Hallucination Grounding:</strong> Never improvises
              specs or prices; retrieves live verified records via async PostgreSQL connection pooling.
            </li>
            <li>
              <strong style={{ color: "var(--color-fog)" }}>Deepgram Nova-2 Integration:</strong> Real-time Urdu
              voice note speech-to-text with auto code-switching for Roman Urdu.
            </li>
          </ul>
        </div>

        {/* Card 3: Business Logic & Tools */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(74, 222, 128, 0.25)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "6px",
                background: "rgba(74, 222, 128, 0.15)",
                color: "#4ADE80",
                fontSize: "11px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontWeight: 700,
              }}
            >
              LAYER 5 &amp; 6
            </span>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#4ADE80" }}>
              🛡️ Business Logic &amp; ReAct Tools
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "16px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--color-mist)",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Order Intake Funnel:</strong> Sequentially collects (1)
              Full Name, (2) Destination City, (3) Delivery Address, and (4) Mobile SIM.
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Escalation Desk (ESC-XX):</strong> Automatically routes
              out-of-city delivery inquiries and license compliance questions to owner&apos;s WhatsApp.
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong style={{ color: "var(--color-fog)" }}>Verified Studio Rollmarks:</strong> Sends authenticated
              firearm pictures directly into the WhatsApp conversation as native media.
            </li>
            <li>
              <strong style={{ color: "var(--color-fog)" }}>Advance Banking Security:</strong> Issues verified
              bank transfer details strictly through authorized dealership accounts.
            </li>
          </ul>
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal (Teleported to document.body via Portal) ── */}
      {mounted && typeof document !== "undefined" && isFullscreen
        ? createPortal(
            <div
              ref={fullscreenContainerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Rabta AI System Architecture Fullscreen Lightbox"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 999999,
                background: "rgba(3, 7, 18, 0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
              }}
            >
              {/* Fullscreen Header Deck */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 24px",
                  background: "rgba(10, 15, 26, 0.96)",
                  borderBottom: "1px solid rgba(86, 232, 208, 0.25)",
                  boxShadow: "0 4px 25px rgba(0, 0, 0, 0.7)",
                  zIndex: 10,
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {/* Left: Title + Mode Badge + Tab Switcher */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "var(--color-cloud)",
                        fontFamily: "var(--font-jetbrains), monospace",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Rabta AI — {activeTab === "flowchart" ? "4K Master Architecture Blueprint" : activeTab === "hitl" ? "Responsible AI (HITL) Workflow" : "Docker Topology"}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: "rgba(86, 232, 208, 0.15)",
                        color: "var(--color-cyan)",
                        border: "1px solid rgba(86, 232, 208, 0.35)",
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      FULLSCREEN
                    </span>
                  </div>

                  {/* Quick Diagram Switcher in Fullscreen */}
                  <div
                    style={{
                      display: "inline-flex",
                      gap: "4px",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "3px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {[
                      { id: "flowchart", label: "Master Architecture" },
                      { id: "hitl", label: "Responsible AI" },
                      { id: "docker", label: "Docker Topology" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          handleResetZoom();
                        }}
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-jetbrains), monospace",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          background: activeTab === tab.id ? "rgba(86, 232, 208, 0.18)" : "transparent",
                          color: activeTab === tab.id ? "var(--color-cyan)" : "var(--color-mist)",
                          border:
                            activeTab === tab.id
                              ? "1px solid rgba(86, 232, 208, 0.4)"
                              : "1px solid transparent",
                          fontWeight: activeTab === tab.id ? 600 : 400,
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Fullscreen Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  {/* Zoom controls */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "2px",
                    }}
                  >
                    <button
                      onClick={handleZoomOut}
                      title="Zoom Out (-)"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#FFFFFF",
                        padding: "6px 9px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <ZoomOut size={14} />
                    </button>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "var(--color-cyan)",
                        padding: "0 6px",
                        minWidth: "42px",
                        textAlign: "center",
                      }}
                    >
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      title="Zoom In (+)"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#FFFFFF",
                        padding: "6px 9px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <ZoomIn size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleActualSize}
                    title="200% High-Detail Native Pixel Size"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "11.5px",
                      fontFamily: "var(--font-jetbrains), monospace",
                    }}
                  >
                    2x Detail
                  </button>

                  <button
                    onClick={handleResetZoom}
                    title="Fit to Screen"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11.5px",
                      fontFamily: "var(--font-jetbrains), monospace",
                    }}
                  >
                    <RotateCcw size={13} /> Fit
                  </button>

                  <a
                    href={activeImageSrc}
                    download={
                      activeTab === "flowchart"
                        ? "Rabta_AI_Architecture_Master_4K.png"
                        : activeTab === "hitl"
                        ? "Rabta_Responsible_AI_HITL.jpg"
                        : "Rabta_Docker_Topology.jpg"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download Current Diagram"
                    style={{
                      background: "rgba(86, 232, 208, 0.18)",
                      border: "1px solid rgba(86, 232, 208, 0.4)",
                      color: "var(--color-cyan)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      fontFamily: "var(--font-jetbrains), monospace",
                    }}
                  >
                    <Download size={13} /> Download
                  </a>

                  <button
                    onClick={handleCloseFullscreen}
                    title="Exit Fullscreen (Esc)"
                    style={{
                      background: "rgba(239, 68, 68, 0.18)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#F87171",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      fontFamily: "var(--font-jetbrains), monospace",
                    }}
                  >
                    <X size={15} /> Close (Esc)
                  </button>
                </div>
              </div>

              {/* Fullscreen Interactive Canvas */}
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDoubleClick={handleResetZoom}
                onWheel={handleWheel}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "calc(100vh - 65px)",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                  padding: "16px",
                  boxSizing: "border-box",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImageSrc}
                  alt="Rabta AI System Architecture Master Fullscreen"
                  draggable={false}
                  style={{
                    maxWidth: "96vw",
                    maxHeight: "86vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transformOrigin: "center center",
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                    userSelect: "none",
                    borderRadius: "10px",
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(86, 232, 208, 0.12)",
                    border: "1px solid rgba(86, 232, 208, 0.25)",
                    background: "#070A12",
                  }}
                />

                {/* Subtle Floating Bottom Pill Hint */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(10, 15, 26, 0.88)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "20px",
                    padding: "6px 16px",
                    fontSize: "11px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: "var(--color-mist)",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <span>{zoom > 1 ? "Drag to pan" : "Mouse wheel or controls to zoom"}</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>•</span>
                  <span>Double-click to fit</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>•</span>
                  <kbd style={{ background: "rgba(255, 255, 255, 0.12)", padding: "1px 6px", borderRadius: "4px", color: "var(--color-cloud)" }}>Esc</kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
