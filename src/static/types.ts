import { Prisma, ProductVariant } from "../../generated/prisma/client";

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

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    variants: true;
    features: true;
  };
}>;
