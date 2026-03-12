import { Product } from "../../generated/prisma/client";
import { ApiRoutes } from "./const";
import { instance } from "./instance";

// /api/products/search?query=...
export const search = async (query: string): Promise<Product[]> => {
  const response = await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: {
      query,
    },
  });
  return response.data;
};
