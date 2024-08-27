/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        primary: "#3FC1C9", // Primary color
        secondary: "#364F6B", // Secondary color
        accent: "#FC5185", // Accent color
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"], // Primary font
        heading: ["Lexend", "sans-serif"], // Heading font
        action: ["Oswald", "sans-serif"], // Action font
      },
    },
  },
  plugins: [],
};
