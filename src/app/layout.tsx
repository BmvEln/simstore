import { ReactNode } from "react";
import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "./global.css";

import Header from "@/components/shared/header";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SimStore",
  description: "Симулируй это",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={nunito.variable} lang="en">
      <body className={nunito.className}>
        <Header />
        <main className="min-h-screen bg-white">{children}</main>
      </body>
    </html>
  );
}
