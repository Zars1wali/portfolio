"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, RotateCcw, Sparkles, X, ChevronUp, ChevronDown } from "lucide-react";

/* ─── Page Narration Scripts ────────────────────────────────────────────── */
const PAGE_SCRIPTS: Record<string, string> = {
  "/": "Welcome to Umer Wali's portfolio. Umer is a full-stack developer and AI engineer specializing in production-grade multi-agent systems, deterministic ReAct loops, and low-latency C++ infrastructure. Explore his live projects or dive into his technical lab.",
  "/about": "About Umer Wali. Umer builds AI and full-stack systems that cannot afford to be wrong under pressure. From leading production RAG and tool-calling workflows at FlyRank AI, to architecting sub-50 microsecond C++ trading bots and satellite risk systems, he owns the complete path from architecture to delivery.",
  "/projects": "Projects gallery. Featured here is Rabta AI, a WhatsApp-native dual-agent commerce platform; Acreon, an AI agricultural platform; a high-frequency trading arbitrage bot on Polymarket; and enterprise cybersecurity platforms.",
  "/projects/rabita-ai": "Rabta AI. A production-grade, dual-agent WhatsApp commerce engine built with LangGraph, Google Gemini 3.5 Flash Lite, Deepgram Nova-3, and PostgreSQL, backed by an enterprise Human-in-the-Loop framework for retail merchants.",
  "/lab": "The Engineering Lab. Here Umer documents deep dives into site hardening, zero-trust infrastructure, strict Content Security Policies, and high-performance Next.js architectures.",
  "/resume": "Curriculum Vitae. Review Umer Wali's background in AI engineering, systems programming, and cybersecurity at GIKI, or download the official PDF directly.",
  "/contact": "Get in touch. Whether you are building production-grade AI systems, modernizing infrastructure, or exploring engineering collaborations, Umer is ready to connect.",
};

