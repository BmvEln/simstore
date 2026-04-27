"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";

import { ProductVariant, Feature } from "../../../generated/prisma/client";

import { cn } from "@/lib/utils";

import { IMG } from "@/static/img";
import { EDITION_NAMES } from "@/static/const";

import Title from "./title";
import { Button } from "../ui";
import GroupVariants from "./group-variants";

type ChooseProductForm = {
  id: number;
  name: string;
  desc: string;
  loading: boolean;
  variants: ProductVariant[];
  features: Feature[];
  onClickAdd: (productVariantId: number) => void;
  className?: string;
};

function ChooseProductForm({
  id,
  name,
  desc,
  loading,
  variants,
  features,
  onClickAdd,
  className,
}: ChooseProductForm) {
  const [editionType, setEditionType] = useState<number>(1);

  const items = Object.values(EDITION_NAMES).map(({ name, desc }, i) => ({
    name,
    value: variants[i]?.editionType.toString(),
    tip: desc,
    disabled: !variants[i],
  }));

  const onClickHandler = useCallback(() => {
    onClickAdd(variants[editionType - 1].id);
  }, [variants, editionType]);

  return (
    <div className={cn("flex", className)}>
      <Image
        src={IMG[`s${String(id).padStart(2, "0")}` as keyof typeof IMG]}
        width={363}
        height={448}
        alt=""
      />

      <div className="w-[890px] bg-[#fcfcfc] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <div className="text-gray-400 mb-3">{desc}</div>

        <div className="text-lg font-medium">Особенности:</div>
        <div className="text-gray-400 mb-6">
          {features.map((f, i) => (
            <span>
              {f.name}
              {i < features.length - 1 && ", "}
            </span>
          ))}
        </div>

        <div className="text-lg font-medium mb-3">Выберите издание:</div>

        <GroupVariants
          className="mb-5"
          value={String(editionType)}
          items={items}
          onClick={(v) => setEditionType(Number(v))}
        />

        <Button
          onClick={onClickHandler}
          loading={loading}
          className="h-[55px] w-[322px] px-10 text-base rounded-[18px] cursor-pointer"
        >
          Добавить в корзину за {variants[editionType - 1].price} руб.
        </Button>
      </div>
    </div>
  );
}

export default ChooseProductForm;
