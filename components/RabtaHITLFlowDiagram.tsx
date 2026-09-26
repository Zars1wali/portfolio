"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Ticket,
  Bell,
  Clock,
  UserCheck,
  MessageSquare,
  ArrowDown,
  CheckCircle2,
  Lock,
  Scale,
  Sparkles,
} from "lucide-react";

export default function RabtaHITLFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      badge: "STAGE 01",
      title: "Customer Ingress & Intent Detection",
      subtitle: "Official WhatsApp Cloud API · Sensitive Inquiry",
      accent: "#38BDF8",
      icon: MessageSquare,
      summary: 'Customer asks for delivery or licensing on WhatsApp: "Rawalpindi delivery possible hai aur license verification?"',
      details: [
        { label: "Channel", val: "Meta Official WhatsApp Business API (HMAC SHA-256 verified webhook)." },
        { label: "Customer Query", val: '"Rawalpindi delivery possible hai aur license verification?"' },
        { label: "Core Constraint", val: "Firearms shipping and licensing legality cannot be autonomously promised by an LLM." },
      ],
    },
    {
      id: 2,
      badge: "STAGE 02",
      title: "ReACT Intent Guard & Boundary Trigger",
      subtitle: "Gemini 3.5 Flash Lite · Zero Autonomous Risk",
      accent: "#F59E0B",
      icon: ShieldAlert,
      summary: "LLM detects regulated delivery & licensing intent, blocks automated commitments, and invokes escalate_inquiry.",
      details: [
        { label: "Reasoning Loop", val: "Gemini ReACT recognizes arms shipping/licensing boundary via strict Part A system rules." },
        { label: "Autonomous Block", val: "Model is architecturally forbidden from quoting delivery timelines or confirming NOCs." },
        { label: "Tool Dispatched", val: "Executes escalate_inquiry(customer_id, reason='delivery_licensing', context=...)." },
      ],
    },
    {
      id: 3,
      badge: "STAGE 03",
      title: "PostgreSQL Ticket Persistence (#ESC-XX)",
      subtitle: "ACID Guaranteed · Audit Trail",
      accent: "#818CF8",
      icon: Ticket,
      summary: "PostgreSQL logs structured ticket #ESC-XX with full conversation history, customer phone, and priority score.",
      details: [
        { label: "Database Table", val: "escalation_tickets with foreign key to customer CRM profile." },
        { label: "Audit Metadata", val: "Logs exact conversation snippet, customer verified SIM number, and timestamp." },
        { label: "State", val: "STATUS: PENDING_OWNER_TAKEOVER." },
      ],
    },
    {
      id: 4,
      badge: "STAGE 04",
      title: "Instant Owner WhatsApp Alert",
      subtitle: "Haider Arms Owner Notification Relay",
      accent: "#EF4444",
      icon: Bell,
      summary: "Priority WhatsApp notification dispatched to Store Owner (Haider) with ticket ID and direct WhatsApp reply link.",
      details: [
        { label: "Priority Channel", val: "Direct WhatsApp alert sent to dealer's verified personal number." },
        { label: "Alert Payload", val: "🚨 Urgent Escalation #ESC-42: Customer requesting Rawalpindi transit permit & license verification." },
        { label: "Action Trigger", val: "Owner can reply directly to the customer or instruct the Co-Pilot in Urdu." },
      ],
    },
    {
      id: 5,
      badge: "STAGE 05",
      title: "2-Hour AI Auto-Mute Guard",
      subtitle: "Gateway Thread Freezing · Collision Protection",
      accent: "#A855F7",
      icon: Clock,
      summary: "The instant the owner replies to the customer thread, the gateway freezes AI responses for 2 hours.",
      details: [
        { label: "Gateway Detection", val: "Node.js gateway detects owner's phone ID on the target customer thread." },
        { label: "Buffer Purge", val: "Pending debounce buffers and AI response queues are immediately purged." },
        { label: "Collision Zero", val: "Eliminates embarrassing double-replies or conflicting pricing between AI and human." },
      ],
    },
    {
      id: 6,
      badge: "STAGE 06",
      title: "Authoritative Human Resolution",
      subtitle: "Licensed Dealership Compliance",
      accent: "#10B981",
      icon: UserCheck,
      summary: "Licensed dealer takes over directly: reviews provincial NOCs, CNIC, and schedules physical shop pickup with 100% legal compliance.",
      details: [
        { label: "Legal Validation", val: "Physical verification of buyer's Computerized National Identity Card & official arms license." },
        { label: "Safe Logistics", val: "Arranges authorized dealer-to-dealer transfer or physical in-store visit in accordance with law." },
        { label: "Deal Closure", val: "Deal finalized with complete human accountability and legal compliance." },
      ],
    },
  ];

  return (
    <div
      style={{
        margin: "1.5rem 0",
        background: "rgba(10, 15, 26, 0.9)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
        borderRadius: "16px",
        padding: "24px 20px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px -5px rgba(245, 158, 11, 0.12)",
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
                background: "#F59E0B",
                boxShadow: "0 0 10px #F59E0B",
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
              Responsible AI: Human-in-the-Loop (HITL) Workflow
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--color-mist)", lineHeight: "1.5" }}>
            Strict Legal &amp; Delivery Guardrails · 2-Hour Auto-Mute · Zero Hallucination Risk
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-jetbrains), monospace",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(245, 158, 11, 0.15)",
              color: "#F59E0B",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 600,
            }}
          >
            <Scale size={12} /> Legal Compliance Loop
          </span>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-jetbrains), monospace",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10B981",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={12} /> Production Deployed
          </span>
        </div>
      </div>

      {/* ── Flow Stages ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
                      {isExpanded ? "Collapse Details ▲" : "View Mechanism ▼"}
                    </span>
                  </div>
                </div>

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
                            minWidth: "150px",
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

              {idx < steps.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "-4px 0",
                    color: "rgba(245, 158, 11, 0.4)",
                  }}
                >
                  <ArrowDown size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          marginTop: "20px",
          padding: "14px 16px",
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Sparkles size={16} color="#F59E0B" />
          <span style={{ fontSize: "12.5px", color: "var(--color-fog)" }}>
            <strong>Human Governance Guarantee:</strong> No customer is committed to arms shipping or legal terms without direct licensed human oversight.
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            color: "#F59E0B",
          }}
        >
          Auto-Mute Window: 2.0 Hours
        </span>
      </div>
    </div>
  );
}
