"use client";

import { useEffect, useState, useRef } from "react";

interface LogEntry {
  id: number;
  time: string;
  type: "info" | "success" | "warning" | "signal";
  text: string;
}

interface MarketRow {
  asset: string;
  yesBid: number;
  noBid: number;
  spread: number;
  combined: number;
  discount: number;
  remainSec: number;
}

export default function PolymarketLiveDashboard() {
  const [uptimeSec, setUptimeSec] = useState(874);
  const [balance, setBalance] = useState(1004.85);
  const [dailyPnL, setDailyPnL] = useState(11.35);
  const [totalTrades, setTotalTrades] = useState(14);

  const [markets, setMarkets] = useState<MarketRow[]>([
    { asset: "BTC", yesBid: 0.420, noBid: 0.545, spread: 0.025, combined: 0.965, discount: 3.62, remainSec: 215 },
    { asset: "ETH", yesBid: 0.485, noBid: 0.500, spread: 0.015, combined: 0.985, discount: 1.52, remainSec: 260 },
    { asset: "SOL", yesBid: 0.390, noBid: 0.575, spread: 0.035, combined: 0.965, discount: 3.62, remainSec: 95 },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, time: "22:53:50", type: "info", text: "[C++ ENGINE] Boost.Asio event loop running on 4 threads (<0.8ms tick-to-trade)" },
    { id: 2, time: "22:53:52", type: "info", text: "[BINANCE WS] BTCUSDT @ $83,450.00 · Latency: 12ms" },
    { id: 3, time: "22:53:58", type: "signal", text: "[DUMP HEDGE] Signal detected on SOL: YES+NO = 0.965 (3.62% discount)" },
    { id: 4, time: "22:53:58", type: "success", text: "[EIP-712] Signed via libsecp256k1 (320µs) · FAK order filled 40 shares @ $0.965" },
    { id: 5, time: "22:54:04", type: "info", text: "[EDGE DETECTOR] Evaluating BTC 5-min window · Sigmoid model P(UP)=0.65" },
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // 1. Ticking clock & uptime timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSec((prev) => prev + 1);

      // Decrement window remaining seconds
      setMarkets((prev) =>
        prev.map((m) => ({
          ...m,
          remainSec: m.remainSec > 1 ? m.remainSec - 1 : 300,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Simulated orderbook tick fluctuations (every 1.8s)
  useEffect(() => {
    const tickTimer = setInterval(() => {
      setMarkets((prev) =>
        prev.map((m) => {
          const delta = (Math.random() - 0.5) * 0.01;
          const newYes = Math.max(0.35, Math.min(0.65, Number((m.yesBid + delta).toFixed(3))));
          const newNo = Math.max(0.35, Math.min(0.65, Number((m.noBid - delta * 0.8).toFixed(3))));
          const combined = Number((newYes + newNo).toFixed(3));
          const discount = Number((Math.max(0, (1 - combined) * 100)).toFixed(2));
          return {
            ...m,
            yesBid: newYes,
            noBid: newNo,
            combined,
            discount,
          };
        })
      );
    }, 1800);
    return () => clearInterval(tickTimer);
  }, []);

  // 3. Simulated log generator & profit realization (every 3.5s)
  useEffect(() => {
    const possibleLogs = [
      { type: "info" as const, text: "[BINANCE WS] BTCUSDT tick +$45.00 · simdjson parse time: 1.1µs" },
      { type: "info" as const, text: "[POLYMARKET CLOB] Orderbook snapshot received · 24 active depth levels" },
      { type: "signal" as const, text: "[LATENCY ARB] Oracle lag detected! BTC fair value P(UP)=0.68 vs Token 0.52" },
      { type: "success" as const, text: "[EIP-712] secp256k1 signature created in 315µs · FAK Buy UP @ 0.52 filled" },
      { type: "success" as const, text: "[DUMP HEDGE] Target profit 70% reached on position · Locked profit +$0.18 captured" },
      { type: "info" as const, text: "[RISK ENGINE] Circuit breaker check passed · Drawdown: 0.00% · Daily limit ok" },
    ];

    const logTimer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const randomLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
      
      const newEntry: LogEntry = {
        id: Date.now(),
        time: timeStr,
        type: randomLog.type,
        text: randomLog.text,
      };

      setLogs((prev) => [...prev.slice(-15), newEntry]);

      // Randomly credit small PnL on success
      if (randomLog.type === "success") {
        const profit = Number((Math.random() * 0.25 + 0.05).toFixed(2));
        setBalance((b) => Number((b + profit).toFixed(2)));
        setDailyPnL((p) => Number((p + profit).toFixed(2)));
        setTotalTrades((t) => t + 1);
      }
    }, 3500);

    return () => clearInterval(logTimer);
  }, []);

  // Auto scroll terminal log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Format uptime HH:MM:SS
  const formatUptime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600).toString().padStart(2, "0");
    const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0");
    const s = (totalSec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Format mm:ss
  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(86,232,208,0.25)",
        background: "#080c14",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(86,232,208,0.12)",
        fontFamily: "var(--font-jetbrains), monospace",
        color: "#EDEFF3",
        margin: "24px 0 32px",
      }}
    >
      {/* ── Terminal Window Chrome ── */}
      <div
        style={{
          background: "#121824",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--color-mist)",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "var(--color-cyan)" }}>polymarket_bot</span>
          <span>·</span>
          <span>C++20 EXECUTION ENGINE</span>
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#56E8D0",
            background: "rgba(86,232,208,0.1)",
            border: "1px solid rgba(86,232,208,0.25)",
            padding: "2px 8px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#56E8D0",
              boxShadow: "0 0 6px #56E8D0",
              animation: "pulse 1.5s infinite",
            }}
          />
          LIVE EXECUTION (&lt;0.8ms)
        </div>
      </div>

      {/* ── Top Header Metrics ── */}
      <div
        style={{
          padding: "16px 20px",
          background: "rgba(13,17,23,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-mist)", textTransform: "uppercase" }}>Strategy</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-cyan)", marginTop: "2px" }}>
            LATENCY + DUMP HEDGE
          </div>
        </div>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-mist)", textTransform: "uppercase" }}>Balance (USDC)</div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#34d399", marginTop: "2px" }}>
            ${balance.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-mist)", textTransform: "uppercase" }}>Daily PnL</div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#34d399", marginTop: "2px" }}>
            +${dailyPnL.toFixed(2)} (100% win)
          </div>
        </div>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-mist)", textTransform: "uppercase" }}>Engine Uptime</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-fog)", marginTop: "2px" }}>
            {formatUptime(uptimeSec)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-mist)", textTransform: "uppercase" }}>Total Trades</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-violet)", marginTop: "2px" }}>
            {totalTrades} filled
          </div>
        </div>
      </div>

      {/* ── Main Dashboard Body Grid ── */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* ── Active Markets Table ── */}
        <div
          style={{
            background: "rgba(13,17,23,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "14px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-cyan)" }}>
              {"// ACTIVE MARKETS (5-MIN WINDOWS)"}
            </span>            <span style={{ fontSize: "10px", color: "var(--color-mist)" }}>
              Binance WS: <span style={{ color: "#34d399" }}>Connected (12ms)</span>
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--color-mist)" }}>
                  <th style={{ padding: "6px 8px" }}>ASSET</th>
                  <th style={{ padding: "6px 8px" }}>YES BID</th>
                  <th style={{ padding: "6px 8px" }}>NO BID</th>
                  <th style={{ padding: "6px 8px" }}>SPREAD</th>
                  <th style={{ padding: "6px 8px" }}>COMBINED</th>
                  <th style={{ padding: "6px 8px" }}>DISCOUNT</th>
                  <th style={{ padding: "6px 8px" }}>REMAIN</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr
                    key={m.asset}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: m.discount > 2.5 ? "rgba(52,211,153,0.06)" : "transparent",
                      transition: "background 0.3s",
                    }}
                  >
                    <td style={{ padding: "8px", fontWeight: 700, color: m.asset === "BTC" ? "#f59e0b" : m.asset === "ETH" ? "#00d4ff" : "#a78bfa" }}>
                      {m.asset}
                    </td>
                    <td style={{ padding: "8px", color: "#34d399" }}>{m.yesBid.toFixed(3)}</td>
                    <td style={{ padding: "8px", color: "#ef4444" }}>{m.noBid.toFixed(3)}</td>
                    <td style={{ padding: "8px", color: "var(--color-mist)" }}>{m.spread.toFixed(3)}</td>
                    <td style={{ padding: "8px", color: m.combined < 0.98 ? "#a78bfa" : "var(--color-fog)", fontWeight: 600 }}>
                      {m.combined.toFixed(3)}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <span
                        style={{
                          background: m.discount > 2.5 ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)",
                          color: m.discount > 2.5 ? "#34d399" : "var(--color-mist)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontWeight: m.discount > 2.5 ? 700 : 400,
                        }}
                      >
                        {m.discount > 0 ? `${m.discount}%` : "—"}
                      </span>
                    </td>
                    <td style={{ padding: "8px", color: "var(--color-mist)" }}>{formatMinSec(m.remainSec)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Split Panel: Open Positions + Engine/Risk Status ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          
          {/* Open Positions */}
          <div
            style={{
              background: "rgba(13,17,23,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-violet)" }}>
              {"// OPEN POSITIONS (ACTIVE HEDGES)"}
            </span>

            {/* Position 1 */}
            <div
              style={{
                background: "rgba(17,24,39,0.9)",
                border: "1px solid #a78bfa",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "11px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#a78bfa", fontWeight: 700 }}>DH · BTC (5-MIN)</span>
                <span style={{ background: "#1a1a2e", color: "#a78bfa", padding: "1px 6px", borderRadius: "3px", fontSize: "9px" }}>
                  DUMP-HEDGE
                </span>
              </div>
              <div style={{ color: "var(--color-mist)", fontSize: "10px" }}>
                YES: 0.420 → 0.445 (+5.95%) · NO: 0.545 → 0.535 (-1.83%)
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", color: "#34d399", fontWeight: 600, fontSize: "10.5px" }}>
                <span>Locked: $0.18</span>
                <span>Unrealized: +$0.12</span>
              </div>
            </div>

            {/* Position 2 */}
            <div
              style={{
                background: "rgba(17,24,39,0.9)",
                border: "1px solid #56E8D0",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "11px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#56E8D0", fontWeight: 700 }}>LA · ETH (15-MIN)</span>
                <span style={{ background: "rgba(86,232,208,0.15)", color: "#56E8D0", padding: "1px 6px", borderRadius: "3px", fontSize: "9px" }}>
                  LATENCY-ARB (UP)
                </span>
              </div>
              <div style={{ color: "var(--color-mist)", fontSize: "10px" }}>
                Entry: 0.485 · Binance Spot: +$480 move · Model P(UP): 0.68
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", color: "#34d399", fontWeight: 600, fontSize: "10.5px" }}>
                <span>Edge: +16%</span>
                <span>Unrealized: +$0.24</span>
              </div>
            </div>
          </div>

          {/* Engine & Risk Status */}
          <div
            style={{
              background: "rgba(13,17,23,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "14px",
              fontSize: "11px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-cyan)" }}>
              {"// ENGINE & RISK CONTROLS"}
            </span>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "4px" }}>
              <span style={{ color: "var(--color-mist)" }}>C++ Execution Subsystem</span>
              <span style={{ color: "#34d399", fontWeight: 600 }}>Boost.Asio + simdjson</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "4px" }}>
              <span style={{ color: "var(--color-mist)" }}>EIP-712 Crypto Engine</span>
              <span style={{ color: "#34d399", fontWeight: 600 }}>libsecp256k1 (~320µs)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "4px" }}>
              <span style={{ color: "var(--color-mist)" }}>Kelly Criterion Sizing</span>
              <span style={{ color: "var(--color-fog)" }}>0.50x Fractional Adaptive</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "4px" }}>
              <span style={{ color: "var(--color-mist)" }}>Circuit Breaker</span>
              <span style={{ color: "#34d399" }}>HEALTHY (0 consecutive losses)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-mist)" }}>Hard Drawdown Kill Switch</span>
              <span style={{ color: "#34d399" }}>ACTIVE (-20% Peak Cap)</span>
            </div>
          </div>
        </div>

        {/* ── Real-Time Terminal Log Stream ── */}
        <div
          style={{
            background: "#05070c",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div style={{ fontSize: "10px", color: "var(--color-mist)", marginBottom: "8px", textTransform: "uppercase" }}>
            {"// REAL-TIME SYSTEM LOG STREAM (20 Hz TICKING)"}
          </div>

          <div
            ref={logContainerRef}
            style={{
              height: "110px",
              overflowY: "auto",
              fontSize: "10.5px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {logs.map((log) => (
              <div key={log.id} style={{ lineHeight: 1.4 }}>
                <span style={{ color: "#56E8D0", marginRight: "8px" }}>[{log.time}]</span>
                <span
                  style={{
                    color:
                      log.type === "success"
                        ? "#34d399"
                        : log.type === "signal"
                        ? "#a78bfa"
                        : log.type === "warning"
                        ? "#f59e0b"
                        : "var(--color-mist)",
                  }}
                >
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
