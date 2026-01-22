/**
 * Brand Provider Component
 * Sets up brand context (data-brand attribute, fonts) for the application
 *
 * @example
 * // In layout.tsx
 * import { BrandProvider } from "@ui-platform/ui";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <BrandProvider>
 *         <body>{children}</body>
 *       </BrandProvider>
 *     </html>
 *   );
 * }
 */

import type { BrandConfig } from "../tokens/types";
import { activeBrand, BRAND_ID, brandHasExternalFont } from "../tokens/theme";

export interface BrandProviderProps {
  /** Override brand (defaults to activeBrand from env) */
  brand?: BrandConfig;
  /** Children to render */
  children: React.ReactNode;
}

/**
 * Brand Provider - wraps children with brand context
 * Sets data-brand attribute on html element
 */
export function BrandProvider({
  brand = activeBrand,
  children,
}: BrandProviderProps) {
  return (
    <>
      {/* Font preloading for brands with external fonts */}
      {brandHasExternalFont(brand) && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link href={brand.typography.font.url} rel="stylesheet" />
        </>
      )}
      {children}
    </>
  );
}

/**
 * Get props for html element to enable brand theming
 * Use this in your layout.tsx
 *
 * @example
 * import { getBrandHtmlProps } from "@ui-platform/ui";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" {...getBrandHtmlProps()}>
 *       ...
 *     </html>
 *   );
 * }
 */
export function getBrandHtmlProps(brand: BrandConfig = activeBrand) {
  return {
    "data-brand": brand.id,
  };
}

/**
 * Get the brand ID for use in components
 */
export function useBrandId(): string {
  return BRAND_ID;
}
