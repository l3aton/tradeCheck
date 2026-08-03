import { create } from "zustand";

interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
  price_usd: number;
  price_change_24h_usd: number;
  market_cap: number;
  total_volume: number;
}

interface TrendingStore {
  coins: TrendingCoin[];
  loading: boolean;

  setCoins: (coins: TrendingCoin[]) => void;

  setLoading: (loading: boolean) => void;
}

export const useTrendingStore = create<TrendingStore>((set) => ({
  coins: [],

  loading: false,

  setCoins: (coins) =>
    set({
      coins,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),
}));
