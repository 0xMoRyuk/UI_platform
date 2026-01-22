/**
 * Brand Registry
 * Register all available brand configurations here
 *
 * @example
 * // Set brand via environment variable
 * NEXT_PUBLIC_BRAND_ID=eu-d4d
 *
 * // Or import directly
 * import { brands } from "@ui-platform/ui/tokens";
 * const brand = brands["eu-d4d"];
 */

import type { BrandConfig } from "../types";
import { defaultBrand } from "./default";
import { euD4DBrand } from "./eu-d4d";

/**
 * All registered brands
 * Add new brands here as they are created
 */
export const brands = {
  default: defaultBrand,
  "eu-d4d": euD4DBrand,
  // Add future brands here:
  // "au-digital": auDigitalBrand,
  // "afcfta": afcftaBrand,
} as const;

export type BrandId = keyof typeof brands;

/**
 * Get brand by ID with fallback to default
 */
export function getBrand(id: string | undefined): BrandConfig {
  if (id && id in brands) {
    return brands[id as BrandId];
  }
  return brands.default;
}

/**
 * List all available brand IDs
 */
export function getAvailableBrands(): BrandId[] {
  return Object.keys(brands) as BrandId[];
}

// Re-export individual brands for direct import
export { defaultBrand } from "./default";
export { euD4DBrand } from "./eu-d4d";
