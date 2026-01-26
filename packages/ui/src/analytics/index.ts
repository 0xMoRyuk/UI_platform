/**
 * Analytics SDK
 *
 * Minimal (<10KB) consent-first analytics for the UI Platform.
 * Sends events to GTM Server-Side on Cloud Run.
 *
 * @example
 * ```tsx
 * import { initAnalytics, trackPageView } from '@ui-platform/ui/analytics';
 *
 * // Initialize in app entry
 * initAnalytics({
 *   endpoint: 'https://gtm.yourdomain.com/collect',
 *   appId: 'web',
 *   brandId: 'default',
 * });
 *
 * // Track page views
 * trackPageView();
 * ```
 *
 * @packageDocumentation
 */

// Types
// Note: BrandId is exported from ./tokens to avoid duplicate export
export type {
  AppId,
  ConsentCategory,
  ConsentState,
  AnalyticsConfig,
  AnalyticsEvent,
  TrackedEvent,
  PageViewProperties,
  ErrorProperties,
  PerformanceProperties,
  UserInteractionProperties,
} from "./types";

export { CORE_EVENTS, EXTENDED_EVENTS } from "./types";

// Consent management
export {
  getConsent,
  setConsent,
  updateConsent,
  grantAllConsent,
  revokeAllConsent,
  hasConsent,
  hasAnalyticsConsent,
  onConsentChange,
} from "./consent";

// Low Data Mode
export {
  isLowDataMode,
  setLowDataMode,
  clearLowDataModePreference,
  onLowDataModeChange,
} from "./low-data-mode";

// Tracker
export {
  initAnalytics,
  track,
  getAnalyticsConfig,
  isAnalyticsInitialized,
} from "./tracker";

// Event helpers
export {
  trackPageView,
  trackError,
  trackConsentUpdate,
  trackPerformance,
  trackUserInteraction,
  trackSessionStart,
  trackCustomEvent,
  trackButtonClick,
  trackFormSubmit,
} from "./events";

// Framework providers
export { AnalyticsProvider } from "./providers/next";
export { ViteAnalyticsProvider } from "./providers/vite";
