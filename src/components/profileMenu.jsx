import "../css/profileMenu.css";
import { useAuth } from "../hooks/useAuth.js";
function ProfileMenu({ onClose }) {
  const { user, signOut } = useAuth();
  if (!user) return null;
  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Trader";
  return <div className="profile-menu" role="dialog" aria-label="Profile"><div className="profile-heading"><span className="profile-avatar">{name.slice(0, 2).toUpperCase()}</span><span><strong>{name}</strong><small>{user.email}</small></span></div><div className="profile-status">Account connected</div><button className="profile-signout" onClick={async () => { await signOut(); onClose(); }}>Sign out</button></div>;
}
export default ProfileMenu;
