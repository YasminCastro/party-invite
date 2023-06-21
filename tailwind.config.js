/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: "425px",
      },
      fontFamily: {
        roboto: "var(--font-roboto)",
        bebas: "var(--font-bebasneue)",
        mont: "var(--font-montserrat)",
        bungee: "var(--font-bungee)",
      },
      backgroundImage: {
        login: "url('/login/login-backround.svg')",
        popup: "url('/login/popup.svg')",
      },
    },
  },
  plugins: [],
};
