"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ProductWithRelations } from "@/static/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChooseProductForm from "../choose-product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

function ChooseProductModal({ className, product }: Props) {
  const router = useRouter();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="p-0 lg:max-w-[940px] lg:w-[940px] min-h-[434px] bg-white overflow-hidden border-0">
        <ChooseProductForm
          id={product.id}
          name={product.name}
          desc={product.desc}
          variants={product.variants}
          features={product.features}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ChooseProductModal;
