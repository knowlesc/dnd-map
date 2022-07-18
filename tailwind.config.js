/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        0: 0,
        10: 10,
        100: 100,
        1000: 1000,
        auto: "auto",
      },
      backgroundImage: {
        "table-wood":
          "url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98')",
      },
    },
  },
  plugins: [],
};
