import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Mono', 'monospace'],
        vt323: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
