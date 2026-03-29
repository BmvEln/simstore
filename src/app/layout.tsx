import { ReactNode } from "react";

import { Nunito } from "next/font/google";

import "./global.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={nunito.variable} lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
