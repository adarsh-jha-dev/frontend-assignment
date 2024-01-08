import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authenticated = true }) => {
  const authContext = useContext(AuthContext);
  const authStatus = authContext.user !== null;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (authenticated && !authStatus) {
        navigate("/login");
      } else if (!authenticated && authStatus) {
        navigate("/");
      }
      setLoader(false);
    };

    checkAuthStatus();
  }, [authStatus, navigate, authenticated]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
