import React from "react";

import { cn } from "@/lib/utils";
import Categories from "@/components/shared/categories";
import SortPopup from "@/components/shared/sort-popup";
import Container from "@/components/shared/container";
import { Category } from "../../../generated/prisma/client";

interface Props {
  className?: string;
  categories: Category[];
  children?: React.ReactNode;
}

function TopBar({ categories, className }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className,
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
}

export default TopBar;
