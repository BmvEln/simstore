import { create } from "zustand";

interface CategoryState {
  activeId: number;
  setActiveId: (id: number) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  activeId: 1,
  setActiveId: (activeId: number) => set({ activeId }),
}));
