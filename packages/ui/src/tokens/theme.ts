/**
 * Theme Resolver
 * Resolves the active brand from environment and provides utilities
 *
 * @example
 * // In your app
 * import { activeBrand, getBrandCSSVars } from "@ui-platform/ui/tokens";
 *
 * // Access current brand config
 * console.log(activeBrand.name);
 *
 * // Generate CSS variables for injection
 * const cssVars = getBrandCSSVars(activeBrand);
 */

import type { BrandConfig, BrandColors } from "./types";
import { getBrand } from "./brands";

/**
 * Active brand ID from environment
 * Set via NEXT_PUBLIC_BRAND_ID environment variable
 */
export const BRAND_ID = process.env.NEXT_PUBLIC_BRAND_ID ?? "default";

/**
 * Active brand configuration
 * Resolved at module load time
 */
export const activeBrand: BrandConfig = getBrand(BRAND_ID);

/**
 * Generate CSS custom properties from brand colors
 * Returns an object suitable for style prop or CSS injection
 */
export function getBrandCSSVars(brand: BrandConfig): Record<string, string> {
  const { colors } = brand;

  return {
    "--brand-primary": colors.primary.hsl,
    "--brand-primary-foreground": colors.primaryForeground.hsl,
    "--brand-secondary": colors.secondary.hsl,
    "--brand-secondary-foreground": colors.secondaryForeground.hsl,
    "--brand-accent": colors.accent.hsl,
    "--brand-accent-foreground": colors.accentForeground.hsl,
    "--brand-neutral": colors.neutral.hsl,
    "--brand-neutral-foreground": colors.neutralForeground.hsl,
    "--brand-highlight": colors.highlight.hsl,
    "--brand-highlight-foreground": colors.highlightForeground.hsl,
  };
}

/**
 * Generate CSS string for brand colors
 * Useful for injecting into <style> tags or CSS files
 */
export function getBrandCSSString(brand: BrandConfig): string {
  const vars = getBrandCSSVars(brand);
  const entries = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  return `:root[data-brand="${brand.id}"] {\n${entries}\n}`;
}

/**
 * Generate all brand CSS strings for static export
 * Useful for build-time CSS generation
 */
export function getAllBrandCSS(): string {
  // Import dynamically to avoid circular dependency
  const { brands } = require("./brands");

  return Object.values(brands)
    .map((brand) => getBrandCSSString(brand as BrandConfig))
    .join("\n\n");
}

/**
 * Get font link URL for current brand
 * Returns undefined if brand uses system fonts
 */
export function getBrandFontUrl(brand: BrandConfig): string | undefined {
  return brand.typography.font.url;
}

/**
 * Get font family CSS value for brand
 */
export function getBrandFontFamily(brand: BrandConfig): string {
  const { family, fallback } = brand.typography.font;
  return [...family, ...fallback]
    .map((f) => (f.includes(" ") ? `"${f}"` : f))
    .join(", ");
}

/**
 * Check if brand has external font that needs loading
 */
export function brandHasExternalFont(brand: BrandConfig): boolean {
  return !!brand.typography.font.url;
}

/**
 * Get attribution text for brand
 */
export function getBrandAttribution(
  brand: BrandConfig,
  variant: "short" | "full" = "short"
): string | undefined {
  return brand.attribution?.[variant];
}

/**
 * Get social hashtags as formatted string
 */
export function getBrandHashtags(brand: BrandConfig): string {
  return brand.social?.hashtags?.join(" ") ?? "";
}
