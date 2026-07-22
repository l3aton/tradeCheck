import { useEffect } from "react";
import { connectBinanceSocket } from "../api/binanceSocket";

export function useBinanceSocket() {
  useEffect(() => {
    const socket = connectBinanceSocket();

    return () => {
      socket.close();
    };
  }, []);
}
