import React from "react";
import useRoutes from "./routes.js";
import AuthContext from "./context/AuthContext.js";
import { BrowserRouter } from "react-router-dom";
import useAuth from "./hooks/auth.hook.js";
import Navbar from "./components/Navbar.js";
import "materialize-css";


function App() {
  const { token, userID, login, logout } = useAuth();
  const isAuth = Boolean(token); // если есть token - то true
  const isNormal = false;
  const routes = useRoutes(isAuth, isNormal);

  return (
    <AuthContext.Provider value={
      { token, userID, login, logout }
    }>
      <BrowserRouter>
        {isAuth && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;