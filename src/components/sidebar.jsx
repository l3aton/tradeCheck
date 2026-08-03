import "../css/sidebar.css";
import { useMarketStore } from "../store/marketStore";
import { useState } from "react";
import ModalCoin from "./modalCoin";

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

function Sidebar() {
  const tickers = useMarketStore((state) => state.tickers);
  const [selectedCoin, setSelectedCoin] = useState(null);
  return (
    <aside className="sidebar">
      <nav className="side-nav">
        {navItems.map(([icon, label], index) => (
          <button className={index === 0 ? "active" : ""} key={label}>
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
      <section className="watchlist-card">
        <div className="section-title">
          <span>Watchlist</span>
          <button>＋</button>
        </div>
        {PAIRS.map((pair) => {
          const ticker = tickers[pair];
          return (
            <button
              className="watch-row"
              key={pair}
              onClick={() =>
                ticker &&
                setSelectedCoin({
                  symbol: pair.replace("USDT", ""),
                  name: pair.replace("USDT", ""),
                  thumb: "",
                })
              }
            >
              <span className={`coin-dot ${pair.slice(0, 3).toLowerCase()}`}>
                {pair.slice(0, 1)}
              </span>
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
      <section className="premium-card">
        <div>
          ♛ <strong>Unlock Premium</strong>
        </div>
        <p>Get real-time alerts, premium insights and ad-free experience.</p>
        <button>Upgrade Now</button>
      </section>
      <div className="dark-mode">
        <span>◐ &nbsp;Dark Mode</span>
        <i />
      </div>
      <ModalCoin coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </aside>
  );
}
export default Sidebar;
