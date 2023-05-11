/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  endOfLine: "auto",
};

module.exports = config;
