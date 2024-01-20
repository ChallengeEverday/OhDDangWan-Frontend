/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react"

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  // plugins: [nextui()],
  plugins: [
    nextui({
      themes: {
        "odw-light": {
          extend: "light",
          colors: {
            background: "#ffffff",
            foreground: "#1D1D1D",
            primary: {
              50: "#FEE9DD",
              100: "#FEE9DD",
              200: "#FDCFBB",
              300: "#FBAE98",
              400: "#F78E7E",
              500: "#F25C54",
              600: "#D03D42",
              700: "#AE2A39",
              800: "#8C1A31",
              900: "#74102C",
              DEFAULT: "#F25C54",
              foreground: "#ffffff",
            },
            focus: "#F25C54",
          },
        },

        "odw-dark": {
          extend: "dark",
          colors: {
            primary: {
              900: "#FEE9DD",
              800: "#FDCFBB",
              700: "#FBAE98",
              600: "#F78E7E",
              500: "#F25C54",
              400: "#D03D42",
              300: "#AE2A39",
              200: "#8C1A31",
              100: "#74102C",
              50: "#74102C",
              DEFAULT: "#F25C54",
              foreground: "#1D1D1D",
            },
            focus: "#F78E7E",
          },
        },
      },
    }),
  ],
}
