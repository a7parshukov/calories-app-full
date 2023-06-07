import React from "react";
import useRoutes from "./routes.js";
import AuthContext from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import useAuth from "./hooks/auth.hook";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "materialize-css";

function App() {
  const { token, userID, login, logout } = useAuth();
  const isAuth = Boolean(token); // если есть token - то true
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={
      { token, userID, login, logout, isAuth }
    }>
      <BrowserRouter>
        {isAuth && <Navbar />}
        <main>
          <div className="container">
            {routes}
          </div>
        </main>
        {isAuth && <Footer />}
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;