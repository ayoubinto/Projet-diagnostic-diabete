import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── ICONS ─────────────────────────── */
const IconProfile = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ─── HELPER : initiales ─────────────── */
function getInitials(nom = "") {
  return nom
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ═══════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════ */
export default function UserMenu({ user, onLogout }) {
  const [open, setOpen]       = useState(false);
  const [leaving, setLeaving] = useState(false);
  const wrapRef               = useRef(null);
  const navigate              = useNavigate();
  const redictPath = sessionStorage.getItem("redirectAfterLogin")

  /* ── Fermeture au clic extérieur ── */
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Fermeture avec animation ── */
  const closeMenu = () => {
    if (!open) return;
    setLeaving(true);
    setTimeout(() => {
      setOpen(false);
      setLeaving(false);
    }, 150);
  };
  const role = sessionStorage.getItem("role")
  const toggleMenu = () => (open ? closeMenu() : setOpen(true));

  /* ── Actions ── */
  const handleProfile = () => {
    closeMenu();
    if(role === "admin"){
      navigate("/dash")
    }else if(role === "patient"){
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    closeMenu();
    if (onLogout) onLogout();       // appeler votre logique de déconnexion
    navigate(redictPath);
    window.location.reload();
  };

  return (
    <div className="user-wrap" ref={wrapRef}>

      {/* ── BOUTON DÉCLENCHEUR ── */}
      <button
        className={`user-btn ${open ? "open" : ""}`}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="user-avatar">{getInitials(user?.nom)}</div>
        <span className="user-name">{user?.nom}</span>
        <span className="user-chevron"><IconChevron /></span>
      </button>

      {/* ── DROPDOWN ── */}
      {open && (
        <div className={`user-dropdown ${leaving ? "leaving" : "entering"}`}>

          {/* Header : avatar + nom + email */}
          <div className="dd-header">
            <div className="dd-avatar-lg">{getInitials(user?.nom)}</div>
            <div>
              <div className="dd-name">{user?.nom}</div>
              {user?.email && <div className="dd-email">{user.email}</div>}
            </div>
          </div>

          {/* Liste d'actions */}
          <div className="dd-list">

            {/* Gérer le profil */}
            <button className="dd-item dd-profile" onClick={handleProfile}>
              <span className="dd-item-icon"><IconProfile /></span>
              Gérer le profil
            </button>

            <div className="dd-divider" />

            {/* Se déconnecter */}
            <button className="dd-item dd-logout" onClick={handleLogout}>
              <span className="dd-item-icon"><IconLogout /></span>
              Se déconnecter
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
