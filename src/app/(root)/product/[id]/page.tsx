import React from "react";
import Image from "next/image";

import { notFound } from "next/navigation";
import { IMG } from "@/static/img";
import Title from "@/components/shared/title";
import Container from "@/components/shared/container";
import GroupVariants from "@/components/shared/group-variants";
import { EDITION_NAMES } from "@/static/const";

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
        <Image src={IMG.s01} width={363} height={448} alt="" />

        <div className="w-[490px] bg-gray-200 p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <GroupVariants
            selectedValue="3"
            items={product.variants.map((v) => ({
              name: EDITION_NAMES[v.editionType],
              value: v.id.toString(),
            }))}
            // onClick={() => {}}
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
