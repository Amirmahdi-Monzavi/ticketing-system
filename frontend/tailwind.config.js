/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "hsl(218deg 50% 91%)",
        blueishWhite: "hsl(213deg 85% 97%)",
        darkBlue: "#3e4684",
      },
      fontFamily: [
        "Poppins",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },

  plugins: [],
};
