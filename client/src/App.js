import React from "react";
import useRoutes from "./routes.js";
import useAuth from "./hooks/auth.hook.js";
import "materialize-css";
import Navbar from "./components/Navbar.js";

function App() {
  const { token } = useAuth();
  const isAuth = Boolean(token); // если есть token - то true
  const isNormal = false;
  const routes = useRoutes(isAuth, isNormal);

  return (
    <>
      {isAuth && <Navbar />}
      <div className="container">
        {routes}
      </div>
    </>
  )
}

export default App;