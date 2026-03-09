"use client";

import React, { useCallback, useState } from "react";

import FilterCheckbox, { FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

function CheckboxFiltersGroup({
  title,
  items,
  defaultItems,
  limit = 4,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  const calcItems = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : defaultItems.slice(0, 4);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            value={searchValue}
            onChange={onChangeSearch}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {calcItems.map((item, idx) => (
          <FilterCheckbox
            key={idx}
            checked={false}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            onCheckedChange={(v) => console.log(v)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className="font-bold mt-3" onClick={() => setShowAll(!showAll)}>
          Показать {showAll ? "меньше -" : "ещё +"}
        </div>
      )}
    </div>
  );
}

export default CheckboxFiltersGroup;
