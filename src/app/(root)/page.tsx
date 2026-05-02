import { Suspense } from "react";

import { GetSearchParams } from "@/static/types";

import { findProducts } from "@/functions/find-products";

import Title from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import Filters from "@/components/shared/filters";
import Container from "@/components/shared/container";
import ProductGroup from "@/components/shared/product-group-list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const resolvedParams = await searchParams;
  const categories = await findProducts(resolvedParams);

  console.log(categories);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все симуляторы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((c) => c.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-16">
          <div className="w-[250px] shrink-0">
            <Suspense>
              <Filters />
            </Suspense>
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
