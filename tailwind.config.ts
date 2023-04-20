import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
