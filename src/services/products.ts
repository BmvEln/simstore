import { ApiRoutes } from "./const";
import { instance } from "./instance";
import { Product } from "../../generated/prisma/client";

// /api/products/search?query=...
export const search = async (query: string): Promise<Product[]> => {
  const response = await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: {
      query,
    },
  });
  return response.data;
};

// /api/products
export const getAll = async (): Promise<Product[]> => {
  const response = await instance.get<Product[]>(ApiRoutes.PRODUCTS);

  return response.data;
};
