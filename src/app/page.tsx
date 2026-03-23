import { prisma } from "@/lib/prisma";

import Title from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import Filters from "@/components/shared/filters";
import Container from "@/components/shared/container";
import ProductGroup from "@/components/shared/product-group-list";

async function getCategoriesWithProducts() {
  return await prisma?.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          features: true,
        },
      },
    },
  });
}

export default async function Home() {
  const categories = await getCategoriesWithProducts();

  return (
    <>
      <Container className="mt-10">
        <Title text="Все симуляторы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((c) => c.products.length > 0)} />

      <Container className="mt-10 pb14">
        <div className="flex gap-16">
          <div className="w-[250px] shrink-0">
            <Filters />
          </div>

          <div className="flex gap-8 w-full flex-col">
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductGroup
                    key={category.id}
                    title={category.name}
                    items={category.products}
                    categoryId={category.id}
                  />
                ),
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
