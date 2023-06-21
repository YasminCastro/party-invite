import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Bebas_Neue, Bungee, Montserrat, Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const bungee = Bungee({
  subsets: ["latin"],
  variable: "--font-bungee",
  weight: "400",
});
const bebas = Bebas_Neue({
  variable: "--font-bebasneue",
  subsets: ["latin"],
  weight: "400",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${roboto.variable} ${montserrat.variable} ${bebas.variable} ${bungee.variable}`}
    >
      <Component {...pageProps} />
    </main>
  );
}
