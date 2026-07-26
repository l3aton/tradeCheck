import "../css/dashboard.css";
import { useTrendingStore } from "../store/trendingStore";

//   id: string;
//   name: string;
//   symbol: string;
//   thumb: string;
//   market_cap_rank: number;
//   price_usd: number;
//   price_change_24h_usd: number;
//   market_cap: number;
//   total_volume: string;

function Dashboard() {
  const coins = useTrendingStore((state) => state.coins);

  console.log("Trending coins:", coins);

  return (
    <div className="dashboard">
      {coins.map((coin) => (
        <div key={coin.symbol} className="coin-card">
          <p>MC Rank: {coin.market_cap_rank}</p>
          <img src={coin.thumb} alt={coin.symbol} />
          <h2>{coin.name}</h2>
          <div className="add-card-info">
            <p>Price: ${coin.price_usd.toFixed(2)}</p>
            <p>24h Change: {coin.price_change_24h_usd.toFixed(2)}%</p>
            <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
            <p>Total Volume: {coin.total_volume}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
