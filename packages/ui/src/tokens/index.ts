/**
 * Brand-Agnostic Design Tokens
 * Supports multiple brand guidelines (EU, AU, custom, etc.)
 *
 * @example
 * import { activeBrand, brands, getBrandCSSVars } from "@ui-platform/ui/tokens";
 *
 * // Use active brand (from NEXT_PUBLIC_BRAND_ID)
 * console.log(activeBrand.name);
 *
 * // Or select specific brand
 * const euBrand = brands["eu-d4d"];
 */

// Types
export type {
  ColorToken,
  BrandColors,
  FontConfig,
  BrandTypography,
  LogoConfig,
  BrandLogos,
  AttributionConfig,
  SocialMentions,
  BrandSocial,
  ProjectBadge,
  BrandConfig,
  ThemeConfig,
} from "./types";

// Brand registry
export {
  brands,
  getBrand,
  getAvailableBrands,
  defaultBrand,
  euD4DBrand,
  type BrandId,
} from "./brands";

// Theme utilities
export {
  BRAND_ID,
  activeBrand,
  getBrandCSSVars,
  getBrandCSSString,
  getAllBrandCSS,
  getBrandFontUrl,
  getBrandFontFamily,
  brandHasExternalFont,
  getBrandAttribution,
  getBrandHashtags,
} from "./theme";
