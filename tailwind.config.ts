import type { Config } from "tailwindcss";
const svgToDataUri = require("mini-svg-data-uri");
const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Add custom colors for dark mode if needed
      colors: {
        // Example custom colors
        'dark-bg': '#252424',
        'dark-text': '#ffffff',
      },
    },
  },

  plugins: [],

};
export default config;
