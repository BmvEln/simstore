"use client";

import React, { use, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useFilterFeatures, useSet } from "@/hooks";

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
  const { features, selectedFeatures, toggleId } = useFilterFeatures();
  const [selectedEditions, toggleEdition] = useSet(new Set<string>());
  const [selectedAccess, toggleAccess] = useSet(new Set<string>());

  const [priceRange, setPriceRange] = useState<PriceRangeProps>({
    from: 0,
    to: 5000,
  });

  const featuresMap = features.map((f) => ({
    text: f.name,
    value: f.id.toString(),
  }));

  useEffect(() => {
    console.log(selectedFeatures, selectedEditions, selectedAccess, priceRange);
  }, [selectedFeatures, selectedEditions, selectedAccess, priceRange]);

  return (
    <div className={cn("", className)}>
      <Title className="mb-5 font-bold" size="sm" text="Фильтрация" />

      <CheckboxFiltersGroup
        name="edition"
        title="Тип издания"
        className="mb-5"
        items={[
          { text: "Standard", value: "1" },
          { text: "Deluxe", value: "2" },
          { text: "Ultimate", value: "3" },
        ]}
        onClickCheckbox={toggleEdition}
        selectedValues={selectedEditions}
      />

      <CheckboxFiltersGroup
        name="access"
        title="Тип доступа"
        className="mb-5"
        items={[
          { text: "Платные", value: "1" },
          { text: "Бесплатные", value: "2" },
        ]}
        onClickCheckbox={toggleAccess}
        selectedValues={selectedAccess}
      />

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
          selectedValues={selectedFeatures}
        />
      </div>
    </div>
  );
}

export default Filters;
