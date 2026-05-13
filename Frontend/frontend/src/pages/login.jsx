import groupImg from "../assets/icon_login/group.png";
import loginImg from "../assets/icon_login/12.png";
import {useEffect, useState} from "react";
import Success_login from "../component/Success_login.jsx";
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    nom:"",
    prenom:"",
    email:"",
    password:"",
    role:"",
    confirmPassword:""
  })
  const [isRegister, setIsRegister] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // State for the message displayed in the popup (string)
  const [popupMessage, setPopupMessage] = useState('');
  const [urlPopup, setUrlPopup] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [formClass, setFormClass] = useState("form-enter");
  const switchForm = (toRegister) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFormClass("form-exit");
    setTimeout(() => {
      setIsRegister(toRegister);
      setFormClass("form-enter");
      setIsAnimating(false);
    }, 300); // durée = fadeSlideOut
  };
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
  const redictPath = sessionStorage.getItem("redirectAfterLogin")
  const champs = sessionStorage.getItem("champs")
  //naviguer sur autre page
  const navigate = useNavigate();
  useEffect(() => {
    if (!showPopup) return;

    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [showPopup]);

  useEffect(() => {
    if (popupMessage !== "Connexion réussie") return;
    const timer = setTimeout(() => {
      if(redictPath){
        navigate(redictPath)
      }else{
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [popupMessage, navigate]);
  // Function to open the popup with a specific message
  const openPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage(''); // Optional: clear message on close
  };
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  function verify_leng_password(a){
    if(a.length < 3){
      setPopupMessage("Le mot de passe doit contenir au moins 3 caractére")
      setUrlPopup("https://lottie.host/e8b674bf-20a7-48b0-808b-783dd5a9f998/lDGHboMEyA.lottie")
      setShowPopup(true)
    }
  }
  async function handleSubmit(e){
    e.preventDefault()
    if(isRegister){
      console.log("isRegister")
      if(formData.email === "" ||
          formData.password === "" ||
          formData.nom === "" ||
          formData.prenom === "" ||
          formData.confirmPassword === ""
      ){
        setPopupMessage("Veuillez saisir tous les champs")
        setUrlPopup("https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie")
        setShowPopup(true)
      }else{
        if(formData.password.length < 3){
          verify_leng_password(formData.password)
        }else{
          if(formData.password !== formData.confirmPassword){
            setPopupMessage("les deux mots de passes doivent être identiques")
            setUrlPopup("https://lottie.host/e8b674bf-20a7-48b0-808b-783dd5a9f998/lDGHboMEyA.lottie")
            setShowPopup(true)
          }else{
            try {
              const response = await fetch("http://127.0.0.1:8000/auth/register", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                  {
                    nom:formData.nom,
                    prenom:formData.prenom,
                    email:formData.email,
                    password:formData.password,
                    role:"patient"
                  }
              )
            })
            const data = await response.json()
            if (response.ok) {
              setShowPopup(true)
              setPopupMessage(data.message)
              setUrlPopup("https://lottie.host/07f2c023-0a18-4ec2-9ba3-0f48b9052b14/0DTfg1GhGW.lottie")
              switchForm(false)
            } else {
              setShowPopup(true)
              setPopupMessage(data.detail)
              setUrlPopup("https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie")
            }
            } catch (error) {
              setShowPopup(true)
              setPopupMessage("Impossible de contacter le serveur")
              setUrlPopup("https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie")
            }
          }
        }
      }
    }else {
      if (formData.email === "" || formData.password === "") {
        setPopupMessage("Veuillez saisir tous les champs")
        setUrlPopup("https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie")
        setShowPopup(true)
      } else {
        if (formData.password.length < 3) {
          verify_leng_password(formData.password)
        } else {
          try {
            const bodyData = new URLSearchParams();
            bodyData.append("username", formData.email);
            bodyData.append("password", formData.password);
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: bodyData
            })
            const data = await response.json()
            if (response.ok) {
              localStorage.setItem("token", data.access_token);
              const meResponse = await fetch("http://127.0.0.1:8000/auth/me", {
                method:"GET",
                headers: {
                'Authorization': `Bearer ${data.access_token}`
              }});
              const user = await meResponse.json();
              sessionStorage.setItem("role",user.role)
              setShowPopup(true)
              setPopupMessage(data.message)
              setUrlPopup("https://lottie.host/07f2c023-0a18-4ec2-9ba3-0f48b9052b14/0DTfg1GhGW.lottie")
              if(user.role === "patient") {
                if (redictPath.includes("test")) {
                  console.log("test")
                  if (champs !== "vide") {
                    const rawData = JSON.parse(sessionStorage.getItem("formData"));
                    const Datadiagnostic = formatDiagnosticData(rawData);
                    const response = await fetch("http://127.0.0.1:8000/diagnostic/", {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${data.access_token}`
                      },
                      body: JSON.stringify(Datadiagnostic)
                    })
                    sessionStorage.setItem("statusdiagnostique", "Bon")
                  }
                }
              }
            } else {
              setShowPopup(true)
              setPopupMessage(data.detail)
              setUrlPopup("https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie")
            }
          } catch (error) {
            setShowPopup(true)
            setPopupMessage("Impossible de contacter le serveur")
            setUrlPopup("https://lottie.host/0b963585-657f-4ce7-b914-039e1777ffc2/ffh9yezGCh.lottie")
          }
        }
      }
    }
  }
  return (
   <div className="page">
      {showPopup && (
        <Success_login message={popupMessage} onClose={closePopup} src={urlPopup} />
      )}
      {/* Côté gauche */}
      {!isRegister && (
        <div className="left-side">
          <div className="brand">
            <img src={loginImg} alt="logo" className="logo_site_web" />
          </div>
        </div>
      )}

      {/* Séparateur */}
      {!isRegister && <div className="divider"></div>}

      {/* Côté droit */}
      <div className="right-side">

        <div className="users-icon">
          <img src={groupImg} alt="logo_users" className="img_users" />
        </div>

        {/* ===== FORMULAIRE LOGIN ===== */}
        {!isRegister && (
          <form className={formClass} onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="email" name="email" className="input" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="password" placeholder="password" name="password" className="input" onChange={handleChange} />
            </div>

            <div className="options-row">
              <label className="remember">
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <a href="#" className="forgot">Mot de passe oublié</a>
            </div>

            <button className="btn-login">SE CONNECTER</button>



            <p className="switch-link">
              Pas encore de compte ?{' '}
              <span onClick={() => switchForm(true)}>S'inscrire</span>
            </p>
          </form>
        )}

        {/* ===== FORMULAIRE REGISTER ===== */}
        {isRegister && (
          <form className={formClass} onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="Nom" name="nom" className="input" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="text" placeholder="Prénom" name="prenom" className="input" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="email" placeholder="Email" name="email" className="input" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="password" placeholder="Mot de passe" name="password" className="input" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="password" placeholder="Confirmer le mot de passe" name="confirmPassword" className="input" onChange={handleChange} />
            </div>

            <button className="btn-login">S'INSCRIRE</button>

            <p className="switch-link">
              Déjà un compte ?{' '}
              <span onClick={() => switchForm(false)}>Se connecter</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;