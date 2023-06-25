import React from "react";
import { Link } from "react-router-dom";

export default function FoodStatusBar({ userDate, userTodayCalories, userNormaCalories }) {
  // const [isNorma, setIsNorma] = useState(false);
  const userRemainsCalories = userNormaCalories - userTodayCalories;
  const isPositiveCalories = userRemainsCalories > 0 ? true : false;

  if (!userNormaCalories) {
    return (
      <div className="col s12 m6 r350">
        <div className="card blue-grey lighten-1">
          <div className="card-content white-text" style={{ "height": "330px" }}>
            <span className="card-title">Статус</span>
            <div style={{ fontSize: "1.3em" }}>
              Определите норму калорий в <Link to="/norma" style={{ color: "red", textDecoration: "underline" }}>личных данных</Link>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="col s12 m6 r350">
        <div className="card blue-grey lighten-1">
          <div className="card-content white-text" style={{ "height": "330px" }}>
            <span className="card-title">Статус</span>
            <div style={{ fontSize: "1.3em" }}>
              <p>Ваш норматив: <span className="calories">{userNormaCalories}</span> Ccal</p>
              <p>Употреблено в этот день ({userDate}): <span className="calories">{userTodayCalories}</span> Ccal</p>
              <p style={{ color: isPositiveCalories ? "green" : "red" }}>Остаток калорий на этот день: <span className="calories">{userRemainsCalories}</span> Ccal</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}