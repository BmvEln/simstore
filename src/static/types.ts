import {
  Cart,
  Prisma,
  Product,
  ProductVariant,
} from "../../generated/prisma/client";

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

export interface CartPromise extends Cart {
  items: {
    productVariant: ProductVariant & {
      product: Product;
    };
  }[];
}

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  editionType: number;
};
