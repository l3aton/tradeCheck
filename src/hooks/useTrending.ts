import { useEffect } from "react";

import { getTrendingCoins } from "../api/coingecko";

import { useTrendingStore } from "../store/trendingStore";

export function useTrending(page = 1) {
  const setCoins = useTrendingStore((state) => state.setCoins);

  const setLoading = useTrendingStore((state) => state.setLoading);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await getTrendingCoins(page);

        const coins = data.map((coin: any) => ({
          id: coin.id,

          name: coin.name,

          symbol: coin.symbol,

          thumb: coin.image,

          market_cap_rank: coin.market_cap_rank,
          price_usd: coin.current_price,
          market_cap: coin.market_cap,
          total_volume: coin.total_volume,
          price_change_24h_usd: coin.price_change_percentage_24h_in_currency,
        }));

        setCoins(coins);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, setCoins, setLoading]);
}
