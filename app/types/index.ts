/**
 * Type definitions for the Matrix-themed website
 */

/**
 * Theme types for Red Pill and Blue Pill
 */
export type Theme = "red-pill" | "blue-pill";

/**
 * Navigation section types
 */
export type Section = "skills" | "projects" | "education" | "connect";

/**
 * Skill group with category and technologies
 */
export interface SkillGroup {
  category: string;
  matrixName: string;
  skills: string[];
}

/**
 * Project information
 */
export interface Project {
  title: string;
  description?: string;
  website?: string;
  github?: string;
  asciiLogo?: string;
}

/**
 * Education entry
 */
export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
}

/**
 * External link
 */
export interface Link {
  label: string;
  url: string;
  external: boolean;
}

/**
 * Boot sequence message
 */
export interface BootMessage {
  text: string;
  delay: number;
}

/**
 * Sound type for audio system
 */
export type SoundType = "boot" | "typing" | "ambient" | "beep" | "click";
