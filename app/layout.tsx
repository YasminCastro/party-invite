import "./globals.css";
import projectConfig from "@/config/project";
import { UserProvider } from "@/providers/User";
import type { Metadata } from "next";
import { Roboto_Flex, League_Gothic, Squada_One } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic",
});

const squadaOne = Squada_One({
  subsets: ["latin"],
  variable: "--font-squada-one",
  weight: "400",
});

export const metadata: Metadata = {
  title: projectConfig.partyName,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${leagueGothic.variable} ${squadaOne.variable}`}
      >
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
