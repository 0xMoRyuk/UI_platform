"use client";

/**
 * Next.js Analytics Provider
 *
 * Provides analytics context and auto-tracking for Next.js apps.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { AnalyticsProvider } from '@ui-platform/ui/analytics';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AnalyticsProvider
 *           endpoint={process.env.NEXT_PUBLIC_SGTM_ENDPOINT!}
 *           appId="web"
 *         >
 *           {children}
 *         </AnalyticsProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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

export interface AnalyticsProviderProps {
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
 * Analytics provider for Next.js applications
 *
 * Features:
 * - Auto-initializes analytics
 * - Tracks page views on route changes
 * - Tracks session start
 * - Captures global errors
 */
export function AnalyticsProvider({
  endpoint,
  appId,
  brandId = "default",
  debug = false,
  children,
}: AnalyticsProviderProps): ReactNode {
  const pathname = usePathname();
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

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, [endpoint, appId, brandId, debug]);

  // Track page views on route changes
  useEffect(() => {
    if (!isAnalyticsInitialized()) return;

    // Skip if same pathname (happens on initial render)
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;

    trackPageView({ path: pathname });
  }, [pathname]);

  return <>{children}</>;
}
