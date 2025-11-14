"use client";

import { useEffect, useState } from "react";

import { audioContextManager } from "../lib/AudioContextManager";
import { isClient } from "../lib/utils";
import type { SoundType } from "../types";

/**
 * Sound System Hook - Web Audio API Integration
 *
 * Provides programmatic sound generation for the Matrix terminal aesthetic using
 * the Web Audio API. All sounds are synthesized in real-time (no audio files needed),
 * creating authentic retro computer audio feedback.
 *
 * **Architecture:**
 * - Uses singleton AudioContextManager for application-wide audio context
 * - AudioContext persists across component remounts and page transitions
 * - Respects browser autoplay policies (requires user interaction to initialize)
 * - All sounds use exponential gain ramping to prevent audio clicking
 *
 * **Sound Types:**
 * - `beep`: Terminal transmission beep (1200Hz sine wave, 150ms)
 * - `typing`: Keyboard click sound (800Hz square wave, 50ms)
 * - `click`: UI interaction sound (same as typing)
 * - `ambient`: Continuous CRT buzz (60Hz sawtooth, low-pass filtered)
 *
 * **Browser Autoplay Policy Compliance:**
 * Audio initialization is deferred until first user interaction (click or keypress).
 * This ensures compliance with Chrome, Safari, and Firefox autoplay restrictions.
 *
 * **Performance Considerations:**
 * - Oscillators are created and destroyed on-demand (not pooled)
 * - Gain nodes use exponential ramping for smooth volume changes
 * - Ambient sound uses single oscillator that runs continuously
 * - No audio file decoding overhead (all procedural synthesis)
 *
 * **Accessibility:**
 * - Respects prefers-reduced-motion media query (not implemented in hook but could be)
 * - Low volume levels prevent audio fatigue
 * - Ambient sound is very subtle (0.02 gain) to avoid distraction
 *
 * @returns {Object} Sound control interface
 * @returns {Function} playSound - Play a sound by type identifier
 * @returns {boolean} isInitialized - Whether audio context is ready to use
 *
 * @example
 * ```tsx
 * const { playSound, isInitialized } = useSound();
 *
 * // Play a beep sound
 * playSound('beep');
 *
 * // Start ambient sound (returns cleanup function)
 * const stopAmbient = playSound('ambient');
 * // Later: stopAmbient();
 * ```
 */
export function useSound() {
  const [isInitialized, setIsInitialized] = useState(
    audioContextManager.isInitialized(),
  );

  /**
   * Initialize AudioContext on first user interaction.
   *
   * Browser autoplay policies require a user gesture before audio can play.
   * This effect registers one-time event listeners for click and keydown that
   * initialize the AudioContext singleton when triggered.
   *
   * **Event Listeners:**
   * - Registered with `{ once: true }` for automatic cleanup after first trigger
   * - Both click and keydown ensure initialization regardless of interaction method
   * - Manually removed in cleanup to handle component unmount before interaction
   *
   * **AudioContext Lifecycle:**
   * The AudioContext is NOT closed on unmount - it persists for the entire
   * application session. This allows ambient sounds and audio state to continue
   * across component transitions without interruption.
   */
  useEffect(() => {
    if (!isClient()) return;

    const initAudio = async () => {
      try {
        await audioContextManager.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    };

    // Initialize on first user interaction (autoplay policy compliance)
    document.addEventListener("click", initAudio, { once: true });
    document.addEventListener("keydown", initAudio, { once: true });

    // Cleanup: Remove event listeners but DO NOT close the AudioContext
    // The AudioContext persists throughout the entire application lifecycle
    return () => {
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };
  }, []);

  /**
   * Generate a simple beep sound using oscillator synthesis.
   *
   * Creates a sine wave oscillator at the specified frequency with exponential
   * volume decay to create a pleasant, non-clicking beep tone.
   *
   * **Audio Graph:**
   * Oscillator → GainNode → Destination
   *
   * **Parameters:**
   * @param {number} frequency - Beep frequency in Hz (default: 440Hz = A4 note)
   * @param {number} duration - Beep duration in seconds (default: 0.1s = 100ms)
   *
   * **Volume Envelope:**
   * - Start: 0.1 gain (10% volume)
   * - End: 0.01 gain (exponential decay to near-silence)
   * - Prevents audio clicking by ramping to near-zero instead of hard stop
   */
  const playBeep = (frequency: number = 440, duration: number = 0.1) => {
    const ctx = audioContextManager.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + duration,
    );

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  /**
   * Generate typing click sound for terminal keyboard feedback.
   *
   * Creates a short, crisp square wave click that mimics mechanical keyboard
   * sounds from vintage computer terminals.
   *
   * **Audio Graph:**
   * Oscillator (square wave, 800Hz) → GainNode → Destination
   *
   * **Characteristics:**
   * - Frequency: 800Hz (higher pitch for sharper click)
   * - Waveform: Square wave (creates harsh, mechanical tone)
   * - Duration: 50ms (very brief for rapid typing)
   * - Volume: 0.05 gain (quieter than beeps to avoid fatigue)
   */
  const playTypingClick = () => {
    const ctx = audioContextManager.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "square";

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  /**
   * Generate transmission beep for terminal communication events.
   *
   * Higher-frequency, slightly longer beep used to signal completed transmissions
   * or important terminal events. Delegates to playBeep with specific parameters.
   *
   * **Characteristics:**
   * - Frequency: 1200Hz (higher than standard 440Hz beep)
   * - Duration: 150ms (slightly longer for emphasis)
   * - Used for: Boot sequence messages, section transitions
   */
  const playTransmissionBeep = () => {
    playBeep(1200, 0.15);
  };

  /**
   * Start ambient CRT monitor buzz (continuous background hum).
   *
   * Creates an authentic CRT monitor electrical hum using a low-frequency
   * sawtooth wave with low-pass filtering. The sound loops indefinitely until
   * the returned cleanup function is called.
   *
   * **Audio Graph:**
   * Oscillator (sawtooth, 60Hz) → BiquadFilter (lowpass, 200Hz) → GainNode → Destination
   *
   * **Characteristics:**
   * - Frequency: 60Hz (matches AC power frequency in North America)
   * - Waveform: Sawtooth (creates harmonic-rich buzz)
   * - Filter: Low-pass at 200Hz (removes harsh high frequencies)
   * - Volume: 0.02 gain (extremely subtle, almost subliminal)
   *
   * **Usage:**
   * ```typescript
   * const stopAmbient = playAmbient();
   * // Later: stopAmbient();
   * ```
   *
   * @returns {Function} Cleanup function to stop the ambient sound
   */
  const playAmbient = () => {
    const ctx = audioContextManager.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 60;
    oscillator.type = "sawtooth";

    filter.type = "lowpass";
    filter.frequency.value = 200;

    gainNode.gain.value = 0.02; // Very quiet

    oscillator.start();

    return () => {
      oscillator.stop();
    };
  };

  /**
   * Play sound by type
   */
  const playSound = (type: SoundType) => {
    if (!isInitialized || !audioContextManager.getContext()) return undefined;

    switch (type) {
      case "boot":
      case "beep":
        playTransmissionBeep();
        return undefined;
      case "typing":
      case "click":
        playTypingClick();
        return undefined;
      case "ambient":
        return playAmbient();
      default:
        return undefined;
    }
  };

  return {
    playSound,
    isInitialized,
  };
}
