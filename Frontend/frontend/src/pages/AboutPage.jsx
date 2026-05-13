import { useNavigate } from "react-router-dom";
import HeaderHero from "../component/navbar.jsx";
import DiabetesFooter from "../component/footer.jsx";

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  Brain:    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9.5 2a2.5 2.5 0 0 1 5 0v1a7 7 0 0 1 7 7v1a5 5 0 0 1-5 5h-1v3h-8v-3H6.5a5 5 0 0 1-5-5v-1a7 7 0 0 1 7-7V2z"/></svg>,
  Zap:      () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Target:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Heart:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Globe:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  BarChart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Users:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Activity: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Code:     () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Database: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Cpu:      () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Check:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowR:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Play:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Lock:     () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const techCards = [
  {
    icon: "🤖",
    title: "Machine Learning",
    desc: "Notre modèle Random Forest est entraîné sur le dataset Pima Indians Diabetes, avec une précision de 85% validée sur des données de test indépendantes.",
    tags: ["Random Forest", "SVM", "Scikit-learn", "Python"],
  },
  {
    icon: "⚡",
    title: "Traitement rapide",
    desc: "L'analyse complète de votre profil s'effectue en moins de 2 secondes. Notre pipeline de prétraitement des données garantit des résultats instantanés.",
    tags: ["FastAPI", "NumPy", "Pandas", "REST API"],
  },
  {
    icon: "🔒",
    title: "Sécurité & Confidentialité",
    desc: "Vos données ne sont jamais stockées. Chaque analyse est traitée en mémoire et effacée immédiatement après. Conformité aux principes RGPD.",
    tags: ["HTTPS", "No storage", "RGPD", "Chiffrement"],
  },
];

const missionBlocks = [
  {
    icon: <Ic.Heart />,
    title: "Santé accessible à tous",
    desc: "Rendre le dépistage du diabète accessible même dans les régions à faible accès aux soins médicaux.",
  },
  {
    icon: <Ic.Globe />,
    title: "Impact mondial",
    desc: "Plus de 537 millions de personnes vivent avec le diabète. Nous voulons contribuer à réduire ce chiffre par la prévention.",
  },
  {
    icon: <Ic.Brain />,
    title: "IA au service de la vie",
    desc: "Utiliser l'intelligence artificielle non pas pour remplacer les médecins, mais pour les aider à détecter plus tôt.",
  },
];

const statsCards = [
  { icon: <Ic.Target />,   num: "≈85%",  label: "Précision du modèle ML" },
  { icon: <Ic.Zap />,      num: "< 2s",  label: "Temps d'analyse" },
  { icon: <Ic.Users />,    num: "537M",  label: "Diabétiques dans le monde" },
  { icon: <Ic.Activity />, num: "100%",  label: "Données sécurisées", accent: true },
];

