import "../css/sidebar.css";
import { useMarketStore } from "../store/marketStore";

const PAIRS = [
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "SUIUSDT",
  "ADAUSDT",
  "LINKUSDT",
  "AVAXUSDT",
  "TRXUSDT",
  "TONUSDT",
  "HBARUSDT",
  "DOTUSDT",
  "APTUSDT",
];

function Sidebar() {
  const tickers = useMarketStore((state) => state.tickers);

  return (
    <aside className="sidebar">
      <h1>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          focusable="false"
          className="chakra-icon custom-dlwj68"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
        Search
      </h1>
      <nav>
        <ul>
          <li>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 576 512"
              className="ds-nav-main-nav-link-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
            Favorites
          </li>
          <li>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="ds-nav-main-nav-link-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
            </svg>
            Notifications
          </li>
          <li>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="ds-nav-main-nav-link-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M216 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 61.8-39.6 95.7-81.5 131.6C43.6 192.3 0 229.6 0 320c0 106 86 192 192 192s192-86 192-192c0-128-104-184-152-264-5.4-9-16.6-14.2-16-32zM192 464c-53 0-96-43-96-96 0-50.7 24.8-75.2 59.5-105.1 4.3 47.4 34.6 69.1 68.5 95.5 20.7 16.2 32 33.8 32 57.6 0 26.5-21.5 48-48 48z" />
            </svg>
            Hot pairs
          </li>
          {PAIRS.map((pair) => (
            <li key={pair}>
              {pair} -{" "}
              {tickers[pair] && (
                <span>
                  ${tickers[pair].price.toFixed(2)} (
                  <span
                    className={
                      tickers[pair].change24h >= 0 ? "price-up" : "price-down"
                    }
                  >
                    {tickers[pair].change24h.toFixed(2)}%
                  </span>
                  )
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar;
