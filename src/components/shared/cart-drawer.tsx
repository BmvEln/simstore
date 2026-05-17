"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { IMG } from "@/static/img";

import { useCartStore } from "@/store/cart";

import { getNewQuantity } from "@/functions/get-new-quantity";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import CartDrawerItem from "@/components/shared/cart-drawer-item";

interface Props {
  className?: string;
  children: React.ReactNode;
}

function CartDrawer({ children }: Props) {
  const [redirect, setRedirect] = useState(false);

  const {
    items,
    totalAmount,
    getCartItems,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore((state) => state);

  useEffect(() => {
    getCartItems();
  }, []);

  const onClickCount = useCallback(
    (productVariantId: number, quantity: number, type: "plus" | "minus") => {
      updateItemQuantity(productVariantId, getNewQuantity(quantity, type));
    },
    [],
  );

  const onClickRemove = useCallback((productVariantId: number) => {
    removeCartItem(productVariantId);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f6f6f6]">
        {!!items.length && (
          <div className="flex flex-col h-[calc(100%-164px)]">
            <SheetHeader>
              <SheetTitle className="text-lg whitespace-nowrap">
                В корзине {items.length} товар на сумму {totalAmount} ₽
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 overflow-y-auto">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.productVariantId}
                  productId={item.productId}
                  name={item.name}
                  disabled={item.disabled}
                  editionType={item.editionType}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCount={(type) =>
                    onClickCount(item.productVariantId, item.quantity, type)
                  }
                  onClickRemove={() => onClickRemove(item.productVariantId)}
                />
              ))}
            </div>
          </div>
        )}

        {!items.length && (
          <div className="flex flex-col h-full items-center justify-center">
            <Image
              className="mb-4"
              src={IMG.emptyCart}
              alt=""
              width={256}
              height={256}
            />

            <div>
              <div className="text-2xl mb-1 font-bold">Пока тут пусто</div>
              <div>Добавьте игру. Или две!</div>
            </div>
          </div>
        )}

        {!!items.length && (
          <SheetFooter className="bg-white p-8 mt-4">
            <div className="flex mb-4">
              <span className="flex w-full text-lg text-neutral-500">
                Итого
                <div className="w-full border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg whitespace-nowrap">
                {totalAmount || 0} ₽
              </span>
            </div>

            <Link href="/checkout">
              <Button
                className="w-full h-12 text-base cursor-pointer"
                onClick={() => setRedirect(true)}
                loading={redirect}
                type="submit"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
