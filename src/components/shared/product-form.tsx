"use client";

import React, { useCallback } from "react";

import { ProductWithRelations } from "@/static/types";

import { useCartStore } from "@/store/cart";
import { useNotificationStore } from "@/store/notification";

import ChooseProductForm from "./choose-product-form";

type ProductFormProps = {
  product: ProductWithRelations;
  onSubmitSuccess?: VoidFunction;
};

function ProductForm({ product, onSubmitSuccess }: ProductFormProps) {
  const { loading, addCartItem } = useCartStore((state) => state);
  const { showNotification } = useNotificationStore((state) => state);

  const addCartItemHandler = useCallback(
    async (productVariantId: number) => {
      try {
        await addCartItem(productVariantId);
        showNotification("Продукт добавлен в корзину", 2);

        onSubmitSuccess?.();
      } catch (error) {
        showNotification("Продукт НЕ был добавлен в корзину", 1);
      }
    },
    [addCartItem],
  );

  return (
    <ChooseProductForm
      key={product.id}
      id={product.id}
      loading={loading}
      name={product.name}
      desc={product.desc}
      variants={product.variants}
      features={product.features}
      onClickAdd={(productVariantId) => addCartItemHandler(productVariantId)}
    />
  );
}

export default ProductForm;
