import { type Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        slate: {
          800: "#1e293b",
          850: "#1a2332",
          900: "#0f172a",
          950: "#020617",
        },
      },
      screens: {
        "2xl": "1736px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
