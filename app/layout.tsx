import { GuestProvider } from "@/providers/Guests";
import "./globals.css";
import projectConfig from "@/config/project";
import { UserProvider } from "@/providers/User";
import type { Metadata } from "next";
import { Roboto_Flex, Bai_Jamjuree, Anton, Orbitron } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

const baiJamJuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bailjamjuree",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
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
        className={`${roboto.variable} ${baiJamJuree.variable} ${anton.variable} ${orbitron.variable}`}
      >
        <UserProvider>
          <GuestProvider>
            <main>{children}</main>
          </GuestProvider>
        </UserProvider>
      </body>
    </html>
  );
}
