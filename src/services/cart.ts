import { CartPromise } from "@/static/types";
import { ApiRoutes } from "./const";
import { instance } from "./instance";

// /api/cart
export const getCart = async (): Promise<CartPromise> => {
  return (await instance.get<CartPromise>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (
  productVariantId: number,
  quantity: number,
): Promise<CartPromise> => {
  return (
    await instance.patch<CartPromise>(ApiRoutes.CART, {
      productVariantId,
      quantity,
    })
  ).data;
};

export const removeCartItem = async (
  productVariantId: number,
): Promise<CartPromise> => {
  return (
    await instance.delete<CartPromise>(ApiRoutes.CART, {
      data: { productVariantId },
    })
  ).data;
};

export const addCartItem = async (
  productVariantId: number,
): Promise<CartPromise> => {
  return (
    await instance.post<CartPromise>(ApiRoutes.CART, {
      productVariantId,
    })
  ).data;
};
