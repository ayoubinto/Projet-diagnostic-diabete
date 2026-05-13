import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'

/* ═══════════════════════════════════════
   MOCK PATIENTS DATA
═══════════════════════════════════════ */
const PATIENTS_DATA = [
  { id: 1,  nom: "El Mansouri", prenom: "Ayoub",   email: "ayoub@mail.ma",    inscription: "15/01/2026", diagnostics: 11, initials: "AE", color: "" },
  { id: 2,  nom: "Benali",      prenom: "Sara",     email: "sara@mail.ma",     inscription: "18/01/2026", diagnostics: 3,  initials: "SB", color: "#0891b2" },
  { id: 3,  nom: "Alami",       prenom: "Mohamed",  email: "med@mail.ma",      inscription: "22/01/2026", diagnostics: 5,  initials: "MA", color: "#7c3aed" },
  { id: 4,  nom: "Zahrae",      prenom: "Fatima",   email: "fatima@mail.ma",   inscription: "28/01/2026", diagnostics: 2,  initials: "FZ", color: "#0d9488" },
  { id: 5,  nom: "Idrissi",     prenom: "Karim",    email: "karim@mail.ma",    inscription: "02/02/2026", diagnostics: 7,  initials: "KI", color: "#d97706" },
  { id: 6,  nom: "Ouali",       prenom: "Nadia",    email: "nadia@mail.ma",    inscription: "05/02/2026", diagnostics: 1,  initials: "NO", color: "#be185d" },
  { id: 7,  nom: "Tazi",        prenom: "Youssef",  email: "youssef@mail.ma",  inscription: "10/02/2026", diagnostics: 4,  initials: "YT", color: "#15803d" },
  { id: 8,  nom: "Chraibi",     prenom: "Imane",    email: "imane@mail.ma",    inscription: "14/02/2026", diagnostics: 6,  initials: "IC", color: "#b45309" },
  { id: 9,  nom: "Lahlou",      prenom: "Hassan",   email: "hassan@mail.ma",   inscription: "20/02/2026", diagnostics: 2,  initials: "HL", color: "#1d4ed8" },
  { id: 10, nom: "Moussaoui",   prenom: "Leila",    email: "leila@mail.ma",    inscription: "25/02/2026", diagnostics: 8,  initials: "LM", color: "#9333ea" },
  { id: 11, nom: "Berrada",     prenom: "Omar",     email: "omar@mail.ma",     inscription: "01/03/2026", diagnostics: 3,  initials: "OB", color: "#0f766e" },
  { id: 12, nom: "Filali",      prenom: "Zineb",    email: "zineb@mail.ma",    inscription: "07/03/2026", diagnostics: 5,  initials: "ZF", color: "#c2410c" },
];

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  Search:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Eye:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Trash:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Users:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Filter:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Close:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Activity:() => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Calendar:() => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
};

/* ═══════════════════════════════════════
   CONFIRM DELETE MODAL
═══════════════════════════════════════ */
function ConfirmModal({users, patient,onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(10,15,30,0.55)",
      backdropFilter: "blur(4px)",
      zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
      animation: "overlayIn .2s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16,
        padding: "28px 32px", maxWidth: 400, width: "100%",
        boxShadow: "0 24px 64px rgba(10,15,30,.2)",
        animation: "modalIn .25s cubic-bezier(.34,1.4,.64,1)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#fef2f2", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px", fontSize: 22,
          }}>🗑️</div>
          <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
            Supprimer ce patient ?
          </div>
          <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>
            Vous êtes sur le point de supprimer <strong style={{ color: "#0f172a" }}>{users.nom} {users.prenom}</strong>.
            Cette action est irréversible.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "10px 0", borderRadius: 8,
            border: "1.5px solid #e2e8f0", background: "#f8fafc",
            color: "#334155", fontFamily: "'Exo 2',sans-serif",
            fontSize: 13.5, fontWeight: 700, cursor: "pointer",
          }}>Annuler</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "10px 0", borderRadius: 8,
            border: "none", background: "#dc2626",
            color: "#fff", fontFamily: "'Exo 2',sans-serif",
            fontSize: 13.5, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(220,38,38,.3)",
          }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   DIAGNOSTICS MODAL
