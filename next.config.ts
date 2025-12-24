import type { NextConfig } from "next";

/**
 * Next.js Configuration
 *
 * Application configuration with:
 * - Docker support (standalone output for containerized deployments)
 * - Security headers (CSP, HSTS, XSS protection, etc.)
 * - Performance optimizations (compression, image optimization)
 * - Build optimizations (minification, tree-shaking, bundle analysis)
 *
 * **Docker:**
 * Standalone output mode creates a minimal build with only necessary files,
 * significantly reducing Docker image size and deployment complexity.
 *
 * **Security:**
 * CSP allows 'unsafe-eval' for Three.js WebGL shaders and 'unsafe-inline'
 * for dynamic styles (Framer Motion, Tailwind, styled-jsx).
 *
 * **Bundle Analysis:**
 * View bundle sizes in build output: `npm run build`
 * For detailed analysis, install @next/bundle-analyzer
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
const nextConfig: NextConfig = {
  /**
   * Standalone output for Docker deployments.
   * Creates a minimal build with only required dependencies,
   * includes a built-in Node.js server, and reduces image size.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
   */
  output: "standalone",

  /**
   * Enable React Strict Mode for additional runtime checks.
   * Helps identify potential problems in components.
   */
  reactStrictMode: true,

  /**
   * Remove X-Powered-By header for security (hides Next.js version).
   */
  poweredByHeader: false,

  /**
   * Compression is enabled by default in Next.js production builds.
   * Gzip/Brotli compression reduces payload sizes by ~70%.
   */
  compress: true,

  /**
   * Image optimization configuration.
   *
   * Currently no images used, but configured for future-proofing.
   * Next.js automatically optimizes images via next/image component.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  /**
   * Compiler options for SWC (Rust-based compiler).
   * removeConsole removes console.* in production (except console.error).
   */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  /**
   * Security headers configuration.
   * Applied to all routes via pattern matching.
   *
   * @returns Array of header configurations for all paths
   */
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              // Default: only same origin
              "default-src 'self'",
              // Scripts: self + unsafe-eval (required for Three.js WebGL shaders) + unsafe-inline (for Next.js) + GTM
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com",
              // Styles: self + unsafe-inline (required for Framer Motion, Tailwind, styled-jsx)
              "style-src 'self' 'unsafe-inline'",
              // Images: self + data URIs + blob URIs (for canvas/WebGL operations) + GTM/GA tracking pixels
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
              // Fonts: self + data URIs (all fonts self-hosted as WOFF2)
              "font-src 'self' data:",
              // Connect: self (for API calls) + GA/GTM for beacons and data collection
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              // Media: none (no audio/video elements in current implementation)
              "media-src 'none'",
              // Objects: none (no Flash, Java, etc.)
              "object-src 'none'",
              // Frames: GTM preview mode
              "frame-src https://www.googletagmanager.com",
              // Frame ancestors: self only (prevents embedding except same origin)
              "frame-ancestors 'self'",
              // Base URI: self only
              "base-uri 'self'",
              // Form actions: self only
              "form-action 'self'",
              // Upgrade insecure requests in production
              "upgrade-insecure-requests",
            ]
              .join("; ")
              .replace(/\s+/g, " "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
