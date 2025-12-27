"use client";

import { useState, useEffect } from "react";

import type { Section } from "../types";
import { useKeyboard } from "../hooks/useKeyboard";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../hooks/useSound";
import { useThemeClasses } from "../hooks/useThemeClasses";
import Education from "./sections/Education";
import Footer from "./Footer";
import Header from "./Header";
import Connect from "./sections/Connect";
import LegalNotice from "./sections/LegalNotice";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

/**
 * Main Interface Component
 *
 * Central orchestrator for the entire application. Manages section navigation,
 * keyboard shortcuts, audio feedback, theme state, and renders the active content section.
 * This component serves as the main container after the boot sequence completes.
 *
 * **Architecture:**
 * - Header: Fixed position name/title display
 * - Main: Dynamic content area showing active section
 * - Footer: Function key navigation bar
 *
 * **State Management:**
 * - activeSection: Tracks which content section is currently displayed
 * - Theme state: Managed via ThemeContext (green/red Matrix themes)
 * - Audio state: Handled via useSound hook with ambient CRT buzz
 *
 * **User Interactions:**
 * 1. Click navigation: Footer buttons trigger handleSectionChange
 * 2. Keyboard navigation: 1-4 and L keys navigate sections, P toggles theme
 * 3. Audio feedback: Click sounds on navigation, continuous ambient buzz
 *
 * **Keyboard Shortcuts:**
 * - 1: Navigate to Skills section
 * - 2: Navigate to Projects section
 * - 3: Navigate to Education section
 * - 4: Navigate to Connect section
 * - L: Navigate to Legal Notice section
 * - P: Toggle theme (Matrix green ↔ red pill)
 *
 * **Audio System:**
 * - Ambient CRT buzz plays continuously (looped)
 * - Click sound plays on section navigation
 * - Proper cleanup on unmount prevents audio memory leaks
 *
 * **Performance Considerations:**
 * - No animations on section transitions (instant display)
 * - Sections are not lazy-loaded (small bundle size doesn't warrant it)
 * - Ambient audio is cleaned up properly on unmount
 *
 * **Accessibility:**
 * - Semantic HTML structure (header, main, footer)
 * - Keyboard navigation fully implemented
 * - Screen reader friendly with proper ARIA labels (in child components)
 * - Audio respects prefers-reduced-motion setting (handled by useSound)
 *
 * @returns {JSX.Element} Main application interface with header, content, and navigation
 */
export default function MainInterface() {
  const [activeSection, setActiveSection] = useState<Section>("skills");
  const { toggleTheme } = useTheme();
  const { playSound } = useSound();
  const tc = useThemeClasses();

  /**
   * Initialize ambient audio on component mount.
   *
   * Starts playing the continuous CRT buzz sound that provides atmospheric
   * background audio throughout the user's session. The sound loops indefinitely
   * until the component unmounts.
   *
   * The cleanup function (stopAmbient) is returned to ensure the audio buffer
   * is properly stopped and released when the user navigates away or closes the page.
   * This prevents memory leaks and ensures proper resource cleanup.
   *
   * Dependencies: playSound is stable from useSound hook.
   */
  useEffect(() => {
    const stopAmbient = playSound("ambient");
    return stopAmbient; // Cleanup on unmount
  }, [playSound]);

  /**
   * Handle section navigation with audio feedback.
   *
   * Called when user clicks a navigation button or presses a function key.
   * Plays a click sound effect for tactile feedback, then updates the active
   * section state to trigger re-render with new content.
   *
   * @param {Section} section - Target section identifier ('skills', 'projects', 'education', 'connect', 'legal')
   */
  const handleSectionChange = (section: Section) => {
    playSound("click");
    setActiveSection(section);
  };

  /**
   * Enable keyboard navigation shortcuts.
   *
   * Registers keyboard event listeners for 1-4, L (section navigation) and P (theme toggle).
   * The useKeyboard hook handles all keyboard event logic and cleanup.
   *
   * Keyboard handlers are always enabled since this is the main interface.
   */
  useKeyboard({
    onSectionChange: handleSectionChange,
    onThemeToggle: toggleTheme,
    enabled: true,
  });

  /**
   * Render the currently active section component.
   *
   * Simple switch statement that maps section identifiers to their corresponding
   * React components. Falls back to Skills section for any unexpected values.
   *
   * No lazy loading is used here as the bundle size is small and all sections
   * are lightweight, so the performance trade-off favors simplicity and
   * instant transitions.
   *
   * @returns {JSX.Element} Active section component
   */
  const renderSection = () => {
    switch (activeSection) {
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      case "education":
        return <Education />;
      case "connect":
        return <Connect />;
      case "legal":
        return <LegalNotice />;
      default:
        return <Skills />;
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full ${tc.bg.main} ${tc.text.normal}`}
    >
      {/* Header */}
      <Header />

      {/* Main Content - instant display, no animations */}
      <main className="px-4 pt-4 pb-10">{renderSection()}</main>

      {/* Footer Navigation */}
      <Footer
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onThemeToggle={toggleTheme}
      />
    </div>
  );
}
