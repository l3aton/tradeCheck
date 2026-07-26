export async function getTrendingCoins() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending coins");
  }

  return response.json();
}
