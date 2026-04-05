"use client";

import React, { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import { ProductCardProps } from "@/static/types";

import { useCategoryStore } from "../../store/category";

import ProductCard from "./product-card";

import Title from "./title";

type Item = ProductCardProps;

interface Props {
  className?: string;
  title: string;
  items: Item[];
  categoryId: number;
}

function ProductGroup({ title, items, categoryId, className }: Props) {
  const setCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.7,
    },
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, title, categoryId]);

  return (
    <div id={title} ref={intersectionRef}>
      <div>
        <Title text={title} size="lg" className="font-extrabold mb-5" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {items.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ProductGroup;
