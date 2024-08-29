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
      keyframes: {
        spinLoader: {
          "0%, 25%": {
            "background-size":
              "8px 0,8px 4px,8px 4px,8px 0,8px 4px,8px 4px,8px 0,8px 4px,8px 4px",
            "background-position":
              "0 50%,0 calc(50% - 2px),0 calc(50% + 2px),50% 50%,50% calc(50% - 2px),50% calc(50% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px)",
          },
          "50%": {
            "background-size":
              "8px 100%,8px 4px,8px 4px,8px 0,8px 4px,8px 4px,8px 0,8px 4px,8px 4px",
            "background-position":
              "0 50%,0 calc(0% - 2px),0 calc(100% + 2px),50% 50%,50% calc(50% - 2px),50% calc(50% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px)",
          },
          "75%": {
            "background-size":
              "8px 100%,8px 4px,8px 4px,8px 100%,8px 4px,8px 4px,8px 0,8px 4px,8px 4px",
            "background-position":
              "0 50%,0 calc(0% - 2px),0 calc(100% + 2px),50% 50%,50% calc(0% - 2px),50% calc(100% + 2px),100% 50%,100% calc(50% - 2px),100% calc(100% + 2px)",
          },
          "95%, 100%": {
            "background-size":
              "8px 100%,8px 4px,8px 4px,8px 100%,8px 4px,8px 4px,8px 100%,8px 4px,8px 4px",
            "background-position":
              "0 50%,0 calc(0% - 2px),0 calc(100% + 2px),50% 50%,50% calc(0% - 2px),50% calc(100% + 2px),100% 50%,100% calc(0% - 2px),100% calc(100% + 2px)",
          },
        },
      },
      animation: {
        spinLoader: "spinLoader 1s infinite alternate",
      },
    },
  },
  plugins: [],
};
