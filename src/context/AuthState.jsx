import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [user, setUser] = useState(null);

  const login = (userdata) => {
    setUser(userdata);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthState };
