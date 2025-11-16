"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export default function InteractionToggles() {
  const [ribbitEnabled, setRibbitEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const boingButtons = Array.from(document.querySelectorAll<HTMLElement>(".boing-button"));

    if (!boingButtons.length) {
      return;
    }

    const ensureContext = () => {
      if (audioCtxRef.current) {
        return audioCtxRef.current;
      }

      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) {
        return null;
      }

      audioCtxRef.current = new AudioContextCtor();
      return audioCtxRef.current;
    };

    const handleEnter = () => {
      if (!ribbitEnabled) {
        return;
      }

      const ctx = ensureContext();
      if (!ctx) {
        return;
      }

      void ctx.resume();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(190, now);
      oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.35);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
    };

    boingButtons.forEach((button) => button.addEventListener("mouseenter", handleEnter));

    return () => {
      boingButtons.forEach((button) => button.removeEventListener("mouseenter", handleEnter));
    };
  }, [ribbitEnabled]);

  return (
    <div className="mt-2 flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 accent-[#78B159]"
          checked={ribbitEnabled}
          onChange={(event) => setRibbitEnabled(event.target.checked)}
        />
        Ribbit on hover
      </label>
      <span className="text-[10px] uppercase tracking-wide">{ribbitEnabled ? "Enabled" : "Muted"}</span>
    </div>
  );
}
