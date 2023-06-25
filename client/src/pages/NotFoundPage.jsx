import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage () {
  return (
    <div>
      <h1 className="white-text">Ooops...</h1>
      <p className="white-text">Такой страницы не существует. Обратно <Link to="/">в дневник</Link></p>
    </div>
  )
}

export default NotFoundPage;