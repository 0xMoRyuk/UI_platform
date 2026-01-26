/**
 * Low Data Mode Detection
 *
 * Detects and manages Low Data Mode to reduce data consumption.
 * When enabled, only core events are tracked.
 *
 * @packageDocumentation
 */

const LOW_DATA_MODE_KEY = "low_data_mode";

/**
 * Check if Low Data Mode is enabled
 *
 * Detection priority:
 * 1. User preference in localStorage
 * 2. NEXT_PUBLIC_ENABLE_LOW_DATA_MODE environment variable
 * 3. Save-Data HTTP header (via meta tag)
 * 4. Connection effective type (via Network Information API)
 */
export function isLowDataMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // 1. Check user preference
  const stored = localStorage.getItem(LOW_DATA_MODE_KEY);
  if (stored !== null) {
    return stored === "true";
  }

  // 2. Check environment variable (Next.js)
  if (
    typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_ENABLE_LOW_DATA_MODE === "true"
  ) {
    return true;
  }

  // 3. Check Save-Data header (via meta tag set by server)
  const saveDataMeta = document.querySelector('meta[name="save-data"]');
  if (saveDataMeta?.getAttribute("content") === "on") {
    return true;
  }

  // 4. Check Network Information API
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (connection) {
    // Enable for slow connections
    if (connection.saveData) {
      return true;
    }
    // Enable for 2G or slow-2g
    if (
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Set Low Data Mode preference
 */
export function setLowDataMode(enabled: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(LOW_DATA_MODE_KEY, String(enabled));

  // Dispatch event for components to react
  window.dispatchEvent(
    new CustomEvent("low_data_mode_change", {
      detail: { enabled },
    })
  );
}

/**
 * Clear Low Data Mode preference (revert to auto-detection)
 */
export function clearLowDataModePreference(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(LOW_DATA_MODE_KEY);

  window.dispatchEvent(
    new CustomEvent("low_data_mode_change", {
      detail: { enabled: isLowDataMode() },
    })
  );
}

/**
 * Subscribe to Low Data Mode changes
 */
export function onLowDataModeChange(
  callback: (enabled: boolean) => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{ enabled: boolean }>;
    callback(customEvent.detail.enabled);
  };

  window.addEventListener("low_data_mode_change", handler);
  return () => window.removeEventListener("low_data_mode_change", handler);
}

/** Network Information API types */
interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
}
