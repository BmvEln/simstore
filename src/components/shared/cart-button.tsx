"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cart";

import { Button } from "../ui/button";
import CartDrawer from "./cart-drawer";

interface Props {
  className?: string;
}

function CartButton({ className }: Props) {
  const { totalAmount, items, loading } = useCartStore((state) => state);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn("group relative", { "w-[100px]": loading }, className)}
        variant="outline"
      >
        <b>{totalAmount || 0} ₽</b>

        <span className="h-full w-[1px] bg-black/50 mx-3" />

        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>

        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
}

export default CartButton;
