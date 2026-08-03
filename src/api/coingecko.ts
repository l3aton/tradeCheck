export async function getTrendingCoins(page = 1) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=${page}&price_change_percentage=1h,24h,7d`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending coins");
  }

  return response.json();
}
