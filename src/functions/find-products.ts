import { prisma } from "@/lib/prisma";

import { GetSearchParams } from "@/static/types";

const DEFAULT_MIN_PRICE = 0,
  DEFAULT_MAX_PRICE = 5000;

export async function findProducts(params: GetSearchParams) {
  const editionsArr = params.edition?.split(",").map(Number);
  const ratingArr = params.rating?.split(",").map(Number);
  const featuresArr = params.features?.split(",").map(Number);

  const minPrice = Number(params.from) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.to) || DEFAULT_MAX_PRICE;

  console.log(featuresArr);

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          features: featuresArr
            ? {
                some: {
                  id: {
                    in: featuresArr,
                  },
                },
              }
            : undefined,
          AND: [
            editionsArr
              ? { variants: { some: { editionType: { in: editionsArr } } } }
              : {},
            { variants: { some: { price: { gte: minPrice, lte: maxPrice } } } },
          ],
          rating: ratingArr ? { in: ratingArr } : undefined,
        },

        include: {
          variants: {
            where: { price: { gte: minPrice, lte: maxPrice } },
            orderBy: {
              price: "asc",
            },
          },
          features: true,
        },
      },
    },
  });

  return categories;
}
