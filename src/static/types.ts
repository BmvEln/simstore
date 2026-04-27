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
    quantity: number;
    productVariant: ProductVariant & {
      product: Product;
    };
  }[];
}

export type CartStateItem = {
  productVariantId: number;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  editionType: number;
};

// 1 - error, 2 - success, 3 - info
export type NotificationStatuses = 1 | 2 | 3;
