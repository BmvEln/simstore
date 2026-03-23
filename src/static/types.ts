import { ProductVariant } from "../../generated/prisma/client";

export type ProductCardProps = {
  id: number;
  name: string;
  desc: string;
  date: Date;
  variants: ProductVariant[];
  developer: string;
  rating: number;
  className?: string;
};
