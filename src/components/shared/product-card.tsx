import Image from "next/image";
import React from "react";
import Title from "./title";
import Link from "next/link";

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

export interface ProductCardProps {
  id: number;
  name: string;
  desc: string;
  price: number;
  date: string;
  developer: string;
  rating: number;
  imageUrl: string;
  className?: string;
}

function ProductCard({
  id,
  name,
  desc,
  price,
  date,
  developer,
  rating,
  imageUrl,
  className,
}: ProductCardProps) {
  const displayDesc = desc.length > 80 ? desc.slice(0, 80) + "..." : desc;

  return (
    <div className="flex border rounded-lg overflow-hidden">
      <Link className="cursor-pointer" href={`/product/${id}`}>
        <img src={imageUrl} width={363} height={448} alt="" />
      </Link>

      <div className="p-3">
        <Title text={name} size="sm" />

        <div className="mb-3">{displayDesc}</div>
        <div className="text-lg">Метки</div>

        <RowInfo title="Дата выпуска">
          <div className="font-bold">{date}</div>
        </RowInfo>

        <RowInfo title="Разработчик">
          <div className="font-bold">{developer}</div>
        </RowInfo>

        <RowInfo title="Отзывы">
          <div className="font-bold">{RATING_LIST[rating]}</div>
        </RowInfo>
        <RowInfo title="Цена">
          <div className="font-bold">{price} руб.</div>
        </RowInfo>
      </div>
    </div>
  );
}

export default ProductCard;
