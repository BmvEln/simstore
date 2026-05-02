import React from "react";
import Link from "next/link";
import Image from "next/image";

import { IMG } from "@/static/img";
import { ProductCardProps } from "@/static/types";

import Title from "./title";

interface RowInfoProps {
  title: string;
  children: React.ReactNode;
}

const RATING_LIST = [
  "Смешанные",
  "В основном положительные",
  "Очень положительные",
  "Крайне положительные",
];

function RowInfo({ title, children }: RowInfoProps) {
  return (
    <div className="flex gap-2 items-center">
      <div>{title}:</div>

      {children}
    </div>
  );
}

function ProductCard({
  id,
  name,
  desc,
  date,
  developer,
  rating,
  variants,
  className,
}: ProductCardProps) {
  const displayDesc = desc.length > 80 ? desc.slice(0, 80) + "..." : desc;
  const formatDate = (dateStr: Date) => {
    return new Date(dateStr).toLocaleDateString("ru-RU");
  };

  return (
    <div className="flex border rounded-lg overflow-hidden bg-gray-50">
      <Link
        className="cursor-pointer flex items-center"
        href={`/product/${id}`}
      >
        <Image
          src={IMG[`s${String(id).padStart(2, "0")}` as keyof typeof IMG]}
          width={363}
          height={448}
          alt=""
          priority
        />
      </Link>

      <div className="p-3">
        <Title text={name} size="sm" />

        <div className="mb-3">{displayDesc}</div>
        <div className="text-lg">Метки</div>

        <RowInfo title="Дата выпуска">
          <div className="font-bold">{formatDate(date)}</div>
        </RowInfo>

        <RowInfo title="Разработчик">
          <div className="font-bold">{developer}</div>
        </RowInfo>

        <RowInfo title="Отзывы">
          <div className="font-bold">{RATING_LIST[rating - 1]}</div>
        </RowInfo>
        <RowInfo title="Цена">
          <div className="font-bold">от {variants[0].price} руб.</div>
        </RowInfo>
      </div>
    </div>
  );
}

export default ProductCard;
