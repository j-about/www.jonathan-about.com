"use client";

import { Fragment } from "react";
import { LINKS } from "../../lib/constants";
import { useThemeClasses } from "../../hooks/useThemeClasses";

/**
 * Connect Section Component
 * Terminal-style contact links
 */
export default function Connect() {
  const tc = useThemeClasses();

  return (
    <section className="w-full" aria-label="Connect">
      {/* Screen reader only heading for accessibility */}
      <h2 className="sr-only">Connect</h2>

      {/* Centered max-width container */}
      <div className="mx-auto max-w-2xl">
        {/* Contact panel with legend title */}
        <div className={`relative border-2 p-4 ${tc.border.normal}`}>
          {/* Content */}
          <dl className="gap-y-2 md:grid md:grid-cols-[auto_1fr] md:gap-x-2">
            {LINKS.map((link) => (
              <Fragment key={link.label}>
                <dt className={`before:content-['-_'] ${tc.text.dim}`}>
                  {/* Mobile: clickable label without colon */}
                  <a
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`underline md:hidden ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                  >
                    {link.label}
                  </a>
                  {/* Desktop: non-clickable label with colon */}
                  <span className="hidden md:inline">{link.label}:</span>
                </dt>
                <dd className="m-0 hidden md:block">
                  <a
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`underline ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                  >
                    {link.url}
                  </a>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
