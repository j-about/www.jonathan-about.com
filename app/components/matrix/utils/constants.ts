/**
 * Matrix Rain Effect - Configuration Constants
 *
 * Centralized, type-safe constants for the entire Matrix rain animation system.
 * All values are frozen with `as const` to prevent runtime modification and provide
 * precise TypeScript type inference.
 *
 * **Configuration Categories:**
 * - `MATRIX_CHARS`: Authentic character set from the original film
 * - `TIMING`: Animation timeline and synchronization values
 * - `CAMERA`: Cinematic dolly movement specifications
 * - `PARTICLES`: Particle count and layer configuration (desktop/mobile)
 * - `VISUAL`: Color palette, opacity, and rendering style
 * - `PERFORMANCE`: WebGL optimization settings
 * - `BOUNDS`: 3D space boundaries for particle positioning
 *
 * **Design Philosophy:**
 * Values are calibrated to replicate the authentic Matrix film aesthetic:
 * - Camera dolly creates the iconic "diving into code" feel
 * - Halfwidth katakana provides the distinctive Japanese character look
 * - Parallax layers add depth perception
 * - Timing is synchronized to match boot sequence transition
 *
 * **Usage:**
 * Import specific constants as needed:
 * ```typescript
 * import { TIMING, CAMERA, PARTICLES } from './constants';
 * ```
 *
 * @module constants
 */

/**
 * Authentic Matrix character set.
 * Composition:
 * - Halfwidth katakana (primary): ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ
 * - Latin letters: A-Z (especially Z)
 * - Digits: 0-9
 * - Punctuation: :・."=*+-<>¦╌
 */
export const MATRIX_CHARS =
  'ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ZABCDEFGHIJKLMNOPQRSTUVWXYZ:・."=*+-<>¦╌';

/**
 * Animation timing configuration (in milliseconds).
 */
export const TIMING = {
  /** Total animation duration */
  TOTAL_DURATION: 3500,
  /** When camera dolly begins */
  DOLLY_START: 0,
  /** Camera dolly duration */
  DOLLY_DURATION: 2500,
  /** When fade-out begins */
  FADE_START: 2000,
  /** Fade-out duration */
  FADE_DURATION: 1500,
} as const;

/**
 * Camera configuration for authentic Matrix film movement.
 */
export const CAMERA = {
  /** Starting position (outside code layers) */
  START_POSITION: { x: 0, y: 0, z: 50 },
  /** Ending position (deep inside code) */
  END_POSITION: { x: 0, y: 0, z: 5 },
  /** Starting field of view (degrees) */
  START_FOV: 40,
  /** Ending field of view (degrees) */
  END_FOV: 55,
} as const;

/**
 * Particle system configuration.
 */
export const PARTICLES = {
  /** Number of particles for desktop */
  COUNT_DESKTOP: 2000,
  /** Number of particles for mobile (performance) */
  COUNT_MOBILE: 800,
  /** Particle size multiplier for desktop */
  SIZE_DESKTOP: 0.35,
  /** Particle size multiplier for mobile */
  SIZE_MOBILE: 0.3,
  /** Number of parallax layers */
  LAYER_COUNT: 4,
  /** Speed multipliers for each parallax layer */
  LAYER_SPEEDS: [0.5, 0.75, 1.0, 1.25],
} as const;

/**
 * Visual styling configuration.
 */
export const VISUAL = {
  /** Matrix green color (RGB 0-1) */
  COLOR_GREEN: { r: 0, g: 1, b: 0 },
  /** Background color (black) */
  COLOR_BACKGROUND: "#000000",
  /** Character opacity at head of trail */
  OPACITY_HEAD: 1.0,
  /** Character opacity at tail of trail */
  OPACITY_TAIL: 0.1,
  /** Font configuration for texture atlas */
  FONT: "bold 48px monospace",
  /** Character spacing in texture atlas */
  CHAR_SPACING: 64,
} as const;

/**
 * Performance and device detection.
 */
export const PERFORMANCE = {
  /** Pixel density ratio range [min, max] */
  DPR: [1, 2],
  /** WebGL power preference */
  POWER_PREFERENCE: "high-performance",
  /** Enable antialiasing (false for performance) */
  ANTIALIAS: false,
} as const;

/**
 * Canvas boundaries for particle movement.
 */
export const BOUNDS = {
  /** Width of visible area */
  WIDTH: 40,
  /** Height of visible area */
  HEIGHT: 30,
  /** Top boundary (particles spawn above) */
  TOP: 20,
  /** Bottom boundary (particles reset when below) */
  BOTTOM: -20,
} as const;
