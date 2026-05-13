import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import DiagnosticDetail from "../component/Style_component/detail_dashboard_p.jsx";
import HeaderHero from "../component/navbar.jsx";
import DiabetesFooter from "../component/footer.jsx";
import EditProfile from "./EditProfile.jsx";
import Loading from "../component/Loading.jsx";
import fetchWithAuth from "../utils/fetchWithAuth";

/* ═══════════════════════════════════════
   MOCK DATA — remplacez par vos vraies données
═══════════════════════════════════════ */
const MOCK_PATIENT = {
  nom:        "Ayoub",
  prenom:     "El Mansouri",
  email:      "ayoub@ayopredict.ma",
  age:        28,
  sexe:       "Homme",
  inscription: "15/01/2026",
};

const MOCK_HISTORY = [
  { id: 1, date: "20/03/2026", result: "Diabetic",     prob: 92 },
  { id: 2, date: "10/03/2026", result: "Non-Diabetic", prob: 12 },
  { id: 3, date: "28/02/2026", result: "Non-Diabetic", prob: 18 },
  { id: 4, date: "14/02/2026", result: "Diabetic",     prob: 76 },
  { id: 5, date: "02/02/2026", result: "Diabetic",     prob: 88 },
];

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  User: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Age: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Gender: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v9M9 18h6"/></svg>,
  Plus: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Activity: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Trend: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendDown: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Info: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Eye: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Tests: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 1 2-2v-3a2 2 0 0 0-2-2h-4m-5 0h5"/></svg>,
  Percent: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
function getInitials(nom = "", prenom = "") {
  return `${nom[0] || ""}${prenom[0] || ""}`.toUpperCase();
}

