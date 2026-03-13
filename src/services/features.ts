import { Feature } from "../../generated/prisma/client";
import { ApiRoutes } from "./const";
import { instance } from "./instance";

// /api/features
export const getAll = async (): Promise<Feature[]> => {
  const response = await instance.get<Feature[]>(ApiRoutes.FEATURES);

  return response.data;
};
