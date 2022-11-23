/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        1000: 1000,
      },
      backgroundImage: {
        "table-wood":
          "url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98')",
      },
      dropShadow: {
        highlight: "0 0 3px rgba(0, 0, 0, 1)",
      },
      fontFamily: {
        fancy: ["Andada Pro", "serif"],
        condensed: ["Roboto Condensed", "serif"],
      },
      strokeWidth: {
        4: "4px",
      },
    },
  },
  plugins: [],
};
