/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      keyframes: {
        party_bounce: {
          to: { transform: "translate(0px, 6px)" },
        },
      },
      animation: {
        party_bounce: "party_bounce 1s steps(2, end) infinite",
      },
    },
  },
};
