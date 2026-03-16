"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { useFilterFeatures } from "@/hooks";

import Title from "@/components/shared/title";
import FilterCheckbox from "@/components/shared/filter-checkbox";

import RangeCosts from "./range-costs";
import CheckboxFiltersGroup from "./checkbox-filters-group";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface PriceRangeProps {
  from: number;
  to: number;
}

function Filters({ className }: Props) {
  const { features, selectedIds, toggleId } = useFilterFeatures();
  const [priceRange, setPriceRange] = useState<PriceRangeProps>({
    from: 0,
    to: 5000,
  });

  const featuresMap = features.map((f) => ({
    text: f.name,
    value: f.id.toString(),
  }));

  return (
    <div className={cn("", className)}>
      <Title className="mb-5 font-bold" size="sm" text="Фильтрация" />

      <div className="flex flex-col gap-4">
        {["Платные", "Бесплатные"].map((text, i) => (
          <FilterCheckbox name="123" text={text} value={String(i + 1)} />
        ))}
      </div>

      <div className="mt-5 border-y border-y-neutral py-6 pb-7">
        <RangeCosts priceRange={priceRange} setPriceRange={setPriceRange} />

        <CheckboxFiltersGroup
          name="features"
          title="Особенности"
          className="mt-5"
          limit={2}
          items={featuresMap}
          loading={!features.length}
          onClickCheckbox={toggleId}
          selectedValues={selectedIds}
        />
      </div>
    </div>
  );
}

export default Filters;
