import { useEffect, useState } from "react";

import { Feature } from "../generated/prisma/client";

import { API } from "./services/api-client";

type UseFilterFeaturesResult = Feature[];

export function useFilterFeatures(): UseFilterFeaturesResult {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const data = await API.features.getAll();
        setFeatures(data);
      } catch (error) {
        console.error("Ошибка при загрузке особенностей:", error);
      } finally {
      }
    }

    fetchFeatures();
  }, []);

  return features;
}
