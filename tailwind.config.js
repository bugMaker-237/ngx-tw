/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/**/*.{html,ts}"],
  important: true,
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        ...require("./projects/demo/src/palette"),
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
