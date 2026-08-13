export async function getTrendingCoins(page = 1) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=${page}&price_change_percentage=1h,24h,7d`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending coins");
  }

  return response.json();
}

const API_BASE = "https://api.coingecko.com/api/v3";

export async function searchCoins(query: string) {
  const response = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to search CoinGecko");
  }

  return response.json();
}

export async function searchPools(query: string, network = "eth") {
  const response = await fetch(
    `${API_BASE}/onchain/search/pools?query=${encodeURIComponent(query)}&network=${network}&include=base_token,quote_token,dex`,
  );

  if (!response.ok) {
    throw new Error("Failed to search GeckoTerminal pools");
  }

  return response.json();
}

export async function getCoinsMarketData(ids: string[]) {
  if (!ids.length) return [];

  const response = await fetch(
    `${API_BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids.join(","))}&price_change_percentage=24h`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coin market data");
  }

  return response.json();
}
