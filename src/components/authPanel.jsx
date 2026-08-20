import "../css/authPanel.css";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

function AuthPanel({ onClose }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, resetPassword, isConfigured } = useAuth();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateField = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!isConfigured) {
      setError("");
      return;
    }
    if (isRegistering && form.password !== form.confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }
    setIsSubmitting(true);
    const result = isRegistering
      ? await signUp(form.email, form.password, form.name)
      : await signIn(form.email, form.password);
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (isRegistering && !result.data.session) {
      setMessage("Sucsess");
      return;
    }
    onClose();
  };

  const forgotPassword = async () => {
    if (!form.email) {
      setError("Введите email, чтобы сбросить пароль.");
      return;
    }
    const result = await resetPassword(form.email);
    setError(result.error?.message || "");
    setMessage(
      result.error ? "" : "Ссылка для сброса пароля отправлена на почту.",
    );
  };

  return (
    <div className="modal-auth" onClick={onClose}>
      <div
        className="modal-content-auth"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="auth-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="auth-brand-mark">TC</div>
        <p className="auth-eyebrow">WELCOME TO TRADECHECK</p>
        <h2>{isRegistering ? "Create your account" : "Welcome back"}</h2>
        <p className="auth-subtitle">
          {isRegistering
            ? "Start tracking the market with your personal account."
            : "Sign in to save your favorite markets and insights."}
        </p>
        <form className="auth-form" onSubmit={submit}>
          {isRegistering && (
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
              />
            </label>
          )}
          <label>
            Email address
            <input
              name="email"
              value={form.email}
              onChange={updateField}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              value={form.password}
              onChange={updateField}
              type="password"
              placeholder="Enter your password"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              minLength="6"
              required
            />
          </label>
          {isRegistering && (
            <label>
              Confirm password
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={updateField}
                type="password"
                placeholder="Repeat your password"
                autoComplete="new-password"
                minLength="6"
                required
              />
            </label>
          )}
          {!isRegistering && (
            <div className="auth-options">
              <label className="remember-option">
                <input type="checkbox" />
                Remember me
              </label>
              <button
                type="button"
                className="text-button"
                onClick={forgotPassword}
              >
                Forgot password?
              </button>
            </div>
          )}
          {error && (
            <p className="auth-message auth-error" role="alert">
              {error}
            </p>
          )}
          {message && <p className="auth-message auth-success">{message}</p>}
          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Loading..."
              : isRegistering
                ? "Create account"
                : "Sign in"}
            <span>→</span>
          </button>
        </form>
        <div className="auth-switch">
          <span>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsRegistering((value) => !value);
              setError("");
              setMessage("");
            }}
          >
            {isRegistering ? "Sign in" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPanel;
