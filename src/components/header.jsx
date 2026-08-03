import "../css/header.css";
import Logo from "../images/logo.jsx";
import AuthPanel from "./authPanel.jsx";
import { useState } from "react";

const Icon = ({ children, className = "" }) => (
  <svg
    className={`ui-icon ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

function Header() {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);

  return (
    <header className="header">
      <div className="brand">
        <Logo color="#5661ff" className="logo" />
        <span>TradeCheck</span>
      </div>
      <label className="search-box">
        <Icon>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </Icon>
        <input placeholder="Search coins, pairs, or contracts..." />
        <kbd>/</kbd>
      </label>
      <div className="header-actions">
        <button aria-label="Favorites">
          <Icon>
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
          </Icon>
        </button>
        <button className="notification" aria-label="Notifications">
          <Icon>
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
          </Icon>
          <b>3</b>
        </button>
        <button
          className="profile"
          aria-label="Profile"
          onClick={() => setIsAuthPanelOpen(true)}
        >
          <Icon>
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5" />
          </Icon>
        </button>
      </div>
      {isAuthPanelOpen && (
        <AuthPanel onClose={() => setIsAuthPanelOpen(false)} />
      )}
    </header>
  );
}
export default Header;
