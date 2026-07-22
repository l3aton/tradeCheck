import Logo from "../images/logo.jsx";
import "../css/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-cont">
        <Logo color="black" className="logo logo-header" />
        <h1>TradeCheck</h1>
        <div className="pfp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={8} r={4} />
            <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
          </svg>
        </div>
      </div>
    </header>
  );
}
export default Header;
