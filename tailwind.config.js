/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/*.js", "./src/*ts"],
  theme: {
    extend: {
      fontFamily: "Quicksand",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
