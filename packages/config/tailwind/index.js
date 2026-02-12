/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Brand-agnostic colors (resolved via CSS variables)
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary))",
            foreground: "hsl(var(--brand-primary-foreground))",
            dark: "hsl(var(--brand-primary-dark))",
            darker: "hsl(var(--brand-primary-darker))",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary))",
            foreground: "hsl(var(--brand-secondary-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--brand-accent))",
            foreground: "hsl(var(--brand-accent-foreground))",
          },
          neutral: {
            DEFAULT: "hsl(var(--brand-neutral))",
            foreground: "hsl(var(--brand-neutral-foreground))",
          },
          highlight: {
            DEFAULT: "hsl(var(--brand-highlight))",
            foreground: "hsl(var(--brand-highlight-foreground))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Brand font (resolved via CSS variable or system fallback)
        brand: "var(--brand-font-family)",
      },
    },
  },
  plugins: [],
};
