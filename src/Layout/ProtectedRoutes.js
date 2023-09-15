import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";



export default function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return <>{isAuth && <Outlet />}</>;
}
