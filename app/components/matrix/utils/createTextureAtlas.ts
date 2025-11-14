/**
 * Matrix Rain Effect - Texture Atlas Creation
 *
 * Creates a single texture atlas containing all Matrix characters.
 * This approach minimizes memory usage and enables GPU-instanced rendering.
 *
 * @module createTextureAtlas
 */

import * as THREE from "three";
import { MATRIX_CHARS, VISUAL } from "./constants";

/**
 * Creates a texture atlas from the Matrix character set.
 *
 * Generates a single canvas texture containing all characters in a grid layout.
 * This texture is shared by all particles, enabling efficient GPU rendering.
 *
 * Process:
 * 1. Calculate grid dimensions based on character count
 * 2. Create canvas with appropriate size
 * 3. Render each character to grid position
 * 4. Convert canvas to Three.js texture
 *
 * @returns THREE.CanvasTexture containing all characters
 *
 * @example
 * ```typescript
 * const texture = createTextureAtlas();
 * const material = new THREE.PointsMaterial({ map: texture });
 * ```
 */
export function createTextureAtlas(): THREE.CanvasTexture {
  const charCount = MATRIX_CHARS.length;
  const charsPerRow = Math.ceil(Math.sqrt(charCount));
  const charSize = VISUAL.CHAR_SPACING;
  const canvasSize = charsPerRow * charSize;

  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D context for texture atlas");
  }

  // Configure canvas rendering
  ctx.fillStyle = VISUAL.COLOR_BACKGROUND;
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  ctx.font = VISUAL.FONT;
  ctx.fillStyle = "#00FF00"; // Matrix green
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Render each character to grid position
  for (let i = 0; i < charCount; i++) {
    const char = MATRIX_CHARS[i];
    if (!char) continue; // Skip if character is undefined

    const col = i % charsPerRow;
    const row = Math.floor(i / charsPerRow);

    const x = col * charSize + charSize / 2;
    const y = row * charSize + charSize / 2;

    ctx.fillText(char, x, y);
  }

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

/**
 * Calculates the number of characters per row in the texture atlas.
 *
 * Used for UV coordinate calculations when selecting specific characters.
 *
 * @returns Number of characters per row
 */
export function getCharsPerRow(): number {
  return Math.ceil(Math.sqrt(MATRIX_CHARS.length));
}

/**
 * Calculates the size of one character in UV coordinates (0-1 range).
 *
 * Used by shaders to determine the UV space occupied by a single character.
 * For example, if the atlas is 16x16 characters, each character occupies
 * 1/16 of the texture in both U and V directions.
 *
 * @returns Object with width and height in UV space (0-1)
 *
 * @example
 * ```typescript
 * const charSize = getCharacterSize();
 * // { width: 0.0625, height: 0.0625 } for 16x16 grid
 * ```
 */
export function getCharacterSize(): { width: number; height: number } {
  const charsPerRow = getCharsPerRow();
  const size = 1 / charsPerRow;
  return { width: size, height: size };
}
