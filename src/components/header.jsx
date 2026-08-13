import "../css/header.css";
import Logo from "../images/logo.jsx";
import AuthPanel from "./authPanel.jsx";
import { useRef, useState } from "react";
import { searchCoins, searchPools } from "../api/coingecko";
import { useTrendingStore } from "../store/trendingStore";

const pairQuoteCurrencies = ["USDT", "USDC", "BUSD", "USD"];

function normalizePairQuery(value) {
  const normalized = value.trim().toUpperCase();
  const quote = pairQuoteCurrencies.find((item) => normalized.endsWith(item));
  return quote ? normalized.slice(0, -quote.length) : normalized;
}

function mapCoinResult(coin) {
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    thumb: coin.large || coin.thumb,
    kind: "Coin",
  };
}

function mapPoolResult(pool, included = []) {
  const baseTokenId = pool.relationships?.base_token?.data?.id;
  const baseToken = included.find((item) => item.id === baseTokenId)?.attributes;
  const symbol = baseToken?.symbol || pool.attributes.name.split("/")[0].trim();

  return {
    id: pool.id,
    name: pool.attributes.name,
    symbol,
    thumb: baseToken?.image_url,
    kind: "Pool",
  };
}

const Icon = ({ children, className = "" }) => (
  <svg
    className={`ui-icon ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

function Header() {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const trendingCoins = useTrendingStore((state) => state.coins);
  const searchRequest = useRef(0);
  const searchTimer = useRef(null);

  const search = (value) => {
    setQuery(value);
    window.clearTimeout(searchTimer.current);
    const requestId = ++searchRequest.current;
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    setIsSearching(true);
    searchTimer.current = window.setTimeout(async () => {
      const pairQuery = normalizePairQuery(trimmed);
      const localResults = trendingCoins
        .filter((coin) => [coin.name, coin.symbol].some((field) => field.toUpperCase().includes(pairQuery)))
        .slice(0, 5)
        .map(mapCoinResult);

      const [coinResponse, poolResponse] = await Promise.allSettled([
        searchCoins(pairQuery),
        searchPools(pairQuery),
      ]);
      if (requestId !== searchRequest.current) return;
      const coins = coinResponse.status === "fulfilled" ? coinResponse.value.coins.slice(0, 6).map(mapCoinResult) : [];
      const pools = poolResponse.status === "fulfilled" ? poolResponse.value.data.slice(0, 5).map((pool) => mapPoolResult(pool, poolResponse.value.included || [])) : [];
      const unique = [...localResults, ...coins, ...pools].filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
      setResults(unique.slice(0, 8));
      setIsSearching(false);
    }, 300);
  };

  const selectResult = (result) => {
    window.dispatchEvent(new CustomEvent("tradecheck:select-asset", { detail: result }));
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <header className="header">
      <div className="brand">
        <Logo color="#5661ff" className="logo" />
        <span>TradeCheck</span>
      </div>
      <div className="search-wrapper">
      <label className="search-box">
        <Icon>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </Icon>
        <input value={query} onChange={(event) => search(event.target.value)} placeholder="Search coins, pairs, or contracts..." />
        <kbd>/</kbd>
      </label>
      {hasSearched && (
        <div className="search-results">
          {isSearching && <span className="search-state">Searching...</span>}
          {!isSearching && !results.length && <span className="search-state">Nothing found</span>}
          {!isSearching && results.map((result) => (
            <button className="search-result" key={`${result.kind}-${result.id}`} onClick={() => selectResult(result)}>
              {result.thumb ? <img src={result.thumb} alt="" /> : <span className="search-placeholder" />}
              <span><strong>{result.name}</strong><small>{result.symbol.toUpperCase()}</small></span>
              <em>{result.kind}</em>
            </button>
          ))}
        </div>
      )}
      </div>
      <div className="header-actions">
        <button aria-label="Favorites">
          <Icon>
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
          </Icon>
        </button>
        <button className="notification" aria-label="Notifications">
          <Icon>
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
          </Icon>
          <b>3</b>
        </button>
        <button
          className="profile"
          aria-label="Profile"
          onClick={() => setIsAuthPanelOpen(true)}
        >
          <Icon>
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5" />
          </Icon>
        </button>
      </div>
      {isAuthPanelOpen && (
        <AuthPanel onClose={() => setIsAuthPanelOpen(false)} />
      )}
    </header>
  );
}
export default Header;
