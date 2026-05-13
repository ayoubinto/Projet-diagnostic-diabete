import { useState } from "react";
import HeaderHero from "../component/navbar.jsx";
import DiabetesFooter from "../component/footer.jsx";

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Ic = {
  Mail:    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Phone:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .01 1.18 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92v2z"/></svg>,
  Map:     () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  User:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  MailSm:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Tag:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Msg:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Send:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Clock:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Check:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert:   () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Refresh: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  FAQ:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const INFO_CARDS = [
  {
    icon: "✉️",
    title: "Email",
    text:  "Notre équipe répond sous 24h ouvrées. Idéal pour les questions techniques ou médicales.",
    link:  "mailto:contact@ayopredict.ma",
    linkLabel: "contact@ayopredict.ma",
  },
  {
    icon: "📍",
    title: "Adresse",
    text:  "Faculté des Sciences et Techniques, Université Mohammed V, Rabat, Maroc.",
    link:  "#",
    linkLabel: "Voir sur la carte",
  },
  {
    icon: "⏱️",
    title: "Disponibilité",
    text:  "Lundi – Vendredi, 9h00 – 18h00 (GMT+1). Réponse garantie sous 24h ouvrées.",
    link:  null,
    linkLabel: null,
  },
];

const SUBJECTS = [
  "Sélectionner un sujet",
  "Question médicale / Résultat",
  "Bug ou problème technique",
  "Suggestion d'amélioration",
  "Partenariat ou collaboration",
  "Presse / Médias",
  "Autre",
];

const FAQS = [
  {
    q: "Les résultats remplacent-ils un avis médical ?",
    a: "Non. AyoPredict est un outil de dépistage indicatif basé sur le ML. Il ne remplace en aucun cas une consultation avec un professionnel de santé.",
  },
  {
    q: "Mes données sont-elles conservées ?",
    a: "Non. Vos données sont traitées en mémoire et supprimées immédiatement après l'analyse. Aucun stockage persistant n'est effectué.",
  },
  {
    q: "Comment fonctionne le modèle ML ?",
    a: "Nous utilisons un Random Forest entraîné sur le dataset Pima Indians Diabetes, avec une précision d'environ 85% sur les données de test.",
  },
  {
    q: "Comment signaler un bug ?",
    a: "Utilisez le formulaire ci-contre en sélectionnant « Bug ou problème technique ». Décrivez le problème avec le plus de détails possible.",
  },
];

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
export default function ContactPage() {
  const MAX_CHARS = 1000;

  const [form, setForm] = useState({
    nom:     "",
    email:   "",
    sujet:   "",
    message: "",
  });

  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.nom.trim())              e.nom     = "Le nom est requis";
    if (!form.email.includes("@"))     e.email   = "Email invalide";
    if (!form.sujet || form.sujet === SUBJECTS[0]) e.sujet = "Choisissez un sujet";
    if (form.message.trim().length < 20) e.message = "Message trop court (min. 20 caractères)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Remplacez par votre appel API : await fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setForm({ nom: "", email: "", sujet: "", message: "" });
    setErrors({});
    setSuccess(false);
  };

  const charsLeft = MAX_CHARS - form.message.length;

  return (
      <>
    <HeaderHero button_y={false} variant="test" color="#06080F"/>
    <div className="contact-page">

      {/* ══ HERO ══ */}
      <section className="contact-hero">
        <div className="hero-content_">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            Nous contacter
          </div>
          <h1 className="hero-title">
            Une question ?<br />
            Écrivez-<span>nous</span>
          </h1>
          <p className="hero-desc_">
            Notre équipe est disponible pour répondre à toutes vos questions sur AyoPredict, nos résultats ou notre modèle ML.
          </p>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
      <div className="info-row_">
        {INFO_CARDS.map((c, i) => (
          <div className="info-card_" key={i}>
            <div className="info-icon_">{c.icon}</div>
            <div className="info-card_title">{c.title}</div>
            <p className="info-card_text">{c.text}</p>
            {c.link && (
              <a href={c.link} className="info-card_link">{c.linkLabel} →</a>
            )}
          </div>
        ))}
      </div>

      {/* ══ MAIN SECTION ══ */}
      <div className="contact-main_">

        {/* ── FORM SIDE ── */}
        <div className="form-side_">
          <div className="form-section-label_">Formulaire de contact</div>
          <h2 className="form-title_">
            Envoyez-nous un <span>message</span>
          </h2>
          <p className="form-sub_">
            Remplissez le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais — généralement sous 24h ouvrées.
          </p>

          <div className="form-card_">
            {success ? (
              /* ── SUCCESS STATE ── */
              <div className="form-success">
                <div className="success-icon">✅</div>
                <div className="success-title">Message envoyé !</div>
                <p className="success-sub">
                  Merci <strong>{form.nom}</strong> ! Votre message a bien été reçu. Notre équipe vous répondra à <strong>{form.email}</strong> dans les 24h ouvrées.
                </p>
                <button className="btn-reset" onClick={handleReset}>
                  <Ic.Refresh /> Envoyer un autre message
                </button>
              </div>
            ) : (
              /* ── FORM ── */
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">

                  {/* Nom */}
                  <div className="form-group">
                    <label className="form-label">
                      <Ic.User /> Nom complet <span className="form-required">*</span>
                    </label>
                    <input
                      className={`form-input ${errors.nom ? "error" : ""}`}
                      type="text"
                      value={form.nom}
                      onChange={set("nom")}
                      placeholder="Votre nom et prénom"
                    />
                    {errors.nom && <span className="form-error"><Ic.Alert />{errors.nom}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">
                      <Ic.MailSm /> Email <span className="form-required">*</span>
                    </label>
                    <input
                      className={`form-input ${errors.email ? "error" : ""}`}
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <span className="form-error"><Ic.Alert />{errors.email}</span>}
                  </div>

                  {/* Sujet */}
                  <div className="form-group span-2">
                    <label className="form-label">
                      <Ic.Tag /> Sujet <span className="form-required">*</span>
                    </label>
                    <div className="select-wrap">
                      <select
                        className={`form-select ${errors.sujet ? "error" : ""}`}
                        value={form.sujet}
                        onChange={set("sujet")}
                        style={{ color: !form.sujet || form.sujet === SUBJECTS[0] ? "#94a3b8" : undefined }}
                      >
                        {SUBJECTS.map(s => (
                          <option key={s} value={s === SUBJECTS[0] ? "" : s} disabled={s === SUBJECTS[0]}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.sujet && <span className="form-error"><Ic.Alert />{errors.sujet}</span>}
                  </div>

                  {/* Message */}
                  <div className="form-group span-2">
                    <label className="form-label">
                      <Ic.Msg /> Message <span className="form-required">*</span>
                    </label>
                    <textarea
                      className={`form-textarea ${errors.message ? "error" : ""}`}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Décrivez votre question ou problème en détail (min. 20 caractères)…"
                      maxLength={MAX_CHARS}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {errors.message
                        ? <span className="form-error"><Ic.Alert />{errors.message}</span>
                        : <span />
                      }
                      <span className={`char-count ${charsLeft < 100 ? "near" : ""}`}>
                        {form.message.length} / {MAX_CHARS}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Submit */}
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ animation: "spin 0.8s linear infinite" }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    <><Ic.Send /> Envoyer le message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDE ── */}
        <div className="right-side">

          {/* Response time */}
          <div className="response-card">
            <div className="rc-inner">
              <div className="rc-label">⚡ Temps de réponse</div>
              <div className="rc-items">
                {[
                  { icon: "✉️", label: "Email général",        val: "< 24h ouvrées" },
                  { icon: "🐛", label: "Bug / technique",       val: "< 12h" },
                  { icon: "🤝", label: "Partenariat",           val: "< 48h" },
                ].map(r => (
                  <div className="rc-item" key={r.label}>
                    <div className="rc-icon">{r.icon}</div>
                    <div>
                      <div className="rc-text">{r.label}</div>
                      <div className="rc-val">{r.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-card">
            <div className="faq-title">
              <div className="faq-title-icon"><Ic.FAQ /></div>
              Questions fréquentes
            </div>

            {FAQS.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">
                  <div className="faq-q-icon">Q</div>
                  {f.q}
                </div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Social */}


        </div>
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      <DiabetesFooter/>
    </div>
      </>
  );
}
