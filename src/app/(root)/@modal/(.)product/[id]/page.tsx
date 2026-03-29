import React from "react";
import Image from "next/image";

import { notFound } from "next/navigation";
import { IMG } from "@/static/img";
import Title from "@/components/shared/title";
import Container from "@/components/shared/container";
import GroupVariants from "@/components/shared/group-variants";
import { EDITION_NAMES } from "@/static/const";
import { Dialog } from "@/components/ui/dialog";
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
