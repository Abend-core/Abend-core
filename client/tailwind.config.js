/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        paddingSm: "6px",
        paddingMd: "12px",
      },
      colors: {
        primaryRed: "#F82B30",
        primaryBlue: "#111827",
        customlightGray: "#D9DCE1",
        customdarkGray: "#919198",
        customGray: "#746a6ade",
        customWhite: "#F4F6FA",
        customGreen: "#4b9945",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
