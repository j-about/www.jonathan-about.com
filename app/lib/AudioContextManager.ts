/**
 * AudioContextManager - Singleton Web Audio API Manager
 *
 * Global singleton that manages a single AudioContext instance shared across
 * the entire application lifecycle. This architecture prevents audio interruption
 * during component transitions and ensures efficient resource usage.
 *
 * **Singleton Pattern:**
 * Only one AudioContext exists per application session. Multiple components can
 * safely call `initialize()` - the context is created only once and reused.
 *
 * **Initialization Flow:**
 * 1. User interaction triggers `initialize()` (required by browser autoplay policy)
 * 2. AudioContext is created and stored in singleton state
 * 3. Context is resumed if suspended (handles browser auto-suspension)
 * 4. State is marked as initialized
 * 5. Subsequent calls to `initialize()` return immediately
 *
 * **Concurrent Initialization Handling:**
 * If multiple components call `initialize()` simultaneously, they all await the
 * same initialization promise. This prevents multiple AudioContext creations.
 *
 * **Lifecycle Management:**
 * - Created: On first user interaction
 * - Persists: Throughout entire application session
 * - Destroyed: Only when explicitly calling `cleanup()` (should be rare)
 *
 * **Error Handling:**
 * Initialization errors are logged and re-thrown. Callers should handle errors
 * gracefully by checking `isInitialized()` before attempting to use the context.
 *
 * **Browser Compatibility:**
 * - Chrome/Edge: Full support
 * - Firefox: Full support
 * - Safari: Requires user gesture (handled by initialization flow)
 *
 * @example
 * ```typescript
 * // Initialize on user interaction
 * try {
 *   await audioContextManager.initialize();
 *   const ctx = audioContextManager.getContext();
 *   // Use ctx for audio operations
 * } catch (error) {
 *   // Handle initialization failure
 * }
 * ```
 */

/**
 * Internal state type for AudioContextManager.
 *
 * @private
 */
type AudioContextManagerState = {
  /** The Web Audio API context instance */
  context: AudioContext | null;
  /** Whether the context has been successfully initialized */
  isInitialized: boolean;
  /** Promise tracking ongoing initialization (prevents concurrent initialization) */
  initializationPromise: Promise<void> | null;
};

/**
 * AudioContextManager class implementing singleton pattern.
 *
 * @class
 */
class AudioContextManager {
  private static instance: AudioContextManager | null = null;
  private state: AudioContextManagerState = {
    context: null,
    isInitialized: false,
    initializationPromise: null,
  };

  /**
   * Private constructor enforces singleton pattern.
   * Use `AudioContextManager.getInstance()` to access the instance.
   */
  private constructor() {
    // Private constructor prevents direct instantiation
  }

  /**
   * Get the singleton instance of AudioContextManager
   */
  public static getInstance(): AudioContextManager {
    if (!AudioContextManager.instance) {
      AudioContextManager.instance = new AudioContextManager();
    }
    return AudioContextManager.instance;
  }

  /**
   * Initialize the AudioContext with user interaction.
   *
   * Creates and initializes the Web Audio API context. This MUST be called in
   * response to a user gesture (click, keydown, etc.) to comply with browser
   * autoplay policies.
   *
   * **Idempotent Initialization:**
   * Safe to call multiple times - returns immediately if already initialized.
   *
   * **Concurrent Call Handling:**
   * If called while initialization is in progress, returns the existing promise.
   * This prevents multiple AudioContext instances from being created.
   *
   * **Error Scenarios:**
   * - Browser doesn't support Web Audio API
   * - Insufficient permissions (unlikely for AudioContext)
   * - System audio resources unavailable
   *
   * @throws {Error} If AudioContext creation or resumption fails
   * @returns {Promise<void>} Resolves when initialization completes
   */
  public async initialize(): Promise<void> {
    // If already initialized, return immediately (idempotent)
    if (this.state.isInitialized && this.state.context) {
      return;
    }

    // If initialization is in progress, wait for it (prevent concurrent initialization)
    if (this.state.initializationPromise) {
      return this.state.initializationPromise;
    }

    // Start initialization
    this.state.initializationPromise = (async () => {
      try {
        // Only create context if it doesn't exist
        if (!this.state.context) {
          this.state.context = new AudioContext();
        }

        // Resume the context if it's suspended (required for browser autoplay policies)
        if (this.state.context.state === "suspended") {
          await this.state.context.resume();
        }

        this.state.isInitialized = true;
      } catch (error) {
        // Log error for debugging while preserving error details
        // Error is re-thrown so callers can handle appropriately (e.g., show UI message)
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        const errorDetails = {
          message: "AudioContext initialization failed",
          error: errorMessage,
          contextState: this.state.context?.state ?? "null",
          timestamp: new Date().toISOString(),
        };

        // Structured error logging
        if (process.env.NODE_ENV === "development") {
          console.error("[AudioContextManager]", errorDetails);
        }

        throw error;
      } finally {
        this.state.initializationPromise = null;
      }
    })();

    return this.state.initializationPromise;
  }

  /**
   * Get the AudioContext instance
   * Returns null if not yet initialized
   */
  public getContext(): AudioContext | null {
    return this.state.context;
  }

  /**
   * Check if the AudioContext is initialized
   */
  public isInitialized(): boolean {
    return this.state.isInitialized;
  }

  /**
   * Resume the AudioContext if it's suspended
   * This can happen if the browser auto-suspends the context
   */
  public async resume(): Promise<void> {
    if (this.state.context && this.state.context.state === "suspended") {
      await this.state.context.resume();
    }
  }

  /**
   * Cleanup method - should only be called when the entire app is unmounting
   * NOT during component transitions
   */
  public cleanup(): void {
    if (this.state.context) {
      this.state.context.close();
      this.state.context = null;
      this.state.isInitialized = false;
    }
  }
}

// Export the singleton instance
export const audioContextManager = AudioContextManager.getInstance();
