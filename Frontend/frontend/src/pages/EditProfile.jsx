import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import HeaderHero from "../component/navbar.jsx";
import DiabetesFooter from "../component/footer.jsx";
import fetchWithAuth from "../utils/fetchWithAuth.js";

/* ═══════════════════════════════════════
   MOCK — Remplacez par vos vraies données
═══════════════════════════════════════ */
const MOCK_USER = {
  nom:         "El Mansouri",
  prenom:      "Ayoub",
  email:       "ayoub@ayopredict.ma",
  age:         28,
  sexe:        "Male",
  telephone:   "+212 6XX XXX XXX",
  inscription: "15/01/2026",
};

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  ArrowL:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
  User:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Lock:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Eye:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Edit:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Phone:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .01 1.18 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92v2z"/></svg>,
  Gender:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v9M9 18h6"/></svg>,
  Age:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Save:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Trash:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Camera:  () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Check:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

/* ═══════════════════════════════════════
   PASSWORD STRENGTH
═══════════════════════════════════════ */
function getStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8)  score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function StrengthBar({ password }) {
  const s = getStrength(password);
  if (!password) return null;
  const labels  = ["", "Faible", "Moyen", "Bien", "Fort"];
  const classes = ["", "weak", "medium", "strong", "strong"];
  return (
    <div className="pw-strength">
      <div className="pw-strength-bar">
        {[1,2,3,4].map(i => (
          <div key={i} className={`pw-seg ${i <= s ? classes[s] : ""}`} />
        ))}
      </div>
      <span className={`pw-strength-label pw-label-${classes[s]}`}>{labels[s]}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function Toast({ msg, type, hiding }) {
  return (
    <div className={`ep-toast ${type} ${hiding ? "hiding" : ""}`}>
      {type === "success" ? "✅" : "❌"} {msg}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function EditProfile() {
  const navigate = useNavigate();


  const set  = key => e => setFormData(f => ({ ...f, [key]: e.target.value }));
  const [pwForm, setPwForm] = useState({
    current:  "",
    newPw:    "",
    confirm:  "",
  });

  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

  /* ── Input handler ── */
  const setPw  = key => e => setPwForm(f => ({ ...f, [key]: e.target.value }));
  const toggle = key => () => setShowPw(s => ({ ...s, [key]: !s[key] }));
  const [validate_mtp,setValidate_mtp] = useState(null)
  const [patient, setPatient] = useState(null)
  /* ── Show toast ── */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type, hiding: false });
    setTimeout(() => setToast(t => t ? { ...t, hiding: true } : null), 2700);
    setTimeout(() => setToast(null), 3000);
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetchWithAuth("http://127.0.0.1:8000/auth/me");
        if (!res) return;
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
  const fullfields = async () => {
   try {
      const res = await fetchWithAuth("http://127.0.0.1:8000/auth/me");
      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        console.log("Erreur backend =", data);
        return;
      }

      const response = await fetchWithAuth(
        `http://127.0.0.1:8000/patient_user/${data.id_user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response) return;

      const dt = await response.json();

      setFormData({
        ...data,
        age: dt.age ?? data.age,
        sexe: dt.sexe ?? data.sexe,
        telephone: dt.telephone ?? data.telephone
      });

    } catch (error) {
      console.error("Erreur fetch =", error);
    }
}
  fullfields();
}, []);

  const validate = () => {
    const e = {};
    if (!formData.nom.trim())    e.nom    = "Le nom est requis";
    if (!formData.prenom.trim()) e.prenom = "Le prénom est requis";
    if (!formData.email.includes("@")) e.email = "Email invalide";
    if (validate_mtp === false) e.current = "Mot de passe incorrect"
    if (pwForm.newPw && pwForm.newPw.length < 8) e.newPw = "Min. 8 caractères";
    if (pwForm.newPw && pwForm.newPw !== pwForm.confirm) e.confirm = "Les mots de passe ne correspondent pas";
    //if (pwForm.newPw && !pwForm.current) e.current = "Entrez votre mot de passe actuel";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const resUser = await fetchWithAuth("http://127.0.0.1:8000/auth/me");
      if (!resUser) {
        setLoading(false);
        return;
      }
      const userData = await resUser.json();
      if (!resUser.ok) {
        console.log("Erreur /auth/me =", userData);
        setLoading(false);
        return;
      }

      // 2) Récupérer le patient lié à cet utilisateur
      const resPatient = await fetchWithAuth(
        `http://127.0.0.1:8000/patient_user/${userData.id_user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!resPatient) {
        setLoading(false);
        return;
      }

      const patientData = await resPatient.json();
      console.log(pwForm)
      if (!resPatient.ok) {
        console.log("Erreur récupération patient =", patientData);
        setLoading(false);
        return;
      }

      // optionnel si tu veux garder l'état à jour
      setPatient(patientData);

      // 3) Mettre à jour le patient
      const response = await fetchWithAuth(
        `http://127.0.0.1:8000/auth/update_patient/${patientData.id_pat}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            age: formData.age,
            sexe: formData.sexe,
            telephone: formData.telephone
          })
        }
      );

      if (!response) {
        setLoading(false);
        return;
      }

      const updatedData = await response.json();

      if (!response.ok) {
        console.log("Erreur update =", updatedData);
        setLoading(false);
        return;
      }
      const resUpuser = await fetchWithAuth(
        `http://127.0.0.1:8000/auth/update_user/${userData.id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            password: pwForm.newPw,
            role: "patient"
          })
        }
      );

      if (!resUpuser) {
        setLoading(false);
        return;
      }
      const updateUser = await resUpuser.json()
      if(!resUpuser.ok){
        console.log("Error Update user :" , updateUser)
        setLoading(false);
        return;
      }
      showToast("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };
  /* ── Delete account ── */
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      showToast("Compte supprimé", "error");
      setTimeout(() => navigate("/login"), 2000);
    }
  };
  const handleBlur = async (e) =>{
      const value = e.target.value.trim();

      if (value === "") {
        setValidate_mtp(null);
        return;
      }
      try {
        const response = await fetchWithAuth("http://127.0.0.1:8000/auth/verifier_mtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password_current: e.target.value
          })
        });
        if (!response) return;
        if (response.ok) {
          setValidate_mtp(true)
        } else {
          const data = await response.json()
          console.error(data.detail)
          setValidate_mtp(false)
        }
      } catch (error) {
        console.log(error)
        setValidate_mtp(false)
      }

  }
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.replace("T", " ").split(".")[0];
  };
  let initials = "";

  if (formData) {
    initials = formData
    ? `${formData.prenom?.[0] || "?"}${formData.nom?.[0] || "?"}`.toUpperCase()
    : "??";  }

  return (
    <>
      <HeaderHero button_y={false} variant="test" color="#06080F"/>
    <div className="ep-page">
      <div className="ep-container">
        {/* ── HEADER ── */}
        <div className="ep-header">
          <button className="ep-back" onClick={() => navigate(-1)} aria-label="Retour">
            <Ic.ArrowL />
          </button>
          <div>
            <div className="ep-header-title">Modifier le <span>profil</span></div>
            <div className="ep-header-sub">Mettez à jour vos informations personnelles</div>
          </div>
        </div>

        {/* ── AVATAR ── */}
        <div className="ep-avatar-card">
          <div className="ep-avatar-wrap">
            <div className="ep-avatar">{initials}</div>
          </div>
          <div className="ep-avatar-info">
            <div className="ep-avatar-name">{formData.prenom} {formData.nom}</div>
            <div className="ep-avatar-email">{formData.email}</div>
            <span className="ep-avatar-pill">
              <Ic.Edit /> Membre depuis {formatDate(formData.date_inscription)}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* ══ INFOS PERSONNELLES ══ */}
          <div className="ep-card">
            <div className="ep-section-title">
              <div className="ep-section-icon"><Ic.User /></div>
              Informations personnelles
            </div>

            <div className="ep-grid">

              <div className="ep-group">
                <label className="ep-label">
                  <Ic.User /> Prénom <span className="ep-required">*</span>
                </label>
                <input
                  className={`ep-input ${errors.prenom ? "error" : ""}`}
                  type="text"
                  value={formData?.prenom}
                  onChange={set("prenom")}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <span className="ep-error-text"><Ic.Alert />{errors.prenom}</span>}
              </div>

              <div className="ep-group">
                <label className="ep-label">
                  <Ic.User /> Nom <span className="ep-required">*</span>
                </label>
                <input
                  className={`ep-input ${errors.nom ? "error" : ""}`}
                  type="text"
                  value={formData.nom}
                  onChange={set("nom")}
                  placeholder="Votre nom"
                />
                {errors.nom && <span className="ep-error-text"><Ic.Alert />{errors.nom}</span>}
              </div>

              <div className="ep-group">
                <label className="ep-label"><Ic.Age /> Âge</label>
                <input
                  className="ep-input"
                  type="number"
                  onChange={set("age")}
                  value={formData.age}
                  placeholder="Ex: 28"
                  min={1} max={120}
                />
              </div>

              <div className="ep-group">
                <label className="ep-label"><Ic.Gender /> Sexe</label>
                <div className="ep-select-wrap">
                  <select
                      className="ep-select"
                      value={formData?.sexe || ""}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          sexe: e.target.value
                        }))
                      }
                    >
                      <option value="">Choisir</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                </div>
              </div>

            </div>
          </div>

          {/* ══ COORDONNÉES ══ */}
          <div className="ep-card">
            <div className="ep-section-title">
              <div className="ep-section-icon"><Ic.Mail /></div>
              Coordonnées
            </div>

            <div className="ep-grid">

              <div className="ep-group span-2">
                <label className="ep-label">
                  <Ic.Mail /> Email <span className="ep-required">*</span>
                </label>
                <input
                  className={`ep-input ${errors.email ? "error" : ""}`}
                  type="email"
                  value={formData.email}
                  onChange={set("email")}
                  placeholder="votre@email.com"
                />
                {errors.email
                  ? <span className="ep-error-text"><Ic.Alert />{errors.email}</span>
                  : <span className="ep-hint">Utilisé pour la connexion à votre compte</span>
                }
              </div>

              <div className="ep-group span-2">
                <label className="ep-label"><Ic.Phone /> Téléphone</label>
                <input
                  className="ep-input"
                  type="tel"
                  onChange={set("telephone")}
                  placeholder="+212 6XX XXX XXX"
                  value={formData.telephone}
                />
                <span className="ep-hint">Optionnel — non utilisé pour la connexion</span>
              </div>

            </div>
          </div>

          {/* ══ MOT DE PASSE ══ */}
          <div className="ep-card">
            <div className="ep-section-title">
              <div className="ep-section-icon"><Ic.Lock /></div>
              Changer le mot de passe
            </div>

            <div className="ep-grid full">

              <div className="ep-group">
                <label className="ep-label"><Ic.Lock /> Mot de passe actuel</label>
                <div className="ep-pw-wrap">
                  <input
                    className={`ep-input ${errors.current ? "error" : ""}`}
                    type={showPw.current ? "text" : "password"}
                    value={pwForm.current}
                    onChange={setPw("current")}
                    onBlur={handleBlur}
                    placeholder="Votre mot de passe actuel"
                  />
                  <button type="button" className="ep-pw-toggle" onClick={toggle("current")}>
                    {showPw.current ? <Ic.EyeOff /> : <Ic.Eye />}
                  </button>
                </div>
                {errors.current && <span className="ep-error-text"><Ic.Alert />{errors.current}</span>}
              </div>

              <hr className="ep-divider" />

              <div className="ep-group">
                <label className="ep-label"><Ic.Lock /> Nouveau mot de passe</label>
                <div className="ep-pw-wrap">
                  <input
                    className={`ep-input ${errors.newPw ? "error" : ""}`}
                    type={showPw.newPw ? "text" : "password"}
                    value={pwForm.newPw}
                    onChange={setPw("newPw")}
                    placeholder="Min. 8 caractères"
                  />
                  <button type="button" className="ep-pw-toggle" onClick={toggle("newPw")}>
                    {showPw.newPw ? <Ic.EyeOff /> : <Ic.Eye />}
                  </button>
                </div>
                {errors.newPw
                  ? <span className="ep-error-text"><Ic.Alert />{errors.newPw}</span>
                  : <StrengthBar password={pwForm.newPw} />
                }
              </div>

              <div className="ep-group">
                <label className="ep-label"><Ic.Lock /> Confirmer le mot de passe</label>
                <div className="ep-pw-wrap">
                  <input
                    className={`ep-input ${errors.confirm ? "error" : pwForm.confirm && pwForm.confirm === pwForm.newPw ? "success" : ""}`}
                    type={showPw.confirm ? "text" : "password"}
                    value={pwForm.confirm}
                    onChange={setPw("confirm")}
                    placeholder="Répétez le nouveau mot de passe"
                  />
                  <button type="button" className="ep-pw-toggle" onClick={toggle("confirm")}>
                    {showPw.confirm ? <Ic.EyeOff /> : <Ic.Eye />}
                  </button>
                </div>
                {errors.confirm && <span className="ep-error-text"><Ic.Alert />{errors.confirm}</span>}
                {!errors.confirm && pwForm.confirm && pwForm.confirm === pwForm.newPw && (
                  <span style={{ fontSize: 11.5, color: "#16a34a", display: "flex", alignItems: "center", gap: 4 }}>
                    <Ic.Check /> Mots de passe identiques
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* ══ ACTIONS ══ */}
          <div className="ep-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
              Annuler
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Enregistrement…
                </>
              ) : (
                <><Ic.Save /> Enregistrer les modifications</>
              )}
            </button>
          </div>

        </form>

        {/* ══ DANGER ZONE ══ */}
        <div className="ep-danger-card">
          <div className="ep-danger-title">⚠️ Zone de danger</div>
          <div className="ep-danger-row">
            <div className="ep-danger-desc">
              La suppression de votre compte est <strong>irréversible</strong>. Toutes vos données et diagnostics seront définitivement effacés.
            </div>
            <button type="button" className="btn-danger-sm" onClick={handleDelete}>
              <Ic.Trash /> Supprimer le compte
            </button>
          </div>
        </div>

      </div>

      {/* ══ TOAST ══ */}
      {toast && <Toast msg={toast.msg} type={toast.type} hiding={toast.hiding} />}
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
      <DiabetesFooter/>
    </>
  );
}
