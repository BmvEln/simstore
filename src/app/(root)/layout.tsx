import { ReactNode } from "react";

import type { Metadata } from "next";

import Header from "@/components/shared/header";

export const metadata: Metadata = {
  title: "SimStore",
  description: "Симулируй это",
};

export default function HomeLayout({
  modal,
  children,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      {children}
      {modal}
    </main>
  );
}
