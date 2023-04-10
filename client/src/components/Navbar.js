import React from "react";
import useAuth from "../hooks/auth.hook.js";

function Navbar() {
  const {logout} = useAuth();

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul className="right">
            <li><a href="">Lorem</a></li>
            <li><a href="">Lorem</a></li>
            <li><a href="/" onClick={logout}>Выйти</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;