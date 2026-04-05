"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

type Variant = {
  name: string;
  value: string;
  tip: string;
  disabled?: boolean;
};

type GroupVariantsProps = {
  items: readonly Variant[];
  onClick: (value: Variant["value"]) => void;
  value?: Variant["value"];
  className?: string;
};

function GroupVariants({
  items,
  onClick,
  value,
  className,
}: GroupVariantsProps) {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#f3f3f7] p-1 select-none rounded-3xl overflow-hidden",
        className,
      )}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => onClick(item.value)}
          className={cn(
            "flex gap-1 items-center justify-center h-[30px] px-5 w-full rounded-3xl transition-all duration-400 text-sm font-semibold",
            {
              "bg-white shadow-[0px_6px_20px_#06053230]": item.value === value,
              "cursor-pointer": item.value !== value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            },
          )}
        >
          <div>{item.name}</div>

          {item.tip && (
            <Tooltip>
              <TooltipTrigger render={<Info className="w-4 h-4" />} />
              <TooltipContent>{item.tip}</TooltipContent>
            </Tooltip>
          )}
        </button>
      ))}
    </div>
  );
}

export default GroupVariants;