export default function AIVoiceGuide() {
  const pathname = usePathname();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Check voice synthesis support and load voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setHasVoiceSupport(false);
      return;
    }

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        voicesRef.current = available;
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Load persisted state
    const saved = localStorage.getItem("ai_voice_enabled");
    if (saved === "true") {
      setIsEnabled(true);
    }
  }, []);

  // Pick the best natural sounding voice
  const selectVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current.length > 0
      ? voicesRef.current
      : (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices() : []);

    if (!voices.length) return null;

    // Prefer high quality English voices
    const preferred = voices.find(v => 
      v.lang.startsWith("en") && 
      (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Neural") || v.name.includes("Samantha") || v.name.includes("Daniel") || v.name.includes("Alex"))
    );

    return preferred || voices.find(v => v.lang.startsWith("en")) || voices[0] || null;
  }, []);

  // Speak function
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || isMuted) return;

    window.speechSynthesis.cancel();
    setSubtitle(text);

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectVoice();
    if (voice) utterance.voice = voice;

    utterance.rate = 1.02;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [isMuted, selectVoice]);

  // Determine text for current path
  const getScriptForPath = useCallback((path: string): string => {
    if (PAGE_SCRIPTS[path]) return PAGE_SCRIPTS[path];
    if (path.startsWith("/projects/")) {
      const slug = path.replace("/projects/", "").replace(/-/g, " ");
      return `Viewing project: ${slug}. Built by Umer Wali. Explore the technical breakdown and architecture.`;
    }
    if (path.startsWith("/lab/")) {
      const slug = path.replace("/lab/", "").replace(/-/g, " ");
      return `Viewing lab article: ${slug}. Documenting technical research and engineering principles.`;
    }
    return `You are viewing ${path.replace("/", "") || "home"} on Umer Wali's portfolio.`;
  }, []);

  // Trigger narration whenever pathname changes (if enabled)
  useEffect(() => {
    if (!isEnabled || isMuted) return;

    const script = getScriptForPath(pathname);
    // Small delay to allow route DOM transition
    const timer = setTimeout(() => {
      speakText(script);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    };
  }, [pathname, isEnabled, isMuted, speakText, getScriptForPath]);

  // Listen for global custom event from Nav or other buttons
  useEffect(() => {
    const handleToggle = () => {
      toggleVoice();
    };
    window.addEventListener("toggle-ai-voice", handleToggle);
    return () => window.removeEventListener("toggle-ai-voice", handleToggle);
  });

  const toggleVoice = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      localStorage.setItem("ai_voice_enabled", "true");
      setBannerDismissed(true);
      speakText(getScriptForPath(pathname));
    } else {
      setIsEnabled(false);
      localStorage.setItem("ai_voice_enabled", "false");
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setSubtitle("");
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      speakText(getScriptForPath(pathname));
    } else {
      setIsMuted(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    }
  };

  const replayCurrent = () => {
    speakText(getScriptForPath(pathname));
  };

  if (!hasVoiceSupport) return null;

  return (
    <>
      {/* ── First Visit Prompt Pill (if voice not yet enabled) ───────── */}
      {!isEnabled && !bannerDismissed && (
        <div className="fixed bottom-5 right-5 z-40 max-w-[340px] p-3 rounded-[16px] bg-[rgba(10,14,23,0.88)] backdrop-blur-xl border border-[rgba(0,240,255,0.3)] shadow-[0_0_25px_rgba(0,240,255,0.18)] flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/15 border border-cyan/30 text-cyan">
              <Sparkles width={16} height={16} className="animate-pulse" />
            </span>
            <div className="text-left">
              <p className="font-mono text-xs font-semibold text-fog">
                AI Voice Tour
              </p>
              <p className="text-[11px] text-mist">
                Narrates each page as you browse
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleVoice}
              className="font-mono text-[11px] font-semibold bg-cyan text-void px-3 py-1.5 rounded-lg border border-cyan hover:bg-[#6EF0DA] transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)] whitespace-nowrap cursor-pointer"
            >
              Start Tour
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss AI Voice Tour prompt"
              className="text-mist/60 hover:text-mist p-1 rounded transition-colors"
            >
              <X width={14} height={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Active AI Voice HUD Dock ─────────────────────────────────── */}
      {isEnabled && (
        <div
          className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ${
            minimized ? "w-auto" : "w-[92vw] max-w-[380px]"
          }`}
        >
          <div className="p-3.5 rounded-[18px] bg-[rgba(10,15,26,0.94)] backdrop-blur-2xl border border-cyan/35 shadow-[0_0_30px_rgba(0,240,255,0.22)] flex flex-col gap-2.5 text-fog">
            {/* Header / Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {/* Animated Voice Equalizer */}
                <div className="flex items-end gap-[3px] h-5 w-6 px-0.5 justify-center">
                  <span
                    className={`w-[3px] rounded-full bg-cyan transition-all duration-150 ${
                      isPlaying ? "animate-bounce h-4" : "h-1.5 opacity-50"
                    }`}
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className={`w-[3px] rounded-full bg-cyan transition-all duration-150 ${
                      isPlaying ? "animate-bounce h-5" : "h-2.5 opacity-60"
                    }`}
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className={`w-[3px] rounded-full bg-cyan transition-all duration-150 ${
                      isPlaying ? "animate-bounce h-3.5" : "h-1.5 opacity-50"
                    }`}
                    style={{ animationDelay: "300ms" }}
                  />
                  <span
                    className={`w-[3px] rounded-full bg-cyan transition-all duration-150 ${
                      isPlaying ? "animate-bounce h-4.5" : "h-2 opacity-55"
                    }`}
                    style={{ animationDelay: "75ms" }}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11.5px] font-semibold tracking-wider text-cyan uppercase">
                    AI Voice Guide
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--color-cyan)]" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={replayCurrent}
                  title="Replay page narration"
                  className="p-1.5 text-mist hover:text-cyan rounded-md transition-colors hover:bg-cyan/10 cursor-pointer"
                  aria-label="Replay page narration"
                >
                  <RotateCcw width={13} height={13} />
                </button>
                <button
                  onClick={toggleMute}
                  title={isMuted ? "Unmute AI Voice" : "Mute AI Voice"}
                  className="p-1.5 text-mist hover:text-cyan rounded-md transition-colors hover:bg-cyan/10 cursor-pointer"
                  aria-label={isMuted ? "Unmute AI Voice" : "Mute AI Voice"}
                >
                  {isMuted ? <VolumeX width={14} height={14} /> : <Volume2 width={14} height={14} />}
                </button>
                <button
                  onClick={() => setMinimized(v => !v)}
                  title={minimized ? "Expand" : "Minimize"}
                  className="p-1.5 text-mist hover:text-fog rounded-md transition-colors cursor-pointer"
                  aria-label={minimized ? "Expand HUD" : "Minimize HUD"}
                >
                  {minimized ? <ChevronUp width={14} height={14} /> : <ChevronDown width={14} height={14} />}
                </button>
                <button
                  onClick={toggleVoice}
                  title="Turn off AI Voice Tour"
                  className="p-1.5 text-mist/60 hover:text-rose-400 rounded-md transition-colors cursor-pointer"
                  aria-label="Turn off AI Voice Tour"
                >
                  <X width={13} height={13} />
                </button>
              </div>
            </div>

            {/* Subtitle / Narration Box (when not minimized) */}
            {!minimized && subtitle && (
              <div className="p-2 rounded-[10px] bg-[rgba(0,0,0,0.4)] border border-[rgba(0,240,255,0.12)] text-[11px] font-mono leading-relaxed text-mist/90 line-clamp-3">
                <span className="text-cyan font-bold mr-1.5">›</span>
                {subtitle}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
