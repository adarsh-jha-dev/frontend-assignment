// App.jsx
import React, { useContext, useEffect } from "react";
import "./App.css";
import { StickyNavbar, Home } from "./components";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function App() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User in AuthContext:", authContext.user);
    if (!authContext.user) {
      navigate("/login");
    }
  }, [authContext.user, navigate]);

  if (!authContext.user) {
    return null;
  }

  return (
    <main>
      <StickyNavbar />
      <Home />
    </main>
  );
}

export default App;
