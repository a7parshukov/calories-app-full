import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.js";


function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="right">
          <li><a href="/">Lorem</a></li>
          <li><a href="/">Lorem</a></li>
          <li><a href="/" onClick={auth.logout}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;