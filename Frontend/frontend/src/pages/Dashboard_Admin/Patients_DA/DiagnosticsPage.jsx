import { useState, useMemo } from "react";

/* ═══════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════ */
const DIAG_DATA = [
  { id:1,  prenom:"Ayoub",   nom:"El Mansouri", email:"ayoub@mail.ma",   initials:"AE", color:"#2563eb", result:true,  prob:99.47, date:"2026-04-03", gender:"Male",   age:52, hypertension:true,  heart:false, smoking:"Former",  bmi:32.4, hba1c:7.2, glucose:198 },
  { id:2,  prenom:"Sara",    nom:"Benali",       email:"sara@mail.ma",    initials:"SB", color:"#0891b2", result:false, prob:4.20,  date:"2026-04-03", gender:"Female", age:34, hypertension:false, heart:false, smoking:"Never",   bmi:22.1, hba1c:5.1, glucose:85  },
  { id:3,  prenom:"Mohamed", nom:"Alami",        email:"med@mail.ma",     initials:"MA", color:"#7c3aed", result:false, prob:0.00,  date:"2026-04-03", gender:"Male",   age:28, hypertension:false, heart:false, smoking:"Never",   bmi:24.5, hba1c:4.8, glucose:90  },
  { id:4,  prenom:"Fatima",  nom:"Zahrae",       email:"fatima@mail.ma",  initials:"FZ", color:"#0d9488", result:false, prob:0.00,  date:"2026-04-03", gender:"Female", age:41, hypertension:false, heart:false, smoking:"Former",  bmi:26.8, hba1c:5.4, glucose:95  },
  { id:5,  prenom:"Karim",   nom:"Idrissi",      email:"karim@mail.ma",   initials:"KI", color:"#d97706", result:true,  prob:99.60, date:"2026-04-03", gender:"Male",   age:58, hypertension:true,  heart:true,  smoking:"Current", bmi:35.2, hba1c:8.1, glucose:210 },
  { id:6,  prenom:"Nadia",   nom:"Ouali",        email:"nadia@mail.ma",   initials:"NO", color:"#be185d", result:true,  prob:99.60, date:"2026-04-03", gender:"Female", age:49, hypertension:true,  heart:false, smoking:"Former",  bmi:30.1, hba1c:7.5, glucose:185 },
  { id:7,  prenom:"Youssef", nom:"Tazi",         email:"youssef@mail.ma", initials:"YT", color:"#15803d", result:true,  prob:99.52, date:"2026-04-04", gender:"Male",   age:63, hypertension:true,  heart:true,  smoking:"Current", bmi:38.0, hba1c:9.2, glucose:230 },
  { id:8,  prenom:"Imane",   nom:"Chraibi",      email:"imane@mail.ma",   initials:"IC", color:"#b45309", result:true,  prob:99.47, date:"2026-04-04", gender:"Female", age:55, hypertension:false, heart:false, smoking:"Never",   bmi:29.5, hba1c:7.0, glucose:175 },
  { id:9,  prenom:"Hassan",  nom:"Lahlou",       email:"hassan@mail.ma",  initials:"HL", color:"#1d4ed8", result:true,  prob:98.86, date:"2026-04-04", gender:"Male",   age:47, hypertension:true,  heart:false, smoking:"Former",  bmi:31.3, hba1c:6.8, glucose:160 },
  { id:10, prenom:"Leila",   nom:"Moussaoui",    email:"leila@mail.ma",   initials:"LM", color:"#9333ea", result:true,  prob:99.11, date:"2026-04-04", gender:"Female", age:60, hypertension:true,  heart:true,  smoking:"Current", bmi:34.7, hba1c:8.5, glucose:220 },
  { id:11, prenom:"Omar",    nom:"Berrada",      email:"omar@mail.ma",    initials:"OB", color:"#0f766e", result:true,  prob:99.29, date:"2026-04-04", gender:"Male",   age:44, hypertension:false, heart:false, smoking:"Never",   bmi:27.9, hba1c:6.5, glucose:148 },
  { id:12, prenom:"Zineb",   nom:"Filali",       email:"zineb@mail.ma",   initials:"ZF", color:"#c2410c", result:false, prob:8.10,  date:"2026-03-28", gender:"Female", age:30, hypertension:false, heart:false, smoking:"Never",   bmi:21.4, hba1c:4.9, glucose:82  },
  { id:13, prenom:"Ayoub",   nom:"El Mansouri",  email:"ayoub@mail.ma",   initials:"AE", color:"#2563eb", result:false, prob:12.00, date:"2026-03-10", gender:"Male",   age:52, hypertension:true,  heart:false, smoking:"Former",  bmi:30.2, hba1c:5.8, glucose:110 },
  { id:14, prenom:"Sara",    nom:"Benali",       email:"sara@mail.ma",    initials:"SB", color:"#0891b2", result:false, prob:18.00, date:"2026-02-28", gender:"Female", age:34, hypertension:false, heart:false, smoking:"Never",   bmi:22.5, hba1c:5.0, glucose:88  },
  { id:15, prenom:"Karim",   nom:"Idrissi",      email:"karim@mail.ma",   initials:"KI", color:"#d97706", result:true,  prob:76.40, date:"2026-02-14", gender:"Male",   age:58, hypertension:true,  heart:true,  smoking:"Current", bmi:33.5, hba1c:7.8, glucose:195 },
];

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  Search:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Filter:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Eye:      () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Trash:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Close:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Calendar: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  X:        () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  User:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Activity: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Heart:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Gender:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v9M9 18h6"/></svg>,
  Cig:      () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 12H2v4h16v-4z"/><path d="M22 12v4"/></svg>,
  Scale:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  Drop:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  Zap:      () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ArrowUp:  () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>,
  ArrowDn:  () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>,
};