function calcStats(history) {
  const total    = history.length;
  const diabetic = history.filter(h => h.result === "Diabetic").length;
  const pct      = total ? Math.round((diabetic / total) * 100) : 0;

  // Evolution : comparer dernier vs avant-dernier
  let evolution = "flat";
  if (history.length >= 2) {
    const last = history[0].prob;
    const prev = history[1].prob;
    if (history[0].result === "Diabetic" && last > prev) evolution = "up";
    else if (history[0].result === "Non-Diabetic" || last < prev) evolution = "down";
  }
  return { total, diabetic, pct, evolution };
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function PatientDashboard() {
  const [patient,setPatient]  = useState({});
  const [user,setUser] = useState({})
  const [diagno,setDiagno] = useState([])
  const [history]  = useState(MOCK_HISTORY);
  const navigate   = useNavigate();
  const lastDiag   = history[0] || null;
  const stats      = calcStats(history);
  const [isHovered, setIsHovered] = useState(false);
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [formData, setFormData] = useState("")
  const [selectedId, setSelectedId] = useState(null);
  const [confidence, setConfidence] = useState(null)
  const totalTests = diagno.length;
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetchWithAuth("http://127.0.0.1:8000/auth/me");
      if (!res) return;
    }, 5000); // toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);
  const checkAuth = async () => {
    try {
      const res = await fetchWithAuth("http://127.0.0.1:8000/auth/me");

      if (!res) return null; // token expiré => fetchWithAuth redirige déjà
      if (!res.ok) return null;

      const data = await res.json();
      setUser(data);
      return data;
    } catch {
      return null;
    }
  };
  useEffect(() => {
      const initAuth = async () => {
        const isAuth = await checkAuth();
        if (!isAuth) {
          console.log("Non connecté");
          setLoading(false);
          return;
        }
        if (isAuth) {
          console.log("Utilisateur connecté");
          try{
             const resPatient = await fetchWithAuth(
                `http://127.0.0.1:8000/patient_user/${isAuth.id_user}`,
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
              console.log("status patient =", resPatient.status);
              const patientData = await resPatient.json();
              if (!resPatient.ok) {
                console.log("Erreur récupération patient =", patientData);
                setLoading(false);
                return;
              }
              setPatient(patientData)
              console.log(patientData)
           }catch (e){
             console.error(e)
           }
        } else {
          console.log("Non connecté");
        }
        setLoading(false);
      };
      initAuth();
    }, []);

  const globalScore =
    totalTests > 0
      ? Math.round(
          (diagno.reduce((sum, item) => {
            const confidence = item.prediction_result
              ? item.prediction_probability
              : 1 - item.prediction_probability;

            return sum + confidence;
          }, 0) / totalTests) * 100
        )
      : 0;

  let riskLevel = "";
  if (totalTests < 3) {
    riskLevel = "insufficient";
  } else if (globalScore < 40) {
    riskLevel = "low";
  } else if (globalScore < 70) {
    riskLevel = "moderate";
  } else {
    riskLevel = "high";
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.replace("T", " ").split(".")[0];
  };
  useEffect(() => {
      const fetchDiagnostics = async () => {
          const token = localStorage.getItem("token");
          if (!token) return;
          try {
              const response = await fetchWithAuth("http://127.0.0.1:8000/diagnostic/me");
              if (!response) return;
              if(response.ok){
                const data = await response.json()
                setDiagno(data)
                console.log(data)
                console.log(data[data.length - 1].prediction_probability)

              }else{
                console.log(response.status)
              }
          }catch (error){
            console.error("Erreur réseau :"+error)
          }
      }
      fetchDiagnostics();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login");
  };
  function handlebutton(id,data,confiance){
    if(!id) return;
    setShowDetail(true)
    setSelectedId(id)
    setFormData(data)
    setConfidence(confiance)
  }
  function handleChangeprofile(){
      navigate('/edite')
  }
  return (
      <>
        <HeaderHero button_y={false} variant="test" color="#06080F"/>
        <div className="db-page">
          <div className="db-container">

            {/* ── PAGE HEADER ── */}
            <div className="db-header">
              <div className="db-header-left">
                <div className="db-greeting">
                  👋 Bonjour,
                </div>
                <h1 className="db-title">
                  {patient.prenom} <span>{patient.nom}</span>
                </h1>
              </div>
              <div className="db-header-right">
                <button className="btn-primary" onClick={() => navigate("/test")}>
                  <Ic.Plus /> Nouveau diagnostic
                </button>
              </div>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="db-grid">

              {/* ══════════ COLONNE GAUCHE ══════════ */}
              <div className="db-col-left">

                {/* 1. INFOS PATIENT */}
                <div className="db-card">
                  <div className="card-title">
                    <div className="card-title-icon"><Ic.User /></div>
                    Mon profil
                  </div>

                  <div className="patient-avatar">
                    {user ? getInitials(user.nom, user.prenom) : ""}
                  </div>
                  <div className="patient-name">{user.prenom} {user.nom}</div>
                  <div className="patient-email">{user.email}</div>

                  <div className="patient-meta">
                    <div className="meta-row">
                      <span className="meta-label"><Ic.Age /> Âge</span>
                      <span className="meta-value">{patient.age} ans</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label"><Ic.Gender /> Sexe</span>
                      <span className="meta-value">{patient.sexe}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label"><Ic.Calendar /> Inscription</span>
                      <span className="meta-value">{formatDate(user.date_inscription)}</span>
                    </div>
                  </div>
                </div>

                {/* 5. STATISTIQUES */}
                <div className="db-card">
                  <div className="card-title">
                    <div className="card-title-icon"><Ic.Activity /></div>
                    Statistiques
                  </div>

                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-icon"><Ic.Tests /></div>
                      <div className="stat-number">{diagno.length}<span>×</span></div>
                      <div className="stat-label">Tests total</div>
                    </div>

                    <div className="stat-item"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className="stat-icon"><Ic.Percent /></div>
                      <div className={`stat-number ${globalScore  > 50 ? "red" : "green"}`}>
                        {globalScore}%
                      </div>
                      <div className="stat-label">Niveau de risque</div>
                    </div>

                    <div className="stat-item">
                      <div className="stat-icon"><Ic.Trend /></div>
                      <div style={{marginTop:4}}>
                        {stats.evolution === "down" && (
                          <div className="evolution-badge ev-down">
                            <Ic.TrendDown /> Amélioration
                          </div>
                        )}
                        {stats.evolution === "up" && (
                          <div className="evolution-badge ev-up">
                            <Ic.Trend /> Dégradation
                          </div>
                        )}
                        {stats.evolution === "flat" && (
                          <div className="evolution-badge ev-flat">
                            — Stable
                          </div>
                        )}
                    </div>
                    <div className="stat-label" style={{marginTop:6}}>Évolution</div>
                    </div>
                  </div>
                </div>

                {/* 6. GESTION COMPTE */}
                <div className="db-card">
                  <div className="card-title">
                    <div className="card-title-icon"><Ic.Edit /></div>
                    Mon compte
                  </div>

                  <div className="account-actions">
                    <button
                      className="account-btn"
                      onClick={handleChangeprofile}
                    >
                      <div className="account-btn-icon"><Ic.Edit /></div>
                      <div>
                        <div className="account-btn-label">Modifier le profil</div>
                        <div className="account-btn-sub">Nom, email, mot de passe</div>
                      </div>
                      <span className="account-btn-arrow"><Ic.Arrow /></span>
                    </button>

                    <button
                      className="account-btn danger"
                      onClick={handleLogout}
                    >
                      <div className="account-btn-icon"><Ic.Logout /></div>
                      <div>
                        <div className="account-btn-label">Se déconnecter</div>
                        <div className="account-btn-sub">Fermer la session</div>
                      </div>
                      <span className="account-btn-arrow"><Ic.Arrow /></span>
                    </button>
                  </div>
                </div>

              </div>

              {/* ══════════ COLONNE DROITE ══════════ */}
              <div className="db-col-right">

                {/* 2. DERNIER DIAGNOSTIC */}
                <div className="db-card">
                  <div className="card-title">
                    <div className="card-title-icon"><Ic.Activity /></div>
                    Dernier diagnostic
                  </div>

                 {diagno.length > 0 ? (
                  <>
                    <div
                      className={`last-diag-result ${
                        diagno[diagno.length - 1].prediction_result
                          ? "diabetic"
                          : "non-diabetic"
                      }`}
                    >
                      <div className="ldr-icon">
                        {diagno[diagno.length - 1].prediction_result ? "⚠️" : "✅"}
                      </div>

                      <div>
                        <div className="ldr-label">
                          {diagno[diagno.length - 1].prediction_result
                            ? "Risque détecté"
                            : "Aucun risque détecté"}
                        </div>

                        <div className="ldr-value">
                          {diagno[diagno.length - 1].prediction_result
                            ? "Risque de diabète"
                            : "Pas de risque détecté"}
                        </div>
                      </div>
                    </div>

                    <div className="ldr-meta for_margin">
                      <div className="ldr-meta-item">
                        <div className="ldr-meta-label">Probabilité</div>
                        <div
                          className={`ldr-meta-value ${
                            diagno[diagno.length - 1].prediction_probability > 0.5
                              ? "prob-high"
                              : "prob-low"
                          }`}
                        >
                          {(diagno[diagno.length - 1].prediction_probability * 100).toFixed(2)}%
                        </div>
                      </div>

                      <div className="ldr-meta-item">
                        <div className="ldr-meta-label">Date du test</div>
                        <div className="ldr-meta-value" style={{ fontSize: "15px" }}>
                          {formatDate(diagno[diagno.length - 1].diagnostic_date)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="history-empty">
                    <div className="history-empty-icon">🔬</div>
                    <p>
                      Aucun diagnostic effectué.
                      <br />
                      Lancez votre premier test !
                    </p>
                  </div>
                )}
                {/* 4. NOUVEAU TEST (CTA) */}
                <div className="db-card" style={{
                  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                  flexWrap: "wrap",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: "6px",
                    }}>
                      Faire un nouveau test
                    </div>
                    <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      Obtenez une analyse ML de votre profil en moins de 2 secondes.
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/test")}
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      boxShadow: "none",
                      backdropFilter: "blur(8px)",
                      flexShrink: 0,
                    }}
                  >
                    <Ic.Plus /> Nouveau diagnostic
                  </button>
                </div>

                {/* 3. HISTORIQUE */}
                <div className="db-card">
                  <div className="history-header">
                    <div className="card-title" style={{margin:0}}>
                      <div className="card-title-icon"><Ic.Calendar /></div>
                      Historique des tests
                    </div>
                    <span className="history-count">{diagno.length} test{history.length > 1 ? "s" : ""}</span>
                  </div>

                  {diagno.length === 0 ? (
                    <div className="history-empty">
                      <div className="history-empty-icon">📋</div>
                      <p>Aucun historique disponible.</p>
                    </div>
                  ) : (
                    <div className="history-list">
                      {diagno.map((item,index) => {
                        const prob = item.prediction_probability;
                        const confidence = item.prediction_result ? prob : 1 - prob;
                        return (
                            <div className="history-row" key={index + 1}>
                              <div className="history-index">#{index + 1}</div>
                              <div className="history-date">{formatDate(item.diagnostic_date)}</div>
                              <span
                                  className={`history-badge ${item.prediction_result === true ? "badge-diabetic" : "badge-non-diabetic"}`}>
                            {item.prediction_result === true ? "⚠️" : "✅"} {item.prediction_result}
                          </span>
                              <span
                                  className={`result-label-badge ${item.prediction_result === true ? "result-diabetic" : "result-healthy"}`}>
                            {item.prediction_result === true ? "Diabétique" : "Non-Diabétique"}
                          </span>
                              <div
                                  className={`history-prob ${item.prediction_probability > 0.5 ? "prob-high" : "prob-low"}`}>
                                {(confidence * 100).toFixed(2)}%
                              </div>
                              <button
                                  className="btn-detail"
                                  onClick={() => handlebutton(item.id_diagnose,item,confidence)}
                              >
                                <Ic.Eye/> Détails
                              </button>
                            </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
        </div>
      {showDetail && <DiagnosticDetail diagnostic={formData} confiance={confidence} onClose={() => setShowDetail(false)}/>}
      {loading && <Loading />}
      </div>
      </div>
        <DiabetesFooter/>
    </>
  );
}

