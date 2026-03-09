import React from "react";

import { cn } from "@/lib/utils";

import Title from "@/components/shared/title";
import FilterCheckbox from "@/components/shared/filter-checkbox";
import CheckboxFiltersGroup from "./checkbox-filters-group";
import RangeCosts from "./range-costs";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

function Filters({ className }: Props) {
  return (
    <div className={cn("", className)}>
      <Title className="mb-5 font-fold" size="sm" text="Фильтрация" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Платные" value="1" />
        <FilterCheckbox text="Бесплатные" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral py-6 pb-7">
        <RangeCosts />

        <CheckboxFiltersGroup
          title="Особенности"
          className="mt-5"
          limit={4}
          defaultItems={[
            { text: "Мультиплеер", value: "1" },
            { text: "Открытый мир", value: "2" },
            { text: "Режим карьеры", value: "3" },
            { text: "Мультиплеер", value: "4" },
            { text: "Открытый мир", value: "5" },
            { text: "Режим карьеры", value: "6" },
          ]}
          items={[
            { text: "Мультиплеер", value: "1" },
            { text: "Открытый мир", value: "2" },
            { text: "Режим карьеры", value: "3" },
            { text: "Мультиплеер", value: "4" },
            { text: "Открытый мир", value: "5" },
            { text: "Режим карьеры", value: "6" },
          ]}
        />

        {/* Сложность - Для новичков / Профи */}
      </div>
    </div>
  );
}

export default Filters;
