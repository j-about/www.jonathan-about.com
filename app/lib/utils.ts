/**
 * Utility functions for the website
 */

/**
 * Delays execution for a specified time
 * @param ms - Milliseconds to delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Picks a random element from an array
 * @param array - Array to pick from
 * @throws {Error} If array is empty
 */
export function randomElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error("Cannot pick random element from empty array");
  }
  const element = array[Math.floor(Math.random() * array.length)];
  // TypeScript now requires us to handle the case where element could be undefined
  // but we know it's not because we checked array.length above
  if (element === undefined) {
    throw new Error("Unexpected undefined element");
  }
  return element;
}

/**
 * Checks if the code is running on the client side
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}
