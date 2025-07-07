/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./projects/**/*.{html,ts,scss}"],
    extract: {
      html: require("./tailwindcss-class-extractor.js"),
      ts: require("./tailwindcss-class-extractor.js"),
    },
  },
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
