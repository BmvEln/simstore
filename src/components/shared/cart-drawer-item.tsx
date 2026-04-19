"use client";

import React from "react";
import Image from "next/image";

import { IMG } from "@/static/img";

import { EDITION_NAMES } from "@/static/const";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

type ButtonQuantityProps = {
  content: string;
  quantity?: number;
  onClick: () => void;
};
function ButtonQuantity({ content, quantity, onClick }: ButtonQuantityProps) {
  const locked = typeof quantity !== "undefined" && quantity === 1;

  return (
    <div
      onClick={() => (locked ? {} : onClick())}
      className={cn(
        "flex text-xl items-center justify-center border rounded-[4px] w-6 h-6 cursor-pointer hover:bg-neutral-100 transition-all duration-200",
        locked && "text-neutral-300 pointer-events-none",
      )}
    >
      {content}
    </div>
  );
}

interface Props {
  name: string;
  editionType: number;
  price: number;
  quantity: number;
  onClickCount: (type: "plus" | "minus") => void;
  onClickRemove: () => void;
}

function CartDrawerItem({
  name,
  editionType,
  price,
  quantity,
  onClickCount,
  onClickRemove,
}: Props) {
  return (
    <div className="bg-white px-4 py-3">
      <div className="relative flex gap-4 items-center">
        <Image
          src={IMG[`s${String("1").padStart(2, "0")}` as keyof typeof IMG]}
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
        <div className="flex gap-2 items-center">
          <ButtonQuantity
            content="-"
            quantity={quantity}
            onClick={() => onClickCount("minus")}
          />
          {quantity}
          <ButtonQuantity content="+" onClick={() => onClickCount("plus")} />
        </div>
      </div>
    </div>
  );
}

export default CartDrawerItem;
