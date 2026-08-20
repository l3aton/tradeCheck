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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleAssetSelection = (event) => setSelectedAsset(event.detail);
    window.addEventListener("tradecheck:select-asset", handleAssetSelection);
    return () => window.removeEventListener("tradecheck:select-asset", handleAssetSelection);
  }, []);

  useEffect(() => {
    const showFavorites = () => setActiveSection("Favorites");
    window.addEventListener("tradecheck:show-favorites", showFavorites);
    return () => window.removeEventListener("tradecheck:show-favorites", showFavorites);
  }, []);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useBinanceSocket();
  useTrending(page);

  return (
    <div className="app-shell">
      <Header onMenuToggle={() => setIsSidebarOpen((value) => !value)} />
      <div className="main-content">
        <div className={`sidebar-overlay ${isSidebarOpen ? "is-open" : ""}`} onClick={() => setIsSidebarOpen(false)} />
        <Sidebar activeSection={activeSection} onSectionChange={(section) => { setActiveSection(section); setIsSidebarOpen(false); }} isOpen={isSidebarOpen} />
        {activeSection === "Market" || activeSection === "Favorites" ? (
          <Dashboard page={page} onPageChange={handlePageChange} onlyFavorites={activeSection === "Favorites"} />
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
