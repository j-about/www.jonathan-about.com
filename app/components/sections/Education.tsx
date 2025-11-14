"use client";

import { EDUCATION } from "../../lib/constants";
import { useThemeClasses } from "../../hooks/useThemeClasses";

/**
 * Education Section Component
 * Timeline with interactive hover states displaying educational history
 */
export default function Education() {
  const tc = useThemeClasses();

  return (
    <section className="w-full" aria-label="Education">
      {/* Screen reader only heading for accessibility */}
      <h2 className="sr-only">Education</h2>

      {/* Centered max-width container */}
      <div className="mx-auto max-w-sm">
        {/* Timeline container */}
        <div className={`relative border-2 p-4 ${tc.border.normal}`}>
          {/* Timeline */}
          <div className="relative">
            {EDUCATION.map((edu, index) => (
              <div
                key={edu.id}
                className="group relative overflow-hidden transition-colors"
                tabIndex={0}
                role="article"
                aria-label={`Education: ${edu.degree} at ${edu.school}`}
              >
                {/* ASCII Timeline (left column) */}
                <div
                  className="absolute top-0 left-0 leading-none select-none"
                  aria-hidden="true"
                >
                  {/* Commit node (filled circle) */}
                  <div
                    className={`${tc.timeline.node} ${tc.timeline.hoverNode}`}
                  >
                    ●
                  </div>
                  {/* Timeline continuation lines */}
                  <div className={`${tc.timeline.line}`}>
                    <div>│</div>
                    <div>│</div>
                    <div>│</div>
                    <div>│</div>
                  </div>
                </div>

                {/* Content (right column) */}
                <div
                  className={`space-y-2 rounded pl-4.5 leading-none transition-colors ${tc.timeline.hoverBg} ${index !== EDUCATION.length - 1 ? "pb-3" : ""}`}
                >
                  {/* First line: Identifier + School + Degree */}
                  <div className={`${tc.text.normal}`}>
                    <span className={tc.text.dim}>{edu.id}</span>{" "}
                    <span className={`font-bold ${tc.text.bright}`}>
                      {edu.school}
                    </span>
                  </div>

                  {/* Second line: Degree */}
                  <div className={`${tc.text.dim}`}>{edu.degree}</div>

                  {/* Third line: Field of study */}
                  <div className={`${tc.text.normal}`}>
                    Field: {edu.fieldOfStudy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
