/**
 * Matrix Rain Effect - Particle Data Generator
 *
 * Generates initial data for all particles in the Matrix rain effect.
 * Creates typed arrays for efficient GPU buffer attribute updates.
 *
 * @module generateParticleData
 */

import { MATRIX_CHARS, PARTICLES, BOUNDS, VISUAL } from "./constants";
import { getCharsPerRow } from "./createTextureAtlas";

/**
 * Particle data structure.
 * Contains all attributes needed for rendering and animation.
 */
export interface ParticleData {
  /** Particle positions (x, y, z) - Float32Array */
  positions: Float32Array;
  /** Particle sizes - Float32Array */
  sizes: Float32Array;
  /** Particle colors (r, g, b) - Float32Array */
  colors: Float32Array;
  /** Character indices for texture atlas - Float32Array */
  charIndices: Float32Array;
  /** UV offsets for character selection in shader (u, v) - Float32Array */
  uvOffsets: Float32Array;
  /** Fall speeds for each particle - Float32Array */
  speeds: Float32Array;
}

/**
 * Detects if the current device is mobile.
 *
 * @returns true if mobile device detected
 */
function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/**
 * Generates random position within bounds.
 *
 * @param width - Optional custom width for particle field (defaults to BOUNDS.WIDTH)
 * @returns Object with x, y, z coordinates
 */
function randomPosition(width: number = BOUNDS.WIDTH): {
  x: number;
  y: number;
  z: number;
} {
  return {
    x: (Math.random() - 0.5) * width,
    y: Math.random() * (BOUNDS.TOP - BOUNDS.BOTTOM) + BOUNDS.BOTTOM,
    z: 0,
  };
}

/**
 * Generates initial particle data for the Matrix rain effect.
 *
 * Creates all necessary typed arrays for particle attributes:
 * - Position, size, color
 * - Character selection from texture atlas
 * - Individual fall speeds
 *
 * Optimizations:
 * - Uses Float32Array for efficient GPU transfer
 * - Reduces particle count on mobile devices
 * - Dynamically adjusts particle field width based on viewport aspect ratio
 *
 * @param viewportWidth - Optional viewport width to scale particle field (defaults to BOUNDS.WIDTH)
 * @returns ParticleData object containing all particle attributes
 *
 * @example
 * ```typescript
 * const data = generateParticleData();
 * geometry.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
 * ```
 */
export function generateParticleData(viewportWidth?: number): ParticleData {
  const isMobile = isMobileDevice();
  const count = isMobile ? PARTICLES.COUNT_MOBILE : PARTICLES.COUNT_DESKTOP;
  const baseSize = isMobile ? PARTICLES.SIZE_MOBILE : PARTICLES.SIZE_DESKTOP;

  // Calculate effective particle field width (use viewport width or default)
  const effectiveWidth = viewportWidth ?? BOUNDS.WIDTH;

  // Get texture atlas grid dimensions
  const charsPerRow = getCharsPerRow();
  const uvCharSize = 1 / charsPerRow;

  // Allocate typed arrays
  const positions = new Float32Array(count * 3); // x, y, z per particle
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3); // r, g, b per particle
  const charIndices = new Float32Array(count);
  const uvOffsets = new Float32Array(count * 2); // u, v per particle
  const speeds = new Float32Array(count);

  // Initialize each particle
  for (let i = 0; i < count; i++) {
    const i3 = i * 3; // Index for x, y, z
    const i2 = i * 2; // Index for u, v

    // Position
    const pos = randomPosition(effectiveWidth);
    positions[i3] = pos.x;
    positions[i3 + 1] = pos.y;
    positions[i3 + 2] = pos.z;

    // Size (slight variation)
    sizes[i] = baseSize * (0.8 + Math.random() * 0.4);

    // Color (Matrix green)
    colors[i3] = VISUAL.COLOR_GREEN.r;
    colors[i3 + 1] = VISUAL.COLOR_GREEN.g;
    colors[i3 + 2] = VISUAL.COLOR_GREEN.b;

    // Character index (random character from atlas)
    const charIndex = Math.floor(Math.random() * MATRIX_CHARS.length);
    charIndices[i] = charIndex;

    // UV offset for shader (calculate grid position of character)
    const col = charIndex % charsPerRow;
    const row = Math.floor(charIndex / charsPerRow);
    uvOffsets[i2] = col * uvCharSize; // U coordinate
    uvOffsets[i2 + 1] = row * uvCharSize; // V coordinate

    // Speed (varies by layer for parallax effect)
    const layerIndex = i % PARTICLES.LAYER_COUNT;
    const layerSpeed = PARTICLES.LAYER_SPEEDS[layerIndex] ?? 1.0;
    speeds[i] = 0.05 * layerSpeed * (0.8 + Math.random() * 0.4);
  }

  return {
    positions,
    sizes,
    colors,
    charIndices,
    uvOffsets,
    speeds,
  };
}

/**
 * Resets a particle to the top of the screen.
 *
 * Used when a particle falls below the bottom boundary.
 *
 * @param index - Particle index
 * @param positions - Position array
 * @param charIndices - Character index array
 * @param uvOffsets - UV offset array for shader
 * @param dynamicWidth - Optional custom width for particle field (defaults to BOUNDS.WIDTH)
 */
export function resetParticle(
  index: number,
  positions: Float32Array,
  charIndices: Float32Array,
  uvOffsets: Float32Array,
  dynamicWidth: number = BOUNDS.WIDTH,
): void {
  const i3 = index * 3;
  const i2 = index * 2;

  // Reset to random X position at top
  positions[i3] = (Math.random() - 0.5) * dynamicWidth;
  positions[i3 + 1] = BOUNDS.TOP;
  positions[i3 + 2] = 0;

  // Assign new random character
  const charIndex = Math.floor(Math.random() * MATRIX_CHARS.length);
  charIndices[index] = charIndex;

  // Recalculate UV offset for new character
  const charsPerRow = getCharsPerRow();
  const uvCharSize = 1 / charsPerRow;
  const col = charIndex % charsPerRow;
  const row = Math.floor(charIndex / charsPerRow);
  uvOffsets[i2] = col * uvCharSize;
  uvOffsets[i2 + 1] = row * uvCharSize;
}
