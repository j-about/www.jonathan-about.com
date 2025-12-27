"use client";

import type { Section } from "../types";
import { useThemeClasses } from "../hooks/useThemeClasses";

/**
 * Props for the Footer component.
 *
 * @interface FooterProps
 * @property {Section} activeSection - Currently active section identifier
 * @property {(section: Section) => void} onSectionChange - Callback to handle section navigation
 * @property {() => void} onThemeToggle - Callback to toggle theme (Matrix green/red pill)
 */
interface FooterProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onThemeToggle: () => void;
}

/**
 * Props for individual navigation button.
 *
 * @interface NavButtonProps
 * @property {string} itemKey - Key identifier (1-4, L, P)
 * @property {string} label - Descriptive label shown on desktop
 * @property {string} emoji - Icon emoji shown on mobile
 * @property {boolean} isActive - Whether this button's section is currently active
 * @property {() => void} onClick - Click handler for button activation
 */
interface NavButtonProps {
  itemKey: string;
  label: string;
  emoji: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Navigation Button Component
 *
 * Individual button in the footer navigation bar. Each button displays
 * a key (1-4, L, P) with either an emoji (mobile) or text label (desktop).
 *
 * **Responsive Behavior:**
 * - Mobile (< sm): Shows emoji icons for compact display
 * - Desktop (sm+): Shows full text labels for clarity
 *
 * **Visual Design:**
 * - White function key badge on left (high contrast)
 * - Theme-colored label on right
 * - aria-current indicates active section for screen readers
 *
 * This component is extracted as a separate function to comply with React's
 * Rules of Hooks (useThemeClasses must be called at component top level).
 *
 * @param {NavButtonProps} props - Button configuration
 * @returns {JSX.Element} Navigation button element
 */
function NavButton({
  itemKey,
  label,
  emoji,
  isActive,
  onClick,
}: NavButtonProps) {
  const tc = useThemeClasses();

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center`}
      aria-label={`${label} section`}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Key */}
      <span className={`mr-1 bg-[oklch(0.98_0_0)] px-1 font-bold`}>
        {itemKey}
      </span>
      {/* Label: emoji on mobile, text on SM+ */}
      <span className={`sm:hidden ${tc.button.label}`} aria-hidden="true">
        {emoji}
      </span>
      <span className={`hidden sm:inline ${tc.button.label}`}>{label}</span>
    </button>
  );
}

/**
 * Footer Navigation Component
 *
 * Fixed-bottom navigation bar with keyboard shortcuts.
 * Displays navigation options as keys (1-4) plus a theme toggle (P for "Pill").
 * Legal Notice (L) is separated on the right side for visual distinction.
 *
 * **Navigation Items (left side):**
 * - 1: Skills section (🧠 brain emoji on mobile)
 * - 2: Projects section (📁 folder emoji on mobile)
 * - 3: Education section (🎓 graduation cap emoji on mobile)
 * - 4: Connect section (🔗 link emoji on mobile)
 * - P: Theme toggle (💊 pill emoji on mobile)
 *
 * **Navigation Item (right side, separated):**
 * - L: Legal Notice section (⚖ scale emoji on mobile)
 *
 * **Features:**
 * - White function key badges (high contrast)
 * - Theme-colored labels
 * - Fixed positioning at screen bottom
 * - Compact, information-dense layout
 *
 * **Responsive Behavior:**
 * - Mobile: Shows emoji icons for space efficiency
 * - Desktop: Shows full text labels for clarity
 * - Wraps gracefully on narrow screens
 *
 * **Accessibility:**
 * - Semantic footer element with role="contentinfo"
 * - Navigation landmark with aria-label
 * - aria-current indicates active section
 * - Descriptive button labels for screen readers
 * - Keyboard navigable (tab order follows visual order)
 *
 * **Keyboard Support:**
 * Users can navigate sections using keyboard via parent MainInterface component
 * which listens for 1-4, L, and P key presses.
 *
 * @param {FooterProps} props - Component props
 * @param {Section} props.activeSection - Currently displayed section
 * @param {(section: Section) => void} props.onSectionChange - Section navigation handler
 * @param {() => void} props.onThemeToggle - Theme toggle handler
 * @returns {JSX.Element} Fixed footer navigation bar
 */
export default function Footer({
  activeSection,
  onSectionChange,
  onThemeToggle,
}: FooterProps) {
  const tc = useThemeClasses();

  const mainNavItems: Array<{
    key: string;
    label: string;
    emoji: string;
    section: Section | null;
    action?: () => void;
  }> = [
    { key: "1", label: "Skills", emoji: "\u{1F9E0}", section: "skills" },
    { key: "2", label: "Projects", emoji: "\u{1F4C1}", section: "projects" },
    { key: "3", label: "Education", emoji: "\u{1F393}", section: "education" },
    { key: "4", label: "Connect", emoji: "\u{1F517}", section: "connect" },
    {
      key: "P",
      label: "Theme",
      emoji: "\u{1F48A}",
      section: null,
      action: onThemeToggle,
    },
  ];

  const legalNavItem = {
    key: "L",
    label: "Legal Notice",
    emoji: "\u{2696}",
    section: "legal" as Section,
  };

  return (
    <footer
      className={`fixed right-0 bottom-0 left-0 z-30 ${tc.bg.panel}`}
      role="contentinfo"
    >
      <nav
        className={`flex flex-wrap items-center justify-between px-4 text-base select-none ${tc.bg.accent}`}
        aria-label="Main navigation"
      >
        {/* Main navigation items (left) */}
        <div className="flex flex-wrap items-center gap-x-2">
          {mainNavItems.map((item) => {
            const isActive = activeSection === item.section;

            return (
              <NavButton
                key={item.key}
                itemKey={item.key}
                label={item.label}
                emoji={item.emoji}
                isActive={isActive}
                onClick={() =>
                  item.section ? onSectionChange(item.section) : item.action?.()
                }
              />
            );
          })}
        </div>

        {/* Legal notice button (right) */}
        <NavButton
          itemKey={legalNavItem.key}
          label={legalNavItem.label}
          emoji={legalNavItem.emoji}
          isActive={activeSection === legalNavItem.section}
          onClick={() => onSectionChange(legalNavItem.section)}
        />
      </nav>
    </footer>
  );
}