const teamMembers = [
  {
    initials: "AE",
    name: "Ayoub El Mansouri",
    role: "Lead Developer & ML Engineer",
    bio: "Spécialisé en Machine Learning et développement full-stack. Concepteur du modèle de prédiction et de l'architecture du projet.",
    skills: ["Python", "React", "ML", "FastAPI"],
    color: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
  },
  {
    initials: "MB",
    name: "Mohamed Benali",
    role: "Data Scientist",
    bio: "Expert en traitement des données médicales et en validation des modèles prédictifs pour applications cliniques.",
    skills: ["Scikit-learn", "Pandas", "Statistics", "R"],
    color: "linear-gradient(135deg, #0891b2, #06b6d4)",
  },
  {
    initials: "SA",
    name: "Sara Alami",
    role: "UI/UX Designer & Frontend",
    bio: "Responsable de l'expérience utilisateur et de l'interface. Passionnée par le design médical accessible et intuitif.",
    skills: ["Figma", "React", "CSS", "UX Research"],
    color: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
  },
];

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
export default function AboutPage() {
  const navigate = useNavigate();

  return (
      <>
        <HeaderHero button_y={false} variant="test" color="#06080F"/>
        <div className="about-page">

      {/* ══════════════════════════════
          1. HERO
      ══════════════════════════════ */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-inner">

            <div className="fade-up">
              <div className="hero-eyebrow">
                <span className="hero-dot" />
                À propos d'AyoPredict
              </div>

              <h1 className="hero-title">
                L'<span className="blue">IA</span> au service<br />
                de la lutte contre<br />
                le <span className="red">diabète</span>
              </h1>

              <p className="hero-desc">
                AyoPredict est une plateforme de diagnostic précoce du diabète basée sur le Machine Learning. Développée dans le cadre d'un projet académique, elle vise à rendre le dépistage plus accessible et plus rapide.
              </p>

              <div className="hero-tags">
                {[
                  { icon: <Ic.Brain />,  label: "Machine Learning" },
                  { icon: <Ic.Shield />, label: "Données sécurisées" },
                  { icon: <Ic.Zap />,   label: "Résultat en < 2s" },
                  { icon: <Ic.Heart />, label: "Impact médical réel" },
                ].map((t) => (
                  <span className="hero-tag" key={t.label}>
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="hero-visual fade-up">
              <div className="float-stat fs-top">
                <div className="fs-icon"><Ic.Target /></div>
                Précision : 85%
              </div>

              <div className="visual-card">
                <div className="vc-header">
                  <div className="vc-icon"><Ic.Activity /></div>
                  <div>
                    <div className="vc-title">AyoPredict v1.0</div>
                    <div className="vc-sub">Modèle Random Forest · Dataset Pima</div>
                  </div>
                </div>

                <div className="vc-metrics">
                  {[
                    { val: "85%",  label: "Accuracy" },
                    { val: "81%",  label: "Recall" },
                    { val: "83%",  label: "F1-Score" },
                    { val: "88%",  label: "Specificity" },
                  ].map((m) => (
                    <div className="vc-metric" key={m.label}>
                      <div className="vc-metric-val">{m.val}</div>
                      <div className="vc-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="vc-badge">
                  <span className="vc-badge-dot" />
                  <span className="vc-badge-text">Modèle opérationnel · ML actif</span>
                </div>
              </div>

              <div className="float-stat fs-bot">
                <div className="fs-icon"><Ic.Zap /></div>
                Analyse en 1.4s
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          2. MISSION
      ══════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <div className="mission-inner">

            <div>
              <div className="section-label">Notre mission</div>
              <h2 className="section-title">
                Pourquoi <span>AyoPredict</span> existe ?
              </h2>
              <p className="section-sub">
                Le diabète touche des millions de personnes dans le monde, et la moitié des cas ne sont pas diagnostiqués. Nous croyons que la technologie peut changer cela.
              </p>

              <div className="mission-blocks">
                {missionBlocks.map((b) => (
                  <div className="mission-block fade-up" key={b.title}>
                    <div className="mb-icon">{b.icon}</div>
                    <div>
                      <div className="mb-title">{b.title}</div>
                      <div className="mb-desc">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mission-stats">
              {statsCards.map((s) => (
                <div className={`ms-card fade-up ${s.accent ? "accent" : ""}`} key={s.label}>
                  <div className="ms-icon">{s.icon}</div>
                  <div className="ms-num">{s.num}</div>
                  <div className="ms-label">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. TECHNOLOGIE
      ══════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="tech-header">
            <div className="section-label">Technologie</div>
            <h2 className="section-title">Comment ça <span>fonctionne</span> ?</h2>
            <p className="section-sub">
              AyoPredict repose sur des technologies éprouvées de Machine Learning et une architecture moderne pour garantir précision et rapidité.
            </p>
          </div>

          <div className="tech-grid">
            {techCards.map((t) => (
              <div className="tech-card fade-up" key={t.title}>
                <div className="tc-icon">{t.icon}</div>
                <div className="tc-title">{t.title}</div>
                <p className="tc-desc">{t.desc}</p>
                <div className="tc-tags">
                  {t.tags.map((tag) => (
                    <span className="tc-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          4. ÉQUIPE
      ══════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <div className="team-header">
            <div className="section-label">Notre équipe</div>
            <h2 className="section-title">Les personnes derrière <span>AyoPredict</span></h2>
            <p className="section-sub">
              Une équipe pluridisciplinaire d'étudiants passionnés par l'IA médicale et le développement logiciel.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((m) => (
              <div className="team-card fade-up" key={m.name}>
                <div className="team-avatar" style={{ background: m.color }}>
                  {m.initials}
                </div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
                <div className="team-skills">
                  {m.skills.map((s) => (
                    <span className="team-skill" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          5. CTA
      ══════════════════════════════ */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-inner">
            <h2 className="cta-title">
              Prêt à tester<br />votre risque diabétique ?
            </h2>
            <p className="cta-sub">
              Rejoignez des centaines d'utilisateurs qui font confiance à AyoPredict pour un premier dépistage rapide et fiable.
            </p>
            <div className="cta-buttons">
              <button className="btn-white" onClick={() => navigate("/test")}>
                <Ic.Play /> Faire le test maintenant
              </button>
              <button className="btn-ghost" onClick={() => navigate("/contact")}>
                Nous contacter <Ic.ArrowR />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
        <DiabetesFooter/>
      </>
  );
}
