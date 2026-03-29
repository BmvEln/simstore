"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Product } from "../../../../generated/prisma/client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Title from "../title";

interface Props {
  product: Product;
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
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        <Title text={product.name} />
      </DialogContent>
    </Dialog>
  );
}

export default ChooseProductModal;
