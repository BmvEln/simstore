import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

async function ProductPage({ params }: Props) {
  const { id } = await params;

  return <div className="">Product {id && id}</div>;
}

export default ProductPage;
