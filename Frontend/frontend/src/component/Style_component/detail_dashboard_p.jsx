import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  Calendar:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  User:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Gender:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v9M9 18h6"/></svg>,
  Heart:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Activity:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Cigarette: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 12H2v4h16v-4z"/><path d="M22 12v4"/><path d="M7 12v4"/></svg>,
  Scale:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  Droplet:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  Zap:       () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Close:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Plus:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  ID:        () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
const formatDate = (isoDate) => {
    return isoDate.replace("T", " ").split(".")[0];
};

function boolLabel(val) {
  return val ? "Oui" : "Non";
}

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
export default function DiagnosticDetail({ diagnostic,confiance, onClose }) {
  const navigate  = useNavigate();
  const [closing, setClosing] = useState(false);
  
  const isDiabetic =
      diagnostic.prediction_result === true;
  const probPct    = Math.round(confiance * 100 * 100) / 100;
  console.log(boolLabel(boolLabel(diagnostic.hypertension)))

  /* ── Fermeture avec animation ── */
  const handleClose = () => {
    setClosing(true);
    document.body.style.overflow = "";   // ← ajout
    setTimeout(() => onClose?.(), 200);
  };

  /* ── Fermeture avec Escape ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={`modal-overlay ${closing ? "closing" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className={`modal-box ${closing ? "closing" : ""}`}>

        {/* ── HEADER ── */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className={`modal-header-icon ${isDiabetic ? "diabetic" : "non-diabetic"}`}>
              {isDiabetic ? "⚠️" : "✅"}
            </div>
            <div>
              <div className="modal-header-title">Détails du diagnostic</div>
              <div className="modal-header-sub">
                <Ic.ID /> Test #{diagnostic.id_diagnose} &nbsp;·&nbsp;
                <Ic.Calendar /> {formatDate(diagnostic.diagnostic_date)}
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={handleClose} aria-label="Fermer">
            <Ic.Close />
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="modal-body">

          {/* Résultat principal */}
          <div className={`result-banner ${isDiabetic ? "diabetic" : "non-diabetic"}`}>
            <div className="rb-left">
              <div className="rb-emoji">{isDiabetic ? "⚠️" : "✅"}</div>
              <div>
                <div className="rb-label">
                  {isDiabetic ? "Risque détecté" : "Aucun risque détecté"}
                </div>
                <div className="rb-value">
                  {isDiabetic ? "Diabétique" : "Non-Diabétique"}
                </div>
              </div>
            </div>
            <div className="rb-prob">
              <div className="rb-prob-label">Probabilité</div>
              <div className="rb-prob-value">{probPct}%</div>
            </div>
          </div>

          {/* Paramètres cliniques */}
          <div>
            <div className="modal-section-title">
              <Ic.Activity /> Paramètres cliniques
            </div>
            <div className="params-grid">

              <div className="param-card">
                <div className="param-icon"><Ic.Gender /></div>
                <div>
                  <div className="param-label">Genre</div>
                  <div className="param-value">
                    {diagnostic.genre === "Male" ? "Homme" : diagnostic.genre === "Female" ? "Femme" : diagnostic.genre}
                  </div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.User /></div>
                <div>
                  <div className="param-label">Âge</div>
                  <div className="param-value">{diagnostic.age} ans</div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.Activity /></div>
                <div>
                  <div className="param-label">Hypertension</div>
                  <div className="param-value" style={{ color: boolLabel(diagnostic.hypertension) ? "#dc2626" : "#16a34a" }}>
                    {boolLabel(diagnostic.hypertension)}
                  </div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.Heart /></div>
                <div>
                  <div className="param-label">Maladie cardiaque</div>
                  <div className="param-value" style={{ color: boolLabel(diagnostic.heart_disease) ? "#dc2626" : "#16a34a" }}>
                    {boolLabel(diagnostic.heart_disease)}
                  </div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.Cigarette /></div>
                <div>
                  <div className="param-label">Tabagisme</div>
                  <div className="param-value">{diagnostic.smoking_history}</div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.Scale /></div>
                <div>
                  <div className="param-label">IMC (BMI)</div>
                  <div className="param-value">{diagnostic.bmi}</div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.Droplet /></div>
                <div>
                  <div className="param-label">HbA1c</div>
                  <div className="param-value">{diagnostic.HbA1c_level} %</div>
                </div>
              </div>

              <div className="param-card">
                <div className="param-icon"><Ic.Zap /></div>
                <div>
                  <div className="param-label">Glucose</div>
                  <div className="param-value">{diagnostic.blood_glucose_level} mg/dL</div>
                </div>
              </div>

            </div>
          </div>

          {/* Infos générales */}
          <div>
            <div className="modal-section-title">
              <Ic.ID /> Informations générales
            </div>
            <div className="info-rows">
              <div className="info-row">
                <span className="info-row-label"><Ic.ID /> ID du diagnostic</span>
                <span className="info-row-value">#{diagnostic.id_diagnose}</span>
              </div>
              <div className="info-row">
                <span className="info-row-label"><Ic.Calendar /> Date & heure</span>
                <span className="info-row-value">{formatDate(diagnostic.diagnostic_date)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── FOOTER ── */}
        <div className="modal-footer">
          <button className="btn-modal-close" onClick={handleClose}>
            <Ic.Close /> Fermer
          </button>
          <button className="btn-modal-new" onClick={() => { handleClose(); navigate("/test"); }}>
            <Ic.Plus /> Nouveau test
          </button>
        </div>

      </div>
    </div>
  );
}
