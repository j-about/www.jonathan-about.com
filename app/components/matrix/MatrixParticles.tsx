/**
 * Matrix Rain Effect - Particle System
 *
 * Core particle system component that renders falling Matrix code characters.
 * Uses custom ShaderMaterial with texture atlas for GPU-instanced rendering.
 *
 * @module MatrixParticles
 */

"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  createTextureAtlas,
  getCharacterSize,
} from "./utils/createTextureAtlas";
import {
  generateParticleData,
  resetParticle,
} from "./utils/generateParticleData";
import { BOUNDS, TIMING } from "./utils/constants";
import { vertexShader } from "./shaders/vertexShader";
import { fragmentShader } from "./shaders/fragmentShader";

/**
 * MatrixParticles component properties.
 */
interface MatrixParticlesProps {
  /** Current elapsed time in milliseconds */
  elapsedTime: number;
}

/**
 * Matrix particles component.
 *
 * Renders falling code characters using a Points mesh with custom ShaderMaterial.
 * Features:
 * - Single draw call for all particles (GPU-instanced)
 * - Texture atlas with per-particle character selection via UV offsets
 * - Parallax layers (4 speeds)
 * - Automatic particle recycling when off-screen
 * - Fade-out synchronization
 * - Dynamic particle field sizing based on viewport aspect ratio
 *
 * Performance optimizations:
 * - Custom shaders for efficient texture atlas sampling
 * - Reuses Vector3 objects in animation loop
 * - Uses Float32Array for all attributes
 * - Minimizes state updates
 * - Proper cleanup on unmount
 * - Responsive particle distribution (no wasted off-screen particles)
 *
 * @param props - Component properties
 * @returns Points mesh containing all particles
 *
 * @example
 * ```tsx
 * <MatrixParticles elapsedTime={time} />
 * ```
 */
export function MatrixParticles({ elapsedTime }: MatrixParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Get viewport for dynamic particle field sizing
  const { viewport } = useThree();

  // Create texture atlas (shared by all particles)
  const texture = useMemo(() => createTextureAtlas(), []);

  // Get character size in UV space
  const charSize = useMemo(() => getCharacterSize(), []);

  // Calculate dynamic particle field width based on camera frustum at z=50 (initial camera position)
  // This ensures particles fill the entire visible area on all screen sizes
  const particleFieldWidth = useMemo(() => {
    // Camera frustum width at z=50 = viewport.width * (50 / viewport.distance)
    // Add 10% padding to ensure full coverage at edges
    const frustumWidthAtZ50 = viewport.width * (50 / viewport.distance);
    return frustumWidthAtZ50 * 1.1;
  }, [viewport.width, viewport.distance]);

  // Generate particle data with dynamic width
  const particleData = useMemo(
    () => generateParticleData(particleFieldWidth),
    [particleFieldWidth],
  );

  // Create geometry with buffer attributes
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();

    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(particleData.positions, 3),
    );
    geom.setAttribute("size", new THREE.BufferAttribute(particleData.sizes, 1));
    geom.setAttribute(
      "customColor",
      new THREE.BufferAttribute(particleData.colors, 3),
    );
    geom.setAttribute(
      "uvOffset",
      new THREE.BufferAttribute(particleData.uvOffsets, 2),
    );

    return geom;
  }, [particleData]);

  // Create custom shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        textureAtlas: { value: texture },
        charSize: { value: new THREE.Vector2(charSize.width, charSize.height) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
  }, [texture, charSize]);

  // Animation loop
  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttr = geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    const uvOffsetAttr = geometry.getAttribute(
      "uvOffset",
    ) as THREE.BufferAttribute;
    const uvOffsets = uvOffsetAttr.array as Float32Array;

    // Calculate fade opacity based on elapsed time
    const fadeProgress =
      Math.max(0, elapsedTime - TIMING.FADE_START) / TIMING.FADE_DURATION;
    const fadeOpacity = Math.max(0, 1 - fadeProgress);
    material.opacity = fadeOpacity;

    // Update particle positions
    const particleCount = positions.length / 3;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const speed = particleData.speeds[i] ?? 0.05;

      // Move particle down
      const currentY = positions[i3 + 1] ?? 0;
      const newY = currentY - speed;
      positions[i3 + 1] = newY;

      // Reset particle if it falls below bottom boundary
      if (newY < BOUNDS.BOTTOM) {
        resetParticle(
          i,
          positions,
          particleData.charIndices,
          uvOffsets,
          particleFieldWidth,
        );
      }
    }

    // Mark attributes as needing update
    positionAttr.needsUpdate = true;
    uvOffsetAttr.needsUpdate = true;
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [geometry, material, texture]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
