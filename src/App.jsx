import "./css/App.css";
import Header from "./components/header.jsx";
import Sidebar from "./components/sidebar.jsx";
import Footer from "./components/footer.jsx";
import { useBinanceSocket } from "./hooks/useBinanceSocket";
import { useTrending } from "./hooks/useTrending";
import Dashboard from "./components/dashboard.jsx";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);

  useBinanceSocket();
  useTrending(page);

  return (
    <div className="app-shell">
      <Header />
      <div className="main-content">
        <Sidebar />
        <Dashboard page={page} onPageChange={setPage} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