/* ═══════════════════════════════════════
   SHARED STYLES
═══════════════════════════════════════ */
const S = {
  pill: (d) => ({
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11.5, fontWeight: 700, padding: "4px 11px", borderRadius: 100,
    background: d ? "#fef2f2" : "#f0fdf4",
    color:      d ? "#991b1b" : "#14532d",
    border:     `1px solid ${d ? "#fca5a5" : "#86efac"}`,
    whiteSpace: "nowrap",
  }),
  btn: (variant = "default") => ({
    width: 30, height: 30, borderRadius: 7,
    border: "1.5px solid #e2e8f0", background: "#f8fafc",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    color: "#64748b", transition: "all .2s", fontSize: 13,
  }),
  paramCard: {
    background: "#f8fafc", border: "1px solid #e2e8f0",
    borderRadius: 9, padding: "10px 12px",
    display: "flex", alignItems: "center", gap: 9,
  },
  paramIcon: {
    width: 28, height: 28, borderRadius: 7,
    background: "#eff6ff", display: "flex",
    alignItems: "center", justifyContent: "center",
    color: "#2563eb", flexShrink: 0,
  },
};

/* ═══════════════════════════════════════
   DETAIL MODAL
═══════════════════════════════════════ */
function DetailModal({ d, onClose }) {
  const isDiabetic = d.result;

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(10,15,30,.58)", backdropFilter: "blur(5px)",
        zIndex: 9999, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 20,
        animation: "oi .2s ease",
      }}
    >
      <div style={{
        background: "#fff", borderRadius: 18,
        width: "100%", maxWidth: 540, maxHeight: "88vh",
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(10,15,30,.22)",
        animation: "mi .28s cubic-bezier(.34,1.4,.64,1)",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: isDiabetic ? "#fef2f2" : "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {isDiabetic ? "⚠️" : "✅"}
            </div>
            <div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 3 }}>Détails du diagnostic</div>
              <div style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 8 }}>
                <span>🔢 #{d.id}</span>
                <span>·</span>
                <Ic.Calendar /> {d.date.split("-").reverse().join("/")}
                <span>·</span>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: d.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, color: "#fff" }}>{d.initials}</div>
                {d.prenom} {d.nom}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
            <Ic.Close />
          </button>
        </div>

        {/* Body scrollable */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Result banner */}
          <div style={{ borderRadius: 13, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, background: isDiabetic ? "linear-gradient(135deg,#fef2f2,#fff5f5)" : "linear-gradient(135deg,#f0fdf4,#f8fff9)", border: `1.5px solid ${isDiabetic ? "#fca5a5" : "#86efac"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 28 }}>{isDiabetic ? "⚠️" : "✅"}</div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: isDiabetic ? "#dc2626" : "#16a34a", marginBottom: 4 }}>
                  {isDiabetic ? "Risque détecté" : "Aucun risque"}
                </div>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 19, fontWeight: 900, color: isDiabetic ? "#991b1b" : "#14532d" }}>
                  {isDiabetic ? "Diabétique" : "Non-Diabétique"}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10.5, color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Probabilité</div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 30, fontWeight: 900, color: isDiabetic ? "#dc2626" : "#16a34a", lineHeight: 1 }}>{d.prob}%</div>
            </div>
          </div>

          {/* Paramètres cliniques */}
          <div>
            <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "#2563eb", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <Ic.Activity /> Paramètres cliniques
              <div style={{ flex: 1, height: 1, background: "#dbeafe" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {[
                { icon: <Ic.Gender />, label: "Genre",            val: d.gender === "Male" ? "Homme" : "Femme" },
                { icon: <Ic.User />,   label: "Âge",              val: `${d.age} ans` },
                { icon: <Ic.Activity />,label: "Hypertension",    val: d.hypertension ? "Oui" : "Non", red: d.hypertension },
                { icon: <Ic.Heart />,  label: "Maladie cardiaque",val: d.heart ? "Oui" : "Non",       red: d.heart },
                { icon: <Ic.Cig />,    label: "Tabagisme",        val: d.smoking },
                { icon: <Ic.Scale />,  label: "IMC (BMI)",        val: `${d.bmi}` },
                { icon: <Ic.Drop />,   label: "HbA1c",            val: `${d.hba1c} %` },
                { icon: <Ic.Zap />,    label: "Glycémie",         val: `${d.glucose} mg/dL` },
              ].map(p => (
                <div key={p.label} style={S.paramCard}>
                  <div style={S.paramIcon}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>{p.label}</div>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, fontWeight: 800, color: p.red !== undefined ? (p.red ? "#dc2626" : "#16a34a") : "#0f172a" }}>{p.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infos */}
          <div>
            <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "#2563eb", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              🔢 Informations générales
              <div style={{ flex: 1, height: 1, background: "#dbeafe" }} />
            </div>
            {[
              { label: "ID du diagnostic", val: `#${d.id}` },
              { label: "Patient",          val: `${d.prenom} ${d.nom}` },
              { label: "Date & heure",     val: d.date.split("-").reverse().join("/") },
              { label: "Modèle utilisé",   val: "Random Forest v1.0" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 13px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 9, marginBottom: 7 }}>
                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{r.label}</span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#f8fafc", color: "#334155", fontFamily: "'Exo 2',sans-serif", fontSize: 13.5, fontWeight: 700, padding: "9px 22px", borderRadius: 8, border: "1.5px solid #e2e8f0", cursor: "pointer" }}>
            <Ic.Close /> Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CONFIRM DELETE
═══════════════════════════════════════ */
function ConfirmModal({ diag, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,15,30,.55)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "oi .2s ease" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "26px 28px", maxWidth: 380, width: "100%", boxShadow: "0 24px 64px rgba(10,15,30,.2)", animation: "mi .25s cubic-bezier(.34,1.4,.64,1)", textAlign: "center" }}>
        <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22 }}>🗑️</div>
        <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Supprimer ce diagnostic ?</div>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 20 }}>
          Diagnostic <strong style={{ color: "#0f172a" }}>#{diag.id}</strong> de <strong style={{ color: "#0f172a" }}>{diag.prenom} {diag.nom}</strong>. Action irréversible.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#334155", fontFamily: "'Exo 2',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Annuler</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", background: "#dc2626", color: "#fff", fontFamily: "'Exo 2',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(220,38,38,.3)" }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function DiagnosticsPage() {
  const [diags, setDiags]         = useState(DIAG_DATA);
  const [search, setSearch]       = useState("");
  const [filterResult, setFR]     = useState("all");   // "all" | "diabetic" | "non"
  const [filterDate, setFD]       = useState("");       // "YYYY-MM-DD"
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir]     = useState("desc");
  const [detail, setDetail]       = useState(null);
  const [toDelete, setToDelete]   = useState(null);

  /* ── Sort toggle ── */
  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  /* ── Filtered + sorted ── */
  const filtered = useMemo(() => {
    let list = diags.filter(d => {
      const q = search.toLowerCase();
      const matchName = `${d.prenom} ${d.nom} ${d.email}`.toLowerCase().includes(q);
      const matchRes  = filterResult === "all" || (filterResult === "diabetic" ? d.result : !d.result);
      const matchDate = !filterDate || d.date === filterDate;
      return matchName && matchRes && matchDate;
    });
    list = [...list].sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (sortField === "prob") { va = parseFloat(va); vb = parseFloat(vb); }
      if (sortField === "date") { va = new Date(va);   vb = new Date(vb); }
      if (sortField === "result") { va = va ? 1 : 0;  vb = vb ? 1 : 0; }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [diags, search, filterResult, filterDate, sortField, sortDir]);

  const handleDelete = () => {
    setDiags(prev => prev.filter(d => d.id !== toDelete.id));
    setToDelete(null);
  };

  const SortIcon = ({ field }) => (
    <span style={{ marginLeft: 4, opacity: sortField === field ? 1 : 0.3 }}>
      {sortField === field && sortDir === "asc" ? <Ic.ArrowUp /> : <Ic.ArrowDn />}
    </span>
  );

  const totalDiab    = filtered.filter(d => d.result).length;
  const totalNonDiab = filtered.filter(d => !d.result).length;
  const hasFilters   = search || filterResult !== "all" || filterDate;

  return (
    <>
      <style>{`
        @keyframes oi  { from{opacity:0} to{opacity:1} }
        @keyframes mi  { from{opacity:0;transform:scale(.92) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fu  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .drow:hover { background:#f8fafc !important; }
        .btn-eye:hover  { background:#eff6ff !important; border-color:#bfdbfe !important; color:#2563eb !important; }
        .btn-del:hover  { background:#fef2f2 !important; border-color:#fca5a5 !important; color:#dc2626 !important; }
        .sh:hover { cursor:pointer; color:#2563eb !important; }
        .fsel:focus,.finput:focus { border-color:#2563eb !important; box-shadow:0 0 0 3px rgba(37,99,235,.1) !important; outline:none; }
        .active-filter { background:#eff6ff !important; border-color:#bfdbfe !important; color:#2563eb !important; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-.3px", marginBottom: 4 }}>
            Historique des <span style={{ color: "#2563eb" }}>Diagnostics</span>
          </div>
          <div style={{ fontSize: 13, color: "#64748b" }}>{diags.length} diagnostic{diags.length > 1 ? "s" : ""} au total</div>
        </div>
        <div style={{ display: "flex", gap: 9 }}>
          {[
            { label: "Total",        val: diags.length, bg: "#eff6ff", border: "#dbeafe", c: "#2563eb" },
            { label: "Diabétiques",  val: diags.filter(d=>d.result).length, bg: "#fef2f2", border: "#fca5a5", c: "#dc2626" },
            { label: "Non-Diabét.",  val: diags.filter(d=>!d.result).length, bg: "#f0fdf4", border: "#86efac", c: "#16a34a" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 9, padding: "8px 14px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 20, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: s.c, opacity: .7, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTERS BAR ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", boxShadow: "0 1px 3px rgba(15,23,42,.04)" }}>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 200px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px", transition: "border-color .2s" }}>
          <span style={{ color: "#94a3b8" }}><Ic.Search /></span>
          <input
            className="finput"
            type="text"
            placeholder="Rechercher un patient…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#0f172a", background: "transparent" }}
          />
          {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: 0 }}><Ic.X /></button>}
        </div>

        <div style={{ width: 1, height: 32, background: "#f1f5f9" }} />

        {/* Result filter */}
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { val: "all",      label: "Tous" },
            { val: "diabetic", label: "⚠️ Diabétiques" },
            { val: "non",      label: "✅ Non-Diabétiques" },
          ].map(f => (
            <button
              key={f.val}
              onClick={() => setFR(f.val)}
              className={filterResult === f.val ? "active-filter" : ""}
              style={{ padding: "7px 13px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#64748b", fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .18s" }}
            >{f.label}</button>
          ))}
        </div>

        <div style={{ width: 1, height: 32, background: "#f1f5f9" }} />

        {/* Date filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#94a3b8", display: "flex" }}><Ic.Calendar /></span>
          <input
            className="fsel"
            type="date"
            value={filterDate}
            onChange={e => setFD(e.target.value)}
            style={{ border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "7px 10px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#64748b", background: "#f8fafc", cursor: "pointer" }}
          />
          {filterDate && (
            <button onClick={() => setFD("")} style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 6, width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626" }}><Ic.X /></button>
          )}
        </div>

        {/* Reset filters */}
        {hasFilters && (
          <button onClick={() => { setSearch(""); setFR("all"); setFD(""); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 7, border: "1px solid #fca5a5", background: "#fef2f2", color: "#dc2626", fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            <Ic.X /> Effacer filtres
          </button>
        )}

        <div style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8", fontWeight: 500, whiteSpace: "nowrap" }}>
          <Ic.Filter /> {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(15,23,42,.04)", animation: "fu .4s ease both" }}>

        {/* Table head */}
        <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 130px 110px 110px 90px", padding: "11px 20px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
          {[
            { label: "#",          field: null },
            { label: "Patient",    field: null },
            { label: "Résultat",   field: "result" },
            { label: "Probabilité",field: "prob" },
            { label: "Date",       field: "date" },
            { label: "Actions",    field: null },
          ].map((h, i) => (
            <div
              key={i}
              className={h.field ? "sh" : ""}
              onClick={() => h.field && handleSort(h.field)}
              style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: sortField === h.field ? "#2563eb" : "#94a3b8", display: "flex", alignItems: "center" }}
            >
              {h.label}
              {h.field && <SortIcon field={h.field} />}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
            <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, fontWeight: 700, color: "#64748b" }}>Aucun diagnostic trouvé</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Modifiez vos filtres</div>
          </div>
        ) : (
          filtered.map((d, i) => (
            <div
              key={d.id}
              className="drow"
              style={{
                display: "grid", gridTemplateColumns: "44px 1fr 130px 110px 110px 90px",
                padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f8fafc" : "none",
                alignItems: "center", transition: "background .15s",
                animation: `fu .35s ease ${i * 0.03}s both`,
              }}
            >
              {/* ID */}
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, fontWeight: 800, color: "#cbd5e1" }}>#{d.id}</div>

              {/* Patient */}
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: d.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Exo 2',sans-serif", fontSize: 11, fontWeight: 900, color: "#fff", flexShrink: 0 }}>{d.initials}</div>
                <div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{d.prenom} {d.nom}</div>
                  <div style={{ fontSize: 11.5, color: "#94a3b8" }}>{d.email}</div>
                </div>
              </div>

              {/* Result */}
              <div><span style={S.pill(d.result)}>{d.result ? "⚠️ Diabétique" : "✅ Non-Diabétique"}</span></div>

              {/* Prob */}
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, fontWeight: 900, color: d.result ? "#dc2626" : "#16a34a" }}>{d.prob}%</div>

              {/* Date */}
              <div style={{ fontSize: 12.5, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                <Ic.Calendar /> {d.date.split("-").reverse().join("/")}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn-eye" onClick={() => setDetail(d)} title="Voir détails" style={S.btn()}>
                  <Ic.Eye />
                </button>
                <button className="btn-del" onClick={() => setToDelete(d)} title="Supprimer" style={S.btn()}>
                  <Ic.Trash />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div style={{ padding: "11px 20px", borderTop: "1px solid #f1f5f9", background: "#fafbfc", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              <strong style={{ color: "#64748b" }}>{filtered.length}</strong> diagnostics affichés
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#dc2626", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 100, padding: "3px 10px" }}>
                ⚠️ {totalDiab} diabétiques
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 100, padding: "3px 10px" }}>
                ✅ {totalNonDiab} non-diabétiques
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {detail   && <DetailModal  diag={detail}   d={detail}   onClose={() => setDetail(null)} />}
      {toDelete && <ConfirmModal diag={toDelete} onConfirm={handleDelete} onCancel={() => setToDelete(null)} />}
    </>
  );
}
