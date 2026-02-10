/**
 * Design system loading utilities
 * Sources tokens from @ui-platform/ui BrandConfig (single source of truth)
 *
 * Previously loaded from product/design-system/*.json files.
 * Now reads directly from BrandConfig to enable Figma MCP sync pipeline.
 */

import { euD4DBrand } from '@ui-platform/ui'
import type { DesignSystem, ColorTokens, TypographyTokens } from '@/types/product'

/**
 * Load color tokens from BrandConfig
 */
export function loadColorTokens(): ColorTokens {
  const { colors } = euD4DBrand
  return {
    primary: { hex: colors.primary.hex, hsl: colors.primary.hsl },
    secondary: { hex: colors.secondary.hex, hsl: colors.secondary.hsl },
    accent: { hex: colors.accent.hex, hsl: colors.accent.hsl },
    neutral: { hex: colors.neutral.hex, hsl: colors.neutral.hsl },
    highlight: { hex: colors.highlight.hex, hsl: colors.highlight.hsl },
  }
}

/**
 * Load typography tokens from BrandConfig
 */
export function loadTypographyTokens(): TypographyTokens {
  const { typography } = euD4DBrand
  return {
    heading: typography.font.family[0],
    body: typography.font.family[0],
    mono: 'JetBrains Mono',
    weights: typography.weights,
  }
}

/**
 * Load the complete design system from BrandConfig
 */
export function loadDesignSystem(): DesignSystem {
  return {
    colors: loadColorTokens(),
    typography: loadTypographyTokens(),
  }
}

/**
 * Design system is always available via BrandConfig
 */
export function hasDesignSystem(): boolean {
  return true
}

/**
 * Colors are always available via BrandConfig
 */
export function hasColors(): boolean {
  return true
}

/**
 * Typography is always available via BrandConfig
 */
export function hasTypography(): boolean {
  return true
}
