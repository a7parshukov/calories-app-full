import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.js";

function Navbar() {
  const auth = useContext(AuthContext);

  const promptFunc = () => {
    const nameProduct = prompt("Введите название продукта:");
    const caloriesPer100g = prompt("Сколько калорий в 100 граммах продукта?");

    console.log(nameProduct, caloriesPer100g)
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="right">
          <li><a href="/">Lorem</a></li>
          <li><a href="/" onClick={promptFunc}>Добавь продукт</a></li>
          <li><a href="/" onClick={auth.logout}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;