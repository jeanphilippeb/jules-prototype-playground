import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jules: {
          primary: "#2563EB",
          secondary: "#64748B",
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
          background: "#FFFFFF",
          surface: "#F8FAFC",
          border: "#E2E8F0",
          "text-primary": "#0F172A",
          "text-secondary": "#64748B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
}

export default config
