import loginImg from "../assets/icon_login/12.png";
import { Link } from "react-router-dom";
import 'animate.css';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu.jsx";




function HeaderHero({URL_image,button_y=true,variant="home",formData}) {
    const [Autha,setAthan] = useState(false)
    const [user,setUser] = useState("")
    const onLoginClick  = ()=>{
        sessionStorage.setItem("formData",JSON.stringify(formData))
        sessionStorage.setItem("redirectAfterLogin",window.location.pathname)
        window.location.href = "/login";
        sessionStorage.setItem("champs","full")

    }
    async function checkAuth(){
        const token = localStorage.getItem("token");
        if(!token){
            setAthan(false)
            return false
        }else{
            try{
                const response = await fetch("http://127.0.0.1:8000/auth/me",{
                    headers:{
                        Authorization: "Bearer " + token
                    }
                });
                const data = await response.json()
                setUser(data)
                if(response.ok){
                    setAthan(true)
                    return true
                }else{
                    setAthan(false)
                    return false
                }
            }catch(error){
                setAthan(false)
                return false
            }
        }
    }
    useEffect(() => {
      checkAuth().then(isAuth => {
        if (isAuth) {
          console.log("Utilisateur connecté");
        } else {
          console.log("Non connecté");
        }
      });
    }, []);
  return (
    <div className={variant === "home" ? "hero-header" : "remove_height_hero_header"}>
      <img
        src={URL_image}
        className={variant === "home" ? "hero-image" : "remove_image"}
      />
      {button_y && (
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-h1 animate__pulse">
            DÉTECTION DU <span className="Diab_span" >DIABÈTE</span><br />PAR <span className="IA_par" >INTELLIGENCE ARTIFICIELLE</span>
          </h1>
          <h6 className="sous_titre">
            Évaluez votre risque de diabète en quelques questions grâce à l’intelligence artificielle.
          </h6>
          <Link
            to="/test"
            className="btn btn-test mb-4 animate__pulse"
          >
            Faire le test
          </Link>
        </div>
      </div>
        )}
      {/* Navbar transparent par-dessus tout */}
      <nav
          className={variant === "home" ? "navbar navbar-expand-lg" : "navbar navbar_test navbar-expand-lg"}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={loginImg}
              alt="Logo AYO PREDICT"
              className="img_accueil"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ marginLeft: "63%" }}>
              <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">À propos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/doctors">Doctors</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item">
                  {Autha ? (
                    <UserMenu
                      user={user}              // { nom: "Ayoub", email: "..." }
                      onLogout={() => {
                       localStorage.clear()
                      }}
                    />
                  ) : (
                        <button className="nav-link btn btn-link" onClick={onLoginClick}>
                          Se connecter
                        </button>
                  )}
              </li>
              <li className="nav-item d-lg-none">
                <Link className="nav-link btn-test-mobile" to="/test">Faire le test</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
      </div>
    </div>

  );
}

export default HeaderHero;