# Jonathan About | Software Engineer Website

> **"The Matrix has you..."** - A cyberpunk-themed website showcasing software engineering expertise through an immersive Matrix-inspired experience.

[![Node.js Version](https://img.shields.io/badge/node-24.11.1-green.svg)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**🌐 Live Demo:** [www.jonathan-about.com](https://www.jonathan-about.com)

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
- [Project Structure](#-project-structure)
- [Development](#-development)
  - [Available Scripts](#available-scripts)
  - [Code Quality](#code-quality)
- [Features Deep Dive](#-features-deep-dive)
  - [Matrix Rain Effect](#matrix-rain-effect)
  - [Dual Theme System](#dual-theme-system)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Audio System](#audio-system)
- [Customization Guide](#-customization-guide)
  - [Modifying Content](#modifying-content)
  - [Theme Customization](#theme-customization)
  - [Adding New Sections](#adding-new-sections)
- [Build Process](#-build-process)
- [Deployment](#-deployment)
  - [Docker](#docker)
- [Performance](#-performance)
- [Security](#-security)
  - [Security Headers](#security-headers)
  - [Additional Security Measures](#additional-security-measures)
- [Accessibility](#-accessibility)
  - [WCAG 2.2 AA Compliance](#wcag-22-aa-compliance)
- [Browser Support](#-browser-support)
- [Troubleshooting](#-troubleshooting)
  - [Common Issues](#common-issues)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About the Project

**Jonathan About | Software Engineer Website** is a cutting-edge, cyberpunk-inspired personal website that pays homage to _The Matrix_ film franchise. Built with modern web technologies, it delivers an immersive experience featuring a 3D Matrix rain intro, terminal boot sequence with procedural audio, and a dual-theme system representing the iconic choice between the red pill and blue pill.

This project demonstrates advanced web development capabilities including:

- **WebGL 3D graphics** rendering with Three.js
- **Procedural audio synthesis** using Web Audio API
- **Modern React patterns** with Server and Client Components
- **Enterprise-grade TypeScript** architecture
- **Accessibility-first design** (WCAG 2.2 AA compliance)
- **Performance optimization** techniques for smooth 60fps animations

The website serves as both to showcase skills, projects, education, and contact information, while also being a technical demonstration of modern web capabilities.

---

## ✨ Key Features

### 🌧️ Matrix Rain Introduction

- **GPU-accelerated particle system** with instanced rendering (2000 particles on desktop, 800 on mobile)
- **4 parallax layers** with different speeds (0.5×, 0.75×, 1.0×, 1.25×) for depth perception
- **Cinematic camera dolly** animation (z: 50 → 5, FOV: 40° → 55°) over 2.5 seconds
- **Authentic character set** featuring halfwidth katakana (ｦｱｳｴｵｶｷ...), Latin, digits, and symbols
- **Optimized WebGL rendering** with DPR clamping and performance power preference

### 🖥️ Terminal Boot Sequence

- **Animated ASCII transmission** with typing effect
- **Procedural audio synthesis** (no audio files required):
  - Beep sounds (1200Hz sine wave, 150ms)
  - Typing clicks (800Hz square wave, 50ms)
  - CRT ambient buzz (60Hz sawtooth with low-pass filter, looped)
- **Singleton AudioContext** pattern for browser compatibility

### 🔴🔵 Dual Theme System

- **Red Pill** (Matrix Green): High-contrast green (#00ff41) on pure black with CRT glow effects
- **Blue Pill** (Cyan Light): Cyan (#00bcd4) on warm beige with subtle shadows
- **CSS custom properties** (design tokens) for seamless theme switching
- **Keyboard toggle** with 'P' key

### ⌨️ Keyboard Navigation

- **Section shortcuts**: Press `1-4` to jump to Skills, Projects, Education, or Connect
- **Theme toggle**: Press `P` to switch between Red/Blue pill themes
- **Full keyboard accessibility**: All interactive elements reachable via Tab/Shift+Tab
- **Visual focus indicators**: Clear focus-visible outlines for keyboard users

### 🎨 CRT Monitor Aesthetic

- **Custom scan line effect** using CSS gradients and animations
- **Multi-layer text glow** (crt-glow utility) with drop shadows
- **Authentic retro typography** using custom "Miltown" font + monospace fallbacks
- **Responsive flicker animation** (respects prefers-reduced-motion)

### ♿ Accessibility First

- **WCAG 2.2 AA compliant**: Color contrast ratios meet standards
- **Semantic HTML**: Proper heading hierarchy (H1 → H2), landmarks (header, main, footer)
- **ARIA attributes**: Labels, roles, and live regions for assistive technologies
- **Screen reader friendly**: Descriptive text and proper focus management
- **Reduced motion support**: Animations disabled/reduced when `prefers-reduced-motion: reduce`

### 📱 Responsive Design

- **Mobile-first approach**: Optimized for all screen sizes
- **Responsive typography**: Clamp-based fluid scaling (`clamp(1.5rem, 6vw, 4rem)`)
- **Adaptive particle count**: Auto-adjusts Matrix rain density based on device
- **Touch-friendly**: Adequate tap targets and gesture support

### 🔍 Search Engine Optimization (SEO)

- **Dynamic robots.txt**: Programmatically generated via `robots.ts` (Next.js special Route Handler)
- **XML sitemap**: Auto-generated sitemap with metadata (lastModified, changeFrequency, priority)
- **Standards compliant**: Follows Robots Exclusion Standard and Sitemaps XML format
- **Crawl optimization**: Guides search engine bots for efficient indexing
- **Cached by default**: Special Route Handlers cached for performance

---

## 🛠️ Technology Stack

### Core Framework

| Technology     | Version | Purpose                                                           |
| -------------- | ------- | ----------------------------------------------------------------- |
| **Next.js**    | 16.0.3  | React framework with App Router, Server Components, Static Export |
| **React**      | 19.2.0  | UI library with latest concurrent features                        |
| **React DOM**  | 19.2.0  | React renderer for web                                            |
| **TypeScript** | 5.9.3   | Type-safe JavaScript with strict mode                             |
| **Node.js**    | 24.11.1 | JavaScript runtime (Docker: node:24.11.1-alpine)                  |

### 3D Graphics & Animation

| Technology             | Version  | Purpose                                      |
| ---------------------- | -------- | -------------------------------------------- |
| **Three.js**           | 0.181.1  | WebGL library for 3D graphics rendering      |
| **@react-three/fiber** | 9.4.0    | React renderer for Three.js (declarative 3D) |
| **Framer Motion**      | 12.23.24 | Production-ready animation library           |

### Styling

| Technology       | Version | Purpose                                                  |
| ---------------- | ------- | -------------------------------------------------------- |
| **Tailwind CSS** | 4.1.17  | Utility-first CSS framework with v4 @theme directive     |
| **PostCSS**      | 4.1.17  | CSS transformation via @tailwindcss/postcss              |
| **Custom CSS**   | -       | Design tokens, CRT effects, scan lines, custom utilities |

### Development Tools

| Technology            | Version | Purpose                                        |
| --------------------- | ------- | ---------------------------------------------- |
| **ESLint**            | 9.39.1  | JavaScript/TypeScript linting with flat config |
| **Prettier**          | 3.6.2   | Code formatter with Tailwind plugin            |
| **ttf2woff2**         | 8.0.0   | Font conversion (TTF → WOFF2)                  |
| **TypeScript ESLint** | 8.46.4  | TypeScript-specific ESLint rules               |

### Type Definitions

- `@types/node@24.10.1` - Node.js type definitions
- `@types/react@19.2.4` - React type definitions
- `@types/react-dom@19.2.3` - React DOM type definitions
- `@types/three@0.181.0` - Three.js type definitions

### Audio

- **Web Audio API** (native browser API) - Procedural sound synthesis without audio files

---

## 🏗️ Architecture Overview

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Root Layout (Server)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              ThemeProvider (Client)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Home Page (Client)                    │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │     BootSequence (Dynamic Import)         │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │  MatrixRain (Dynamic, SSR disabled) │  │  │  │  │
│  │  │  │  │  - MatrixRainScene                  │  │  │  │  │
│  │  │  │  │  - MatrixParticles (GPU instanced)  │  │  │  │  │
│  │  │  │  │  - CameraController                 │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  │              ↓                            │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │  MainInterface (Dynamic)            │  │  │  │  │
│  │  │  │  │  - Header                           │  │  │  │  │
│  │  │  │  │  - Content Sections                 │  │  │  │  │
│  │  │  │  │  - Footer                           │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  │  Scan Lines Overlay (always visible)            │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

**Server Components:**

- `app/layout.tsx` - Root layout with metadata and HTML shell

**Client Components:**

- `ThemeContext` - Global theme state provider (red pill/blue pill)
- `BootSequence` - Terminal boot animation coordinator
- `MatrixRain` - WebGL canvas wrapper (Three.js)
- `MainInterface` - Main website content
- `Header` - Site header with name and tagline
- `Footer` - Navigation footer with section links
- Various section components (Skills, Projects, Education, Connect)

### Rendering Strategy

| Component      | Rendering               | Reason                        |
| -------------- | ----------------------- | ----------------------------- |
| Root Layout    | Server                  | Static shell, metadata, SEO   |
| Theme Provider | Client                  | React Context requires client |
| Boot Sequence  | Client (dynamic import) | SSR disabled (DOM animations) |
| Matrix Rain    | Client (dynamic import) | SSR disabled (Three.js/WebGL) |
| Main Interface | Client (dynamic import) | Interactive state management  |

### State Management

**React Context API:**

- `ThemeContext` provides global theme state (`'red-pill' | 'blue-pill'`)
- `useTheme()` hook for consuming theme in components

**Local State:**

- `useState` for component-level state (active section, boot sequence progress)
- `useEffect` for side effects (audio initialization, keyboard listeners)
- No external state management library (Redux, Zustand) required

### Audio System Architecture

```
AudioContextManager (Singleton)
├── getContext() → AudioContext
├── playBeep() → OscillatorNode(1200Hz) → GainNode → Destination
├── playTyping() → OscillatorNode(800Hz) → GainNode → Destination
└── playAmbient() → OscillatorNode(60Hz) → BiquadFilter → GainNode → Destination
```

**Pattern:** Singleton ensures only one AudioContext exists (browser limitation compliance)

### Matrix Rain Technical Specifications

**Particle System:**

- **Desktop:** 2000 particles
- **Mobile:** 800 particles (auto-detected)
- **Layers:** 4 parallax layers with speeds [0.5, 0.75, 1.0, 1.25]
- **Rendering:** GPU instanced rendering (single draw call per layer)
- **Character Set:** 104 unique glyphs (halfwidth katakana, Latin A-Z, 0-9, symbols)

**Camera Animation:**

- **Start:** position.z = 50, FOV = 40°
- **End:** position.z = 5, FOV = 55°
- **Duration:** 2.5 seconds
- **Easing:** Cubic in-out

**Timeline (3.5s total):**

```
0.0s  → Rain begins, camera at z=50
0.0s  → Camera dolly animation starts
2.0s  → Fade-out begins (opacity 1 → 0)
2.5s  → Camera reaches z=5, FOV=55°
3.5s  → Animation complete, onComplete callback fired
```

**Performance Optimizations:**

- DPR (Device Pixel Ratio) clamped to [1, 2] to prevent over-rendering
- Antialiasing disabled for better performance
- `powerPreference: "high-performance"` for dedicated GPU
- Instanced rendering reduces draw calls from 2000+ to 4

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 24.11.1 or higher ([Download](https://nodejs.org))
  - Verify: `node --version`
- **npm**: Comes with Node.js (or use pnpm/yarn)
  - Verify: `npm --version`
- **Modern browser** with:
  - WebGL support ([Check compatibility](https://get.webgl.org/))
  - Web Audio API support (all modern browsers)
  - JavaScript enabled

**Alternative: Docker**

- **Docker**: 20.10 or higher ([Download](https://www.docker.com/get-started))
  - Verify: `docker --version`
  - Skip Node.js/npm installation if using Docker

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/www.jonathan-about.com.git
   cd www.jonathan-about.com
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This will:
   - Install all production and development dependencies
   - Run `preinstall` hooks (if any)

3. **Convert fonts (automatic):**

   ```bash
   npm run fonts:convert
   ```

   This converts the custom Miltown font from TTF to WOFF2 format. This step runs automatically before `dev` and `build` scripts via pre-hooks.

### Development Server

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will automatically reload when you make changes.

**Development Features:**

- Hot Module Replacement (HMR) for instant updates
- Fast Refresh for React components
- TypeScript type checking
- Source maps for debugging

---

## 📂 Project Structure

```
www.jonathan-about.com/
├── app/                                     # Next.js App Router directory
│   ├── components/                          # React components
│   │   ├── matrix/                          # Matrix rain 3D effect
│   │   │   ├── shaders/                     # WebGL GLSL shaders
│   │   │   │   ├── fragmentShader.ts        # Fragment shader for particles
│   │   │   │   └── vertexShader.ts          # Vertex shader with instancing
│   │   │   ├── utils/                       # Matrix utilities
│   │   │   │   ├── easing.ts                # Cubic in-out easing function
│   │   │   │   ├── generateAtlas.ts         # Texture atlas for characters
│   │   │   │   └── generateParticleData.ts  # Particle initialization
│   │   │   ├── CameraController.tsx         # Camera dolly animation
│   │   │   ├── MatrixParticles.tsx          # GPU instanced particle system
│   │   │   └── MatrixRainScene.tsx          # Scene orchestrator
│   │   ├── sections/                        # Content sections
│   │   │   ├── ConnectSection.tsx           # Contact links (LinkedIn, GitHub, etc.)
│   │   │   ├── EducationSection.tsx         # Education timeline
│   │   │   ├── ProjectsSection.tsx          # Projects showcase
│   │   │   └── SkillsSection.tsx            # Skills categories
│   │   ├── BootSequence.tsx                 # Terminal boot animation
│   │   ├── Footer.tsx                       # Navigation footer
│   │   ├── Header.tsx                       # Site header
│   │   ├── MainInterface.tsx                # Main application with section routing
│   │   └── MatrixRain.tsx                   # Matrix rain wrapper
│   ├── contexts/                            # React Context providers
│   │   └── ThemeContext.tsx                 # Theme management (red/blue pill)
│   ├── hooks/                               # Custom React hooks
│   │   ├── useKeyboard.ts                   # Keyboard navigation hook (1-4, P)
│   │   ├── useSound.ts                      # Web Audio API hook
│   │   └── useThemeClasses.ts               # Theme-aware CSS class utility
│   ├── lib/                                 # Utilities and managers
│   │   ├── AudioContextManager.ts           # Singleton audio context manager
│   │   ├── constants.ts                     # Content data (skills, projects, etc.)
│   │   └── utils.ts                         # Helper functions (cn, etc.)
│   ├── types/                               # TypeScript type definitions
│   │   └── index.ts                         # Shared interfaces and types
│   ├── apple-icon.tsx                       # Dynamic Apple touch icon
│   ├── globals.css                          # Tailwind CSS + custom styles
│   ├── icon.tsx                             # Dynamic favicon
│   ├── layout.tsx                           # Root layout (Server Component)
│   ├── opengraph-image.tsx                  # OG image generator
│   ├── page.tsx                             # Home page (Client Component)
│   ├── robots.ts                            # Robots.txt generator (SEO)
│   ├── sitemap.ts                           # Sitemap.xml generator (SEO)
│   └── twitter-image.tsx                    # Twitter card image
├── public/                                  # Static assets
│   ├── fonts/                               # Web fonts (WOFF2 - generated)
│   │   └── miltown-regular.woff2            # Custom Miltown font
│   └── icon.jpg                             # Site icon (512×512)
├── fonts-src/                               # Source font files (TTF)
│   └── miltown-regular.ttf                  # Original font file
├── .gitignore                               # Git ignore rules
├── .node-version                            # Node.js version (24.11.1)
├── .prettierignore                          # Prettier ignore rules
├── Dockerfile                               # Multi-stage Docker build configuration
├── eslint.config.mjs                        # ESLint flat config
├── LICENSE                                  # MIT License
├── next-env.d.ts                            # Next.js TypeScript declarations (generated)
├── next.config.ts                           # Next.js configuration
├── package.json                             # Dependencies and scripts
├── package-lock.json                        # Locked dependency versions
├── postcss.config.js                        # PostCSS configuration (Tailwind)
├── prettier.config.js                       # Prettier configuration
├── README.md                                # This file
└── tsconfig.json                            # TypeScript configuration
```

### Key Directory Explanations

- **`app/`**: Next.js App Router directory. All routing and pages live here.
- **`app/components/`**: Reusable React components. Organized by feature (matrix, sections).
- **`app/contexts/`**: React Context providers for global state (theme).
- **`app/hooks/`**: Custom React hooks for shared logic (keyboard, sound, theme utilities).
- **`app/lib/`**: Utilities, constants, and singleton classes (AudioContextManager).
- **`app/types/`**: TypeScript type definitions and interfaces.
- **`public/`**: Static files served from root. Fonts, images, icons.
- **`fonts-src/`**: Source font files (TTF) before conversion to WOFF2.

### File Naming Conventions

- **React Components:** PascalCase (e.g., `MatrixRain.tsx`, `BootSequence.tsx`)
- **Utilities/Hooks:** camelCase (e.g., `useKeyboard.ts`, `generateAtlas.ts`)
- **Config Files:** kebab-case or standard names (e.g., `next.config.ts`, `eslint.config.mjs`)
- **Constants:** camelCase file, UPPER_SNAKE_CASE exports (e.g., `constants.ts` exports `BOOT_MESSAGES`)

---

## 💻 Development

### Available Scripts

| Script            | Command                                                                      | Description                                       |
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------- |
| **fonts:convert** | `ttf2woff2 fonts-src/miltown-regular.ttf public/fonts/miltown-regular.woff2` | Convert TTF fonts to WOFF2 format                 |
| **predev**        | `npm run fonts:convert`                                                      | Pre-hook: Convert fonts before dev server         |
| **dev**           | `next dev`                                                                   | Start development server at http://localhost:3000 |
| **prebuild**      | `npm run fonts:convert`                                                      | Pre-hook: Convert fonts before build              |
| **build**         | `next build`                                                                 | Build production-optimized static site            |
| **start**         | `next start`                                                                 | Start production server (requires build first)    |
| **lint**          | `eslint . --max-warnings=0`                                                  | Lint all files (zero warnings policy)             |
| **lint:fix**      | `eslint . --fix`                                                             | Auto-fix linting issues                           |
| **type-check**    | `tsc --noEmit`                                                               | Validate TypeScript types without emitting        |
| **format**        | `prettier --write .`                                                         | Format all files with Prettier                    |
| **format:check**  | `prettier --check .`                                                         | Check formatting without modifying                |

**Usage Examples:**

```bash
# Development workflow
npm run dev                    # Start dev server
npm run lint                   # Check for issues
npm run type-check             # Validate TypeScript

# Production build
npm run build                  # Build for production
npm run start                  # Preview production build locally

# Code quality
npm run lint:fix               # Auto-fix linting issues
npm run format                 # Format code
```

### Code Quality

#### ESLint Configuration

**File:** `eslint.config.mjs` (Flat config format)

**Enabled Rules:**

- **TypeScript ESLint** (`@typescript-eslint/recommended-type-checked`)
- **React** (`eslint-plugin-react/recommended`)
- **React Hooks** (`eslint-plugin-react-hooks/recommended`)
- **Next.js** (`@next/eslint-plugin-next/core-web-vitals`)

**Custom Rules:**

- `react/react-in-jsx-scope: "off"` (not needed in Next.js App Router)
- `react/no-unknown-property: ["error", { ignore: ["args"] }]` (Three.js compatibility)

**Zero Warnings Policy:**

- All linting commands use `--max-warnings=0`
- Warnings are treated as errors in CI/CD (if configured)

#### Prettier Configuration

**File:** `prettier.config.js`

**Settings:**

```javascript
{
  semi: false,              // No semicolons
  singleQuote: true,        // Single quotes for strings
  tabWidth: 2,              // 2-space indentation
  trailingComma: 'es5',     // ES5 trailing commas
  plugins: [
    'prettier-plugin-tailwindcss'  // Auto-sort Tailwind classes
  ]
}
```

**Tailwind Plugin:** Automatically sorts Tailwind CSS class names in a consistent order.

#### TypeScript Configuration

**File:** `tsconfig.json`

**Strict Mode Enabled:**

- `strict: true` (enables all strict type-checking options)
- `noUnusedLocals: true` (error on unused local variables)
- `noUnusedParameters: true` (error on unused function parameters)
- `noFallthroughCasesInSwitch: true` (error on switch fallthrough)
- `noImplicitReturns: true` (error on functions without return)
- `noUncheckedIndexedAccess: true` (add undefined to index signatures)

**Compiler Options:**

- Target: `ES2017`
- Module: `ESNext`
- JSX: `preserve` (handled by Next.js)
- Module Resolution: `bundler`
- Incremental builds for faster compilation

**Path Alias:**

```typescript
"@/*" → "./*"
```

Example: `import { cn } from '@/app/lib/utils'`

---

## 🎨 Features Deep Dive

### Matrix Rain Effect

The Matrix rain is a fully custom WebGL implementation using Three.js, not a pre-built library. It demonstrates advanced graphics programming and performance optimization techniques.

#### Technical Specifications

**Particle Counts:**

- **Desktop/Laptop:** 2000 particles
- **Mobile/Tablet:** 800 particles
- Auto-detected based on `window.innerWidth < 768`

**Parallax Layers:**
| Layer | Speed Multiplier | Purpose |
|-------|------------------|---------------------------|
| 0 | 0.5× | Background (slowest) |
| 1 | 0.75× | Mid-background |
| 2 | 1.0× | Mid-foreground (baseline) |
| 3 | 1.25× | Foreground (fastest) |

**Camera Animation:**

- **Initial State:** `position.z = 50`, `fov = 40°`
- **Final State:** `position.z = 5`, `fov = 55°`
- **Duration:** 2.5 seconds
- **Easing:** Cubic in-out (`t < 0.5 ? 4 * t³ : 1 - pow(-2 * t + 2, 3) / 2`)

**Character Set (104 glyphs):**

```
Halfwidth Katakana (Primary):
ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ

Latin (Emphasis on Z):
ABCDEFGHIJKLMNOPQRSTUVWXYZ

Digits:
0123456789

Symbols:
:・."=*+-<>¦╌
```

**Timeline (3.5s total):**

```
0.0s → Rain begins, camera at z=50, FOV=40°
0.0s → Camera dolly starts (cubic in-out easing)
2.0s → Fade-out begins (opacity 1 → 0 over 1.5s)
2.5s → Camera reaches final position (z=5, FOV=55°)
3.5s → Complete, onComplete callback fires → show main interface
```

#### Performance Optimizations

1. **GPU Instanced Rendering:**
   - All particles in a layer rendered in a single draw call
   - Reduces draw calls from 2000+ to just 4 (one per layer)
   - Uses `THREE.InstancedMesh` with custom shaders

2. **Device Pixel Ratio Clamping:**

   ```typescript
   dpr={[1, 2]}  // Clamp DPR to max 2.0
   ```

   Prevents over-rendering on Retina/4K displays (which can have DPR up to 3-4)

3. **Antialiasing Disabled:**

   ```typescript
   gl={{ antialias: false, powerPreference: 'high-performance' }}
   ```

   Saves GPU cycles; not needed for this aesthetic

4. **Texture Atlas:**
   - All 104 characters rendered to a single 1024×1024 texture
   - Reduces texture binds (GPU state changes)
   - Characters procedurally generated via canvas 2D API

5. **Custom Shaders:**
   - Vertex shader handles instancing, animation, parallax
   - Fragment shader handles UV mapping to texture atlas, fading

#### Implementation Files

- `app/components/matrix/MatrixRain.tsx` - Canvas wrapper
- `app/components/matrix/MatrixRainScene.tsx` - Scene orchestrator
- `app/components/matrix/MatrixParticles.tsx` - Instanced particle system
- `app/components/matrix/CameraController.tsx` - Camera dolly animation
- `app/components/matrix/shaders/vertexShader.ts` - GLSL vertex shader
- `app/components/matrix/shaders/fragmentShader.ts` - GLSL fragment shader
- `app/components/matrix/utils/generateAtlas.ts` - Texture atlas generator
- `app/components/matrix/utils/generateParticleData.ts` - Particle data setup
- `app/components/matrix/utils/easing.ts` - Cubic in-out easing function

---

### Dual Theme System

The website features two distinct themes inspired by _The Matrix_'s red pill/blue pill choice, representing different realities and visual experiences.

#### Themes

**🔴 Red Pill (Default - "The Truth")**

- **Primary Color:** Matrix Green (`#00ff41` / `oklch(0.7 0.15 140)`)
- **Background:** Pure Black (`#000000`)
- **Aesthetic:** High-contrast, cyberpunk, CRT monitor glow
- **Mood:** Dark, mysterious, hacker-esque

**🔵 Blue Pill (Alternative - "Ignorance is Bliss")**

- **Primary Color:** Cyan Blue (`oklch(0.7 0.1 210)`)
- **Background:** Warm Beige (`oklch(0.92 0.02 80)`)
- **Aesthetic:** Light, clean, modern
- **Mood:** Bright, professional, approachable

#### Design Token Architecture

Tokens are defined using Tailwind CSS v4's `@theme` directive in [app/globals.css](app/globals.css):

```css
@theme {
  /* Red Pill Colors */
  --color-matrix-green-bright: oklch(0.84 0.18 140);
  --color-matrix-green: oklch(0.7 0.15 140);
  --color-matrix-green-dim: oklch(0.5 0.12 140);
  --color-matrix-green-darker: oklch(0.3 0.08 140);
  --color-matrix-black: oklch(0.1 0.02 140);
  --color-matrix-black-pure: #000000;

  /* Blue Pill Colors */
  --color-blue-pill-cyan-bright: oklch(0.85 0.12 210);
  --color-blue-pill-cyan: oklch(0.7 0.1 210);
  --color-blue-pill-cyan-dim: oklch(0.5 0.08 210);
  --color-blue-pill-cyan-darker: oklch(0.3 0.05 210);
  --color-blue-pill-beige: oklch(0.92 0.02 80);
  --color-blue-pill-white: oklch(0.98 0 0);

  /* Typography */
  --font-family-miltown: "Miltown", sans-serif;
  --font-size-responsive-hero: clamp(1.5rem, 6vw, 4rem);

  /* Radius */
  --radius-sm: 0.125rem;
}
```

**Why OKLCH?**

- Perceptually uniform color space (unlike RGB/HSL)
- Better for programmatic color manipulation
- More consistent lightness across hues

#### Theme Switching

**Mechanism:**

1. User presses `P` key or clicks theme toggle button
2. `ThemeContext` updates state
3. Root `<html>` element class toggles between `'red-pill'` and `'blue-pill'`
4. CSS custom properties update via data attributes
5. Choice persisted to `localStorage`

**Persistence:**

```typescript
localStorage.setItem("theme", theme); // On change
const saved = localStorage.getItem("theme"); // On mount
```

**useThemeClasses Hook:**
Utility hook that returns theme-aware Tailwind classes:

```typescript
const { primary, bg, text } = useThemeClasses();
// red-pill: { primary: 'text-matrix-green', bg: 'bg-matrix-black-pure', ... }
// blue-pill: { primary: 'text-blue-pill-cyan', bg: 'bg-blue-pill-beige', ... }
```

---

### Keyboard Navigation

Full keyboard control for accessibility and power users.

#### Keyboard Shortcuts

| Key           | Action                | Description                          |
| ------------- | --------------------- | ------------------------------------ |
| **1**         | Navigate to Skills    | Jump to Skills section               |
| **2**         | Navigate to Projects  | Jump to Projects section             |
| **3**         | Navigate to Education | Jump to Education section            |
| **4**         | Navigate to Connect   | Jump to Connect section              |
| **P**         | Toggle Theme          | Switch between Red Pill ↔ Blue Pill |
| **Tab**       | Next Element          | Focus next interactive element       |
| **Shift+Tab** | Previous Element      | Focus previous interactive element   |

#### Implementation

**Hook:** `app/hooks/useKeyboard.ts`

```typescript
useKeyboard({
  "1": () => setActiveSection("skills"),
  "2": () => setActiveSection("projects"),
  "3": () => setActiveSection("education"),
  "4": () => setActiveSection("connect"),
  p: () => toggleTheme(),
});
```

**Features:**

- Event listeners attached to `window.keydown`
- Cleanup on unmount (no memory leaks)
- Case-insensitive (accepts 'P' or 'p')
- Doesn't interfere with form inputs (checked via `event.target`)

#### Accessibility Features

1. **Focus Visible Indicators:**

   ```css
   .focus-visible:focus-visible {
     outline: 2px solid currentColor;
     outline-offset: 2px;
   }
   ```

2. **Tab Order:**
   - Header → Section buttons → Content links → Footer navigation
   - Logical, predictable flow

3. **Skip Links:**
   - Screen reader users can skip to main content
   - Hidden visually, available to assistive tech

---

### Audio System

Immersive procedural audio enhances the terminal aesthetic without requiring audio file downloads.

#### Sound Types

| Sound       | Waveform | Frequency | Duration | Use Case                             |
| ----------- | -------- | --------- | -------- | ------------------------------------ |
| **Beep**    | Sine     | 1200 Hz   | 150ms    | Terminal transmission, data received |
| **Typing**  | Square   | 800 Hz    | 50ms     | Keyboard clicks, character typing    |
| **Click**   | Square   | 800 Hz    | 50ms     | UI interactions (same as typing)     |
| **Ambient** | Sawtooth | 60 Hz     | Looped   | CRT monitor buzz (continuous)        |

#### Audio Graph Architecture

```
Oscillator Node
     ↓
[BiquadFilter] (ambient only - low-pass @ 150Hz)
     ↓
Gain Node (exponential ramp for smooth start/stop)
     ↓
Audio Destination (speakers)
```

#### Singleton Pattern

**File:** `app/lib/AudioContextManager.ts`

**Why Singleton?**

- Browsers limit AudioContext instances (typically 1 per tab)
- Multiple contexts cause "NotSupportedError"
- Singleton ensures only one context exists

**Implementation:**

```typescript
class AudioContextManager {
  private static instance: AudioContext | null = null;

  static getContext(): AudioContext {
    if (!this.instance) {
      this.instance = new AudioContext();
    }
    return this.instance;
  }
}
```

#### Features

1. **Exponential Gain Ramping:**

   ```typescript
   gainNode.gain.exponentialRampToValueAtTime(0.02, currentTime + 0.01);
   ```

   Prevents clicking/popping from abrupt volume changes

2. **Low Volume Levels:**
   - Beep/Typing: 0.02 gain (subtle)
   - Ambient: 0.01 gain (very subtle background)

3. **Autoplay Policy Compliance:**
   - Audio only plays after user interaction (clicking "Wake Up" button)
   - Prevents browser autoplay blocking

4. **Cleanup:**
   - Ambient sound returns cleanup function: `() => oscillator.stop()`
   - Prevents memory leaks from looping sounds

#### Usage Example

```typescript
import { useSound } from "@/app/hooks/useSound";

function Component() {
  const { playBeep, playTyping, playAmbient } = useSound();

  const handleClick = () => {
    playBeep(); // Play transmission sound
  };

  useEffect(() => {
    const stopAmbient = playAmbient(); // Start CRT buzz
    return () => stopAmbient(); // Stop on unmount
  }, []);
}
```

---

## 🎨 Customization Guide

### Modifying Content

All content (skills, projects, education, links) is centralized in a single file:

**File:** [app/lib/constants.ts](app/lib/constants.ts)

#### Boot Messages

```typescript
export const BOOT_MESSAGES = [
  "Call trans opt: received. 2-19-98 13:24:18 REC:Log>",
  "Trace program: running",
  "The Matrix has you...",
];
```

**To customize:** Edit strings, add/remove messages, change timing in `BootSequence.tsx`.

#### Skills

Skills are organized into 5 categories with Matrix-themed names:

```typescript
export const SKILLS = {
  'Agent Smith (Scripting & Automation)': ['Ansible', 'Python', 'Shell', ...],
  'The Matrix (Web Development)': ['CSS', 'HTML', 'JavaScript', ...],
  'Zion (Data & Orchestration)': ['Apache Airflow', 'Apache Spark', 'SQL', ...],
  'Neo (DevOps & Cloud)': ['Docker', 'GitHub Actions', 'Google Cloud Platform', ...],
  'The Oracle (Data Science & AI)': ['Keras', 'Matplotlib', 'MLflow', ...],
}
```

**To customize:**

- Change category names (keep Matrix references or not)
- Add/remove skills within categories
- Reorder categories
- Add new categories (update `SkillsSection.tsx` if needed)

#### Projects

```typescript
export const PROJECTS = [
  {
    title: "SûrEtBon",
    description:
      "SûrEtBon merges the results of official health checks on France's restaurants with their Google Maps and TripAdvisor ratings.",
    website: "https://www.suretbon.org",
    github: "https://github.com/SurEtBon",
    asciiLogo: `
              ------              
        ###+######+#####-        
     .#######+-....-+######+     
   .####+####...-+...-#######+   
  +#+##+####..-####+..++#######+  
 #########+#...-##+...+#########- 
.+####+######-.......####+##+#+##.
###-......-+####+-####++++-...+#++
###-..++++....+#++##+.....--..-###
##+-..+####+....##+...-####...####
##+#+..-#####-..--..-####+...+####
.###+#....-#+#+....+####...-#####.
 -#####+-................+##+#### 
  +########+###...####+###+#####  
    +##########-..###+####+###+    
      +#+#######..##########+      
         -###+#####+#####-         
               .---               
    `,
  },
];
```

#### Education

```typescript
export const EDUCATION = [
  {
    id: "oct-2024-nov-2024",
    school: "Le Wagon",
    degree: "Professional qualification",
    fieldOfStudy: "Data Engineering",
  },
  {
    id: "apr-2024-jun-2024",
    school: "Le Wagon",
    degree: "Professional qualification",
    fieldOfStudy: "Data Science & AI",
  },
  {
    id: "oct-2013-jun-2016",
    school: "SUPDEWEB",
    degree: "Bachelor",
    fieldOfStudy: "Web Development",
  },
];
```

**To customize:** Add/edit education entries with institution, program, period, description.

#### Links

```typescript
export const LINKS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/...", icon: "💼" },
  { name: "GitHub", url: "https://github.com/...", icon: "🐙" },
  // ...
];
```

**To customize:** Update URLs, change icons (emoji or React components), add/remove links.

---

### Theme Customization

#### Changing Colors

**File:** [app/globals.css](app/globals.css)

Edit the `@theme` directive to change color values:

```css
@theme {
  --color-matrix-green: oklch(0.7 0.15 140); /* Change to your color */
}
```

**OKLCH Format:** `oklch(lightness chroma hue)`

- **Lightness:** 0-1 (0 = black, 1 = white)
- **Chroma:** 0-0.4 (0 = grayscale, 0.4 = vivid)
- **Hue:** 0-360 (0/360 = red, 120 = green, 240 = blue)

**Tools:**

- [OKLCH Color Picker](https://oklch.com/)
- [Color Converter](https://colorjs.io/apps/convert/)

#### Adding a Third Theme

1. **Add colors to** `@theme`:

   ```css
   --color-purple-pill-magenta: oklch(0.7 0.15 300);
   --color-purple-pill-dark: oklch(0.2 0.05 300);
   ```

2. **Update ThemeContext:**

   ```typescript
   type Theme = "red-pill" | "blue-pill" | "purple-pill";
   ```

3. **Add toggle logic** in keyboard hook or UI

4. **Create CSS rules:**
   ```css
   .purple-pill {
     --color-primary: var(--color-purple-pill-magenta);
     --color-bg: var(--color-purple-pill-dark);
   }
   ```

---

### Adding New Sections

1. **Create section component:**

   ```typescript
   // app/components/sections/NewSection.tsx
   export function NewSection() {
     return (
       <section className="space-y-4">
         <h2 className="text-2xl font-bold">New Section</h2>
         <p>Content here...</p>
       </section>
     )
   }
   ```

2. **Update MainInterface:**

   ```typescript
   // app/components/MainInterface.tsx
   import { NewSection } from './sections/NewSection'

   type Section = 'skills' | 'projects' | 'education' | 'connect' | 'new'

   // Add to renderSection()
   case 'new': return <NewSection />
   ```

3. **Add footer button:**

   ```typescript
   // app/components/Footer.tsx
   <button onClick={() => setActiveSection('new')}>
     <span className="hidden sm:inline">New Section</span>
     <span className="sm:hidden">New</span>
   </button>
   ```

4. **Add keyboard shortcut:**

   ```typescript
   // app/components/MainInterface.tsx
   useKeyboard({
     // ...existing shortcuts
     "5": () => setActiveSection("new"),
   });
   ```

---

## 🏗️ Build Process

### Production Build

Generate an optimized static build:

```bash
npm run build
```

**Build Steps:**

1. **Pre-build:** Converts fonts (TTF → WOFF2)
2. **Type checking:** Validates all TypeScript types
3. **Linting:** Runs ESLint (zero warnings)
4. **Compilation:** Transpiles TypeScript → JavaScript (ES2017)
5. **Bundling:** Webpack bundles and code-splits
6. **Minification:** Terser minifies JavaScript
7. **Optimization:**
   - Tree-shaking removes unused code
   - Image optimization (AVIF, WebP, responsive sizes)
   - CSS purging via Tailwind (removes unused utilities)
8. **Static export:** Generates HTML files in `/out` directory

**Output:** `/out` directory with static HTML, CSS, JS, assets

### Build Optimizations

#### Compiler Options (next.config.ts)

```typescript
compiler: {
  removeConsole: {
    exclude: ['error', 'warn'],  // Keep error/warn in production
  },
}
```

Removes `console.log`, `console.debug`, `console.info` from production bundles.

#### Font Pipeline

```bash
npm run fonts:convert
# ttf2woff2 fonts-src/miltown-regular.ttf public/fonts/miltown-regular.woff2
```

**Benefits:**

- **Size reduction:** WOFF2 is ~30% smaller than TTF
- **Browser support:** WOFF2 supported in all modern browsers (95%+ global)
- **Self-hosted:** No external font CDN dependencies (faster, more private)

#### Code Splitting

**Dynamic Imports:**

```typescript
const MatrixRain = dynamic(() => import("@/app/components/MatrixRain"), {
  ssr: false, // Disable server-side rendering (Three.js needs browser)
});
```

Creates separate chunks:

- `matrix-rain.js` (~80KB) - loaded only on initial visit
- `main-interface.js` (~40KB) - loaded after animation completes

**Benefits:**

- Faster initial page load (smaller main bundle)
- Progressive loading (content loads as needed)

#### Image Optimization

Next.js automatically optimizes images:

- Converts to modern formats (AVIF, WebP) with fallbacks
- Generates responsive sizes (srcset)
- Lazy loads below-the-fold images
- Serves from `/_next/image` endpoint

#### Tree-Shaking

Unused exports are removed during build:

- Three.js: Only used modules imported (~200KB instead of ~600KB)
- Framer Motion: Only animation components included
- Lodash: Not used (prefer native ES2017+ methods)

### Docker Build

Build and run the application in a containerized environment:

**Multi-stage Dockerfile:**

- **Stage 1 (deps):** Install production dependencies only
- **Stage 2 (builder):** Build the Next.js application with standalone output
- **Stage 3 (runner):** Create minimal production image with only necessary files

**Build Docker image:**

```bash
docker build -t jonathan-about-website .
```

**Run container:**

```bash
docker run -p 3000:3000 jonathan-about-website
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Docker Optimizations:**

- **Base image:** Alpine Linux (node:24.11.1-alpine) for minimal size (~50MB vs ~900MB full Node image)
- **Standalone output:** Next.js standalone mode reduces bundle size by ~80%
- **Layer caching:** Dependencies cached separately from source code for faster rebuilds
- **Non-root user:** Runs as `nextjs:nodejs` user for security
- **Production-only dependencies:** Dev dependencies excluded from final image

---

## 🚀 Deployment

### Docker

The application is optimized for Docker deployment with a multi-stage build process.

#### Quick Start

**Build and run with Docker:**

```bash
# Build the image
docker build -t jonathan-about-website .

# Run the container
docker run -p 3000:3000 jonathan-about-website

# Run in detached mode
docker run -d -p 3000:3000 --name jonathan-about jonathan-about-website
```

#### Dockerfile Architecture

**Multi-stage Build:**

```dockerfile
FROM node:24.11.1-alpine AS deps
# Install production dependencies

FROM node:24.11.1-alpine AS builder
# Build Next.js standalone output

FROM node:24.11.1-alpine AS runner
# Minimal production image
```

**Image Specifications:**

- **Base:** node:24.11.1-alpine (~50MB)
- **Final size:** ~300-400MB (vs ~900MB+ without optimization)
- **User:** Non-root (nextjs:nodejs)
- **Port:** 3000

#### Security Considerations

**Image Security:**

- ✓ Alpine Linux base (minimal attack surface)
- ✓ Non-root user (nextjs:nodejs)
- ✓ No unnecessary tools in production image
- ✓ Production dependencies only

---

## ⚡ Performance

### Optimization Techniques

#### WebGL Rendering

1. **DPR Clamping:**

   ```typescript
   dpr={[1, 2]}
   ```

   Limits pixel ratio to prevent 4K/Retina over-rendering (3-4× pixel density)

2. **Antialiasing Disabled:**

   ```typescript
   gl={{ antialias: false }}
   ```

   Saves ~15-20% GPU cycles; not needed for pixelated aesthetic

3. **Power Preference:**

   ```typescript
   powerPreference: "high-performance";
   ```

   Requests dedicated GPU on multi-GPU systems

4. **GPU Instancing:**
   - Single draw call per layer (4 total) instead of 2000+
   - Reduces CPU→GPU communication overhead

#### Bundle Size

**Production Build (Gzip):**

- Main bundle: ~120KB
- Matrix Rain chunk: ~80KB
- Three.js vendor: ~200KB (shared)
- Framer Motion vendor: ~50KB (shared)
- **Total First Load:** ~300KB

**Optimization Strategies:**

- Code splitting (dynamic imports)
- Tree-shaking unused code
- Minification (Terser)
- Compression (Gzip/Brotli)
- CSS purging (Tailwind removes unused classes)

#### Loading Strategy

1. **Initial Load:**
   - HTML shell (Server Component)
   - Critical CSS (inline)
   - Main JavaScript bundle

2. **Progressive Enhancement:**
   - Boot sequence (lazy loaded)
   - Matrix rain (lazy loaded, SSR disabled)
   - Main interface (lazy loaded after animation)

3. **Lazy Loading:**
   - Images below fold (Next.js Image component)
   - Audio context (on user interaction)

---

## 🔒 Security

### Security Headers

Comprehensive security headers configured in [next.config.ts](next.config.ts):

```typescript
headers: async () => [
  {
    source: "/:path*",
    headers: [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "Content-Security-Policy",
        value: `
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: blob:;
          font-src 'self' data:;
          connect-src 'self';
          media-src 'none';
          object-src 'none';
          frame-ancestors 'self';
          base-uri 'self';
          form-action 'self';
          upgrade-insecure-requests;
        `
          .replace(/\s+/g, " ")
          .trim(),
      },
    ],
  },
];
```

#### Header Explanations

| Header                        | Value                                          | Purpose                                                         |
| ----------------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| **X-DNS-Prefetch-Control**    | `on`                                           | Enable DNS prefetching for faster external links                |
| **Strict-Transport-Security** | `max-age=63072000; includeSubDomains; preload` | Force HTTPS for 2 years, include subdomains, allow preload list |
| **X-Frame-Options**           | `SAMEORIGIN`                                   | Prevent clickjacking (only allow same-origin framing)           |
| **X-Content-Type-Options**    | `nosniff`                                      | Prevent MIME-sniffing attacks                                   |
| **X-XSS-Protection**          | `1; mode=block`                                | Enable browser XSS filter (legacy browsers)                     |
| **Referrer-Policy**           | `strict-origin-when-cross-origin`              | Send origin only on HTTPS→HTTP, full URL on same-origin         |
| **Permissions-Policy**        | `camera=(), microphone=(), geolocation=()...`  | Disable sensitive browser APIs                                  |
| **Content-Security-Policy**   | See below                                      | Control resource loading to prevent XSS/injection               |

#### Content Security Policy (CSP)

| Directive                   | Value                                  | Reason                                                            |
| --------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| `default-src`               | `'self'`                               | Only load resources from same origin by default                   |
| `script-src`                | `'self' 'unsafe-eval' 'unsafe-inline'` | Allow scripts from same origin + eval (Three.js shaders) + inline |
| `style-src`                 | `'self' 'unsafe-inline'`               | Allow styles from same origin + inline (Tailwind, Framer Motion)  |
| `img-src`                   | `'self' data: blob:`                   | Allow images from same origin + data URIs + blob URLs             |
| `font-src`                  | `'self' data:`                         | Allow fonts from same origin + data URIs                          |
| `connect-src`               | `'self'`                               | Only allow fetch/XHR to same origin                               |
| `media-src`                 | `'none'`                               | Block audio/video elements (not used)                             |
| `object-src`                | `'none'`                               | Block plugins (Flash, Java, etc.)                                 |
| `frame-ancestors`           | `'self'`                               | Only allow framing by same origin                                 |
| `base-uri`                  | `'self'`                               | Restrict `<base>` tag to same origin                              |
| `form-action`               | `'self'`                               | Only allow form submissions to same origin                        |
| `upgrade-insecure-requests` | (no value)                             | Auto-upgrade HTTP→HTTPS requests                                  |

**Note:** `unsafe-eval` is required for Three.js shader compilation. `unsafe-inline` is required for Framer Motion and Tailwind CSS. In a future version, these could be removed with a more restrictive CSP and nonces.

### Additional Security Measures

1. **Self-Hosted Assets:**
   - All fonts, images, scripts served from same domain
   - No external CDN dependencies (Google Fonts, etc.)
   - Reduces third-party tracking and dependency risks

2. **No External API Calls:**
   - Fully static site (no backend)
   - No cookies, sessions, or authentication
   - No user data collection

3. **Dependency Auditing:**

   ```bash
   npm audit
   ```

   Run regularly to check for vulnerabilities in dependencies

4. **TypeScript Strict Mode:**
   - Prevents type-related bugs that could lead to security issues
   - `noUncheckedIndexedAccess` prevents undefined access errors

---

## ♿ Accessibility

### WCAG 2.2 AA Compliance

This project is designed with accessibility as a core principle, not an afterthought.

#### Semantic HTML

**Landmark Regions:**

```html
<header>
  - Site header (name, tagline)
  <main>
    - Main content (sections)
    <footer>
      - Navigation footer
      <section>- Content sections (Skills, Projects, etc.)</section>
    </footer>
  </main>
</header>
```

**Heading Hierarchy:**

- **H1:** Main site title ("Jonathan About")
- **H2:** Section titles ("Skills", "Projects", etc.)
- No skipped levels (proper outline)

#### Color Contrast

**WCAG AA Requirements:**

- Normal text: ≥4.5:1 contrast ratio
- Large text (≥18pt): ≥3.0:1 contrast ratio

**Compliance:**

- Red Pill theme: Green (#00ff41) on Black (#000000) = **21:1** ✓
- Blue Pill theme: Cyan (#0099cc) on Beige (#f5f5dc) = **5.2:1** ✓

**Tool:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

#### Keyboard Navigation

**Tab Order:**

1. Skip to main content link (hidden, appears on focus)
2. Header/Logo
3. Section buttons (Skills, Projects, Education, Connect)
4. Content links (GitHub, LinkedIn, etc.)
5. Footer navigation

**Focus Indicators:**

```css
.focus-visible:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Custom Shortcuts:**

- All shortcuts documented in UI (visible hints)
- Non-standard shortcuts optional (can navigate via Tab as well)

#### Screen Reader Support

**ARIA Attributes:**

```html
<section aria-labelledby="skills-heading">
  <h2 id="skills-heading">Skills</h2>
  ...
</section>
```

**Accessible Names:**

- All buttons have visible text or `aria-label`
- Links have descriptive text (not "Click here")
- Images have `alt` text (decorative images: `alt=""`)

**Live Regions:**

```html
<div role="status" aria-live="polite" aria-atomic="true">
  Section changed to: Skills
</div>
```

Announces section changes to screen readers.

#### Reduced Motion

**Respecting User Preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .crt-flicker {
    animation: none; /* Disable CRT flicker */
  }
}
```

**What Gets Reduced:**

- Matrix rain animation (still shows but no movement)
- Boot sequence typing (instant)
- CRT flicker (disabled)
- Transitions/hover effects (instant)

#### Form Accessibility

No forms in current version, but if added:

- Labels for all inputs
- Error messages associated with inputs (aria-describedby)
- Required fields marked with `aria-required="true"`
- Error states marked with `aria-invalid="true"`

#### Testing Tools

- **Lighthouse:** Automated accessibility audit
- **axe DevTools:** Browser extension for in-depth testing
- **NVDA/JAWS:** Screen reader testing on Windows
- **VoiceOver:** Screen reader testing on macOS/iOS
- **Keyboard only:** Test all functionality without mouse

---

## 🌐 Browser Support

### Modern Browser Requirements

This project uses cutting-edge web technologies and requires a modern browser.

#### Required Browser APIs

**Core:**

- ES2017+ JavaScript (async/await, Object.entries, etc.)
- CSS Custom Properties (variables)
- CSS Grid & Flexbox

**Advanced:**

- **WebGL 1.0** (for Matrix rain)
  - Check: [get.webgl.org](https://get.webgl.org/)
  - Required for Three.js rendering
  - Fallback: Animation skipped, main content still accessible

- **Web Audio API** (for sounds)
  - Check: `'AudioContext' in window`
  - Graceful degradation: Sounds optional, visual content unaffected

**Optional:**

- Intersection Observer (for lazy loading)
- ResizeObserver (for responsive adjustments)

#### Fallback Behavior

**No WebGL:**

```typescript
if (!gl.getContext("webgl")) {
  console.warn("WebGL not supported, skipping Matrix rain");
  onComplete(); // Skip to main interface
}
```

**No Web Audio API:**

```typescript
if (!("AudioContext" in window)) {
  console.warn("Web Audio API not supported, sounds disabled");
  // Visual experience continues normally
}
```

#### Progressive Enhancement Strategy

1. **Core Experience (100% browsers):**
   - Text content (skills, projects, education, contact)
   - Basic styling (colors, typography)
   - Semantic HTML

2. **Enhanced Experience (95% browsers):**
   - Tailwind CSS styling
   - Responsive design
   - Theme switching
   - Keyboard shortcuts

3. **Full Experience (90% browsers):**
   - Matrix rain animation (WebGL)
   - Procedural audio (Web Audio API)
   - Advanced animations (Framer Motion)

---

## 🔧 Troubleshooting

### Common Issues

#### WebGL Not Available

**Symptom:** Matrix rain doesn't appear, console shows WebGL error

**Causes:**

- Browser doesn't support WebGL
- GPU drivers outdated
- Hardware acceleration disabled

**Solutions:**

1. **Check WebGL support:** Visit [get.webgl.org](https://get.webgl.org/)
2. **Update GPU drivers:** Visit your GPU manufacturer's website
3. **Enable hardware acceleration:**
   - Chrome: `chrome://settings` → Advanced → System → "Use hardware acceleration"
   - Firefox: `about:preferences` → General → Performance → Uncheck "Use recommended performance settings", check "Use hardware acceleration"
4. **Try a different browser:** Chrome/Firefox usually have best WebGL support

#### Audio Not Playing

**Symptom:** No sound

**Causes:**

- Web Audio API not supported
- Sound muted/volume too low

**Solutions:**

1. **Check browser support:** All modern browsers support Web Audio API
2. **Check volume:** Sounds are subtle (low gain); increase system/browser volume
3. **Check console:** Look for audio-related errors in DevTools console

#### Build Errors

**Symptom:** `npm run build` fails with errors

**Common Errors:**

1. **TypeScript errors:**

   ```
   Type 'X' is not assignable to type 'Y'
   ```

   **Solution:** Run `npm run type-check` to see all type errors. Fix types or add proper type assertions.

2. **ESLint errors:**

   ```
   Expected 'X' to be 'Y' (some-rule)
   ```

   **Solution:** Run `npm run lint:fix` to auto-fix, or manually fix remaining issues.

3. **Out of memory:**

   ```
   JavaScript heap out of memory
   ```

   **Solution:** Increase Node.js memory:

   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

4. **Font conversion fails:**
   ```
   Error converting fonts
   ```
   **Solution:** Ensure `ttf2woff2` is installed and `fonts-src/miltown-regular.ttf` exists.

#### Development Server Issues

**Symptom:** `npm run dev` fails to start or crashes

**Solutions:**

1. **Port already in use:**

   ```
   Port 3000 is already in use
   ```

   **Solution:** Kill the process using port 3000:

   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

   Or use a different port:

   ```bash
   PORT=3001 npm run dev
   ```

2. **Module not found:**

   ```
   Cannot find module 'X'
   ```

   **Solution:** Delete `node_modules` and reinstall:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Hot reload not working:**
   **Solution:**
   - Check file watcher limits (Linux):
     ```bash
     echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
     sudo sysctl -p
     ```
   - Restart dev server

#### Performance Issues

**Symptom:** Matrix rain animation is laggy or stuttering

**Solutions:**

1. **Lower particle count:**

   ```typescript
   // app/components/matrix/MatrixParticles.tsx
   const particleCount = isMobile ? 400 : 1000; // Reduce from 800/2000
   ```

2. **Increase DPR clamp:**

   ```typescript
   // app/components/MatrixRain.tsx
   dpr={[1, 1.5]}  // Reduce from [1, 2]
   ```

3. **Disable ambient audio:**

   ```typescript
   // Comment out in app/components/BootSequence.tsx
   // const stopAmbient = playAmbient()
   ```

4. **Close other tabs/applications:** Free up GPU/CPU resources

#### Layout/Styling Issues

**Symptom:** Styles not applying or looking wrong

**Solutions:**

1. **Clear Next.js cache:**

   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Check Tailwind class names:** Ensure no typos, use `className` not `class`

3. **Check theme classes:** Verify theme is correctly set in `<html>` class

4. **Hard refresh browser:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)

---

## 📄 License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for full text.

---

## 🙏 Acknowledgments

### Inspiration

- **The Matrix (1999):** Film directed by The Wachowskis - iconic green rain, red/blue pill choice, cyberpunk aesthetic
- **Retro CRT monitors:** Scan lines, phosphor glow, terminal interfaces
- **Hacker culture:** Command-line aesthetics, ASCII art, monospace fonts

### Technologies & Libraries

- **[Next.js](https://nextjs.org):** React framework by Vercel
- **[React](https://react.dev):** UI library by Meta
- **[Three.js](https://threejs.org):** 3D graphics library by Ricardo Cabello (mrdoob)
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber):** React renderer for Three.js by Poimandres
- **[Framer Motion](https://www.framer.com/motion/):** Animation library by Framer
- **[Tailwind CSS](https://tailwindcss.com):** Utility-first CSS framework by Tailwind Labs
- **[TypeScript](https://www.typescriptlang.org):** Typed JavaScript by Microsoft
- **[Prettier](https://prettier.io):** Code formatter
- **[ESLint](https://eslint.org):** JavaScript linter

### Resources

- **WebGL Fundamentals:** [webglfundamentals.org](https://webglfundamentals.org/)
- **Web Audio API Docs:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **WCAG Guidelines:** [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

---

[⬆ Back to Top](#-table-of-contents)
