"use client";

import { useEffect } from "react";

import type { Section } from "../types";
import { KEYBOARD_SHORTCUTS } from "../lib/constants";

interface UseKeyboardOptions {
  onSectionChange: (section: Section) => void;
  onThemeToggle: () => void;
  enabled?: boolean;
}

/**
 * Keyboard navigation hook
 * Handles global keyboard shortcuts for navigation and theme switching
 */
export function useKeyboard({
  onSectionChange,
  onThemeToggle,
  enabled = true,
}: UseKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

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

      const key = event.key.toLowerCase();

      // Section navigation (1-4)
      if (key === KEYBOARD_SHORTCUTS.skills) {
        event.preventDefault();
        onSectionChange("skills");
      } else if (key === KEYBOARD_SHORTCUTS.projects) {
        event.preventDefault();
        onSectionChange("projects");
      } else if (key === KEYBOARD_SHORTCUTS.education) {
        event.preventDefault();
        onSectionChange("education");
      } else if (key === KEYBOARD_SHORTCUTS.connect) {
        event.preventDefault();
        onSectionChange("connect");
      }
      // Theme toggle (P)
      else if (key === KEYBOARD_SHORTCUTS.theme) {
        event.preventDefault();
        onThemeToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onSectionChange, onThemeToggle]);
}
