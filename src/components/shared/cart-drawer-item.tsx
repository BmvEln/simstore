"use client";

import React from "react";
import Image from "next/image";

import { Trash } from "lucide-react";

import { IMG } from "@/static/img";
import { EDITION_NAMES } from "@/static/const";

import ButtonCount from "./button-quantity";

interface Props {
  productId: number;
  name: string;
  editionType: number;
  price: number;
  quantity: number;
  onClickCount: (type: "plus" | "minus") => void;
  onClickRemove: () => void;
  disabled?: boolean;
}

function CartDrawerItem({
  productId,
  name,
  editionType,
  price,
  quantity,
  onClickCount,
  onClickRemove,
  disabled,
}: Props) {
  // TODO: Использовать при удалении товара
  console.log(disabled);

  return (
    <div className="bg-white px-4 py-3">
      <div className="relative flex gap-4 items-center bg-amber-50 border rounded-md">
        <Image
          className="rounded-l-md"
          src={
            IMG[`s${String(productId).padStart(2, "0")}` as keyof typeof IMG]
          }
          width={100}
          height={100}
          alt=""
        />

        <div className="flex flex-col w-full items-left justify-between">
          <div className="text-lg font-bold">{name}</div>

          <div className="text-xs text-gray-400">
            {EDITION_NAMES[editionType as keyof typeof EDITION_NAMES].name}
          </div>
        </div>

        <Trash
          className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
          onClick={onClickRemove}
        />
      </div>

      <div className="w-full border-b border-b-neutral-200 relative my-4" />

      <div className="flex justify-between">
        <div>{price} ₽</div>

        <ButtonCount quantity={quantity} onClick={onClickCount} />
      </div>
    </div>
  );
}

export default CartDrawerItem;
