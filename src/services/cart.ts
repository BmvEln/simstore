import { CartPromise } from "@/static/types";
import { ApiRoutes } from "./const";
import { instance } from "./instance";

// /api/cart
export const getCart = async (): Promise<CartPromise> => {
  return (await instance.get<CartPromise>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (
  id: number,
  quantity: number,
): Promise<CartPromise> => {
  return (
    await instance.patch<CartPromise>(ApiRoutes.CART, {
      id,
      quantity,
    })
  ).data;
};

export const removeCartItem = async (id: number): Promise<CartPromise> => {
  const response = await instance.delete<CartPromise>(ApiRoutes.CART, {
    data: { id },
  });

  return response.data;
};
