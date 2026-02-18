import { create } from "zustand";

export const useStore = create((set) => ({
  selected: null,
  setSelected: (r) => set({ selected: r }),

  cuisine: "All",
  setCuisine: (c) => set({ cuisine: c }),
}));
