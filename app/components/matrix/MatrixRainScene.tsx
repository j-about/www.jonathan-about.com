/**
 * Matrix Rain Effect - Scene Orchestrator
 *
 * Main Three.js scene component that orchestrates the Matrix rain effect.
 * Manages timing, coordinates camera movement and particle animation,
 * and triggers completion callback.
 *
 * @module MatrixRainScene
 */

"use client";

import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MatrixParticles } from "./MatrixParticles";
import { CameraController } from "./CameraController";
import { TIMING } from "./utils/constants";

/**
 * MatrixRainScene component properties.
 */
interface MatrixRainSceneProps {
  /** Callback invoked when animation completes */
  onComplete: () => void;
}

/**
 * Matrix rain scene orchestrator.
 *
 * Coordinates all elements of the Matrix rain effect:
 * - Time tracking
 * - Particle system rendering
 * - Camera dolly animation
 * - Completion detection
 *
 * Timeline:
 * - 0.0s: Animation begins, particles visible
 * - 0.0s: Camera starts dolly-in
 * - 2.0s: Fade-out begins
 * - 2.5s: Camera dolly complete
 * - 3.5s: Fade complete, onComplete() called
 *
 * @param props - Component properties
 * @returns Scene containing particles and camera controller
 *
 * @example
 * ```tsx
 * <Canvas>
 *   <MatrixRainScene onComplete={() => setShowInterface(true)} />
 * </Canvas>
 * ```
 */
export function MatrixRainScene({ onComplete }: MatrixRainSceneProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const hasCompleted = useRef(false);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    // Initialize start time on first frame
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime * 1000;
    }

    // Calculate elapsed time in milliseconds
    const currentTime = state.clock.elapsedTime * 1000;
    const elapsed = currentTime - startTime.current;
    setElapsedTime(elapsed);

    // Check for completion
    if (elapsed >= TIMING.TOTAL_DURATION && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  });

  return (
    <>
      {/* Camera dolly animation */}
      <CameraController elapsedTime={elapsedTime} />

      {/* Particle system */}
      <MatrixParticles elapsedTime={elapsedTime} />
    </>
  );
}
