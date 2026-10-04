import "../css/profileMenu.css";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth.js";
function ProfileMenu({ onClose }) {
  const { user, signOut } = useAuth();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!user) return null;
  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Trader";
  return (
    <div className="profile-modal" onClick={onClose}>
      <div
        className="profile-menu"
        role="dialog"
        aria-label="Profile"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="profile-close" onClick={onClose} aria-label="Close profile">
          ×
        </button>
        <div className="profile-heading">
          <span className="profile-avatar">{name.slice(0, 2).toUpperCase()}</span>
          <span>
            <strong>{name}</strong>
            <small>{user.email}</small>
          </span>
        </div>
        <div className="profile-status">Account connected</div>
        <button className="profile-signout" onClick={async () => { await signOut(); onClose(); }}>Sign out</button>
      </div>
    </div>
  );
}
export default ProfileMenu;
