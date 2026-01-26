/**
 * Vite/React Analytics Provider
 *
 * Provides analytics context and auto-tracking for Vite-based React apps.
 *
 * @example
 * ```tsx
 * // main.tsx
 * import { ViteAnalyticsProvider } from '@ui-platform/ui/analytics';
 *
 * ReactDOM.createRoot(document.getElementById('root')!).render(
 *   <ViteAnalyticsProvider
 *     endpoint={import.meta.env.VITE_SGTM_ENDPOINT}
 *     appId="designOS_sandbox"
 *   >
 *     <App />
 *   </ViteAnalyticsProvider>
 * );
 * ```
 */

import { useEffect, useRef, type ReactNode } from "react";
import {
  initAnalytics,
  trackPageView,
  trackError,
  trackSessionStart,
  isAnalyticsInitialized,
} from "../index";
import type { AppId, BrandId } from "../types";
import { hasAnalyticsConsent } from "../consent";
import { isLowDataMode } from "../low-data-mode";

export interface ViteAnalyticsProviderProps {
  /** sGTM endpoint URL */
  endpoint: string;
  /** Application identifier */
  appId: AppId;
  /** Brand identifier */
  brandId?: BrandId;
  /** Enable debug logging */
  debug?: boolean;
  /** Child components */
  children: ReactNode;
}

/**
 * Analytics provider for Vite/React applications
 *
 * Features:
 * - Auto-initializes analytics
 * - Tracks page views via History API
 * - Tracks session start
 * - Captures global errors
 *
 * Note: For SPA routing, this listens to popstate events.
 * If using a router (react-router, etc.), consider using
 * the router's navigation events instead.
 */
export function ViteAnalyticsProvider({
  endpoint,
  appId,
  brandId = "default",
  debug = false,
  children,
}: ViteAnalyticsProviderProps): ReactNode {
  const initialized = useRef(false);
  const lastPathname = useRef<string | null>(null);

  // Initialize analytics once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initAnalytics({
      endpoint,
      appId,
      brandId,
      debug,
    });

    // Track initial page view
    lastPathname.current = window.location.pathname;
    trackPageView({ path: window.location.pathname });

    // Track session start (extended event)
    if (!isLowDataMode() && hasAnalyticsConsent()) {
      trackSessionStart();
    }

    // Set up global error handler
    const errorHandler = (event: ErrorEvent) => {
      trackError({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
      });
    };

    // Listen for navigation changes (browser back/forward)
    const navigationHandler = () => {
      const currentPathname = window.location.pathname;
      if (lastPathname.current !== currentPathname) {
        lastPathname.current = currentPathname;
        trackPageView({ path: currentPathname });
      }
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("popstate", navigationHandler);

    // Patch pushState and replaceState for SPA navigation
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);

    history.pushState = function (...args) {
      originalPushState(...args);
      navigationHandler();
    };

    history.replaceState = function (...args) {
      originalReplaceState(...args);
      navigationHandler();
    };

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("popstate", navigationHandler);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [endpoint, appId, brandId, debug]);

  return <>{children}</>;
}
