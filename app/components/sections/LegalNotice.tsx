"use client";

import { LEGAL_NOTICE } from "../../lib/constants";
import { useThemeClasses } from "../../hooks/useThemeClasses";

/**
 * Legal Notice Section Component
 * Displays mandatory legal information as required by French LCEN
 */
export default function LegalNotice() {
  const tc = useThemeClasses();

  return (
    <section className="w-full" aria-label="Legal Notice">
      {/* Screen reader only heading for accessibility */}
      <h2 className="sr-only">Legal Notice</h2>

      {/* Centered max-width container with stacked panels */}
      <div className="mx-auto max-w-2xl space-y-5.5">
        {/* Website Owner Panel */}
        <div className={`relative border-2 p-4 pt-5.5 ${tc.border.normal}`}>
          <span
            className={`absolute -top-3 left-4 px-2 font-bold whitespace-nowrap ${tc.legend.bg} ${tc.text.bright}`}
          >
            Website Owner
          </span>
          <dl className="space-y-2">
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Name:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                {LEGAL_NOTICE.identity.firstName}{" "}
                {LEGAL_NOTICE.identity.lastName}
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Address:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                {LEGAL_NOTICE.contact.address}
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Email:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                <a
                  href={`mailto:${LEGAL_NOTICE.contact.email}`}
                  className={`underline ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                >
                  {LEGAL_NOTICE.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Phone:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                <a
                  href={`tel:${LEGAL_NOTICE.contact.phone}`}
                  className={`underline ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                >
                  {LEGAL_NOTICE.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                RCS:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                {LEGAL_NOTICE.business.rcs}
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                SIREN:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                {LEGAL_NOTICE.business.siren}
              </dd>
            </div>
          </dl>
        </div>

        {/* Hosting Provider Panel */}
        <div className={`relative border-2 p-4 pt-5.5 ${tc.border.normal}`}>
          <span
            className={`absolute -top-3 left-4 px-2 font-bold whitespace-nowrap ${tc.legend.bg} ${tc.text.bright}`}
          >
            Hosting Provider
          </span>
          <dl className="space-y-2">
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Company:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                {LEGAL_NOTICE.hosting.name} ({LEGAL_NOTICE.hosting.legalForm})
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Address:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                {LEGAL_NOTICE.hosting.address}
              </dd>
            </div>
            <div>
              <dt className={`inline before:content-['-_'] ${tc.text.dim}`}>
                Phone:
              </dt>
              <dd className={`ml-1 inline ${tc.text.normal}`}>
                <a
                  href={`tel:${LEGAL_NOTICE.hosting.phone}`}
                  className={`underline ${tc.text.bright} ${tc.hover.textNormal} ${tc.hover.linkColor}`}
                >
                  {LEGAL_NOTICE.hosting.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
