import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading.jsx";

function ProtectedRoute({ children }) {
  const [au, setAu] = useState(null);

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAu(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/auth/me", {
          headers: { Authorization: "Bearer " + token }
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          setAu(false);
        } else {
          setAu(true);
        }
      } catch {
        localStorage.removeItem("token");
        setAu(false);
      }
    };

    check();
  }, []);

  if (au === null) return <div>{<Loading />}</div>;

  return au ? children : <Navigate to="/Login" replace />;
}

export default ProtectedRoute;