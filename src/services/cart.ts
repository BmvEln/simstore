import { CartPromise } from "@/static/types";
import { ApiRoutes } from "./const";
import { instance } from "./instance";

// /api/cart
export const getCart = async (): Promise<CartPromise> => {
  const response = await instance.get<CartPromise>(ApiRoutes.CART);

  return response.data;
};

export const updateItemQuantity = async (
  id: number,
  quantity: number,
): Promise<CartPromise> => {
  const response = await instance.patch<CartPromise>(ApiRoutes.CART, {
    id,
    quantity,
  });

  return response.data;
};
