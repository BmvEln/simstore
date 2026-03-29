"use client";

import React from "react";

import { cn } from "@/lib/utils";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

type GroupVariantsProps = {
  items: readonly Variant[];
  onClick: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  className?: string;
};

function GroupVariants({
  items,
  onClick,
  selectedValue,
  className,
}: GroupVariantsProps) {
  return (
    <div className="flex justify-between bg-white p-1 select-none">
      {items.map((item) => (
        <button
          className={cn(
            "flex items-center justify-center h-[30px] px5 w-full rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            },
          )}
          key={item.id}
          onClick={() => onClick(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default GroupVariants;
