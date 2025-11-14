"use client";

import { useState, useEffect } from "react";

import { PROJECTS } from "../../lib/constants";
import { useThemeClasses } from "../../hooks/useThemeClasses";

/**
 * Projects Section Component
 * Terminal-style project display with CSS borders
 */
export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = PROJECTS[currentIndex];
  const showNavigation = PROJECTS.length > 1;
  const tc = useThemeClasses();

  // Check if we're at the boundaries
  const isFirstProject = currentIndex === 0;
  const isLastProject = currentIndex === PROJECTS.length - 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : prev));
  };

  // Add keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Guard against undefined currentProject
  if (!currentProject) {
    return null;
  }

  return (
    <section className="w-full" aria-label="Projects">
      {/* Screen reader only heading for accessibility */}
      <h2 className="sr-only">Projects</h2>

      {/* Centered max-width container */}
      <div className="mx-auto max-w-md">
        {/* Main project panel with legend title */}
        <div className={`relative border-2 p-4 ${tc.border.normal}`}>
          {/* ASCII Logo (if available) */}
          {currentProject.asciiLogo && (
            <div className="mb-4 overflow-x-auto text-center">
              <pre
                className={`crt-glow-subtle inline-block leading-tight max-sm:text-sm ${tc.text.bright}`}
              >
                {currentProject.asciiLogo}
              </pre>
            </div>
          )}

          {/* Project title as subtitle */}
          <h3 className={`font-bold ${tc.text.bright}`}>
            {currentProject.title}
          </h3>

          {/* Project description */}
          {currentProject.description && (
            <p
              className={`mt-4 border-t pt-4 leading-relaxed ${tc.text.normal} ${tc.border.normal}`}
            >
              {currentProject.description}
            </p>
          )}

          {/* Links */}
          {(currentProject.website || currentProject.github) && (
            <dl
              className={`mt-4 gap-y-2 border-t pt-4 md:grid md:grid-cols-[auto_1fr] md:gap-x-2 ${tc.border.normal}`}
            >
              {currentProject.website && (
                <>
                  <dt className={`before:content-['-_'] ${tc.text.dim}`}>
                    {/* Mobile: clickable label without colon */}
                    <a
                      href={currentProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline md:hidden ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                    >
                      Website
                    </a>
                    {/* Desktop: non-clickable label with colon */}
                    <span className="hidden md:inline">Website:</span>
                  </dt>
                  <dd className="m-0 hidden md:block">
                    <a
                      href={currentProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                    >
                      {currentProject.website}
                    </a>
                  </dd>
                </>
              )}
              {currentProject.github && (
                <>
                  <dt className={`before:content-['-_'] ${tc.text.dim}`}>
                    {/* Mobile: clickable label without colon */}
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline md:hidden ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                    >
                      GitHub
                    </a>
                    {/* Desktop: non-clickable label with colon */}
                    <span className="hidden md:inline">GitHub:</span>
                  </dt>
                  <dd className="m-0 hidden md:block">
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                    >
                      {currentProject.github}
                    </a>
                  </dd>
                </>
              )}
            </dl>
          )}
        </div>

        {/* Arrow Navigation - outside panel */}
        {showNavigation && (
          <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center text-sm">
            <div className="flex justify-start">
              <button
                onClick={goToPrevious}
                className={`flex items-center gap-2 bg-transparent px-2 py-1 ${isFirstProject ? "pointer-events-none invisible" : ""} ${tc.text.normal} ${tc.hover.textBright}`}
                aria-label="Previous project"
                aria-hidden={isFirstProject}
              >
                <span className="text-lg">←</span>
                <span>Prev</span>
              </button>
            </div>

            <div className="flex justify-center">
              <span className={tc.text.dim}>
                ({currentIndex + 1}/{PROJECTS.length}) Use ← → arrow keys
              </span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={goToNext}
                className={`flex items-center gap-2 bg-transparent px-2 py-1 ${isLastProject ? "pointer-events-none invisible" : ""} ${tc.text.normal} ${tc.hover.textBright}`}
                aria-label="Next project"
                aria-hidden={isLastProject}
              >
                <span>Next</span>
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
