/**
 * EU Data Governance in Africa Brand
 * Source: EU Visibility Guidelines - AI4Startups Design Brief
 *
 * Global Gateway / D4D Hub initiative supporting AU digital transformation
 *
 * Palette:
 *   Primary:   #003399 (Dark Blue)   - Headers, links, primary actions
 *   Secondary: #9BB1DC (Light Blue)  - Backgrounds, supporting elements
 *   Accent:    #F5CE2A (Yellow)      - CTAs, highlights, focus rings
 *   Neutral:   #DBD2CC (Sand)        - Subtle backgrounds, borders
 */

import type { BrandConfig } from "../types";

export const euD4DBrand: BrandConfig = {
  id: "eu-d4d",
  name: "EU Data Governance in Africa",

  colors: {
    // Primary: EU Dark Blue
    primary: {
      hex: "#003399",
      hsl: "220 100% 30%",
    },
    primaryForeground: {
      hex: "#FFFFFF",
      hsl: "0 0% 100%",
    },

    // Secondary: Light Blue
    secondary: {
      hex: "#9BB1DC",
      hsl: "220 43% 73%",
    },
    secondaryForeground: {
      hex: "#003399",
      hsl: "220 100% 30%",
    },

    // Accent: Yellow (CTAs, highlights)
    accent: {
      hex: "#F5CE2A",
      hsl: "45 91% 56%",
    },
    accentForeground: {
      hex: "#000000",
      hsl: "0 0% 0%",
    },

    // Neutral: Sand
    neutral: {
      hex: "#DBD2CC",
      hsl: "27 18% 83%",
    },
    neutralForeground: {
      hex: "#000000",
      hsl: "0 0% 0%",
    },

    // Highlight: Yellow (same as accent)
    highlight: {
      hex: "#F5CE2A",
      hsl: "45 91% 56%",
    },
    highlightForeground: {
      hex: "#000000",
      hsl: "0 0% 0%",
    },
  },

  typography: {
    font: {
      family: ["Barlow"],
      fallback: ["Arial", "system-ui", "sans-serif"],
      url: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  logos: {
    primary: [
      {
        id: "global-gateway",
        name: "Global Gateway",
        alt: "EU Global Gateway",
      },
      {
        id: "eu-flag",
        name: "European Union",
        alt: "European Union Flag",
      },
      {
        id: "african-union",
        name: "African Union",
        alt: "African Union Logo",
      },
    ],
    secondary: [
      { id: "belgium", name: "Belgium", alt: "Belgium - Partner in Development" },
      { id: "estonia", name: "Republic of Estonia", alt: "Republic of Estonia Ministry of Foreign Affairs" },
      { id: "finland", name: "Finland", alt: "Suomi Finland" },
      { id: "france", name: "République Française", alt: "République Française" },
      { id: "germany", name: "German Cooperation", alt: "German Cooperation" },
    ],
    partners: [
      { id: "d4d-hub", name: "D4D Hub", alt: "Digital for Development Hub" },
      { id: "giz", name: "GIZ", alt: "Deutsche Gesellschaft für Internationale Zusammenarbeit" },
      { id: "enabel", name: "Enabel", alt: "Enabel - Belgian Development Agency" },
      { id: "expertise-france", name: "Expertise France", alt: "Expertise France" },
      { id: "estdev", name: "ESTDEV", alt: "Estonian Centre for International Development" },
      { id: "haus", name: "HAUS", alt: "Finnish Institute of Public Management" },
      { id: "digital-africa", name: "Digital Africa", alt: "Digital Africa" },
    ],
  },

  attribution: {
    short: "Funded by the European Union",
    full: "Co-funded by the European Union, Belgium, Estonia, Finland, France and Germany under EU Global Gateway Strategy. Implemented by Digital Africa, Enabel, ESTDEV, Expertise France, GIZ and HAUS.",
  },

  social: {
    hashtags: [
      "#D4DataGOV",
      "#DataGovernanceAfrica",
      "#TeamEurope",
      "#GlobalGateway",
      "#D4DHub",
    ],
    mentions: {
      twitter: [
        "@AfricanUnion",
        "@EU_Commission",
        "@BMZ_Bund",
        "@Ulkoministerio",
        "@MFAestonia",
        "@BelgiumMFA",
        "@francediplo_EN",
        "@HAUSfi",
        "@ESTDEV",
        "@GIZAfricanUnion",
        "@Enabel_Belgium",
        "@expertisefrance",
        "@D4DHub_EU",
      ],
      linkedin: [
        "@_AfricanUnion",
        "@European Union",
        "@Federal Ministry for Economic Cooperation and Development (BMZ)",
        "@Ministry for Foreign Affairs of Finland",
        "@Ministry of Foreign Affairs Belgium",
        "@GIZ African Union",
        "@Enabel",
        "@Expertise France",
        "@Digital for Development (D4D) Hub",
      ],
    },
  },

  badge: {
    label: "DATA\nGOVERNANCE\nIN AFRICA",
    background: "#003399",
    foreground: "#FFFFFF",
  },

  projectUrl: process.env.NEXT_PUBLIC_PROJECT_URL,
};
