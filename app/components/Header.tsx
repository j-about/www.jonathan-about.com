"use client";

import { useThemeClasses } from "../hooks/useThemeClasses";

/**
 * Header Component
 *
 * Displays the main site header with name, title, and expertise areas in a retro
 * CRT terminal aesthetic. The header features responsive typography that scales
 * across all device sizes while maintaining readability and visual hierarchy.
 *
 * **Typography:**
 * - H1: Name displayed in custom Miltown font with CRT glow effect
 * - H2: Job title with subtle glow
 * - UL: Expertise areas with bullet separators on larger screens
 *
 * **Responsive Behavior:**
 * - Mobile: Stacked list items without separators
 * - Desktop (sm+): Inline list items with bullet separators
 * - Text sizes scale from 2xl (mobile) to 7xl (desktop) for H1
 *
 * **Accessibility:**
 * - Proper semantic HTML with role="banner"
 * - Clear heading hierarchy (H1 > H2)
 * - Sufficient color contrast per WCAG 2.2 AA standards
 * - Responsive font sizes ensure readability across devices
 *
 * **Visual Effects:**
 * - CRT glow effect on headings for authentic retro terminal feel
 * - Theme-aware text colors via useThemeClasses hook
 * - Custom Miltown font for distinctive branding
 *
 * @returns {JSX.Element} Header banner with name, title, and expertise
 */
export default function Header() {
  const tc = useThemeClasses();

  return (
    <header
      className="w-full space-y-4 py-4 text-center select-none"
      role="banner"
    >
      <h1
        className={`crt-glow [font-family:var(--font-family-miltown)] text-2xl leading-none uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl ${tc.text.bright}`}
      >
        Jonathan About
      </h1>
      <h2
        className={`crt-glow-subtle text-xl leading-none sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl ${tc.text.normal}`}
      >
        Software Engineer
      </h2>
      <ul
        className={`leading-none max-sm:space-y-2 md:text-lg lg:text-xl xl:text-xl 2xl:text-xl sm:[&>li+li]:before:content-['_•_'] ${tc.text.dim}`}
      >
        <li className="sm:inline">Data/MLOps Engineering</li>
        <li className="sm:inline">Web Development</li>
      </ul>
    </header>
  );
}
