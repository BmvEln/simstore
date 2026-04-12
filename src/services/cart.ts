import { CartPromise } from "@/static/types";
import { ApiRoutes } from "./const";
import { instance } from "./instance";

// /api/cart
export const fetchCart = async (): Promise<CartPromise> => {
  const response = await instance.get<CartPromise>(ApiRoutes.CART);

  return response.data;
};