═══════════════════════════════════════ */
function DiagnosticsModal({ diagnostic ,patient,users,id_diagnosele, onClose}) {
  const fakeTests = Array.from({ length: diagnostic.length }, (_, i) => ({
    id: i + 1,
    date: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/03/2026`,
    result: i % 3 === 0,
    prob: i % 3 === 0 ? (75 + Math.floor(Math.random() * 24)).toFixed(1) : (Math.floor(Math.random() * 20)).toFixed(1),
  }));

  const formatDate = (isoDate) => {
      return isoDate.replace("T", " ").split(".")[0];
  };
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0,
      background: "rgba(10,15,30,0.55)", backdropFilter: "blur(4px)",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "overlayIn .2s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: 8,
        width: "100%", maxWidth: 520, maxHeight: "80vh",
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(10,15,30,.2)",
        animation: "modalIn .25s cubic-bezier(.34,1.4,.64,1)",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: patient.color, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: "'Exo 2',sans-serif", fontSize: 15, fontWeight: 900, color: "#fff",
            }}>{diagnostic.initials}</div>
            <div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
                {patient.prenom} {patient.nom}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                {patient.diagnostics} diagnostic{patient.diagnostics > 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8,
            border: "1.5px solid #e2e8f0", background: "#f8fafc",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#64748b", transition: "all .2s",
          }}>✕</button>
        </div>

        {/* Table */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["#", "Date", "Résultat", "Probabilité"].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontFamily: "'Exo 2',sans-serif", fontSize: 10,
                    fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "1.5px", color: "#94a3b8",
                    borderBottom: "1px solid #e2e8f0",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diagnostic.filter((d) => id_diagnosele === d.id_pat).map((d, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                      <td style={{ padding: "11px 16px", color: "#94a3b8", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 12.5 }}>#{d.id_diagnose}</td>
                      <td style={{ padding: "11px 16px", fontSize: 13, color: "#64748b" }}>{formatDate(d.diagnostic_date)}</td>
                      <td style={{ padding: "11px 16px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
                          background: d.prediction_result ? "#fef2f2" : "#f0fdf4",
                          color: d.prediction_result ? "#991b1b" : "#14532d",
                          border: `1px solid ${d.prediction_result ? "#fca5a5" : "#86efac"}`,
                        }}>
                          {d.prediction_result ? "⚠️ Diabétique" : "✅ Non-Diabétique"}
                        </span>
                      </td>
                      <td style={{ padding: "11px 16px", fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: 13.5, color: d.prediction_result ? "#dc2626" : "#16a34a" }}>
                        {(d.prediction_probability * 100).toFixed(2)} %
                      </td>
                    </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PATIENTS PAGE
═══════════════════════════════════════ */
export default function PatientsPage() {
  const [patients, setPatients]       = useState([]);
  const [users,setUsers] = useState([])
  const [diagnostic, setDiagnostic] = useState([])
  const [search, setSearch]           = useState("");
  const [toDelete, setToDelete]       = useState(null);
  const [userDelete, setUserDelete] = useState(null);
  const [viewDiag, setViewDiag]       = useState(null);
  const [deletesuccess, setDeleteSuccess] = useState(null);
  const [dianse , setdiagns] = useState(null);
  const uniquepatient = new Set(patients.map(item => item.id_pat))
  function calculer_total(data, id_pat) {
    return data.filter(item => item.id_pat === id_pat).length;
  }
  const navigate = useNavigate();
  /* Filter */
  useEffect(() => {
    if (deletesuccess !== true) return;
    const timer = setTimeout(() => {
        sessionStorage.setItem("Deletepatient",true)
        window.location.reload(false)
    }, 0);

    return () => clearTimeout(timer);
  }, [deletesuccess]);

  useEffect(() => {
      const fetchDiagnostics = async () => {
          try {
              const response = await fetch("http://127.0.0.1:8000/diagnostics_par/",{
                headers:{
                  'Content-Type': 'application/json'
                }
              });
              console.log("status:", response.status);
              if(response.ok){
                const data = await response.json()
                setPatients(data.map(item => item.patient))
                setDiagnostic(data.map(item => item.diagnostic))
                setUsers(data.map(item => item.user))
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
  const usersWithPatient = users.map(user => {
    const patient = patients.find(p => p.id_user === user.id_user);

    return {
      ...user,
      id_pat: patient ? patient.id_pat : null
    };
  });
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
  const uniqueUsers = Array.from(
    new Map(usersWithPatient.map(u => [u.id_user, u])).values()
  );
  function handleAffiher(id_pat){
    setViewDiag(id_pat)
    setdiagns(id_pat)
  }
  const filtered = uniqueUsers.filter(u =>
    `${u.prenom} ${u.nom} ${u.email} ${u.date_inscription} ${u.id_pat}`.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = (id) => {
    const patientDelete = patients.find(p => p.id_pat === id)
    const userDelete = users.find(u => u.id_user === patientDelete.id_user)
    setToDelete(patientDelete)
    setUserDelete(userDelete)
  };
  const confirmDelete = async () => {
    if (!toDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/patient_s/${toDelete.id_pat}`, {
        method: "DELETE",
      });
      if(response.ok){
        const data = await response.json()
        setPatients(prev => prev.filter(p => p.id_pat !== toDelete.id_pat));
        setToDelete(null);
        setDeleteSuccess(true)
      }

    } catch (error) {
      console.error(error);
      setDeleteSuccess(false)
    }
  };
  const formatDate = (isoDate) => {
    return isoDate.replace("T", " ").replace("Z", "").split(".")[0];
  };
  function formatIntial(nom,prenom){
    const prem_n = nom.charAt(0).toUpperCase();
    const prem_p = prenom.charAt(0).toUpperCase();
    return prem_n + prem_p
  }
  console.log(filtered)
  return (
    <>
      <style>{`
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }
        @keyframes modalIn   { from{opacity:0;transform:scale(.92) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .pat-row:hover { background: #f8fafc !important; }
        .btn-eye:hover  { background: #eff6ff !important; border-color: #bfdbfe !important; color: #2563eb !important; }
        .btn-del:hover  { background: #fef2f2 !important; border-color: #fca5a5 !important; color: #dc2626 !important; }
        .search-input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,.1) !important; outline: none; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-.3px", marginBottom: 4 }}>
            Gestion des <span style={{ color: "#2563eb" }}>Patients</span>
          </div>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            {patients.length} patient{patients.length > 1 ? "s" : ""} enregistré{patients.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* Stats rapides */}
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { label: "Total",         val: uniquepatient.size,  color: "#2563eb", bg: "#eff6ff", border: "#dbeafe" },
            { label: "Diagnostics",   val: diagnostic.length, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
          ].map(s => (
            <div key={s.label} style={{
              background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 10, padding: "10px 16px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: s.color, opacity: .7, fontWeight: 600, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      <div style={{
        background: "#fff", border: "1px solid #e2e8f0",
        borderRadius: 12, padding: "14px 18px",
        marginBottom: 16, display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,.05)",
      }}>
        <span style={{ color: "#94a3b8", display: "flex", alignItems: "center" }}><Ic.Search /></span>
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par nom, prénom ou email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, border: "none", outline: "none",
            fontFamily: "'DM Sans',sans-serif", fontSize: 14,
            color: "#0f172a", background: "transparent",
          }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{
            background: "#f1f5f9", border: "none", borderRadius: 6,
            width: 26, height: 26, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", color: "#64748b",
          }}><Ic.Close /></button>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 12.5, borderLeft: "1px solid #f1f5f9", paddingLeft: 12 }}>
          <Ic.Filter />
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* ── TABLE CARD ── */}
      <div style={{
        background: "#fff", border: "1px solid #e2e8f0",
        borderRadius: 16, boxShadow: "0 1px 3px rgba(15,23,42,.05)",
        overflow: "hidden",
        animation: "fadeUp .4s ease both",
      }}>

        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "50px 1.25fr 1.28fr 129px 101px 109px",
          padding: "12px 20px",
          borderBottom: "1px solid #f1f5f9",
          background: "#f8fafc",
        }}>
          {["#", "Patient", "Email", "Inscription", "Tests", "Actions"].map(h => (
            <div key={h} style={{
              overflowX: "auto",
              overflowY: "hidden",
              fontFamily: "'Exo 2',sans-serif", fontSize: 10,
              fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "1.5px", color: "#94a3b8",
            }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
            <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, fontWeight: 700, color: "#64748b" }}>Aucun patient trouvé</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Modifiez votre recherche</div>
          </div>
        ) : (
          filtered.map((p, i) => (
            <div
              key={p.id_user}
              className="pat-row"
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr 1fr 130px 100px 110px",
                padding: "13px 20px",
                borderBottom: i < filtered.length - 1 ? "1px solid #f8fafc" : "none",
                alignItems: "center",
                transition: "background .15s",
                animation: `fadeUp .35s ease ${i * 0.04}s both`,
              }}
            >
              {/* Index */}
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11.5, fontWeight: 800, color: "#cbd5e1" }}>
                {p.id_user}
              </div>

              {/* Patient */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: colors[i], display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 900, color: "#fff",
                  flexShrink: 0,
                }}>{formatIntial(p.nom,p.prenom)}</div>
                <div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>
                    {p.prenom} {p.nom}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ fontSize: 13, color: "#64748b",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",  minWidth: 0 }}>{p.email}</div>

              {/* Date inscription */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8"}}>
                <Ic.Calendar size={14}/>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <span style={{ fontSize: 12.5,color: "#64748b" }}>{formatDate(p.date_inscription).split(" ")[0]}</span>
                  <span style={{ fontSize: 12,color: "#64748b" }}>{formatDate(p.date_inscription).split(" ")[1]}</span>
                </div>
              </div>

              {/* Nb diagnostics */}
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontFamily: "'Exo 2',sans-serif", fontSize: 12.5,
                  fontWeight: 700, color: "#2563eb",
                  background: "#eff6ff", border: "1px solid #dbeafe",
                  borderRadius: 100, padding: "3px 10px",
                }}>
                  <Ic.Activity /> {calculer_total(diagnostic,p.id_pat)}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 7 }}>
                <button
                  className="btn-eye"
                  onClick={() => handleAffiher(p.id_pat)}
                  title="Voir les diagnostics"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: "1.5px solid #e2e8f0", background: "#f8fafc",
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "#64748b", transition: "all .2s",
                  }}
                ><Ic.Eye /></button>

                <button
                  className="btn-del"
                  onClick={() => handleDelete(p.id_pat)}
                  title="Supprimer"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: "1.5px solid #e2e8f0", background: "#f8fafc",
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "#64748b", transition: "all .2s",
                  }}
                ><Ic.Trash /></button>
              </div>
            </div>
          ))
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div style={{
            padding: "12px 20px",
            borderTop: "1px solid #f1f5f9",
            background: "#fafbfc",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 12.5, color: "#94a3b8" }}>
              Affichage de <strong style={{ color: "#64748b" }}>{filtered.length}</strong> sur <strong style={{ color: "#64748b" }}>{filtered.length}</strong> patients
            </span>
            <span style={{
              fontSize: 11.5, fontWeight: 600, color: "#2563eb",
              background: "#eff6ff", border: "1px solid #dbeafe",
              borderRadius: 100, padding: "3px 10px",
            }}>
              Total tests : {diagnostic.length}
            </span>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {toDelete && (
        <ConfirmModal
          users={userDelete}
          patient={toDelete}
          onConfirm={(confirmDelete)}
          onCancel={() => setToDelete(null)}
        />
      )}

      {viewDiag && (
        <DiagnosticsModal
          diagnostic={diagnostic}
          patient={patients}
          users={users}
          id_diagnosele={dianse}
          onClose={() => setViewDiag(null)}
        />
      )}
    </>
  );
}
