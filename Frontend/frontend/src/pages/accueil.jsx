import Navbar from "../component/navbar.jsx";
import heroBg from "../assets/Background_accueil/18066.jpg";
import DiabetesFooter from "../component/footer.jsx";
import DiabetesBody from "../component/body_accueil.jsx";
import HeaderHero from "../component/navbar.jsx";
import {useEffect, useState} from "react";
import Loading from "../component/Loading.jsx";

function Accueil(){
    const [aut, setAut] = useState(null);
    const [loading , setLoading] = useState(true)
    useEffect(() => {
    sessionStorage.setItem("redirectAfterLogin",window.location.pathname)
    const check = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAut(false);
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("http://127.0.0.1:8000/auth/me", {
              headers: { Authorization: "Bearer " + token }
            });
            const data = await res.json()
            sessionStorage.setItem("role",data.role)
            setAut(res.ok);
      } catch {
        setAut(false);
      }finally {
      setLoading(false);
    }
    };
    check();
  }, []);
    return(
        <>
            <HeaderHero URL_image={heroBg}/>
            <DiabetesBody/>
            <DiabetesFooter/>
            {loading && <Loading />}
        </>
    )
}
export default Accueil;