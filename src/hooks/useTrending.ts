import { useEffect } from "react";

import { getTrendingCoins } from "../api/coingecko";

import { useTrendingStore } from "../store/trendingStore";

export function useTrending() {
  const setCoins = useTrendingStore((state) => state.setCoins);

  const setLoading = useTrendingStore((state) => state.setLoading);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await getTrendingCoins();

        const coins = data.coins.map((coin: any) => ({
          id: coin.item.id,

          name: coin.item.name,

          symbol: coin.item.symbol,

          thumb: coin.item.thumb,

          market_cap_rank: coin.item.market_cap_rank,
          price_usd: coin.item.data.price,
          market_cap: coin.item.data.market_cap,
          total_volume: coin.item.data.total_volume,
          price_change_24h_usd: coin.item.data.price_change_percentage_24h.usd,
        }));

        setCoins(coins);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);
}
