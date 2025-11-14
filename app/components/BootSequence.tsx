"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { BOOT_MESSAGES } from "../lib/constants";
import { delay } from "../lib/utils";
import { useSound } from "../hooks/useSound";
import { useThemeClasses } from "../hooks/useThemeClasses";

/**
 * Props for the BootSequence component.
 *
 * @interface BootSequenceProps
 * @property {() => void} onComplete - Callback function invoked when the boot sequence completes
 */
interface BootSequenceProps {
  onComplete: () => void;
}

/**
 * CRT Terminal Boot Sequence Component
 *
 * Displays an authentic retro computer boot sequence with progressive typing animation,
 * blinking cursor, and synchronized audio feedback. The component waits for user interaction
 * (click or keypress) before starting the sequence, ensuring audio can be initialized
 * according to browser autoplay policies.
 *
 * **Animation Sequence:**
 * 1. Displays "Press any key to start" prompt with blinking cursor
 * 2. On user interaction, begins typing out boot messages character by character
 * 3. Each message fades in, types character by character, then fades out
 * 4. Typing sound plays every 3rd character to avoid audio overwhelming
 * 5. Terminal beep sound plays at the end of each message
 * 6. Invokes onComplete callback after all messages are displayed
 *
 * **Accessibility Considerations:**
 * - Cursor is marked with aria-hidden="true" as it's decorative
 * - All meaningful text is screen-reader accessible
 * - Respects prefers-reduced-motion (handled by parent via useSound hook)
 *
 * **Performance Notes:**
 * - Uses Framer Motion for smooth fade transitions
 * - Audio playback is throttled (every 3 characters) to prevent performance degradation
 * - Event listeners are properly cleaned up to prevent memory leaks
 *
 * @param {BootSequenceProps} props - Component props
 * @param {() => void} props.onComplete - Callback invoked when boot sequence finishes
 * @returns {JSX.Element} Fullscreen boot sequence overlay
 *
 * @example
 * ```tsx
 * <BootSequence onComplete={() => setBootComplete(true)} />
 * ```
 */
export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const { playSound, isInitialized } = useSound();
  const tc = useThemeClasses();

  /**
   * Handle user interaction to start boot sequence.
   *
   * Waits for first user click or keypress to start the boot animation.
   * This ensures audio context can be properly initialized per browser
   * autoplay policies (requires user gesture).
   *
   * Event listeners are registered with {once: true} for automatic cleanup
   * after first interaction, preventing duplicate event handling.
   *
   * Dependencies intentionally omit playSound and isInitialized:
   * - playSound: Stable function from useSound hook, doesn't change
   * - isInitialized: Only checked at call time, not a dependency trigger
   * Including them would cause unnecessary re-registrations of event listeners.
   */
  useEffect(() => {
    const handleStart = () => {
      if (!hasStarted) {
        // Start immediately - audio will initialize on first interaction
        setHasStarted(true);
        if (isInitialized) {
          playSound("beep"); // Initial beep on start if audio ready
        }
      }
    };

    if (!hasStarted) {
      const clickHandler = () => handleStart();
      const keyHandler = () => handleStart();

      document.addEventListener("click", clickHandler, { once: true });
      document.addEventListener("keydown", keyHandler, { once: true });

      return () => {
        document.removeEventListener("click", clickHandler);
        document.removeEventListener("keydown", keyHandler);
      };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- playSound and isInitialized are stable
  }, [hasStarted]);

  /**
   * Core typing animation effect.
   *
   * Orchestrates the character-by-character typing animation for each boot message.
   * Runs whenever the currentMessageIndex changes or hasStarted becomes true.
   *
   * **Animation Flow:**
   * 1. Checks if all messages have been displayed (triggers completion)
   * 2. Retrieves current message from BOOT_MESSAGES constant
   * 3. Types each character with appropriate delay (message.delay ms)
   * 4. Plays typing sound every 3rd character for audio feedback
   * 5. Adds 500ms pause at end of message
   * 6. Plays terminal beep sound
   * 7. Fades out message (1000ms)
   * 8. Advances to next message
   *
   * Dependencies intentionally omit playSound:
   * - playSound is a stable function from useSound hook
   * - Including it would cause re-runs of the animation on unrelated changes
   * - The function is called, not used as a dependency trigger
   */
  useEffect(() => {
    if (!hasStarted) return;

    const typeMessage = async () => {
      if (currentMessageIndex >= BOOT_MESSAGES.length) {
        setIsComplete(true);
        await delay(1000);
        onComplete();
        return;
      }

      const message = BOOT_MESSAGES[currentMessageIndex];
      if (!message) return;

      const chars = message.text.split("");

      // Type out the message character by character
      for (let i = 0; i <= chars.length; i++) {
        setDisplayedText(chars.slice(0, i).join(""));
        // Play typing sound every 3 characters to prevent audio overwhelming
        if (i % 3 === 0) {
          playSound("typing");
        }
        await delay(message.delay);
      }

      // Pause at end of message for readability
      await delay(500);

      // Play transmission beep to signal message completion
      playSound("beep");

      // Fade out animation
      setIsComplete(true);
      await delay(1000);

      // Reset for next message
      setDisplayedText("");
      setIsComplete(false);
      setCurrentMessageIndex((prev) => prev + 1);
    };

    typeMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- playSound is stable
  }, [currentMessageIndex, onComplete, hasStarted]);

  /**
   * Cursor blink animation effect.
   *
   * Creates a classic CRT terminal cursor blink by toggling cursor visibility
   * every 500ms. This runs independently of the typing animation to ensure
   * smooth, continuous blinking throughout the boot sequence.
   *
   * The interval is properly cleaned up on component unmount to prevent
   * memory leaks and avoid state updates on unmounted components.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-black">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`crt-glow-subtle absolute top-4 left-4 flex items-center ${tc.text.bright}`}
          >
            <span>Press any key to start</span>
            <span
              className={`ml-1 inline-block h-5 w-3 ${
                showCursor ? "opacity-100" : "opacity-0"
              } ${tc.bg.accent}`}
              aria-hidden="true"
            >
              █
            </span>
          </motion.div>
        ) : !isComplete ? (
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`crt-glow-subtle absolute top-4 left-4 flex items-center ${tc.text.bright}`}
          >
            <span>{displayedText}</span>
            <span
              className={`ml-1 inline-block h-5 w-3 ${
                showCursor ? "opacity-100" : "opacity-0"
              } ${tc.bg.accent}`}
              aria-hidden="true"
            >
              █
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
