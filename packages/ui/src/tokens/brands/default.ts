/**
 * Default Brand Configuration
 * Neutral fallback when no specific brand is configured
 *
 * Uses system fonts and accessible color palette
 */

import type { BrandConfig } from "../types";

export const defaultBrand: BrandConfig = {
  id: "default",
  name: "UI Platform",

  colors: {
    // Primary: Dark slate
    primary: {
      hex: "#1e293b",
      hsl: "222 47% 17%",
    },
    primaryForeground: {
      hex: "#f8fafc",
      hsl: "210 40% 98%",
    },

    // Secondary: Light gray
    secondary: {
      hex: "#f1f5f9",
      hsl: "210 40% 96%",
    },
    secondaryForeground: {
      hex: "#1e293b",
      hsl: "222 47% 17%",
    },

    // Accent: Blue
    accent: {
      hex: "#3b82f6",
      hsl: "217 91% 60%",
    },
    accentForeground: {
      hex: "#ffffff",
      hsl: "0 0% 100%",
    },

    // Neutral: Gray
    neutral: {
      hex: "#e2e8f0",
      hsl: "214 32% 91%",
    },
    neutralForeground: {
      hex: "#475569",
      hsl: "215 19% 35%",
    },

    // Highlight: Amber
    highlight: {
      hex: "#f59e0b",
      hsl: "38 92% 50%",
    },
    highlightForeground: {
      hex: "#000000",
      hsl: "0 0% 0%",
    },
  },

  typography: {
    font: {
      family: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI"],
      fallback: ["Arial", "sans-serif"],
      // No external font URL - uses system fonts for minimal data usage
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // No logos, attribution, or social media for default brand
};
