import { useMarketStore } from "../store/marketStore";

const PAIRS = [
  "btcusdt",
  "ethusdt",
  "solusdt",
  "bnbusdt",
  "xrpusdt",
  "dogeusdt",
  "suiusdt",
  "adausdt",
  "linkusdt",
  "avaxusdt",
  "trxusdt",
  "tonusdt",
  "hbarusdt",
  "dotusdt",
  "aptusdt",
];

interface BinanceTickerMessage {
  stream: string;

  data: {
    s: string;
    c: string;
    P: string;
  };
}

export function connectBinanceSocket() {
  const streams = PAIRS.map((pair) => `${pair}@ticker`).join("/");

  const socket = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streams}`,
  );

  socket.onopen = () => {
    console.log("🟢 Connected");
  };

  socket.onmessage = (event) => {
    const message: BinanceTickerMessage = JSON.parse(event.data);

    useMarketStore.getState().updateTicker({
      symbol: message.data.s,
      price: Number(message.data.c),
      change24h: Number(message.data.P),
    });
  };

  socket.onerror = (e) => {
    console.error("Socket error", e);
  };

  socket.onclose = (e) => {
    console.log("Socket closed", e.code);
  };

  return socket;
}
