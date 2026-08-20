import "../css/sidebar.css";
import { useMarketStore } from "../store/marketStore";
import { useTrendingStore } from "../store/trendingStore";
import { useState } from "react";
import ModalCoin from "./modalCoin";
import coinImages from "../helpers/coinImages.json";

const PAIRS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];
const navItems = [
  ["▥", "Market"],
  ["☆", "Favorites"],
  ["♨", "Hot Pairs"],
  ["↗", "Gainers"],
  ["↘", "Losers"],
  ["▣", "News"],
  ["♧", "Alerts"],
  ["◔", "Portfolio"],
  ["◉", "Watchlist"],
  ["⚙", "Settings"],
];

function Sidebar({ activeSection, onSectionChange, isOpen }) {
  const tickers = useMarketStore((state) => state.tickers);
  const trendingCoins = useTrendingStore((state) => state.coins);
  const [selectedCoin, setSelectedCoin] = useState(null);
  return (
    <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
      <nav className="side-nav">
        {navItems.map(([icon, label]) => (
          <button
            className={activeSection === label ? "active" : ""}
            key={label}
            onClick={() => onSectionChange(label)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
      <section className="watchlist-card">
        <div className="section-title">
          <span>Watchlist</span>
        </div>
        {PAIRS.map((pair) => {
          const ticker = tickers[pair];
          const symbol = pair.replace("USDT", "");
          const coin = trendingCoins.find(
            (trendingCoin) => trendingCoin.symbol.toUpperCase() === symbol,
          );
          const thumb = coin?.thumb || coinImages[pair];
          return (
            <button
              className="watch-row"
              key={pair}
              onClick={() =>
                ticker &&
                setSelectedCoin({
                  symbol,
                  name: coin?.name || symbol,
                  thumb,
                })
              }
            >
              <img className="coin-dot" src={thumb} alt="" />
              <strong>{pair}</strong>
              <span className="watch-price">
                ${ticker?.price?.toFixed(2) ?? "—"}
                <em
                  className={ticker?.change24h >= 0 ? "price-up" : "price-down"}
                >
                  {ticker ? `${ticker.change24h.toFixed(2)}%` : "—"}
                </em>
              </span>
            </button>
          );
        })}
      </section>

      <ModalCoin coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </aside>
  );
}
export default Sidebar;
