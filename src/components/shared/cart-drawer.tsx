"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui";
import CartDrawerItem from "./cart-drawer-item";

interface Props {
  className?: string;
  children: React.ReactNode;
}

function CartDrawer({ children }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f6f6f6]">
        <SheetHeader>
          <SheetTitle className="text-lg">1 товар на {4490} ₽</SheetTitle>
        </SheetHeader>

        <CartDrawerItem name="Name" editionType={1} price={4490} quantity={1} />

        <SheetFooter className="bg-white p-8">
          <div className="flex mb-4">
            <span className="flex w-full text-lg text-neutral-500">
              Итого
              <div className="w-full border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg whitespace-nowrap">
              {4490} ₽
            </span>
          </div>

          <Link href="/cart">
            <Button
              className="w-full h-12 text-base"
              onClick={() => {}}
              type="submit"
            >
              Оформить заказ
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
