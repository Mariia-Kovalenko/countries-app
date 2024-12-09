/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ],
  theme: {
    extend: {
      colors: {
        customGrey: "#d0d0d0",
        customPurple: "#6563FF",
        darkGrey: "#333333",
        lightGrey: "#425466",
        customRed: "#EB5757",
      },
    },
  },
  plugins: [],
};
