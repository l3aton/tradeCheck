import "./css/App.css";
import Header from "./components/header.jsx";
import Sidebar from "./components/sidebar.jsx";
import Footer from "./components/footer.jsx";
import { useBinanceSocket } from "./hooks/useBinanceSocket";

function App() {
  useBinanceSocket();

  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
