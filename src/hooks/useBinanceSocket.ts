import { useEffect } from "react";
import { connectBinanceSocket } from "../api/binanceSocket";

export function useBinanceSocket() {
  useEffect(() => {
    const socket = connectBinanceSocket();

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      } else if (socket.readyState === WebSocket.CONNECTING) {
        socket.onopen = () => socket.close();
      }
    };
  }, []);
}
