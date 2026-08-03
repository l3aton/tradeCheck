import "../css/authPanel.css";
import { useEffect, useState } from "react";

function AuthPanel({ onClose }) {
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-auth" onClick={onClose}>
      <div className="modal-content-auth" onClick={(event) => event.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="auth-brand-mark">TC</div>
        <p className="auth-eyebrow">WELCOME TO TRADECHECK</p>
        <h2>{isRegistering ? "Create your account" : "Welcome back"}</h2>
        <p className="auth-subtitle">
          {isRegistering
            ? "Start tracking the market with your personal account."
            : "Sign in to save your favorite markets and insights."}
        </p>

        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          {isRegistering && (
            <label>Name<input type="text" placeholder="Alex Morgan" autoComplete="name" /></label>
          )}
          <label>Email address<input type="email" placeholder="you@example.com" autoComplete="email" /></label>
          <label>
            Password
            <input type="password" placeholder="Enter your password" autoComplete={isRegistering ? "new-password" : "current-password"} />
          </label>
          {isRegistering && (
            <label>Confirm password<input type="password" placeholder="Repeat your password" autoComplete="new-password" /></label>
          )}
          {!isRegistering && (
            <div className="auth-options">
              <label className="remember-option"><input type="checkbox" />Remember me</label>
              <button type="button" className="text-button">Forgot password?</button>
            </div>
          )}
          <button type="submit" className="auth-submit">
            {isRegistering ? "Create account" : "Sign in"}<span>→</span>
          </button>
        </form>

        <div className="auth-switch">
          <span>{isRegistering ? "Already have an account?" : "Don't have an account?"}</span>
          <button type="button" onClick={() => setIsRegistering((value) => !value)}>
            {isRegistering ? "Sign in" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPanel;
