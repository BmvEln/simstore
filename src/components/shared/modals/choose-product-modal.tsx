"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { ProductWithRelations } from "@/static/types";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { useCartStore } from "@/store/cart";
import { useNotificationStore } from "@/store/notification";

import ChooseProductForm from "../choose-product-form";

interface Props {
  product: ProductWithRelations;
}

function ChooseProductModal({ product }: Props) {
  const router = useRouter();

  const { loading, addCartItem } = useCartStore((state) => state);
  const { showNotification } = useNotificationStore((state) => state);

  const addCartItemHandler = useCallback(
    async (productVariantId: number) => {
      try {
        await addCartItem(productVariantId);
        showNotification("Продукт добавлен в корзину", 2);
        router.back();
      } catch (error) {
        showNotification("Продукт НЕ был добавлен в корзину", 1);
      }
    },
    [addCartItem],
  );

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogTitle />
      <DialogContent className="p-0 lg:max-w-[940px] lg:w-[940px] min-h-[434px] overflow-hidden border-0">
        <ChooseProductForm
          key={product.id}
          id={product.id}
          loading={loading}
          name={product.name}
          desc={product.desc}
          variants={product.variants}
          features={product.features}
          onClickAdd={(productVariantId) =>
            addCartItemHandler(productVariantId)
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default ChooseProductModal;
