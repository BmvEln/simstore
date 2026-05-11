import React from "react";

import { cn } from "@/lib/utils";

type ButtonQuantityProps = {
  content: string;
  quantity?: number;
  onClick: () => void;
};
function ButtonQuantity({ content, quantity, onClick }: ButtonQuantityProps) {
  const locked = typeof quantity !== "undefined" && quantity === 1;

  return (
    <div
      onClick={() => (locked ? {} : onClick())}
      className={cn(
        "flex text-xl items-center justify-center border rounded-[4px] w-6 h-6 cursor-pointer hover:bg-neutral-100 transition-all duration-200",
        locked && "text-neutral-300 pointer-events-none",
      )}
    >
      {content}
    </div>
  );
}

interface Props {
  quantity?: number;
  onClick: (type: "plus" | "minus") => void;
}

function ButtonCount({ quantity, onClick }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <ButtonQuantity
        content="-"
        quantity={quantity}
        onClick={() => onClick("minus")}
      />
      {quantity}
      <ButtonQuantity content="+" onClick={() => onClick("plus")} />
    </div>
  );
}

export default ButtonCount;
