"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { useCategoryStore } from "@/store/category";
import Link from "next/link";

interface Props {
  className?: string;
}

const CATEGORIES = [
  { id: 1, name: "Транспортные" },
  { id: 2, name: "Спортивные" },
  { id: 3, name: "Военные" },
  { id: 4, name: "Экономические" },
];

function Categories({ className }: Props) {
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {CATEGORIES.map(({ id, name }) => (
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
