"use client";

import { SKILLS } from "../../lib/constants";
import { useThemeClasses } from "../../hooks/useThemeClasses";

/**
 * Skills Section Component
 * Terminal-style panels with legend titles breaking through borders
 */
export default function Skills() {
  const tc = useThemeClasses();

  return (
    <section className="w-full pt-1.5" aria-label="Skills">
      {/* Screen reader only heading for accessibility */}
      <h2 className="sr-only">Skills</h2>

      <div className="grid gap-x-4 gap-y-5.5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {SKILLS.map((group) => (
          <div
            key={group.category}
            className={`relative border-2 p-4 pt-5.5 ${tc.border.normal}`}
          >
            {/* Title with subtitle breaking through border (legend style) */}
            <span
              className={`absolute -top-3 left-4 px-2 font-bold whitespace-nowrap ${tc.legend.bg} ${tc.text.bright}`}
            >
              {group.matrixName}
              <span className="font-medium"> [{group.category}]</span>
            </span>

            {/* Skills list */}
            <ul className="space-y-2" role="list">
              {group.skills.map((skill) => (
                <li key={skill} className={`${tc.text.normal}`}>
                  <span className={tc.text.bright}>▸</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
