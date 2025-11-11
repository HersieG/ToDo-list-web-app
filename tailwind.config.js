/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yes: {
          900: "hsl(0, 0%, 0%)",
          800: "hsl(0, 0%, 5%)",
          700: "hsl(0, 0%, 10%)",
        },
      },
    },
  },
  plugins: [],
};
