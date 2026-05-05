import React from "react";

import { notFound } from "next/navigation";

import Container from "@/components/shared/container";
import ProductForm from "@/components/shared/product-form";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma?.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      variants: true,
      features: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10 w-[940px]">
      <ProductForm product={product} />
    </Container>
  );
}

export default ProductPage;
