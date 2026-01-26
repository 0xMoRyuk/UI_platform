/**
 * Type-Safe Event Helpers
 *
 * Convenience functions for tracking common events.
 * Each function enforces the correct event structure.
 *
 * @packageDocumentation
 */

import { track } from "./tracker";
import type {
  PageViewProperties,
  ErrorProperties,
  PerformanceProperties,
  UserInteractionProperties,
} from "./types";

/**
 * Track a page view event
 *
 * Core event - fires even in Low Data Mode
 */
export function trackPageView(properties?: Partial<PageViewProperties>): void {
  track({
    name: "page_view",
    properties: {
      path: properties?.path ?? (typeof window !== "undefined" ? window.location.pathname : "/"),
      title: properties?.title ?? (typeof document !== "undefined" ? document.title : undefined),
      referrer: properties?.referrer ?? (typeof document !== "undefined" ? document.referrer : undefined),
    },
  });
}

/**
 * Track an error event
 *
 * Core event - fires even in Low Data Mode
 */
export function trackError(properties: ErrorProperties): void {
  track({
    name: "error",
    properties,
  });
}

/**
 * Track a consent update event
 *
 * Core event - fires even in Low Data Mode
 */
export function trackConsentUpdate(analytics: boolean, marketing: boolean): void {
  track({
    name: "consent_update",
    properties: {
      analytics_consent: analytics,
      marketing_consent: marketing,
    },
  });
}

/**
 * Track a performance event
 *
 * Extended event - skipped in Low Data Mode
 */
export function trackPerformance(properties: PerformanceProperties): void {
  track({
    name: "performance",
    properties,
  });
}

/**
 * Track a user interaction event
 *
 * Extended event - skipped in Low Data Mode
 */
export function trackUserInteraction(properties: UserInteractionProperties): void {
  track({
    name: "user_interaction",
    properties,
  });
}

/**
 * Track a session start event
 *
 * Extended event - skipped in Low Data Mode
 */
export function trackSessionStart(): void {
  track({
    name: "session_start",
    properties: {
      start_time: new Date().toISOString(),
    },
  });
}

/**
 * Track a custom event
 *
 * Use for events not covered by the standard helpers.
 * Event name must follow the taxonomy: {category}_{action}_{qualifier}
 */
export function trackCustomEvent(
  name: string,
  properties?: Record<string, unknown>
): void {
  // Validate event name format
  const pattern = /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/;
  if (!pattern.test(name)) {
    console.warn(
      `[Analytics] Event name "${name}" does not follow taxonomy. ` +
        "Use lowercase snake_case: {category}_{action}_{qualifier}"
    );
  }

  if (name.length > 40) {
    console.warn(
      `[Analytics] Event name "${name}" exceeds 40 character limit.`
    );
  }

  track({
    name,
    properties,
  });
}

/**
 * Track button click event
 *
 * Convenience wrapper for trackUserInteraction
 */
export function trackButtonClick(
  elementId?: string,
  elementText?: string
): void {
  trackUserInteraction({
    element_type: "button",
    element_id: elementId,
    element_text: elementText,
    action: "click",
  });
}

/**
 * Track form submission event
 *
 * Convenience wrapper for trackUserInteraction
 */
export function trackFormSubmit(formId?: string): void {
  trackUserInteraction({
    element_type: "form",
    element_id: formId,
    action: "submit",
  });
}
