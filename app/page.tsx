"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import BootSequence from "./components/BootSequence";

// Lazy load heavy components
const MatrixRain = dynamic(() => import("./components/MatrixRain"), {
  ssr: false,
});
const MainInterface = dynamic(() => import("./components/MainInterface"), {
  ssr: false,
});

type AppState = "booting" | "matrix-rain" | "interface";

/**
 * Main page component that orchestrates the application flow
 */
export default function Home() {
  // State initialized to 'booting' for boot sequence on page load
  const [appState, setAppState] = useState<AppState>("booting");

  const handleBootComplete = () => {
    setAppState("matrix-rain");
  };

  const handleRainComplete = () => {
    setAppState("interface");
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {appState === "booting" && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {appState === "matrix-rain" && (
        <MatrixRain onComplete={handleRainComplete} />
      )}

      {appState === "interface" && <MainInterface />}
    </main>
  );
}
