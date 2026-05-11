"use client";

import { ReactNode, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

import { IMG } from "@/static/img";
import { WIDTH_CONTAINER } from "../layout";
import { EDITION_NAMES } from "@/static/const";

import { useCartStore } from "@/store/cart";
import { getNewQuantity } from "@/functions/get-new-quantity";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import Title from "@/components/shared/title";
import Container from "@/components/shared/container";
import ButtonCount from "@/components/shared/button-quantity";

const ITEMS_DETAILS = {
  cost: {
    name: "Стоимость товаров",
    img: "box",
  },
  taxes: {
    name: "Налоги",
    img: "percent",
  },
  delivery: {
    name: "Доставка",
    img: "truck",
  },
};

function CPanel({
  className,
  header,
  children,
}: {
  className?: string;
  header: ReactNode | string;
  children: ReactNode;
}) {
  return (
    <div className={cn("bg-white p-4 rounded-2xl w-full h-fit", className)}>
      <div className="text-xl font-bold mb-5">{header}</div>

      <div>{children}</div>
    </div>
  );
}

function CItemDetails({ type, value }: { type: string; value: number }) {
  return (
    <div className="flex">
      <span className="flex w-full text-lg text-neutral-500">
        <div className="flex gap-2">
          <Image
            src={
              IMG[
                ITEMS_DETAILS[type as keyof typeof ITEMS_DETAILS]
                  .img as keyof typeof IMG
              ]
            }
            width={20}
            height={20}
            alt=""
          />
          <span className="whitespace-nowrap">
            {ITEMS_DETAILS[type as keyof typeof ITEMS_DETAILS].name}:
          </span>
        </div>
        <div className="w-full border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>

      <span className="font-bold text-lg whitespace-nowrap">{value} ₽</span>
    </div>
  );
}

// TODO: Сделать хук useCart, где будет хук useCartStore (и useEffect) и вспомогательные функции
//        Вставить этот хук также нужно будет в корзину
export default function Checkout() {
  const {
    items,
    loading,
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
    <Container className={`mt-10 pb-10 w-[${WIDTH_CONTAINER}]`}>
      <Title
        text="Оформление заказа"
        size="lg"
        className="font-extrabold mb-8"
      />

      <div className="flex gap-6">
        <div className="flex w-[650px] flex-col gap-6 shrink-0">
          <CPanel
            header={
              <div className="flex items-center justify-between">
                <div>1. Корзина</div>
                <div className="cursor-pointer text-xs text-gray-400 font-normal">
                  Очистить корзину
                </div>
              </div>
            }
          >
            <div className="flex flex-col gap-4">
              {loading &&
                [...new Array(1)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-[120px]  w-full rounded-md"
                  />
                ))}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Image
                      className="rounded-md mr-4"
                      src={
                        IMG[
                          `s${String(item.productId).padStart(2, "0")}` as keyof typeof IMG
                        ]
                      }
                      width={100}
                      height={100}
                      alt=""
                    />

                    <div>
                      <div className="text-lg font-bold">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {
                          EDITION_NAMES[
                            item.editionType as keyof typeof EDITION_NAMES
                          ].name
                        }
                      </div>
                    </div>
                  </div>

                  <div className="text-lg font-bold">{item.price} ₽</div>

                  <ButtonCount
                    quantity={item.quantity}
                    onClick={(type) =>
                      onClickCount(item.productVariantId, item.quantity, type)
                    }
                  />

                  <Trash
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => onClickRemove(item.productVariantId)}
                  />
                </div>
              ))}
            </div>
          </CPanel>

          <CPanel header="2. Персольная информация">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" placeholder="Имя" />
              <Input name="lastName" placeholder="Фамилия" />
              <Input name="email" placeholder="E-mail" />
              <Input name="phone" placeholder="Телефон" />
            </div>
          </CPanel>

          <CPanel header="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="address" placeholder="Адрес доставки" />

              <Textarea
                className="text-base"
                rows={5}
                placeholder="Комментарий к заказу"
              />
            </div>
          </CPanel>
        </div>

        <CPanel
          className="p-6 w-[400px]"
          header={
            <>
              <div className="font-semibold text-base">Итого:</div>
              <div className="text-2xl font-bold mb-8">{totalAmount} ₽</div>
            </>
          }
        >
          <div className="flex flex-col gap-4 mb-4">
            {["cost", "taxes", "delivery"].map((type, i) => (
              <CItemDetails key={i} type={type} value={totalAmount} />
            ))}
          </div>

          <Button className="w-full h-14 text-base" type="submit">
            <span>Перейти к оплате</span>
            <Image src={IMG.arrowRightWhite} width={16} height={16} alt="" />
          </Button>
        </CPanel>
      </div>
    </Container>
  );
}
