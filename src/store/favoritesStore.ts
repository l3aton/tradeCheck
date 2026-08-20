import { create } from "zustand";

const storageKey = (userId: string | null) => `tradecheck:favorites:${userId || "guest"}`;
function readFavorites(userId: string | null): string[] {
  try { const value = JSON.parse(localStorage.getItem(storageKey(userId)) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; }
}
interface FavoritesStore { userId: string | null; favorites: string[]; load: (userId: string | null) => void; toggle: (pair: string) => void; }
export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  userId: null, favorites: readFavorites(null),
  load: (userId) => set({ userId, favorites: readFavorites(userId) }),
  toggle: (pair) => { const current = get().favorites; const favorites = current.includes(pair) ? current.filter((item) => item !== pair) : [...current, pair]; localStorage.setItem(storageKey(get().userId), JSON.stringify(favorites)); set({ favorites }); },
}));
