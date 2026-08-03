import "../css/dashboard.css";
import { useState } from "react";
import { useTrendingStore } from "../store/trendingStore";
import ModalCoin from "./modalCoin";

const TOTAL_PAGES = 10;
const PAGE_SIZE = 50;
const fallback = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price_usd: 63358.2,
    price_change_24h_usd: -2.72,
    market_cap: 1.27e12,
    total_volume: 26.18e9,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price_usd: 1880.99,
    price_change_24h_usd: -4.26,
    market_cap: 227.01e9,
    total_volume: 11.07e9,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price_usd: 73.27,
    price_change_24h_usd: -3.93,
    market_cap: 42.72e9,
    total_volume: 1.83e9,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price_usd: 556.25,
    price_change_24h_usd: -1.05,
    market_cap: 81.11e9,
    total_volume: 2.48e9,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price_usd: 1.06,
    price_change_24h_usd: -4.52,
    market_cap: 61.27e9,
    total_volume: 2.27e9,
  },
];
const money = (n) =>
  n == null
    ? "-"
    : n >= 1e12
      ? `$${(n / 1e12).toFixed(2)}T`
      : n >= 1e9
        ? `$${(n / 1e9).toFixed(2)}B`
        : `$${(n / 1e6).toFixed(2)}M`;
const price = (n) =>
  n == null
    ? "-"
    : `$${n < 1 ? n.toFixed(2) : n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const chart = (up = false) => (
  <svg
    className={`sparkline ${up ? "up" : ""}`}
    viewBox="0 0 150 38"
    preserveAspectRatio="none"
  >
    <path
      d={
        up
          ? "M0 31 L10 32 20 28 30 31 40 24 50 26 60 18 70 20 80 10 90 15 100 7 110 13 120 6 130 10 140 3 150 1"
          : "M0 4 L10 10 20 8 30 19 40 13 50 24 60 20 70 27 80 18 90 23 100 17 110 29 120 16 130 23 140 18 150 32"
      }
    />
  </svg>
);

function Dashboard({ page, onPageChange }) {
  const liveCoins = useTrendingStore((state) => state.coins);
  const coins = liveCoins.length ? liveCoins : fallback;
  const [selectedCoin, setSelectedCoin] = useState(null);
  const firstItem = (page - 1) * PAGE_SIZE + 1;

  return (
    <main className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MARKET</p>
          <h1>Market Overview</h1>
        </div>
        <button className="range-button">24h</button>
      </div>
      <section className="stats-grid">
        <div className="stat">
          <span>Cryptocurrencies</span>
          <strong>
            12,548 <em className="price-up">+2.18%</em>
          </strong>
        </div>
        <div className="stat">
          <span>Exchanges</span>
          <strong>
            423 <em className="price-up">+1.11%</em>
          </strong>
        </div>
        <div className="stat">
          <span>Market Cap</span>
          <strong>
            $2.41T <em className="price-down">-2.35%</em>
          </strong>
        </div>
        <div className="stat">
          <span>24h Volume</span>
          <strong>
            $98.47B <em className="price-up">+6.21%</em>
          </strong>
        </div>
        <div className="fear">
          <span>Fear &amp; Greed Index</span>
          <strong>
            <i>45</i>
            <small>Neutral</small>
          </strong>
        </div>
      </section>
      <section className="market-table">
        <div className="table-head">
          <span>#</span>
          <span>Coin</span>
          <span>Price</span>
          <span>24h Change</span>
          <span>Market Cap</span>
          <span>Volume (24h)</span>
          <span>Last 7 Days</span>
          <span />
        </div>
        {coins.map((coin, index) => (
          <button
            className="coin-row"
            key={coin.id || coin.symbol}
            onClick={() => setSelectedCoin(coin)}
          >
            <span>{firstItem + index}</span>
            <span className="coin-name">
              <img src={coin.thumb} alt="" />
              <strong>{coin.name}</strong>
              <small>{coin.symbol.toUpperCase()}</small>
            </span>
            <span>{price(coin.price_usd)}</span>
            <span
              className={
                coin.price_change_24h_usd >= 0 ? "price-up" : "price-down"
              }
            >
              {coin.price_change_24h_usd == null
                ? "-"
                : `${coin.price_change_24h_usd.toFixed(2)}%`}
            </span>
            <span>{money(coin.market_cap)}</span>
            <span>{money(coin.total_volume)}</span>
            <span>{chart(coin.price_change_24h_usd >= 0)}</span>
            <span className="star">*</span>
          </button>
        ))}
      </section>
      <div className="pagination">
        <span>
          Showing {firstItem} to {firstItem + coins.length - 1} of{" "}
          {TOTAL_PAGES * PAGE_SIZE}
        </span>
        <div>
          <button
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={page === pageNumber ? "selected" : ""}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            aria-label="Next page"
            disabled={page === TOTAL_PAGES}
            onClick={() => onPageChange(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
      <ModalCoin coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </main>
  );
}
export default Dashboard;
