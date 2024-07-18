/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'pulse-slow': 'pulse 4s linear infinite',
        'pulse-fast': 'pulse 0.001s linear infinite',
      }

    },
    fontFamily: {
      RobotoMono: ["Roboto Mono"],
      Geomanist: ["var(--title)"],
      normal: ["var(--nomral)"],
      bungee: ["Bungee"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],

}
