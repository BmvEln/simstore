import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

function Template({ className }: Props) {
  return <div className={cn("", className)}></div>;
}

export default Template;
