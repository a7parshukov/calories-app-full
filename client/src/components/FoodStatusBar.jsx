import React, { useEffect, useState } from "react";
import useRequest from "../hooks/request.hook";

export default function FoodStatusBar({ auth, userTodayCalories }) {
  const { request } = useRequest();

  const [userNormaCalories, setUserNormaCalories] = useState(0);
  const userRemainsCalories = null;
  const isPositiveCalories = true;

  const handleUserData = async () => {
    try {
      const data = await request("/api/users/normalise", "GET", null, {
        Authorization: `Bearer ${auth.token}`
      });
      if (data) {
        setUserNormaCalories(data.norma)
      }
    } catch (err) {
      console.error()
    }
  }

  useEffect(() => { handleUserData() }, [])

  return (
    <div className="col s12 m6 r350">
      <div className="card blue-grey lighten-1">
        <div className="card-content white-text" style={{ "height": "330px" }}>
          <span className="card-title">Статус</span>
          <div style={{ fontSize: "1.3em" }}>
            <p>Ваш норматив: <span className="calories">{userNormaCalories}</span> Ccal</p>
            <p>Употреблено сегодня: {userTodayCalories} Ccal</p>
            <p style={{ color: isPositiveCalories ? "green" : "red" }}>Остаток калорий на сегодня: {userRemainsCalories} Ccal</p>
          </div>
        </div>
      </div>
    </div>
  )
}