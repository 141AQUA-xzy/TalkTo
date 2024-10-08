import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-conic":
          "conic-gradient(from 36deg at 20% 80%, #A100FFFF 0%, #000000 25%, #0000 30%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'uxll': '1700px',
        'uxlll': '1930px',

      },
    },
  },
  plugins: [],
};
export default config;
