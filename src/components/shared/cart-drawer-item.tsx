import React from "react";
import Image from "next/image";

import { IMG } from "@/static/img";
import { EDITION_NAMES } from "@/static/const";

interface Props {
  name: string;
  editionType: number;
  price: number;
  quantity: number;
}

function CartDrawerItem({ name, editionType, price, quantity }: Props) {
  return (
    <div className="bg-white px-4 py-3">
      <div className="flex gap-4 items-center">
        <Image
          src={IMG[`s${String("1").padStart(2, "0")}` as keyof typeof IMG]}
          width={100}
          height={100}
          alt=""
        />

        <div className="flex flex-col items-center justify-between">
          <div className="text-lg font-bold">{name}</div>

          <div className="text-xs text-gray-400">
            {EDITION_NAMES[editionType as keyof typeof EDITION_NAMES].name}
          </div>
        </div>
      </div>

      <div className="w-full border-b border-b-neutral-200 relative my-4" />

      <div className="flex justify-between">
        <div>{price} ₽</div>
        <div>- {quantity} +</div>
      </div>
    </div>
  );
}

export default CartDrawerItem;
