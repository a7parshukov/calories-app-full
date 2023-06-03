import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="right">
          <li><Link to="/norma">Личные данные</Link></li>
          <li><Link to="/product">Внести продукт в базу</Link></li>
          <li><Link to="/" onClick={auth.logout}>Выйти</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;