import type { Config } from "tailwindcss";
import baseConfig from "../../packages/config/tailwind";

const config: Config = {
  ...baseConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    // Include shared UI package components
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
