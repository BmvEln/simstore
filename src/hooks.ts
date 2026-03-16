import { useCallback, useEffect, useState } from "react";

import { Feature } from "../generated/prisma/client";

import { API } from "./services/api-client";

type UseFilterFeaturesResult = {
  features: Feature[];
  selectedIds: Set<string>;
  toggleId: (id: string) => void;
};

export function useFilterFeatures(): UseFilterFeaturesResult {
  const [features, setFeatures] = useState<Feature[]>([]);

  const [selectedIds, setSelectedIds] = useState(new Set<string>());

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

  return { features, selectedIds, toggleId };
}
