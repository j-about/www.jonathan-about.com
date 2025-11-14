/**
 * Matrix Rain Effect - Camera Controller
 *
 * Handles the cinematic camera dolly-in animation that creates the
 * "entering the Matrix" effect. Implements smooth easing and FOV changes
 * to match the authentic Matrix film aesthetic.
 *
 * @module CameraController
 */

"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA, TIMING } from "./utils/constants";
import { easeInOutCubic, lerp, clamp } from "./utils/easing";

/**
 * CameraController component properties.
 */
interface CameraControllerProps {
  /** Current elapsed time in milliseconds */
  elapsedTime: number;
}

/**
 * Camera controller component.
 *
 * Animates the camera from starting position (outside code layers) to
 * ending position (deep inside the Matrix). Uses cubic easing for smooth,
 * cinematic movement.
 *
 * Animation details:
 * - Pure Z-axis dolly (no rotation or pan)
 * - FOV gradually widens (40° → 55°)
 * - Duration: 2.5 seconds
 * - Easing: easeInOutCubic (smooth S-curve)
 *
 * @param props - Component properties
 * @returns null (this component only controls the camera)
 *
 * @example
 * ```tsx
 * <CameraController elapsedTime={time} />
 * ```
 */
export function CameraController({ elapsedTime }: CameraControllerProps) {
  const { camera } = useThree();

  // Initialize camera position once
  useMemo(() => {
    camera.position.set(
      CAMERA.START_POSITION.x,
      CAMERA.START_POSITION.y,
      CAMERA.START_POSITION.z,
    );
    // @ts-expect-error - FOV exists on PerspectiveCamera
    camera.fov = CAMERA.START_FOV;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    // Calculate animation progress
    const dollyElapsed = elapsedTime - TIMING.DOLLY_START;
    const progress = clamp(dollyElapsed / TIMING.DOLLY_DURATION, 0, 1);

    if (progress >= 1) {
      // Animation complete - ensure final position is exact
      camera.position.set(
        CAMERA.END_POSITION.x,
        CAMERA.END_POSITION.y,
        CAMERA.END_POSITION.z,
      );
      // @ts-expect-error - FOV exists on PerspectiveCamera
      camera.fov = CAMERA.END_FOV;
      camera.updateProjectionMatrix();
      return;
    }

    // Apply easing to progress
    const eased = easeInOutCubic(progress);

    // Interpolate position
    const newZ = lerp(CAMERA.START_POSITION.z, CAMERA.END_POSITION.z, eased);
    camera.position.z = newZ;

    // Interpolate FOV
    const newFOV = lerp(CAMERA.START_FOV, CAMERA.END_FOV, eased);
    // @ts-expect-error - FOV exists on PerspectiveCamera
    camera.fov = newFOV;
    camera.updateProjectionMatrix();
  });

  return null;
}
