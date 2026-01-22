import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "light-bg": "#eff6ff",
        "accent-warm": "#60a5fa",
        "soft-neutral": "#dbeafe",
        "secondary-accent": "#3b82f6",
      },
    },
  },
  plugins: [],
};

export default config;
