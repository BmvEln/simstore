"use client";

import React from "react";

import { cn } from "@/lib/utils";

import Title from "@/components/shared/title";
import FilterCheckbox from "@/components/shared/filter-checkbox";
import CheckboxFiltersGroup from "./checkbox-filters-group";
import RangeCosts from "./range-costs";
import { useFilterFeatures } from "@/hooks";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

function Filters({ className }: Props) {
  const features = useFilterFeatures();

  const featuresMap = features.map((f) => ({
    text: f.name,
    value: f.id.toString(),
  }));

  return (
    <div className={cn("", className)}>
      <Title className="mb-5 font-bold" size="sm" text="Фильтрация" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Платные" value="1" />
        <FilterCheckbox text="Бесплатные" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral py-6 pb-7">
        <RangeCosts />

        <CheckboxFiltersGroup
          title="Особенности"
          className="mt-5"
          limit={3}
          defaultItems={featuresMap}
          items={featuresMap}
          loading={!features.length}
          onChange={(values) => {
            console.log(values);
          }}
        />
      </div>
    </div>
  );
}

export default Filters;
