/**
 * Matrix Rain Effect - Easing Functions
 *
 * Custom easing functions for smooth camera animations.
 * Implements cubic easing to match the authentic Matrix film aesthetic.
 *
 * @module easing
 */

/**
 * Cubic ease-in-out function.
 *
 * Creates a smooth S-curve animation profile that:
 * - Starts slowly (ease-in)
 * - Accelerates in the middle
 * - Decelerates at the end (ease-out)
 *
 * This matches the camera movement in the original Matrix film.
 *
 * @param t - Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 *
 * @example
 * ```typescript
 * const progress = 0.5;
 * const eased = easeInOutCubic(progress); // 0.5 (midpoint)
 * ```
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Linear interpolation between two values.
 *
 * @param start - Starting value
 * @param end - Ending value
 * @param t - Progress value between 0 and 1
 * @returns Interpolated value
 *
 * @example
 * ```typescript
 * const value = lerp(0, 100, 0.5); // 50
 * ```
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Clamps a value between min and max.
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 *
 * @example
 * ```typescript
 * const clamped = clamp(150, 0, 100); // 100
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
