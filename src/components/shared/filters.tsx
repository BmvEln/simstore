"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { useFilterFeatures, useFilters, useQueryFilters } from "@/hooks";

import { EDITION_NAMES } from "@/static/const";

import Title from "@/components/shared/title";

import RangeCosts from "./range-costs";
import CheckboxFiltersGroup from "./checkbox-filters-group";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

function Filters({ className }: Props) {
  const { features, loading } = useFilterFeatures();

  const filters = useFilters();

  useQueryFilters(filters);

  const featuresMap = features.map((f) => ({
    text: f.name,
    value: f.id.toString(),
  }));

  console.log(1);

  return (
    <div className={cn("", className)}>
      <Title className="mb-5 font-bold" size="sm" text="Фильтрация" />

      <CheckboxFiltersGroup
        name="edition"
        title="Тип издания"
        className="mb-5"
        items={Object.entries(EDITION_NAMES).map(([k, v]) => ({
          text: v.name,
          value: String(k),
        }))}
        onClickCheckbox={filters.toggleEdition}
        selectedValues={filters.editions}
      />

      <CheckboxFiltersGroup
        name="rating"
        title="По рейтингу"
        className="mb-5"
        items={[{ text: "Высокий", value: "3,4" }]}
        onClickCheckbox={filters.toggleRating}
        selectedValues={filters.rating}
      />

      <div className="mt-5 border-y border-y-neutral py-6 pb-7">
        <RangeCosts
          priceRange={filters.priceRange}
          setPriceRange={filters.setPriceRange}
        />

        <CheckboxFiltersGroup
          name="features"
          title="Особенности"
          className="mt-5"
          limit={2}
          items={featuresMap}
          loading={loading}
          onClickCheckbox={filters.toggleFeature}
          selectedValues={filters.features}
        />
      </div>
    </div>
  );
}

export default Filters;
