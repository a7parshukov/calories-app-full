import { useState } from "react";

const storageName = "userData";

function useAuth() {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const login = (jwtToken, id) => {
    setToken(jwtToken);
    setUserID(id);

    localStorage.setItem();
  }

  const logout = () => {

  }

  return (
    { token, userID, login, logout }
  )
}

export default useAuth;