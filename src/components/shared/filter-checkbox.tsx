import React from "react";

import { Checkbox } from "@/components/ui/checkbox";

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

function FilterCheckbox({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
}: FilterCheckboxProps) {
  const id = `checkbox-${String(value)}`;

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="rounded-md w-6 h-6"
        id={id}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label htmlFor={id} className="leading-none cursor-pointer flex-1">
        {text}
      </label>
      {endAdornment}
    </div>
  );
}

export default FilterCheckbox;
