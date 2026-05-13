import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import PatientsPage from "./Patients_DA/PatientsPage.jsx";
import DiagnosticsPage from "./Patients_DA/DiagnosticsPage.jsx";
import Pop_up_test from "../../component/Style_component/pop_up_page_test.jsx";
import Analyses from "./Patients_DA/AnalyticsPage.jsx";
import heroBg from "../../assets/icon_login/12.png";

/* ═══════════════════════════════════════
   MOCK DATA — remplacez par vos vraies données
═══════════════════════════════════════ */

const MONTHLY_DATA = [
  { month: "Janvier",  total: 42, diabetic: 10 },
  { month: "Février",  total: 58, diabetic: 14 },
  { month: "Mars",     total: 65, diabetic: 16 },
  { month: "Avril",    total: 71, diabetic: 18 },
  { month: "Mai",      total: 55, diabetic: 12 },
  { month: "Juin",     total: 59, diabetic: 10 },
];

const RECENT_DIAGNOSTICS = [
  { id: 1, name: "Ayoub El Mansouri", email: "ayoub@mail.ma",   initials: "AE", color: "#2563eb", result: true,  prob: 99.5,  date: "05/04/2026" },
  { id: 2, name: "Sara Benali",       email: "sara@mail.ma",    initials: "SB", color: "#0891b2", result: false, prob: 4.2,   date: "04/04/2026" },
  { id: 3, name: "Mohamed Alami",     email: "med@mail.ma",     initials: "MA", color: "#7c3aed", result: true,  prob: 87.3,  date: "04/04/2026" },
  { id: 4, name: "Fatima Zahrae",     email: "fatima@mail.ma",  initials: "FZ", color: "#0d9488", result: false, prob: 8.1,   date: "03/04/2026" },
  { id: 5, name: "Karim Idrissi",     email: "karim@mail.ma",   initials: "KI", color: "#d97706", result: true,  prob: 76.4,  date: "03/04/2026" },
];

