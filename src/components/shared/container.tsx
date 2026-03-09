import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

function Container({ className, children }: Props) {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
}

export default Container;
