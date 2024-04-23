import "./globals.css";
import projectConfig from "@/config/project";
import { UserProvider } from "@/providers/User";
import type { Metadata } from "next";
import { Roboto_Flex, Lilita_One } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
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
      <body className={`${roboto.variable}   ${lilita.variable}`}>
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
