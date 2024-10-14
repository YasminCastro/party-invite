import "./globals.css";
import projectConfig from "@/config/project";
import { UserProvider } from "@/providers/User";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });

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
      <body className={`${roboto.variable}`}>
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
