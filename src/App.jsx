import "./css/App.css";
import Header from "./components/header.jsx";
import Sidebar from "./components/sidebar.jsx";
import Footer from "./components/footer.jsx";
import { useBinanceSocket } from "./hooks/useBinanceSocket";
import { useTrending } from "./hooks/useTrending";
import Dashboard from "./components/dashboard.jsx";

function App() {
  useBinanceSocket();
  useTrending();

  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
}

export default App;
