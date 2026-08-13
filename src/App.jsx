import "./css/App.css";
import Header from "./components/header.jsx";
import Sidebar from "./components/sidebar.jsx";
import Footer from "./components/footer.jsx";
import { useBinanceSocket } from "./hooks/useBinanceSocket";
import { useTrending } from "./hooks/useTrending";
import Dashboard from "./components/dashboard.jsx";
import ModalCoin from "./components/modalCoin";
import InProgress from "./components/inProgress.jsx";
import { useEffect, useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const [activeSection, setActiveSection] = useState("Market");
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const handleAssetSelection = (event) => setSelectedAsset(event.detail);
    window.addEventListener("tradecheck:select-asset", handleAssetSelection);
    return () => window.removeEventListener("tradecheck:select-asset", handleAssetSelection);
  }, []);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useBinanceSocket();
  useTrending(page);

  return (
    <div className="app-shell">
      <Header />
      <div className="main-content">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        {activeSection === "Market" ? (
          <Dashboard page={page} onPageChange={handlePageChange} />
        ) : (
          <InProgress section={activeSection} />
        )}
      </div>
      <Footer />
      <ModalCoin coin={selectedAsset} onClose={() => setSelectedAsset(null)} />
    </div>
  );
}

export default App;
