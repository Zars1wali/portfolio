"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, RotateCcw, Sparkles, X, ChevronUp, ChevronDown } from "lucide-react";

/* ─── Page Narration Scripts (Professional, Bold, Detailed, Formal) ───────── */
const PAGE_SCRIPTS: Record<string, string> = {
  "/": "Welcome to the engineering portfolio of Umer Wali. Umer is a full-stack developer and AI systems engineer architecting software that cannot afford to fail under pressure. From production-grade multi-agent LangGraph ecosystems and zero-hallucination ReAct loops, to sub-fifty-microsecond C-plus-plus trading infrastructure, he directs the entire journey from architecture to live deployment. Explore his flagship deployments, examine his technical lab, or inspect his verified credentials.",
  "/about": "About Umer Wali. Umer builds mission-critical AI and full-stack systems that thrive under high-stakes constraints. As a Backend AI Engineering intern at FlyRank AI, he engineered production RAG pipelines, deterministic structured outputs, and evaluation harnesses. Under senior mentorship, he directed a team of three engineers to deliver a live multi-vendor commerce marketplace from day one. Backed by a cybersecurity degree from GIKI, his engineering philosophy unites deep systems thinking, lock-free C-plus-plus concurrency, and verifiable Human-in-the-Loop AI guardrails.",
  "/projects": "Flagship engineering projects. Featured here is Rabta AI, an autonomous dual-agent WhatsApp commerce platform engineered with LangGraph and native Gemini 3.5 Flash Lite; Acreon, an AI geospatial agriculture platform; an institutional-grade C-plus-plus arbitrage bot executing sub-fifty-microsecond hot paths on Polymarket; and enterprise cybersecurity defense suites.",
  "/projects/rabita-ai": "Rabta AI. A production-grade, dual-agent WhatsApp commerce engine built for retail merchants. Powered by Python 3.14, FastAPI, LangGraph, and native Google Gemini 3.5 Flash Lite, Rabta AI couples a warm Roman Urdu sales closer with an owner co-pilot node, transcribes voice notes via Deepgram Nova-3, and enforces strict Human-in-the-Loop guardrails for absolute zero-hallucination catalog accuracy.",
  "/lab": "The Engineering Lab. Here, Umer publishes technical investigations into zero-trust hardening, strict Content Security Policies, clickjacking mitigation, and modern web systems performance.",
  "/resume": "Curriculum Vitae. Review Umer Wali's verified track record across FlyRank AI, Zero Point Intel, and cybersecurity systems at GIKI. You can inspect the high-resolution vector sheets directly on this page or download the official PDF for technical review.",
  "/contact": "Connect with Umer Wali. If you are building mission-critical AI systems, scaling resilient backend architectures, or seeking a technical leader who owns both architecture and delivery, reach out to initiate the conversation.",
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

  // Pick an authoritative, formal, professional MALE voice
  const selectVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current.length > 0
      ? voicesRef.current
      : (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices() : []);

    if (!voices.length) return null;

    // Filter English voices
    const englishVoices = voices.filter(v => v.lang.startsWith("en"));
    if (!englishVoices.length) return voices[0] || null;

    // Explicitly exclude female voice identifiers
    const FEMALE_PATTERN = /female|woman|zira|jenny|aria|samantha|victoria|karen|moira|tessa|fiona|susan|hazel|catherine|linda|heather|amber|ana|steffie/i;
    const nonFemaleVoices = englishVoices.filter(v => !FEMALE_PATTERN.test(v.name));

    // Priority ranked list of top-tier natural, deep, professional male voices across OSes
    const MALE_PRIORITY_PATTERNS = [
      /guy.*natural/i,
      /christopher.*natural/i,
      /david.*natural/i,
      /ryan.*natural/i,
      /andrew.*natural/i,
      /google.*uk.*male/i,
      /google.*us.*male/i,
      /uk.*english.*male/i,
      /us.*english.*male/i,
      /\bdaniel\b/i, // Classic British authoritative male voice on Mac/iOS
      /\balex\b/i,   // Classic deep American male voice on Mac/iOS
      /\boliver\b/i,
      /\bgeorge\b/i,
      /\bdavid\b/i,
      /\bmark\b/i,
      /\bbrian\b/i,
      /\bsteffan\b/i,
      /\bmale\b/i,
    ];

    for (const pattern of MALE_PRIORITY_PATTERNS) {
      const match = nonFemaleVoices.find(v => pattern.test(v.name));
      if (match) return match;
    }

    // Fallback: any non-female English voice
    if (nonFemaleVoices.length > 0) return nonFemaleVoices[0];

    return englishVoices[0];
  }, []);

  // Speak function with bold, formal, enthusiastic acoustic tuning
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || isMuted) return;

    window.speechSynthesis.cancel();
    setSubtitle(text);

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectVoice();
    if (voice) utterance.voice = voice;

    // Acoustic tuning: slightly lower pitch (0.92) for deep, authoritative, masculine tone
    // Rate at 1.04 for crisp, enthusiastic, forward-moving cadence
    utterance.pitch = 0.92;
    utterance.rate = 1.04;
    utterance.volume = 1.0;

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
