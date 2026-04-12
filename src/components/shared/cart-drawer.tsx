"use client";

import React, { useEffect } from "react";
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

import { useCartStore } from "@/store/cart";

import { Button } from "../ui";
import CartDrawerItem from "./cart-drawer-item";

interface Props {
  className?: string;
  children: React.ReactNode;
}

function CartDrawer({ children }: Props) {
  const { fetchCartItems, items, totalAmount } = useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f6f6f6]">
        <div className="flex flex-col h-[calc(100%-164px)]">
          <SheetHeader>
            <SheetTitle className="text-lg whitespace-nowrap">
              В корзине 1 товар на сумму {totalAmount} ₽
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 overflow-y-auto">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                name={item.name}
                editionType={item.editionType}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <SheetFooter className="bg-white p-8 mt-4">
          <div className="flex mb-4">
            <span className="flex w-full text-lg text-neutral-500">
              Итого
              <div className="w-full border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg whitespace-nowrap">
              {totalAmount} ₽
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
