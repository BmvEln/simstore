import { ReactNode } from "react";

import Header from "@/components/shared/header";

export const WIDTH_CONTAINER = "1074px";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Header
        className={`w-[${WIDTH_CONTAINER}] mx-auto`}
        showSearch={false}
        showCart={false}
      />
      {children}
    </main>
  );
}
