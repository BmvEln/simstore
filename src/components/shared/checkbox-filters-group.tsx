"use client";

import React, { useCallback, useState } from "react";

import FilterCheckbox, {
  FilterCheckboxProps,
} from "@/components/shared/filter-checkbox";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  loading: boolean;
  onClickCheckbox: (id: string) => void;
  defaultValue?: string[];
  selectedValues: Set<string>;
  name?: string;
  className?: string;
}

function CheckboxFiltersGroup({
  title,
  items,
  limit = 4,
  searchInputPlaceholder = "Поиск...",
  loading,
  onClickCheckbox,
  defaultValue,
  selectedValues,
  name = "",
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

  if (loading) {
    return (
      <div className={className}>
        <div className="font-bold mb-3">{title}</div>

        <div className="flex flex-col gap-4">
          {[...new Array(limit)].map((_, idx) => (
            <Skeleton key={idx} className="h-6  w-full rounded-md" />
          ))}
        </div>
        <Skeleton className="h-6 w-1/2 mt-3 rounded-md" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : items.slice(0, limit);

  return (
    <div className={className}>
      <div className="font-bold mb-3">{title}</div>

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
        {list.length > 0 ? (
          list.map((item, idx) => (
            <FilterCheckbox
              key={idx}
              name={name}
              checked={selectedValues.has(item.value)}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              onCheckedChange={() => onClickCheckbox(item.value)}
            />
          ))
        ) : (
          <div className="text-gray-500">Особенности не найдены</div>
        )}
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
