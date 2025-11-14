"use client";

import { useTheme } from "../contexts/ThemeContext";

/**
 * Valid theme values supported by the application
 */
const VALID_THEMES = ["blue-pill", "red-pill"] as const;
type ValidTheme = (typeof VALID_THEMES)[number];

/**
 * TypeScript interface for theme-aware Tailwind classes
 * Provides type safety and autocomplete for theme utilities
 */
export interface ThemeClasses {
  /** Text color utilities */
  text: {
    /** Brightest text color for emphasis */
    bright: string;
    /** Normal text color for body content */
    normal: string;
    /** Dimmed text color for secondary content */
    dim: string;
  };

  /** Background color utilities */
  bg: {
    /** Main background color for the application */
    main: string;
    /** Panel background color for sections */
    panel: string;
    /** Accent background color for highlights */
    accent: string;
  };

  /** Button-specific text colors */
  button: {
    /** Text color for button labels */
    label: string;
  };

  /** Border color utilities */
  border: {
    /** Standard border color for panels and dividers */
    normal: string;
  };

  /** Hover state utilities */
  hover: {
    /** Hover state for normal text color */
    textNormal: string;
    /** Hover state for bright text color */
    textBright: string;
    /** Hover state for dimmed text color */
    textDim: string;
    /** Special hover color for links (blue theme only) */
    linkColor: string;
  };

  /** Timeline-specific colors for Education section */
  timeline: {
    /** Color for timeline node markers */
    node: string;
    /** Color for timeline connecting lines */
    line: string;
    /** Background color on timeline item hover */
    hoverBg: string;
    /** Node color on timeline item hover */
    hoverNode: string;
  };

  /** Legend styling for Skills panels */
  legend: {
    /** Background color for legend titles */
    bg: string;
  };
}

/**
 * Theme-aware Tailwind classes hook
 *
 * Returns appropriate Tailwind utility classes based on the current theme.
 * Replaces CSS overrides with composable Tailwind utilities.
 *
 * @example
 * ```tsx
 * const tc = useThemeClasses();
 *
 * <p className={`${tc.text.bright} ${tc.hover.textNormal}`}>
 *   Hover over me
 * </p>
 * ```
 *
 * @returns {ThemeClasses} Object containing theme-specific Tailwind utility classes
 */
export function useThemeClasses(): ThemeClasses {
  const { theme } = useTheme();

  // Validate theme value
  if (!VALID_THEMES.includes(theme as ValidTheme)) {
    console.warn(
      `Invalid theme: "${theme}". Expected one of: ${VALID_THEMES.join(", ")}. Defaulting to "blue-pill".`,
    );
  }

  const isBlue = theme === "blue-pill";

  return {
    // Text colors
    text: {
      bright: isBlue
        ? "text-[oklch(0.25_0.08_210)]"
        : "text-matrix-green-bright",
      normal: isBlue ? "text-[oklch(0.3_0.05_210)]" : "text-matrix-green",
      dim: isBlue ? "text-[oklch(0.25_0.08_210)]" : "text-matrix-green-dim",
    },

    // Background colors
    bg: {
      main: isBlue ? "bg-[oklch(0.98_0_0)]" : "bg-matrix-black-pure",
      panel: isBlue ? "bg-[oklch(0.98_0_0)]" : "bg-matrix-black",
      accent: isBlue ? "bg-[oklch(0.25_0.08_210)]" : "bg-matrix-green-darker",
    },

    // Button text colors
    button: {
      label: isBlue ? "text-[oklch(0.95_0.02_210)]" : "text-white",
    },

    // Border colors
    border: {
      normal: isBlue
        ? "border-[oklch(0.7_0.05_210)]"
        : "border-matrix-green-darker",
    },

    // Hover states for interactive elements
    hover: {
      textNormal: isBlue
        ? "hover:text-[oklch(0.3_0.05_210)]"
        : "hover:text-matrix-green",
      textBright: isBlue
        ? "hover:text-[oklch(0.25_0.08_210)]"
        : "hover:text-matrix-green-bright",
      textDim: isBlue
        ? "hover:text-[oklch(0.25_0.08_210)]"
        : "hover:text-matrix-green-dim",
      linkColor: isBlue ? "hover:text-[oklch(0.4_0.15_210)]" : "",
    },

    // Legend title (for Skills panels)
    legend: {
      bg: isBlue ? "bg-[oklch(0.98_0_0)]" : "bg-matrix-black",
    },

    // Timeline colors (for Education timeline)
    timeline: {
      node: isBlue ? "text-[oklch(0.25_0.08_210)]" : "text-[#0f0]",
      line: isBlue ? "text-[oklch(0.25_0.08_210)]" : "text-[#0a0]",
      hoverBg: isBlue
        ? "group-hover:bg-[oklch(0.95_0_0)]"
        : "group-hover:bg-matrix-green-darker/5",
      hoverNode: isBlue
        ? "group-hover:text-[oklch(0.4_0.12_210)]"
        : "group-hover:text-[#1f1]",
    },
  };
}
