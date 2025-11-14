/**
 * Matrix Rain Component
 *
 * Three.js Matrix rain effect with authentic film-style camera movement.
 * Full-screen particle system displaying falling Matrix code characters
 * with cinematic dolly-in animation.
 *
 * Features:
 * - GPU-instanced particle rendering (single draw call)
 * - Authentic Matrix film camera dolly (z=50 → z=5, FOV 40° → 55°)
 * - Smooth cubic easing for cinematic feel
 * - Parallax depth layers (4 speeds)
 * - Optimized for desktop and mobile
 * - 3.5 second total duration
 *
 * @module MatrixRain
 */

"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { MatrixRainScene } from "./matrix/MatrixRainScene";
import { PERFORMANCE, VISUAL, TIMING } from "./matrix/utils/constants";

/**
 * MatrixRain component properties.
 */
interface MatrixRainProps {
  /**
   * Callback invoked when the Matrix rain animation completes.
   * Typically used to transition to the main application interface.
   */
  onComplete: () => void;
}

/**
 * Matrix Rain wrapper component.
 *
 * Manages the full-screen Matrix rain effect including:
 * - Canvas initialization with optimized WebGL settings
 * - Fade-out overlay synchronized with particle opacity
 * - Completion callback
 *
 * Architecture:
 * - Canvas: Three.js renderer with performance optimizations
 * - MatrixRainScene: Orchestrates particles and camera
 * - Overlay: CSS fade-out effect
 *
 * Timeline (3.5s total):
 * - 0.0s: Rain begins, camera at z=50
 * - 0.0s: Camera dolly starts
 * - 2.0s: Fade-out begins
 * - 2.5s: Camera reaches z=5
 * - 3.5s: Complete, onComplete() called
 *
 * @param props - Component properties
 * @returns Full-screen Matrix rain effect
 *
 * @example
 * ```tsx
 * <MatrixRain onComplete={() => setShowInterface(true)} />
 * ```
 */
export default function MatrixRain({ onComplete }: MatrixRainProps) {
  const [opacity, setOpacity] = useState(1);

  /**
   * Manage fade-out overlay animation.
   *
   * Synchronizes the overlay fade-out with the particle system's opacity animation.
   * Uses a stepped fade approach (50ms intervals) for smooth visual transition
   * without excessive re-renders.
   *
   * **Timing:**
   * - Fade starts at TIMING.FADE_START (2000ms)
   * - Fade duration is TIMING.FADE_DURATION (1500ms)
   * - Steps every 50ms for smooth animation (30 total steps)
   *
   * **Implementation:**
   * - setTimeout delays fade start until particles begin fading
   * - setInterval steps opacity down gradually
   * - Cleanup functions prevent memory leaks on unmount
   *
   * This runs only once on mount (empty dependency array) as the timing
   * is fixed and doesn't depend on any props or state.
   */
  useEffect(() => {
    // Calculate fade timing from constants
    const fadeStartTime = TIMING.FADE_START;
    const fadeDuration = TIMING.FADE_DURATION;
    const fadeSteps = fadeDuration / 50; // 50ms intervals = smooth fade

    // Schedule fade-out to start at specified time
    const fadeTimer = setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setOpacity((prev) => {
          const newOpacity = prev - 1 / fadeSteps;
          if (newOpacity <= 0) {
            clearInterval(fadeInterval);
            return 0;
          }
          return newOpacity;
        });
      }, 50);

      return () => clearInterval(fadeInterval);
    }, fadeStartTime);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 block transition-opacity duration-1000"
      style={{
        opacity,
        backgroundColor: VISUAL.COLOR_BACKGROUND,
      }}
    >
      <Canvas
        className="block h-full w-full"
        camera={{
          position: [0, 0, 50],
          fov: 40,
        }}
        dpr={[...PERFORMANCE.DPR] as [number, number]}
        gl={{
          alpha: false,
          antialias: PERFORMANCE.ANTIALIAS,
          powerPreference: PERFORMANCE.POWER_PREFERENCE,
        }}
        frameloop="always"
      >
        <MatrixRainScene onComplete={onComplete} />
      </Canvas>
    </div>
  );
}
