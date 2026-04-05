import { useCallback, useEffect, useState } from "react";

import qs from "qs";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Feature } from "../generated/prisma/client";

import { API } from "./services/api-client";

type UseSetResult = [Set<string>, (id: string) => void];

export function useSet(init: Set<string>): UseSetResult {
  const [selectedIds, setSelectedIds] = useState(init);

  const toggleId = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return [selectedIds, toggleId];
}

type UseFilterFeaturesResult = {
  features: Feature[];
  loading: boolean;
};
export function useFilterFeatures(): UseFilterFeaturesResult {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchFeatures() {
      try {
        const data = await API.features.getAll();
        setFeatures(data);
      } catch (error) {
        console.error("Ошибка при загрузке особенностей:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  return { features, loading };
}

type UseFiltersResult = {
  features: Set<string>;
  editions: Set<string>;
  access: Set<string>;
  priceRange: PriceRangeProps;

  toggleFeature: (id: string) => void;
  toggleEdition: (id: string) => void;
  toggleAccess: (id: string) => void;
  setPriceRange: (range: PriceRangeProps) => void;
};
type PriceRangeProps = {
  from?: number;
  to?: number;
};
function getValueKeyURL(searchParams: ReadonlyURLSearchParams, value: string) {
  return searchParams.has(value) ? searchParams.get(value)?.split(",") : [];
}

export function useFilters(): UseFiltersResult {
  const searchParams = useSearchParams();

  const [selectedFeatures, toggleFeature] = useSet(
    new Set<string>(getValueKeyURL(searchParams, "features")),
  );
  const [selectedEditions, toggleEdition] = useSet(
    new Set<string>(getValueKeyURL(searchParams, "edition")),
  );
  const [selectedAccess, toggleAccess] = useSet(
    new Set<string>(getValueKeyURL(searchParams, "access")),
  );

  const [priceRange, setPriceRange] = useState<PriceRangeProps>({
    from: Number(searchParams.get("from")) || undefined,
    to: Number(searchParams.get("to")) || undefined,
  });

  return {
    features: selectedFeatures,
    editions: selectedEditions,
    access: selectedAccess,
    priceRange,

    toggleFeature,
    toggleEdition,
    toggleAccess,
    setPriceRange,
  };
}

export function useQueryFilters(filters: UseFiltersResult) {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.priceRange,
      edition: Array.from(filters.editions),
      access: Array.from(filters.access),
      features: Array.from(filters.features),
    };

    const qsStr = qs.stringify(params, { arrayFormat: "comma" });
    router.push(`?${qsStr}`, { scroll: false });
  }, [filters]);
}
