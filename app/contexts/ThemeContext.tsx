"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import type { Theme } from "../types";

/**
 * Theme Context Value Interface
 * Provides theme state and toggle function to consuming components
 */
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Theme Context
 * Global context for theme management across the application
 */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Theme Provider Component
 * Provides theme state and management to all child components
 *
 * @param children - React children to be wrapped with theme context
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always default to red-pill (Matrix theme) on mount
  const [theme, setTheme] = useState<Theme>("red-pill");

  /**
   * Apply theme to DOM by adding/removing the blue-pill class
   * Memoized to prevent unnecessary re-creation on re-renders
   */
  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;

      if (newTheme === "blue-pill") {
        root.classList.add("blue-pill");
      } else {
        root.classList.remove("blue-pill");
      }
    }
  }, []);

  /**
   * Toggle between red-pill and blue-pill themes
   * Updates both React state and DOM classes
   */
  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === "red-pill" ? "blue-pill" : "red-pill";
    setTheme(newTheme);
    applyTheme(newTheme);
  }, [theme, applyTheme]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * Must be used within a ThemeProvider
 *
 * @returns Theme context value containing current theme and toggle function
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function Component() {
 *   const { theme, toggleTheme } = useTheme()
 *   return <button onClick={toggleTheme}>Current: {theme}</button>
 * }
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
