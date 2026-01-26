/**
 * Analytics Types
 *
 * TypeScript definitions for the analytics SDK.
 * All types align with the GTM configuration schema.
 */

/** Application identifiers */
export type AppId = "web" | "ai4su" | "designOS_sandbox";

/** Brand identifiers */
export type BrandId = "default" | "eu-d4d";

/** Consent categories */
export type ConsentCategory = "analytics" | "marketing";

/** Consent state for all categories */
export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

/** Core events that always fire (even in Low Data Mode) */
export const CORE_EVENTS = ["page_view", "error", "consent_update"] as const;
export type CoreEvent = (typeof CORE_EVENTS)[number];

/** Extended events that are skipped in Low Data Mode */
export const EXTENDED_EVENTS = [
  "performance",
  "user_interaction",
  "session_start",
] as const;
export type ExtendedEvent = (typeof EXTENDED_EVENTS)[number];

/** All event names */
export type EventName = CoreEvent | ExtendedEvent | string;

/** Base analytics event structure */
export interface AnalyticsEvent {
  /** Event name following {category}_{action}_{qualifier} pattern */
  name: EventName;
  /** Additional event properties */
  properties?: Record<string, unknown>;
}

/** Event with all required dimensions */
export interface TrackedEvent extends AnalyticsEvent {
  app_id: AppId;
  brand_id: BrandId;
  low_data_mode: boolean;
  session_id: string;
  client_id: string;
  timestamp: string;
  page_path?: string;
  page_title?: string;
}

/** Analytics configuration */
export interface AnalyticsConfig {
  /** sGTM endpoint URL */
  endpoint: string;
  /** Application identifier */
  appId: AppId;
  /** Brand identifier */
  brandId?: BrandId;
  /** Enable debug logging */
  debug?: boolean;
}

/** Page view event properties */
export interface PageViewProperties {
  path: string;
  title?: string;
  referrer?: string;
}

/** Error event properties */
export interface ErrorProperties {
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
}

/** Performance event properties */
export interface PerformanceProperties {
  lcp?: number;
  fcp?: number;
  cls?: number;
  ttfb?: number;
  bytes_loaded?: number;
  cache_hit_rate?: number;
}

/** User interaction event properties */
export interface UserInteractionProperties {
  element_type: string;
  element_id?: string;
  element_text?: string;
  action: "click" | "submit" | "focus" | "blur";
}
