import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import motion from "tailwindcss-motion";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        "display-mono": ['"Space Mono"', ...defaultTheme.fontFamily.mono],
      },
      screens: {
        xs: "384px",
      },
      colors: {
        screen: "#8CAD28",
        "screen-contrast": "#214332",
      },
      keyframes: {
        blinker: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blinker 1s step-start infinite",
      },
    },
  },
  plugins: [motion],
} satisfies Config;
