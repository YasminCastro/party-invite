import "./globals.css";
import projectConfig from "@/config/project";
import { UserProvider } from "@/providers/User";
import type { Metadata } from "next";
import { Roboto_Flex, Modak } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const modak = Modak({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-modak",
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
      <body className={`${roboto.variable} ${modak.variable}`}>
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
