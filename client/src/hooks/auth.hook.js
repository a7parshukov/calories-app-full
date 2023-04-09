import { useEffect, useState } from "react";

const storageName = "userData";

function useAuth() {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const login = (jwtToken, id) => {
    setToken(jwtToken);
    setUserID(id);

    localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userID: id }));
  }

  const logout = () => {
    setToken(null);
    setUserID(null);

    localStorage.removeItem(storageName)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userID)
    }
  }, [login])

  return (
    { token, userID, login, logout }
  )
}

export default useAuth;