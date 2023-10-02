import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: "var(--font-anton)",
        text: "var(--font-roboto)",
        alt: "var(--font-bailjamjuree)",
      },
      backgroundImage: {
        login: "url('/login/background.jpg')",
        home: "url('/home/home-background.png')",
      },

      colors: {
        login: {
          title: "#2A2A32",
          form: "color: rgb(0 0 0 / var(--tw-text-opacity))",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
