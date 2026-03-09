import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

function FilterCheckbox({ className }: Props) {
  return <div className={cn("", className)}></div>;
}

export default FilterCheckbox;
