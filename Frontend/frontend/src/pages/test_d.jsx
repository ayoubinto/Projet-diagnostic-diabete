import HeaderHero from "../component/navbar.jsx";
import heroBg from "../assets/Background_accueil/18066.jpg";
import DiabetesFooter from "../component/footer.jsx";
import {useEffect, useState} from "react";
import Pop_up_test from "../component/Style_component/pop_up_page_test.jsx";


const Icons = {
  User: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Heart: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Activity: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Cigarette: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <path d="M18 12H2v4h16v-4z"/>
      <path d="M22 12v4"/>
      <path d="M7 12v4"/>
      <path d="M18 8c0-2.5 2-2.5 2-5"/>
      <path d="M22 8c0-2.5 2-2.5 2-5"/>
    </svg>
  ),
  Scale: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  Droplet: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2.2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  RefreshCw: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  Shield: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Clock: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Info: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="Nonne" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
};

/* ─── NUMBER INPUT ───────────────────────── */
function NumberField({
  id,
  name,
  value,
  onChange,
  placeholder,
  min = 0,
  max = 9999,
  step = 1
}) {
  const emitChange = (val) => {
    onChange({
      target: {
        name: name,
        value: val
      }
    });
  };

  const dec = () => {
    const newVal = Math.max(min, parseFloat((parseFloat(value || 0) - step).toFixed(2)));
    emitChange(String(newVal));
  };

  const inc = () => {
    const newVal = Math.min(max, parseFloat((parseFloat(value || 0) + step).toFixed(2)));
    emitChange(String(newVal));
  };

  return (
    <div className="number-wrap">
      <button type="button" className="number-btn" onClick={dec}>
        −
      </button>

      <span className="number-divider" />

      <input
        id={id}
        name={name}
        type="number"
        className="number-input"
        value={value ?? ""}
        onChange={(e) => emitChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />

      <span className="number-divider" />

      <button type="button" className="number-btn" onClick={inc}>
        +
      </button>
    </div>
  );
}

/* ─── SELECT FIELD ───────────────────────── */
function SelectField({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Sélectionner..."
}) {
  return (
    <div className="select-wrap">
      <select
        id={id}
        name={name}
        className={`form-select ${!value ? "placeholder-selected" : ""}`}
        value={value ?? ""}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─── INITIAL STATE ──────────────────────── */
const initialForm = {
  gender:       "",
  age:          "",
  hypertension: "",
  heartDisease: "",
  smoking:      "",
  bmi:          "",
  hba1c:        "",
  glucose:      "",
};

/* ─── FILLED COUNT ───────────────────────── */
const countFilled = (form) =>
  Object.values(form).filter(v => v !== "" && v !== null && v !== undefined).length;
function Test_D(){
    const [formData, setFormData] = useState({
      gender: "",
      age: "",
      hypertension: "",
      heart_disease: "",
      smoking_history: "",
      bmi: "",
      HbA1c_level: "",
      blood_glucose_level: ""
    });
    const [result, setResult]   = useState(null);   // null | "positive" | "negative"
    const [pred, setPred] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [confidence,setConfidence] = useState(null)
    const [au,setAu] = useState(false)
    const filled = countFilled(formData);
    const total  = Object.keys(initialForm).length;
    const pct    = Math.round((filled / total) * 100);
    const [status_champs,setStatus_Champs]=useState("vide")
    const [click_bu , setClick_b] = useState(false);
    const [statusdiagnostique, setstatusdiagnostique] = useState(
      sessionStorage.getItem("statusdiagnostique")
    );
    useEffect(() => {
      sessionStorage.setItem("champs", status_champs);
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    }, [status_champs]);
    const set = (key) => (val) => setFormData(prev => ({ ...prev, [key]: val }));
    const handleReset = () => { setFormData(initialForm); setResult(null); setPred(null); };
    function handleChange(e){
        setFormData({
          ...formData,
          [e.target.name] : e.target.value
        })
        setResult("")
        setPred(null)
        setClick_b(false)
    }
    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
          setError("");
        }, 3500);

        return () => clearTimeout(timer);
    }, [error]);
    function formatDiagnosticData(formData) {
        return {
          genre: formData.gender, // ⚠️ rename ici
          age: parseInt(formData.age),
          hypertension: formData.hypertension === "true",
          heart_disease: formData.heart_disease === "true",
          smoking_history: formData.smoking_history,
          bmi: parseFloat(formData.bmi),
          HbA1c_level: parseFloat(formData.HbA1c_level),
          blood_glucose_level: parseFloat(formData.blood_glucose_level)
        };
      }
    useEffect(() => {
    if (!statusdiagnostique) return;

    const timer = setTimeout(() => {
      setstatusdiagnostique(null);
      sessionStorage.removeItem("statusdiagnostique");
    }, 3500);

    return () => clearTimeout(timer);
}, [statusdiagnostique]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (filled < total) return;
        setLoading(true);
        setResult(null);
        setPred(null);
      try {
          setStatus_Champs("full")
          if(!click_bu){
             const res = await fetch("http://127.0.0.1:8000/predict", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(
                      {
                          gender: formData.gender,
                          age: Number(formData.age),
                          hypertension: formData.hypertension === "1" ? 1 : 0,
                          heart_disease: formData.heart_disease === "1" ? 1 : 0,
                          smoking_history: formData.smoking_history,
                          bmi: Number(formData.bmi),
                          HbA1c_level: Number(formData.HbA1c_level),
                          blood_glucose_level: Number(formData.blood_glucose_level)
                      }
                  ),
            });
            const data = await res.json();
            sessionStorage.setItem("testResult", JSON.stringify(data));
            if(res.ok){
                setResult(data.label);
                setPred(data.prediction)
                setConfidence(data.confidence)
                setClick_b(true)
            }else{
                setResult("")
                setPred(null)
                setError(data.detail)
            }
          }else if(click_bu && au){
              const Datadiagnostic = formatDiagnosticData(formData)
              const token = localStorage.getItem("token");
              const response = await fetch("http://127.0.0.1:8000/diagnostic/", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(Datadiagnostic)
                  })
                const data = await response.json()
              if(response.ok){
                    sessionStorage.setItem("statusdiagnostique","Bon");
                    setstatusdiagnostique("Bon")
                    setClick_b(false);
                    sessionStorage.removeItem("testResult");
                    sessionStorage.removeItem("formData");
                    sessionStorage.removeItem("champs");
              }else{
                    setResult("")
                    setPred(null)
                    setError(data.detail)
              }
          }
      } catch (err) {
        setError("Impossible de contacter le serveur")

        setPred(null)
        setResult("")
      } finally {
        setLoading(false);
      }
    };
    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const res = await fetch("http://127.0.0.1:8000/auth/me", {
                headers: { Authorization: "Bearer " + token }
        });
        if (!res.ok) return false;
            return true;
        } catch {
            return false;
        }
    };
    useEffect(() => {
        const initAuth = async () => {
            const isAuth = await checkAuth();
            if (isAuth) {
                console.log("Utilisateur connecté");
                setAu(true)
            } else {
                console.log("Non connecté");
                setAu(false)
            }
        };
        initAuth();
    }, []);
    useEffect(() => {
      const saveData = sessionStorage.getItem("formData");
      if (saveData) {
        try {
          const parsed = JSON.parse(saveData);
          setFormData(parsed);
        } catch (error) {
          console.error("Erreur JSON formData:", error);
          sessionStorage.removeItem("formData");
        }
      }
      const savedResult = sessionStorage.getItem("testResult");
      if (savedResult) {
        try {
          const result = JSON.parse(savedResult);
          setConfidence(result.confidence);
          setPred(result.prediction);
          console.log(result.prediction)
        } catch (error) {
          console.error("Erreur JSON testResult:", error);
          sessionStorage.removeItem("testResult");
        }
      }
    }, []);
    return (
        <>
            <HeaderHero button_y={false} variant="test" color="#06080F" formData={formData}/>
            <div className="test-page">
                  <div className="test-container">
                    {/* ── HEADER ── */}
                    <div className="test-header">
                      <div className="test-eyebrow">
                        <span className="test-eyebrow-dot" />
                        DiagNonstic IA · Machine Learning
                      </div>
                      <h1 className="test-title">
                        Évaluez votre <span>risque diabétique</span>
                      </h1>
                      <p className="test-subtitle">
                        Remplissez les informations ci-dessous. Nontre modèle ML analysera votre profil en moins de 2 secondes.
                      </p>
                    </div>

                    {/* ── PROGRESS ── */}
                    <div className="test-progress">
                      <span className="progress-label">Progression</span>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="progress-count">{filled} / {total} champs</span>
                    </div>

                    {/* ── FORM CARD ── */}
                    <div className="test-card">
                      <form onSubmit={handleSubmit} noValidate>

                        {/* ── SECTION 1 : PROFIL ── */}
                        <div className="form-section-title">Profil personnel</div>
                        <div className="form-grid">

                          {/* Gender */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="gender">
                              <span className="label-icon"><Icons.User /></span>
                              Genre
                            </label>
                            <SelectField
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              options={[
                                { value: "Male", label: "Homme" },
                                { value: "Female", label: "Femme" }
                              ]}
                            />
                          </div>

                          {/* Age */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="age">
                              <span className="label-icon"><Icons.Calendar /></span>
                              Âge
                            </label>
                            <NumberField
                              id="age"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              placeholder="Ex: 25"
                              min={1}
                              max={120}
                              step={1}
                            />
                            <span className="form-hint">Entre 1 et 120 ans</span>
                          </div>

                        </div>

                        <div className="form-divider" />

                        {/* ── SECTION 2 : ANTÉCÉDENTS ── */}
                        <div className="form-section-title">Antécédents médicaux</div>
                        <div className="form-grid">

                          {/* Hypertension */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="hypertension">
                              <span className="label-icon"><Icons.Activity /></span>
                              Hypertension
                            </label>
                            <SelectField
                              id="hypertension"
                              name="hypertension"
                              value={formData.hypertension}
                              onChange={handleChange}
                              options={[
                                { value: "true", label: "Oui" },
                                { value: "false", label: "Non" }
                              ]}
                            />
                          </div>

                          {/* Heart Disease */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="heartDisease">
                              <span className="label-icon"><Icons.Heart /></span>
                              Maladie cardiaque
                            </label>
                            <SelectField
                              id="heart_disease"
                              name="heart_disease"
                              value={formData.heart_disease}
                              onChange={handleChange}
                              options={[
                                { value: "true", label: "Oui" },
                                { value: "false", label: "Non" }
                              ]}
                            />
                          </div>

                          {/* Smoking History */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="smoking">
                              <span className="label-icon"><Icons.Cigarette /></span>
                              Historique du tabagisme
                            </label>
                            <SelectField
                              id="smoking_history"
                              name="smoking_history"
                              value={formData.smoking_history}
                              onChange={handleChange}
                              options={[
                                { value: "never", label: "Jamais" },
                                { value: "former", label: "Ancien fumeur" },
                                { value: "current", label: "Fumeur actuel" },
                                { value: "not current", label: "Pas actuellement" },
                                { value: "ever", label: "A déjà fumé" },
                                { value: "No Info", label: "Aucune information" }
                              ]}
                            />
                          </div>

                          {/* BMI */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="bmi">
                              <span className="label-icon"><Icons.Scale /></span>
                              BMI (Indice de Masse Corporelle)
                            </label>
                            <NumberField
                              id="bmi"
                              name="bmi"
                              value={formData.bmi}
                              onChange={handleChange}
                              placeholder="Ex: 27.5"
                              min={10}
                              max={70}
                              step={0.1}
                            />
                            <span className="form-hint">Indice de masse corporelle (kg/m²)</span>
                          </div>

                        </div>

                        <div className="form-divider" />

                        {/* ── SECTION 3 : BILAN SANGUIN ── */}
                        <div className="form-section-title">Bilan sanguin</div>
                        <div className="form-grid">

                          {/* HbA1c */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="hba1c">
                              <span className="label-icon"><Icons.Droplet /></span>
                              Taux d’HbA1c
                            </label>
                            <NumberField
                              id="hba1c"
                              name="HbA1c_level"
                              value={formData.HbA1c_level}
                              onChange={handleChange}
                              placeholder="Ex: 6.5"
                              min={3}
                              max={15}
                              step={0.1}
                            />
                            <span className="form-hint">Hémoglobine glyquée (%) — Nonrmal &lt; 5.7</span>
                          </div>

                          {/* Blood Glucose */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="glucose">
                              <span className="label-icon"><Icons.Zap /></span>
                              Taux de glucose sanguin
                            </label>
                            <NumberField
                              id="glucose"
                              name="blood_glucose_level"
                              value={formData.blood_glucose_level}
                              onChange={handleChange}
                              placeholder="Ex: 140"
                              min={50}
                              max={400}
                              step={1}
                            />
                            <span className="form-hint">Glycémie (mg/dL) — Nonrmal &lt; 100 à jeun</span>
                          </div>

                        </div>

                        {/* ── SUBMIT ── */}
                        <div className="form-submit-row">
                          <button type="button" className="form-reset" onClick={handleReset}>
                            <Icons.RefreshCw /> Réinitialiser
                          </button>

                          <button
                            type="submit"
                            className="btn-submit"
                            disabled={filled < total || loading}
                          >
                            {loading ? (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                  style={{ animation: "spin 0.8s linear infinite" }}>
                                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                </svg>
                                Analyse en cours…
                              </>
                            ) : (
                              <>
                                <Icons.Send />
                                {click_bu && au ? "Enregistrer diagnostique" : "Lancer l'analyse"}
                              </>
                            )}
                          </button>
                        </div>
                        {/* ── RESULT ── */}
                        {pred !== null && (
                          <div className={`result-panel ${pred === 1 ? "result-positive" : "result-negative"}`}>
                            <div className="result-icon-wrap">
                              {pred === 1 ? <Icons.AlertCircle /> : <Icons.CheckCircle />}
                            </div>
                            <div className="result-content">
                              <div className="result-label">
                                {pred === 1 ? "Risque élevé détecté" : "Faible risque détecté"}
                              </div>
                              <div className="result-title">
                                {pred === 1 ? "Diabète probable" : "Pas de diabète détecté"}
                              </div>
                              <div className="result-desc">
                                {pred === 1
                                  ? "Votre profil présente plusieurs facteurs de risque associés au diabète. Nonus vous recommandons fortement de consulter un médecin pour un bilan complet."
                                  : "Votre profil ne présente pas de signes significatifs de diabète. Continuez à adopter un mode de vie sain et réalisez des bilans réguliers."}
                              </div>
                              <div className="result-confidence">
                                ● Confiance du modèle : {(confidence * 100).toFixed(1)}%
                              </div>
                                {!au && (
                                    <div className="result-login">Connectez-vous pour enregistrer ce diagnostic et suivre votre historique de résultats.</div>
                                )}
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                      {error && (
                          <Pop_up_test message={error} src='https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie'/>
                      )}
                      { statusdiagnostique !==null &&(
                            <Pop_up_test message="Ce diagnostic a été enregistré." src='https://lottie.host/07f2c023-0a18-4ec2-9ba3-0f48b9052b14/0DTfg1GhGW.lottie'/>
                      )}
                    {/* ── INFO CARDS ── */}
                    <div className="test-info-cards">
                      <div className="info-card">
                        <div className="info-card-icon"><Icons.Clock /></div>
                        <div>
                          <div className="info-card-title">Résultat en &lt; 2s</div>
                          <div className="info-card-desc">Nontre modèle ML analyse votre profil instantanément.</div>
                        </div>
                      </div>
                      <div className="info-card">
                        <div className="info-card-icon"><Icons.Shield /></div>
                        <div>
                          <div className="info-card-title">Données Nonn stockées</div>
                          <div className="info-card-desc">Vos informations ne sont jamais enregistrées sur Nons serveurs.</div>
                        </div>
                      </div>
                      <div className="info-card">
                        <div className="info-card-icon"><Icons.Info /></div>
                        <div>
                          <div className="info-card-title">À titre indicatif</div>
                          <div className="info-card-desc">Ce test ne remplace pas un avis médical professionnel.</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Spin keyframe inline */}
                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </div>
            <DiabetesFooter/>
        </>
    )
}

export default Test_D;
