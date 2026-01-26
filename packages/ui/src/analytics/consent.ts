/**
 * Consent Management
 *
 * Manages user consent for analytics and marketing tracking.
 * Default state is denied - no tracking without explicit consent.
 *
 * @packageDocumentation
 */

import type { ConsentState, ConsentCategory } from "./types";

const CONSENT_KEY = "analytics_consent";

/** Default consent state - all denied */
const DEFAULT_CONSENT: ConsentState = {
  analytics: false,
  marketing: false,
};

/**
 * Get current consent state from localStorage
 */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") {
    return DEFAULT_CONSENT;
  }

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<ConsentState>;
      return {
        analytics: parsed.analytics ?? false,
        marketing: parsed.marketing ?? false,
      };
    }
  } catch {
    // Invalid stored value, return default
  }

  return DEFAULT_CONSENT;
}

/**
 * Set consent state and persist to localStorage
 */
export function setConsent(state: ConsentState): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));

  // Dispatch custom event for components to react
  window.dispatchEvent(
    new CustomEvent("consent_update", {
      detail: state,
    })
  );
}

/**
 * Update a single consent category
 */
export function updateConsent(
  category: ConsentCategory,
  granted: boolean
): void {
  const current = getConsent();
  setConsent({
    ...current,
    [category]: granted,
  });
}

/**
 * Grant all consent categories
 */
export function grantAllConsent(): void {
  setConsent({
    analytics: true,
    marketing: true,
  });
}

/**
 * Revoke all consent categories
 */
export function revokeAllConsent(): void {
  setConsent(DEFAULT_CONSENT);
}

/**
 * Check if a specific consent category is granted
 */
export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()[category];
}

/**
 * Check if analytics consent is granted
 */
export function hasAnalyticsConsent(): boolean {
  return hasConsent("analytics");
}

/**
 * Subscribe to consent changes
 */
export function onConsentChange(
  callback: (state: ConsentState) => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ConsentState>;
    callback(customEvent.detail);
  };

  window.addEventListener("consent_update", handler);
  return () => window.removeEventListener("consent_update", handler);
}
