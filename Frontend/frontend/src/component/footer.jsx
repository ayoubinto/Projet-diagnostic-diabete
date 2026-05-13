import { useState } from "react";
import {Link} from "react-router-dom";
import loginImg from "../assets/icon_login/12.png";

const navLinks = [
  { label: "Accueil", href: "#" },
  { label: "About", href: "#about" },
  { label: "Doctors", href: "#doctors" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Twitter", href: "#",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "LinkedIn", href: "#",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "Facebook", href: "#",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
];

function NeuralDots() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.2}} preserveAspectRatio="none">
      <defs>
        <style>{`
          @keyframes nd{0%,100%{opacity:.25;}50%{opacity:.9;}}
          .n1{animation:nd 3s ease-in-out infinite;}
          .n2{animation:nd 3s ease-in-out .5s infinite;}
          .n3{animation:nd 3s ease-in-out 1s infinite;}
          .n4{animation:nd 3s ease-in-out 1.5s infinite;}
          .n5{animation:nd 3s ease-in-out 2s infinite;}
          .n6{animation:nd 3s ease-in-out 2.5s infinite;}
          .n7{animation:nd 3s ease-in-out .8s infinite;}
          .n8{animation:nd 3s ease-in-out 1.8s infinite;}
        `}</style>
      </defs>
      <line x1="6%" y1="25%" x2="20%" y2="55%" stroke="#3b6de8" strokeWidth="0.6" opacity="0.4"/>
      <line x1="20%" y1="55%" x2="38%" y2="30%" stroke="#3b6de8" strokeWidth="0.6" opacity="0.35"/>
      <line x1="38%" y1="30%" x2="55%" y2="70%" stroke="#3b6de8" strokeWidth="0.6" opacity="0.3"/>
      <line x1="55%" y1="70%" x2="75%" y2="40%" stroke="#3b6de8" strokeWidth="0.6" opacity="0.35"/>
      <line x1="75%" y1="40%" x2="94%" y2="60%" stroke="#3b6de8" strokeWidth="0.6" opacity="0.4"/>
      <line x1="20%" y1="55%" x2="55%" y2="70%" stroke="#c0392b" strokeWidth="0.5" opacity="0.3"/>
      <line x1="38%" y1="30%" x2="75%" y2="40%" stroke="#c0392b" strokeWidth="0.5" opacity="0.25"/>
      <circle className="n1" cx="6%" cy="25%" r="2.5" fill="#4a7de8"/>
      <circle className="n2" cx="20%" cy="55%" r="2" fill="#c0392b"/>
      <circle className="n3" cx="38%" cy="30%" r="2.2" fill="#4a7de8"/>
      <circle className="n4" cx="55%" cy="70%" r="1.8" fill="#c0392b"/>
      <circle className="n5" cx="75%" cy="40%" r="2.3" fill="#4a7de8"/>
      <circle className="n6" cx="94%" cy="60%" r="2" fill="#4a7de8"/>
      <circle className="n7" cx="50%" cy="15%" r="1.5" fill="#c0392b"/>
      <circle className="n8" cx="88%" cy="20%" r="1.8" fill="#4a7de8"/>
    </svg>
  );
}

function DiabetesFooter() {
  const [year] = useState(new Date().getFullYear());

  return (
    <>
      <footer className="fw">
        <div className="fbg" />
        <NeuralDots />
        <div className="ftop" />
        <div className="fi">
          <div className="fg">

            {/* BRAND */}
            <div>
              <div className="la">
                          <Link className="navbar-brand" to="/">
                    <img
                      src={loginImg}
                      alt="Logo AYO PREDICT"
                      className="img_accueil"
                    />
                  </Link>
              </div>
              <p className="bd">Plateforme de diagnostic du diabète par intelligence artificielle. Évaluez votre risque grâce au Machine Learning.</p>
              <div className="ab"><span className="ad" />IA opérationnelle · ML actif</div>
            </div>

            {/* NAV */}
            <div>
              <p className="ch">Navigation</p>
              <ul className="nl">
                {navLinks.map(l => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}<span className="na">→</span></a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <p className="ch">Contact</p>
              <div className="ci">
                <div className="cic">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div><div className="cl">Email</div><div className="cv">contact@ayopredict.ma</div></div>
              </div>
              <div className="ci">
                <div className="cic">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div><div className="cl">Adresse</div><div className="cv">Rabat, Maroc</div></div>
              </div>
              <div className="ci">
                <div className="cic">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                  </svg>
                </div>
                <div><div className="cl">Téléphone</div><div className="cv">+212 6XX XXX XXX</div></div>
              </div>
            </div>

          </div>

          <hr className="fdiv" />

          <div className="fbot">
            <p className="copy">© {year} <strong>AYOPREDICT</strong>. Tous droits réservés.</p>
            <div className="tbs">
              <span className="tb tb-b">Machine Learning</span>
              <span className="tb tb-r">IA Médicale</span>
            </div>
            <div className="sr">
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} className="sb2" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default DiabetesFooter;