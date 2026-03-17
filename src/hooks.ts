import { useCallback, useEffect, useState } from "react";

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
  selectedFeatures: Set<string>;
  toggleId: (id: string) => void;
};

export function useFilterFeatures(): UseFilterFeaturesResult {
  const [features, setFeatures] = useState<Feature[]>([]);

  const [selectedFeatures, toggleId] = useSet(new Set<string>());

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const data = await API.features.getAll();
        setFeatures(data);
      } catch (error) {
        console.error("Ошибка при загрузке особенностей:", error);
      }
    }

    fetchFeatures();
  }, []);

  return { features, selectedFeatures, toggleId };
}
