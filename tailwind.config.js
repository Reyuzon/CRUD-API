/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "var(--font-poppins)",
        guerrilla: "var(--font-guerrilla)",
      },
      colors: {
        red: "rgba(210,11,0,255)",
        dark: "rgba(23,23,23,255)",
        silver: "rgba(209,209,209,255)",
        yellow: "rgba(249,193,46,255)",
      },
    },
  },
  plugins: [],
};
