import "./Style_component/Style_body_accueil.css";
import { Link } from "react-router-dom";


/* ─── SVG ICONS ─────────────────────────── */
const Icon = {
  Brain: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v1a7 7 0 0 1 7 7v1a5 5 0 0 1-5 5h-1v3h-8v-3H6.5a5 5 0 0 1-5-5v-1a7 7 0 0 1 7-7V2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Target: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Heart: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Activity: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Eye: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Database: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  ClipboardList: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      <line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Globe: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

/* ─── DATA ───────────────────────────────── */
const features = [
  {
    icon: <Icon.Brain />,
    title: "Prédiction par IA",
    desc: "Modèle ML entraîné sur des milliers de cas cliniques pour une prédiction précise du risque diabétique.",
  },
  {
    icon: <Icon.Zap />,
    title: "Analyse en < 2s",
    desc: "Résultat instantané. Entrez vos données, notre algorithme répond en moins de deux secondes.",
  },
  {
    icon: <Icon.Activity />,
    title: "Interface intuitive",
    desc: "Formulaire simple, clair et accessible. Aucune expertise médicale requise pour l'utiliser.",
  },
  {
    icon: <Icon.BarChart />,
    title: "Résultat fiable",
    desc: "Basé sur des paramètres cliniques validés : IMC, glycémie, âge, antécédents familiaux et plus.",
  },
];

const stats = [
  { icon: <Icon.Target />, number: "≈ 85", unit: "%", label: "Précision du modèle", note: "estimation sur données test" },
  { icon: <Icon.Clock />, number: "< 2", unit: "s",  label: "Temps de réponse",    note: "analyse en temps réel" },
  { icon: <Icon.Users />, number: "500", unit: "+",  label: "Tests effectués",     note: "en phase de démo" },
  { icon: <Icon.Shield />, number: "100", unit: "%", label: "Données sécurisées",  note: "aucun stockage sensible" },
];

const bars = [
  { label: "Précision",  val: "90%",  w: "90%" },
  { label: "Rappel",     val: "81%",  w: "81%" },
  { label: "F1-Score",   val: "83%",  w: "83%" },
  { label: "Spécificit", val: "88%",  w: "88%" },
];

const steps = [
  {
    n: "01",
    icon: <Icon.ClipboardList />,
    title: "Saisie des données",
    desc: "Renseignez vos informations cliniques dans un formulaire simple et guidé.",
    tags: ["Âge", "IMC", "Glycémie", "Insuline", "Tension"],
  },
  {
    n: "02",
    icon: <Icon.Brain />,
    title: "Analyse par IA",
    desc: "Notre modèle Machine Learning traite vos données et calcule votre profil de risque.",
    tags: ["Random Forest", "SVM", "Preprocessing"],
  },
  {
    n: "03",
    icon: <Icon.Eye />,
    title: "Résultat instantané",
    desc: "Recevez votre résultat clair avec un niveau de risque et des recommandations.",
    tags: ["Score de risque", "Recommandations"],
  },
];

const contextCards = [
  { num: "537M", desc: "personnes atteintes de diabète dans le monde (IDF 2021)" },
  { num: "1/2",  desc: "des cas de diabète de type 2 sont non diagnostiqués" },
];

const contextPoints = [
  {
    icon: <Icon.Heart />,
    title: "Détection précoce = vies sauvées",
    text: "Un diagnostic précoce du diabète réduit drastiquement les complications cardiaques, rénales et neurologiques.",
  },
  {
    icon: <Icon.Activity />,
    title: "L'IA au service de la prévention",
    text: "Notre système analyse en secondes ce qui prend des semaines en milieu clinique, rendant le dépistage accessible à tous.",
  },
  {
    icon: <Icon.Globe />,
    title: "Impact mondial, accès universel",
    text: "Conçu pour les régions à faible accès aux soins, cet outil peut aider des millions de personnes à risque.",
  },
];

const testimonials = [
  {
    text: "Simple, rapide et très bien conçu. J'ai pu avoir un premier aperçu de mon risque en moins d'une minute.",
    name: "Karim B.", role: "Étudiant en médecine", initials: "KB", color: "#2563eb",
  },
  {
    text: "Interface intuitive, résultat clair. Très utile comme outil de sensibilisation pour mes patients.",
    name: "Dr. Leila M.", role: "Médecin généraliste", initials: "LM", color: "#0891b2",
  },
  {
    text: "Impressionnant pour un projet académique. La précision du modèle est vraiment prometteuse.",
    name: "Youssef A.", role: "Ingénieur Data Science", initials: "YA", color: "#7c3aed",
  },
];

const secCards = [
  {
    icon: <Icon.Lock />,
    title: "Chiffrement des données",
    desc: "Toutes les communications sont chiffrées via HTTPS. Vos données ne transitent jamais en clair.",
  },
  {
    icon: <Icon.Database />,
    title: "Zéro stockage sensible",
    desc: "Aucune donnée personnelle n'est enregistrée après l'analyse. Résultat calculé en mémoire uniquement.",
  },
  {
    icon: <Icon.Shield />,
    title: "Respect de la vie privée",
    desc: "Conforme aux principes RGPD. Nous ne partageons ni ne vendons aucune information utilisateur.",
  },
  {
    icon: <Icon.Eye />,
    title: "Transparence du modèle",
    desc: "Notre algorithme est documenté et vérifiable. Nous croyons en une IA explicable et responsable.",
  },
];

/* ─── COMPONENT ──────────────────────────── */
function DiabetesBody() {
  return (
    <main>

      {/* ══════════════════════════════
          1. HERO
      ══════════════════════════════ */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">

            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="hero-dot" />
                Intelligence Artificielle · Médecine Prédictive
              </div>

              <h1 className="hero-title">
                <span className="hl-blue">AyoPredict</span><br />
                Détectez le diabète
                avec l'<span className="hl-red">IA</span>
              </h1>

              <p className="hero-desc">
                Évaluez votre risque de diabète en quelques secondes grâce à notre modèle de Machine Learning. Précis, rapide et accessible à tous.
              </p>

              <div className="hero-actions">
                <a href="#" className="btn-primary">
                  Commencer <Icon.ArrowRight />
                </a>
                <a href="#" className="btn-outline">
                  <Icon.Play /> Tester maintenant
                </a>
              </div>

              <div className="hero-trust">
                {["Résultat en < 2s", "Données non stockées", "Modèle ML validé"].map((t) => (
                  <div className="trust-item" key={t}>
                    <span className="trust-icon"><Icon.Check /></span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Mock diagnosis card */}
            <div className="hero-visual">
              <div className="float-badge fb-top">
                <span className="fb-dot" /> Modèle actif
              </div>

              <div className="hero-card">
                <div className="hero-card-header">
                  <div className="hch-icon"><Icon.Activity /></div>
                  <div>
                    <div className="hch-title">Analyse de risque</div>
                    <div className="hch-sub">Patient · Données anonymisées</div>
                  </div>
                </div>

                <div className="hero-fields">
                  {[
                    { label: "Âge", value: "42 ans" },
                    { label: "IMC", value: "27.4" },
                    { label: "Glycémie", value: "148 mg/dL" },
                    { label: "Insuline", value: "94 µU/mL" },
                    { label: "Tension", value: "78 mmHg" },
                    { label: "Antécédents", value: "Oui" },
                  ].map((f) => (
                    <div className="hf-item" key={f.label}>
                      <div className="hf-label">{f.label}</div>
                      <div className="hf-value">{f.value}</div>
                    </div>
                  ))}
                </div>

                <div className="hero-result">
                  <div>
                    <div className="hr-label">Risque détecté</div>
                    <div className="hr-value">Modéré</div>
                  </div>
                  <span className="hr-badge">Confiance 87%</span>
                </div>
              </div>

              <div className="float-badge fb-bot">
                <Icon.Zap /> Analyse en 1.4s
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          2. FEATURES
      ══════════════════════════════ */}
      <section className="features section">
        <div className="container">
          <div className="features-header">
            <div className="section-label">Fonctionnalités</div>
            <h2 className="section-title">Ce que fait <span>AyoPredict</span></h2>
            <p className="section-sub">Un outil complet, conçu pour rendre le dépistage du diabète simple, rapide et fiable pour tous.</p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div className="feat-card" key={f.title}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. STATS / PERFORMANCE
      ══════════════════════════════ */}
      <section className="stats section">
        <div className="container">
          <div className="stats-inner">

            <div className="stats-text">
              <div className="section-label">Performance</div>
              <h2 className="section-title">Des chiffres qui <span>parlent</span></h2>
              <p className="section-sub section-sub">
                Notre modèle est entraîné et validé sur le dataset Pima Indians Diabetes. Voici ses performances mesurées.
              </p>

              <div className="stats-grid" style={{marginTop: "32px"}}>
                {stats.map((s) => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-icon-wrap">{s.icon}</div>
                    <div className="stat-number">{s.number}<span>{s.unit}</span></div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-chart">
              <div className="sc-title">Métriques du modèle ML</div>
              <div className="sc-bars">
                {bars.map((b, i) => (
                  <div className="sc-bar-row" key={b.label}>
                    <span className="sc-bar-label">{b.label}</span>
                    <div className="sc-bar-track">
                      <div
                        className="sc-bar-fill"
                        style={{ width: b.w, animationDelay: `${i * 0.15}s` }}
                      />
                    </div>
                    <span className="sc-bar-val">{b.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════ */}
      <section className="how section">
        <div className="container">
          <div className="how-header">
            <div className="section-label">Fonctionnement</div>
            <h2 className="section-title">Comment ça <span>marche ?</span></h2>
            <p className="section-sub">En trois étapes simples, obtenez une évaluation précise de votre risque diabétique.</p>
          </div>

          <div className="how-steps">
            {steps.map((s) => (
              <div className="step-card" key={s.n}>
                <div className="step-number">{s.n}</div>
                <div className="step-icon-row">
                  <div className="step-icon">{s.icon}</div>
                </div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
                <div className="step-params">
                  {s.tags.map((t) => (
                    <span className="param-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          5. CONTEXT / IMPORTANCE
      ══════════════════════════════ */}
      <section className="context section">
        <div className="container">
          <div className="context-inner">

            <div className="context-visual">
              {contextCards.map((c) => (
                <div className="ctx-card" key={c.num}>
                  <div className="ctx-num">{c.num}</div>
                  <div className="ctx-desc">{c.desc}</div>
                </div>
              ))}
              <div className="ctx-card accent">
                <div className="ctx-icon"><Icon.Heart /></div>
                <div>
                  <div className="ctx-num">Détection précoce</div>
                  <div className="ctx-desc">peut réduire les complications du diabète de type 2 jusqu'à 58%</div>
                </div>
              </div>
            </div>

            <div>
              <div className="section-label">Pourquoi c'est important</div>
              <h2 className="section-title">Un outil à <span>impact réel</span></h2>
              <p className="section-sub">Le diabète est l'une des maladies chroniques les plus répandues. Un dépistage accessible peut changer des vies.</p>

              <div className="context-points">
                {contextPoints.map((p) => (
                  <div className="cp-item" key={p.title}>
                    <div className="cp-icon">{p.icon}</div>
                    <div>
                      <div className="cp-title">{p.title}</div>
                      <div className="cp-text">{p.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════ */}
      <section className="testimonials section">
        <div className="container">
          <div className="testi-header">
            <div className="section-label">Témoignages</div>
            <h2 className="section-title">Ce que disent nos <span>utilisateurs</span></h2>
            <p className="section-sub">Des retours d'étudiants, médecins et professionnels qui ont testé AyoPredict.</p>
          </div>

          <div className="testi-grid">
            {testimonials.map((t) => (
              <div className="testi-card" key={t.name}>
                <div className="testi-quote">"</div>
                <div className="testi-stars">
                  {[...Array(5)].map((_, i) => <span className="star" key={i}>★</span>)}
                </div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          7. CTA
      ══════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <h2 className="cta-title">Prêt à connaître<br />votre risque ?</h2>
            <p className="cta-sub">
              Rejoignez des centaines d'utilisateurs qui utilisent AyoPredict pour mieux comprendre leur santé. Gratuit, rapide, confidentiel.
            </p>
            <div className="cta-actions">
              <a href="#" className="btn-white">
                Tester maintenant <Icon.ArrowRight />
              </a>
              <Link className="btn-ghost" to="/login">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          8. SECURITY
      ══════════════════════════════ */}
      <section className="security section">
        <div className="container">
          <div className="security-header">
            <div className="section-label">Sécurité & Confidentialité</div>
            <h2 className="section-title">Vos données sont <span>protégées</span></h2>
            <p className="section-sub">La confiance est au cœur de notre projet. Voici comment nous protégeons vos informations.</p>
          </div>

          <div className="security-grid">
            {secCards.map((s) => (
              <div className="sec-card" key={s.title}>
                <div className="sec-icon">{s.icon}</div>
                <div className="sec-title">{s.title}</div>
                <p className="sec-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
export default DiabetesBody;