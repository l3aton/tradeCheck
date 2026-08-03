import "../css/modalCoin.css";
import TradingViewChart from "./TradingViewChart";
import coinImages from "../helpers/coinImages.json";
import { useEffect } from "react";

function ModalCoin({ coin, onClose }) {
  useEffect(() => {
    if (!coin) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [coin, onClose]);

  if (!coin) return null;

  const tradingViewSymbol = `BINANCE:${coin.symbol.toUpperCase()}USDT`;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <img src={coin.thumb || coinImages[coin.symbol]} alt={coin.symbol} />
        <h2>{coin.name}</h2>

        <div className="chart-container">
          <TradingViewChart symbol={tradingViewSymbol} />
        </div>
      </div>
    </div>
  );
}

export default ModalCoin;
