/**
 * Brand-Agnostic Design Token Types
 * Supports multiple brand guidelines (EU, AU, custom, etc.)
 */

// =============================================================================
// Color Tokens
// =============================================================================

export interface ColorToken {
  hex: string;
  hsl: string; // HSL values without hsl() wrapper: "220 100% 30%"
  rgb?: string;
}

export interface BrandColors {
  primary: ColorToken;
  primaryForeground: ColorToken;
  secondary: ColorToken;
  secondaryForeground: ColorToken;
  accent: ColorToken;
  accentForeground: ColorToken;
  neutral: ColorToken;
  neutralForeground: ColorToken;
  highlight: ColorToken;
  highlightForeground: ColorToken;
}

// =============================================================================
// Typography Tokens
// =============================================================================

export interface FontConfig {
  family: string[];
  fallback: string[];
  url?: string; // Google Fonts or CDN URL
}

export interface BrandTypography {
  font: FontConfig;
  weights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

// =============================================================================
// Logo Tokens
// =============================================================================

export interface LogoConfig {
  id: string;
  name: string;
  alt: string;
  src?: string; // Path to logo asset
  url?: string; // Link URL when clicked
}

export interface BrandLogos {
  primary: LogoConfig[];
  secondary?: LogoConfig[];
  partners?: LogoConfig[];
}

// =============================================================================
// Attribution Tokens
// =============================================================================

export interface AttributionConfig {
  short: string;
  full: string;
}

// =============================================================================
// Social Media Tokens
// =============================================================================

export interface SocialMentions {
  twitter?: string[];
  linkedin?: string[];
  facebook?: string[];
}

export interface BrandSocial {
  hashtags: string[];
  mentions?: SocialMentions;
}

// =============================================================================
// Badge/Project Identity
// =============================================================================

export interface ProjectBadge {
  label: string;
  background: string;
  foreground: string;
}

// =============================================================================
// Main Brand Configuration
// =============================================================================

export interface BrandConfig {
  /** Unique brand identifier */
  id: string;

  /** Display name */
  name: string;

  /** Brand color palette */
  colors: BrandColors;

  /** Typography settings */
  typography: BrandTypography;

  /** Logo configurations */
  logos?: BrandLogos;

  /** Attribution text */
  attribution?: AttributionConfig;

  /** Social media presence */
  social?: BrandSocial;

  /** Project badge (visual identifier) */
  badge?: ProjectBadge;

  /** Project URL (can be overridden via env) */
  projectUrl?: string;
}

// =============================================================================
// Theme Context
// =============================================================================

export interface ThemeConfig {
  brand: BrandConfig;
  colorMode: "light" | "dark";
}
