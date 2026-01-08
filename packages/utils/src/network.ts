/**
 * Network utilities for low-data environments
 */

/**
 * Detect connection quality based on navigator.connection
 */
export function getConnectionQuality(): "high" | "medium" | "low" | "unknown" {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return "unknown";
  }

  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;

  switch (effectiveType) {
    case "4g":
      return "high";
    case "3g":
      return "medium";
    case "2g":
    case "slow-2g":
      return "low";
    default:
      return "unknown";
  }
}

/**
 * Check if user should be in low-data mode
 * based on connection quality or saved preference
 */
export function shouldUseLowDataMode(): boolean {
  // Check localStorage preference
  if (typeof window !== "undefined") {
    const preference = localStorage.getItem("low-data-mode");
    if (preference !== null) {
      return preference === "true";
    }
  }

  // Auto-detect based on connection
  const quality = getConnectionQuality();
  return quality === "low" || quality === "medium";
}

/**
 * Debounce function for network requests
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
