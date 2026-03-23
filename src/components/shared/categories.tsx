"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Category } from "../../../generated/prisma/client";

import { useCategoryStore } from "@/store/category";

interface Props {
  items: Category[];
  className?: string;
}

function Categories({ items, className }: Props) {
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map(({ id, name }) => (
        <Link
          key={id}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeId === id && "bg-white shadow-md shadow-gray-200",
          )}
        >
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
