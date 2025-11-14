/**
 * Matrix Rain Effect - Vertex Shader (GLSL ES 1.0)
 *
 * Custom vertex shader for GPU-instanced particle rendering using WebGL point sprites.
 * Each particle represents a single Matrix character that is positioned in 3D space,
 * sized appropriately, and assigned a character from the texture atlas.
 *
 * **Rendering Pipeline:**
 * 1. Receives per-particle attributes (position, size, uvOffset, color) from buffers
 * 2. Transforms particle position to clip space using model-view-projection matrices
 * 3. Calculates point size with distance-based attenuation for depth perception
 * 4. Passes character UV coordinates and color to fragment shader for texturing
 *
 * **Distance Attenuation:**
 * Point size is inversely proportional to distance from camera, creating realistic
 * depth perception. Formula: `size * (300.0 / -mvPosition.z)` where z is camera distance.
 * The constant 300.0 is calibrated for the camera's FOV and particle density.
 *
 * **Performance:**
 * - Runs once per particle per frame on GPU
 * - All particles rendered in single draw call via instanced rendering
 * - No conditional branches (optimal for GPU execution)
 * - Minimal attribute passing (only essential data to fragment shader)
 *
 * **Attributes:**
 * - `position`: vec3 - Particle position in world space (from geometry)
 * - `size`: float - Base size of particle before distance scaling
 * - `uvOffset`: vec2 - Top-left UV coordinates of character in texture atlas
 * - `customColor`: vec3 - RGB color for particle (Matrix green shades)
 *
 * **Varyings (passed to fragment shader):**
 * - `vUvOffset`: vec2 - Character UV offset for texture lookup
 * - `vColor`: vec3 - Particle color for tinting
 *
 * **Built-in Uniforms (provided by Three.js):**
 * - `modelViewMatrix`: mat4 - Transforms from model to camera space
 * - `projectionMatrix`: mat4 - Transforms from camera to clip space
 *
 * **Built-in Outputs:**
 * - `gl_Position`: vec4 - Final vertex position in clip space
 * - `gl_PointSize`: float - Size of point sprite in pixels
 *
 * @module vertexShader
 */

export const vertexShader = `
// Per-particle attributes
attribute float size;           // Particle size
attribute vec2 uvOffset;        // UV coordinates for character in atlas (top-left corner)
attribute vec3 customColor;     // Particle color (Matrix green)

// Varying outputs to fragment shader
varying vec2 vUvOffset;         // Pass UV offset to fragment
varying vec3 vColor;            // Pass color to fragment

void main() {
  // Pass attributes to fragment shader
  vColor = customColor;
  vUvOffset = uvOffset;

  // Calculate position in clip space
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // Calculate point size with distance attenuation
  // Larger when closer to camera (z is negative in camera space)
  gl_PointSize = size * (300.0 / -mvPosition.z);

  // Final vertex position
  gl_Position = projectionMatrix * mvPosition;
}
`;
