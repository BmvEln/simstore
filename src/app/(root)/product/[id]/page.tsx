// "use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { IMG } from "@/static/img";
import { EDITION_NAMES } from "@/static/const";

import Title from "@/components/shared/title";
import Container from "@/components/shared/container";
import GroupVariants from "@/components/shared/group-variants";

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
    <Container className="flex flex-col my-10">
      <div className="flex gap-30">
        <Image
          src={IMG[`s${String(id).padStart(2, "0")}` as keyof typeof IMG]}
          width={363}
          height={448}
          alt=""
        />

        <div className="w-[490px] bg-gray-200 p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          {/* TODO: Доделать отображение */}
          {/* <GroupVariants
            value={String(editionType)}
            items={product.variants.map((v) => ({
              name: EDITION_NAMES[v.editionType as keyof typeof EDITION_NAMES]
                .name,
              value: v.editionType.toString(),
              tip: EDITION_NAMES[v.editionType as keyof typeof EDITION_NAMES]
                .desc,
            }))}
            onClick={(v) => setEditionType(Number(v))}
          /> */}
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
