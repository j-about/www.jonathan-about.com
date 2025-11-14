/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: ["prettier-plugin-tailwindcss"],
  // Required for Tailwind CSS v4 to understand custom theme tokens and utilities
  tailwindStylesheet: "./app/globals.css",
};
