/**
 * Matrix Rain Effect - Fragment Shader (GLSL ES 1.0)
 *
 * Custom fragment shader for texture atlas sampling and character rendering.
 * Each fragment (pixel) within a point sprite samples the correct region of the
 * texture atlas based on per-particle UV offset and per-fragment point coordinates.
 *
 * **Texture Atlas System:**
 * The texture atlas is a single image containing all Matrix characters arranged
 * in a grid (e.g., 16x16 = 256 characters). Each character occupies a fixed
 * region of UV space (charSize). The vUvOffset indicates which character to render
 * by specifying the top-left corner of that character's region.
 *
 * **UV Coordinate Calculation:**
 * ```
 * uv = vUvOffset + gl_PointCoord * charSize
 * ```
 * - `gl_PointCoord`: Ranges from (0,0) at top-left to (1,1) at bottom-right of point sprite
 * - `charSize`: Size of one character in normalized UV space (e.g., 1/16 = 0.0625 for 16x16 grid)
 * - `vUvOffset`: Top-left UV coordinates of the character in the atlas (from vertex shader)
 * - Result: Maps each pixel of the point sprite to the correct pixel in the texture atlas
 *
 * **Rendering Pipeline:**
 * 1. Calculate UV coordinates within specific character region of atlas
 * 2. Sample the texture atlas at calculated UV coordinates
 * 3. Apply color tint (Matrix green shades) to the sampled character
 * 4. Output final color with alpha channel
 * 5. Discard fully transparent fragments (optimization + visual clarity)
 *
 * **Alpha Discard Optimization:**
 * The `discard` statement prevents rendering of fully transparent pixels,
 * which improves performance and prevents empty space from occluding particles
 * behind it. The threshold of 0.1 accounts for texture compression artifacts.
 *
 * **Performance:**
 * - Runs once per visible pixel per particle
 * - Single texture lookup per fragment (efficient)
 * - Early fragment discard reduces fill rate for transparent areas
 * - No conditional branches except discard (GPU-optimized)
 *
 * **Uniforms (constant across all fragments):**
 * - `textureAtlas`: sampler2D - Texture containing all Matrix characters in grid layout
 * - `charSize`: vec2 - Normalized size of one character (e.g., 1/16 for 16x16 grid)
 *
 * **Varyings (interpolated from vertex shader):**
 * - `vUvOffset`: vec2 - Top-left UV coordinates of character in atlas
 * - `vColor`: vec3 - RGB color for tinting the character
 *
 * **Built-in Inputs:**
 * - `gl_PointCoord`: vec2 - Coordinates within point sprite (0 to 1)
 *
 * **Built-in Outputs:**
 * - `gl_FragColor`: vec4 - Final RGBA color of the fragment
 *
 * @module fragmentShader
 */

export const fragmentShader = `
// Uniforms (constant across all particles)
uniform sampler2D textureAtlas;  // Texture atlas containing all characters
uniform vec2 charSize;           // Size of one character in UV space (e.g., 1/16 for 16x16 grid)

// Varying inputs from vertex shader
varying vec2 vUvOffset;          // Top-left UV coordinate of character
varying vec3 vColor;             // Particle color

void main() {
  // gl_PointCoord ranges from (0,0) to (1,1) across the particle
  // Scale it by charSize and offset by vUvOffset to select specific character region
  vec2 uv = vUvOffset + gl_PointCoord * charSize;

  // Sample the texture atlas at calculated UV coordinate
  vec4 texColor = texture2D(textureAtlas, uv);

  // Apply color tint (Matrix green) to the sampled character
  vec3 finalColor = vColor * texColor.rgb;

  // Output final color with alpha channel
  gl_FragColor = vec4(finalColor, texColor.a);

  // Discard fully transparent pixels (no character at this position)
  if (gl_FragColor.a < 0.1) {
    discard;
  }
}
`;
