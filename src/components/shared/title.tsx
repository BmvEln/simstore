import React from "react";

import { clsx } from "clsx";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  className?: string;
  text: string;
  size?: TitleSize;
}

const TAG_BY_SIZE = {
  xs: "h5",
  sm: "h4",
  md: "h3",
  lg: "h2",
  xl: "h1",
  "2xl": "h1",
} as const;

const CLASS_NAME_BY_SIZE = {
  xs: "text-[16px]",
  sm: "text-[22px]",
  md: "text-[26px]",
  lg: "text-[32px]",
  xl: "text-[40px]",
  "2xl": "text-[48px]",
} as const;

function Title({ className, text, size = "sm" }: Props) {
  return React.createElement(
    TAG_BY_SIZE[size],
    {
      className: clsx(CLASS_NAME_BY_SIZE[size], className),
    },
    text,
  );
}

export default Title;
