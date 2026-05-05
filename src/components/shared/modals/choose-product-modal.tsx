"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ProductWithRelations } from "@/static/types";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import ProductForm from "../product-form";

type ChooseProductModalProps = {
  product: ProductWithRelations;
};

function ChooseProductModal({ product }: ChooseProductModalProps) {
  const router = useRouter();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogTitle />
      <DialogContent className="p-0 lg:max-w-[940px] lg:w-[940px] min-h-[434px] overflow-hidden border-0">
        <ProductForm onSubmitSuccess={() => router.back()} product={product} />
      </DialogContent>
    </Dialog>
  );
}

export default ChooseProductModal;
