/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: "#F82B30",
        primaryBlue: "#111827",
        customlightGray: "#D9DCE1",
        customGray: "#746a6ade",
        customWhite: "#F4F6FA",
        customGreen: "#4b9945",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
