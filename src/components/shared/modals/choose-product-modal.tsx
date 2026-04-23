"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { ProductWithRelations } from "@/static/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ChooseProductForm from "../choose-product-form";
import { useCartStore } from "@/store/cart";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

function ChooseProductModal({ className, product }: Props) {
  const router = useRouter();

  const { addCartItem } = useCartStore((state) => state);

  const addCartItemHandler = useCallback(
    (productVariantId: number) => {
      addCartItem(productVariantId);
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
      <DialogContent className="p-0 lg:max-w-[940px] lg:w-[940px] min-h-[434px] bg-white overflow-hidden border-0">
        <ChooseProductForm
          key={product.id}
          id={product.id}
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
