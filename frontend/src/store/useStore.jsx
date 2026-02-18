import { create } from "zustand";

export const useStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("fav")) || [],

  toggleFavorite: (recipe) =>
    set((state) => {
      let updated;

      if (state.favorites.find((r) => r.id === recipe.id)) {
        updated = state.favorites.filter((r) => r.id !== recipe.id);
      } else {
        updated = [...state.favorites, recipe];
      }

      localStorage.setItem("fav", JSON.stringify(updated));

      return { favorites: updated };
    }),
}));
