import { create } from "zustand";

export interface MarketTicker {
  symbol: string;
  price: number;
  change24h: number;
}

interface MarketStore {
  tickers: Record<string, MarketTicker>;

  updateTicker: (ticker: MarketTicker) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  tickers: {},

  updateTicker: (ticker) =>
    set((state) => ({
      tickers: {
        ...state.tickers,
        [ticker.symbol]: ticker,
      },
    })),
}));
