import React from "react";

import { notFound } from "next/navigation";
import ChooseProductModal from "@/components/shared/modals/choose-product-modal";

type ProductModalPage = {
  params: Promise<{ id: string }>;
};

async function ProductModalPage({ params }: ProductModalPage) {
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

  return <ChooseProductModal product={product} />;
}

export default ProductModalPage;
