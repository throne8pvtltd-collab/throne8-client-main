import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
         blockRise: 'blockRise 1s ease-in-out infinite',
      },
      keyframes: {
         blockRise: {
        '0%, 100%': { height: '12px', opacity: '0.4' },
        '50%':       { height: '40px', opacity: '1'   },
      },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
