/**
 * Event Tracker
 *
 * Core tracking functionality for sending events to sGTM.
 * Respects consent and Low Data Mode.
 *
 * @packageDocumentation
 */

import type {
  AnalyticsConfig,
  AnalyticsEvent,
  TrackedEvent,
} from "./types";
import { CORE_EVENTS } from "./types";
import { hasAnalyticsConsent } from "./consent";
import { isLowDataMode } from "./low-data-mode";

let config: AnalyticsConfig | null = null;
let sessionId: string | null = null;
let clientId: string | null = null;

/**
 * Initialize the analytics tracker
 */
export function initAnalytics(analyticsConfig: AnalyticsConfig): void {
  config = analyticsConfig;
  sessionId = generateSessionId();
  clientId = getOrCreateClientId();

  if (config.debug) {
    console.log("[Analytics] Initialized", {
      endpoint: config.endpoint,
      appId: config.appId,
      brandId: config.brandId,
    });
  }
}

/**
 * Track an analytics event
 *
 * Events are only sent if:
 * 1. Analytics consent is granted
 * 2. Event is a core event OR Low Data Mode is disabled
 */
export async function track(event: AnalyticsEvent): Promise<void> {
  if (!config) {
    console.warn("[Analytics] Not initialized. Call initAnalytics() first.");
    return;
  }

  // Check consent
  if (!hasAnalyticsConsent()) {
    if (config.debug) {
      console.log("[Analytics] Skipped (no consent):", event.name);
    }
    return;
  }

  // Check Low Data Mode
  const lowDataMode = isLowDataMode();
  const isCoreEvent = CORE_EVENTS.includes(event.name as typeof CORE_EVENTS[number]);

  if (lowDataMode && !isCoreEvent) {
    if (config.debug) {
      console.log("[Analytics] Skipped (Low Data Mode):", event.name);
    }
    return;
  }

  const trackedEvent: TrackedEvent = {
    ...event,
    app_id: config.appId,
    brand_id: config.brandId ?? "default",
    low_data_mode: lowDataMode,
    session_id: sessionId!,
    client_id: clientId!,
    timestamp: new Date().toISOString(),
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  };

  if (config.debug) {
    console.log("[Analytics] Tracking:", trackedEvent);
  }

  try {
    await sendEvent(config.endpoint, trackedEvent);
  } catch (error) {
    if (config.debug) {
      console.error("[Analytics] Failed to send:", error);
    }
  }
}

/**
 * Send event to sGTM endpoint
 */
async function sendEvent(endpoint: string, event: TrackedEvent): Promise<void> {
  const payload = JSON.stringify(event);

  // Use sendBeacon for page unload reliability, fetch for others
  if (
    typeof navigator !== "undefined" &&
    navigator.sendBeacon &&
    event.name === "page_view"
  ) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true, // Survives page unload
  });
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Get or create a persistent client ID
 */
function getOrCreateClientId(): string {
  if (typeof window === "undefined") {
    return generateSessionId();
  }

  const CLIENT_ID_KEY = "analytics_client_id";
  let id = localStorage.getItem(CLIENT_ID_KEY);

  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(CLIENT_ID_KEY, id);
  }

  return id;
}

/**
 * Get current analytics configuration
 */
export function getAnalyticsConfig(): AnalyticsConfig | null {
  return config;
}

/**
 * Check if analytics is initialized
 */
export function isAnalyticsInitialized(): boolean {
  return config !== null;
}