const ACTIVITY = [
  { type: "blue",  icon: "👤", text: <><strong>Nouveau patient</strong> — Ayoub El Mansouri s'est inscrit</>,          time: "il y a 5 min" },
  { type: "red",   icon: "⚠️", text: <><strong>Diagnostic positif</strong> — Test #11 : Diabétique (99.5%)</>,         time: "il y a 12 min" },
  { type: "green", icon: "✅", text: <><strong>Diagnostic négatif</strong> — Test #10 : Non-Diabétique (4.2%)</>,      time: "il y a 28 min" },
  { type: "blue",  icon: "👤", text: <><strong>Nouveau patient</strong> — Karim Idrissi s'est inscrit</>,              time: "il y a 1h" },
  { type: "amber", icon: "⚙️", text: <><strong>Modèle ML</strong> — Dernière mise à jour : Random Forest v1.0</>,      time: "il y a 2h" },
];

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  Grid:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Users:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Activity: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  BarChart: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Settings: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Logout:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  User:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Refresh:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Percent:  () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  Clock:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  TrendUp:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

/* ═══════════════════════════════════════
   SIDEBAR NAV CONFIG
═══════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "overview",    label: "Dashboard",    icon: <Ic.Grid />,     badge: null },
  { id: "patients",    label: "Patients",     icon: <Ic.Users />,    badge: "120" },
  { id: "diagnostics", label: "Diagnostics",  icon: <Ic.Activity />, badge: "350" },
  { id: "analytics",   label: "Analytics",    icon: <Ic.BarChart />, badge: null },
  { id: "settings",    label: "Paramètres",   icon: <Ic.Settings />, badge: null },
];

/* ═══════════════════════════════════════
   SUB-PAGES (placeholder)
═══════════════════════════════════════ */
function PlaceholderPage({ icon, title, sub, badge }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">{icon}</div>
      <div className="placeholder-title">{title}</div>
      <p className="placeholder-sub">{sub}</p>
      <span className="placeholder-badge">{badge}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   OVERVIEW PAGE
═══════════════════════════════════════ */
function OverviewPage({formPatient , formDiagnostic , lastfivedgn}) {
  const maxTotal = Math.max(...MONTHLY_DATA.map(d => d.total));
  const [nombre_dg_p,setNombre_dg_p] = useState(null)
  const [nombre_dg_n,setNombre_dg_n] = useState(null)
  const [taux  ,setTaux] = useState(0)
  const [user,setUsers] = useState([])
  const [patient,setPatients] = useState([])
  const [diagno,setDiagnostic] = useState([])
  const formatDate = (isoDate) => {
    return isoDate.replace("T", " ").replace("Z", "").split(".")[0];
  };
  useEffect(() => {
    if (!lastfivedgn.length) return;

    setPatients(lastfivedgn.map(item => item.patient));
    setDiagnostic(lastfivedgn.map(item => item.diagnostic));
    setUsers(lastfivedgn.map(item => item.users));
  }, [lastfivedgn]);
  useEffect(() => {
     if(formDiagnostic){
      let i = 0
      formDiagnostic.forEach((item) => {
        if(item.prediction_result === true){
          i++
        }
      });
      const tau = (i / formDiagnostic.length) * 100;
      setTaux(tau)
      const count = formDiagnostic.filter(
          (item) => item.prediction_result !== true
      ).length;
      setNombre_dg_n(count)
      setNombre_dg_p(i)
      console.log("nombre_dg_p calculé:", i);
      console.log("nombre_dg_n calculé:", count);
    }
  }, [formDiagnostic]);
    function formatIntial(nom,prenom){
        const prem_n = nom.charAt(0).toUpperCase();
        const prem_p = prenom.charAt(0).toUpperCase();
        return prem_n + prem_p
    }
    const colors = [
    "#0891b2",
    "#7c3aed",
    "#0d9488",
    "#d97706",
    "#be185d",
    "#15803d",
    "#b45309",
    "#1d4ed8",
    "#9333ea",
    "#0f766e",
    "#c2410c"
  ];
  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div>
          <div className="page-title">Vue d'ensemble <span>Admin</span></div>
          <div className="page-sub">Tableau de bord · Données en temps réel</div>
        </div>
        <button className="btn-refresh">
          <Ic.Refresh /> Actualiser
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-icon"><Ic.Users /></div>
          <div className="kpi-label">Patients</div>
          <div className="kpi-value">{formPatient.length}</div>
          <span className="kpi-trend trend-up"><Ic.TrendUp /> +12 ce mois</span>
        </div>

        <div className="kpi-card green">
          <div className="kpi-icon"><Ic.Activity /></div>
          <div className="kpi-label">Diagnostics</div>
          <div className="kpi-value">{formDiagnostic.length}</div>
          <span className="kpi-trend trend-up"><Ic.TrendUp /> +28 ce mois</span>
        </div>

        <div className="kpi-card red">
          <div className="kpi-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="kpi-label">Cas positifs</div>
          <div className="kpi-value">{nombre_dg_p}</div>
          <span className="kpi-trend trend-up"><Ic.TrendUp /> +6 ce mois</span>
        </div>

        <div className="kpi-card green">
          <div className="kpi-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div className="kpi-label">Cas négatifs</div>
          <div className="kpi-value">{nombre_dg_n}</div>
          <span className="kpi-trend trend-flat">— stable</span>
        </div>

        <div className="kpi-card amber">
          <div className="kpi-icon"><Ic.Percent /></div>
          <div className="kpi-label">Taux diabète</div>
          <div className="kpi-value">{taux.toFixed(2)}%</div>
          <span className="kpi-trend trend-flat">— estimation</span>
        </div>
      </div>

      {/* Charts row */}
      <div className="dash-grid">

        {/* Bar chart */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="card-title">
              <div className="card-title-icon"><Ic.BarChart /></div>
              Diagnostics mensuels
            </div>
            <span className="card-badge">6 derniers mois</span>
          </div>

          <div className="bar-chart">
            {MONTHLY_DATA.map((d, i) => (
              <div key={d.month}>
                <div className="bar-row" style={{ marginBottom: 4 }}>
                  <div className="bar-label">{d.month}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill blue"
                      style={{ width: `${(d.total / maxTotal) * 100}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  </div>
                  <div className="bar-val" style={{ color: "#2563eb" }}>{d.total}</div>
                </div>
                <div className="bar-row">
                  <div className="bar-label" style={{ fontSize: 11, color: "#94a3b8" }}>dont diabétiques</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill red"
                      style={{ width: `${(d.diabetic / maxTotal) * 100}%`, animationDelay: `${i * 0.1 + 0.05}s` }}
                    />
                  </div>
                  <div className="bar-val" style={{ color: "#dc2626" }}>{d.diabetic}</div>
                </div>
                {i < MONTHLY_DATA.length - 1 && <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "10px 0" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Donut + activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Donut */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="card-title">
                <div className="card-title-icon"><Ic.Percent /></div>
                Répartition
              </div>
            </div>

            <div className="donut-wrap">
              <div className="donut">
                <div className="donut-center">
                  <div className="donut-pct">{taux.toFixed(2)}%</div>
                  <div className="donut-lbl">Diabétiques</div>
                </div>
              </div>

              <div className="donut-legend">
                <div className="dl-item">
                  <div className="dl-dot" style={{ background: "#dc2626" }} />
                  <span className="dl-label">Diabétiques</span>
                  <span className="dl-val"></span>
                </div>
                <div className="dl-item">
                  <div className="dl-dot" style={{ background: "#16a34a" }} />
                  <span className="dl-label">Non-Diabétiques</span>
                  <span className="dl-val"></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Recent diagnostics table */}
      <div className="dash-card" style={{ marginBottom: 20 }}>
        <div className="dash-card-header">
          <div className="card-title">
            <div className="card-title-icon"><Ic.Activity /></div>
            Diagnostics récents
          </div>
          <span className="card-badge">5 derniers</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Résultat</th>
              <th>Probabilité</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {lastfivedgn.map((item, index) => (
              <tr key={item.diagnostic.id_diagnose}>

                <td style={{ color: "#94a3b8", fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>#{item.diagnostic.id_diagnose}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="td-avatar" style={{ background: colors[index]}}>{formatIntial(item.user.nom,item.user.prenom)}</div>
                    <div>
                      <div className="td-name">{item.user.nom}</div>
                      <div className="td-email">{item.user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`result-pill ${item.diagnostic.prediction_result ? "pill-diab" : "pill-ndiab"}`}>
                    {item.diagnostic.prediction_result ? "⚠️ Diabétique" : "✅ Non-Diabétique"}
                  </span>
                </td>
                <td>
                  <span className={`prob-text ${item.diagnostic.prediction_probability > 0.5 ? "prob-h" : "prob-l"}`}>
                    {item.diagnostic.prediction_probability.toFixed(2) * 100}%
                  </span>
                </td>
                <td style={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: 5 }}>
                  <Ic.Clock /> {formatDate(item.diagnostic.diagnostic_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity feed */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div className="card-title">
            <div className="card-title-icon"><Ic.Clock /></div>
            Activité récente
          </div>
        </div>
        <div className="activity-list">
          {ACTIVITY.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className={`act-icon ${a.type}`}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="act-text">{a.text}</div>
              </div>
              <div className="act-time">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function AdminDashboard() {
  const [formPatient, setFormPatient] = useState([])
  const [formDiagnostic, setFormDiagnostic] = useState([])
  const [activePage, setActivePage] = useState("overview");
  const [lastdiagno, setLastdiango] = useState([])
  const navigate = useNavigate();
  const [messagePop,setMessagePop] = useState(
        sessionStorage.getItem("Deletepatient")
  )
  useEffect(() => {
      if (!messagePop) return;

      const timer = setTimeout(() => {
        setMessagePop(null);
        sessionStorage.removeItem("Deletepatient");
      }, 3500);

      return () => clearTimeout(timer);
  }, [messagePop]);
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const renderContent = () => {
    switch (activePage) {
      case "overview":    return <OverviewPage formPatient={formPatient} formDiagnostic={formDiagnostic} lastfivedgn={lastdiagno} />;
      case "patients": return <PatientsPage />;
      case "diagnostics": return <DiagnosticsPage />;
      case "analytics":   return <Analyses formDiagnostic={formDiagnostic} />;
      case "settings":    return <PlaceholderPage icon="⚙️" title="Paramètres Système" sub="Configuration du modèle ML, gestion des utilisateurs, sécurité." badge="Administration système" />;
      default:            return <OverviewPage formPatient={formPatient} formDiagnostic={formDiagnostic} lastfivedgn={lastdiagno} />;
    }
  };
  useEffect(() => {
      const fetchDiagnostics = async () => {
          try {
              const response = await fetch("http://127.0.0.1:8000/patients/",{
                headers:{
                  'Content-Type': 'application/json'
                }
              });
              console.log("status:", response.status);
              if(response.ok){
                const data = await response.json()
                console.log(data)
                setFormPatient(data)

              }else{
                const err = await response.json();
                console.log(err)
              }
          }catch (error){
            console.error("Erreur réseau :"+error)
          }
          try {
              const response = await fetch("http://127.0.0.1:8000/diagnostics/",{
                headers:{
                  'Content-Type': 'application/json'
                }
              });
              console.log("status:", response.status);
              if(response.ok){
                const data = await response.json()
                console.log(data)
                setFormDiagnostic(data)

              }else{
                const err = await response.json();
                console.log(err)
              }
          }catch (error){
            console.error("Erreur réseau :"+error)
          }
          try {
              const response = await fetch("http://127.0.0.1:8000/last_five_diagnostic/",{
                headers:{
                  'Content-Type': 'application/json'
                }
              });
              console.log("status:", response.status);
              if(response.ok){
                const data = await response.json()
                setLastdiango(data)
              }else{
                const err = await response.json();
                console.log(err)
              }
          }catch (error){
            console.error("Erreur réseau :"+error)
          }
      }
      fetchDiagnostics();
  }, []);
    useEffect(() => {
  console.log("formPatient updated:", formPatient);
}, [formPatient]);
        useEffect(() => {
  console.log("formDiagnostics updated:", formDiagnostic);
}, [formDiagnostic]);
        useEffect(() => {
  console.log("Last five dgn :", lastdiagno);
}, [lastdiagno]);
  return (
    <div className="admin-shell">

      {/* ══════ SIDEBAR ══════ */}
      <aside className="admin-sidebar">

        <div className="sb-logo">
          <img
            style={{width: "88%" , marginBottom:"-14px", marginLeft:"4px"}}
            src={heroBg}
          />
        </div>

        {/* Admin badge */}
        <div className="sb-admin-badge">
          <div className="sb-admin-avatar">AD</div>
          <div>
            <div className="sb-admin-name">Administrateur</div>
            <div className="sb-admin-role">Super Admin</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sb-nav">
          <div className="sb-nav-section">Navigation</div>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sb-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="sb-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="sb-badge"></span>}
            </button>
          ))}
        </nav>

        {/* Footer logout */}
        <div className="sb-footer">
          <button className="sb-logout" onClick={() => navigate("/login")}>
            <span className="sb-icon"><Ic.Logout /></span>
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* ══════ MAIN ══════ */}
      <main className="admin-main">

        {/* Top bar */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <div className="topbar-breadcrumb">
              Admin &nbsp;/&nbsp; <strong>
                {NAV_ITEMS.find(n => n.id === activePage)?.label || "Dashboard"}
              </strong>
            </div>
          </div>
          <div className="topbar-right">
            <span className="topbar-date">{today}</span>
            <span className="topbar-status">
              <span className="status-dot" /> Système actif
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          {renderContent()}
        </div>

      </main>
      {messagePop && (
          <Pop_up_test message={"Le patient a été retiré avec succès."} src='https://lottie.host/07f2c023-0a18-4ec2-9ba3-0f48b9052b14/0DTfg1GhGW.lottie'/>
      )}
    </div>
  );
}
