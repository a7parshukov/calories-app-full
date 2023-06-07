// Страница для подсчета норматива пользователя

import React, { useState, useContext } from "react";
import useRequest from "../hooks/request.hook";
import AuthContext from "../context/AuthContext";

function NormaPage() {
  const auth = useContext(AuthContext);
  const [normCalories, setNormCalories] = useState(0);
  // форма пользователя:
  const [normaForm, setNormaForm] = useState({
    gender: null,
    weight: null,
    height: null,
    age: null,
  });
  const { gender, weight, height, age } = normaForm;

  const { request } = useRequest();

  const handleChange = (event) => {
    setNormaForm({ ...normaForm, [event.target.name]: event.target.value })
  }

  const handleCulc = () => {
    const calories = (gender === "men") ? culcCaloriesForMen(weight, height, age) : culcCaloriesForWomen(weight, height, age);
    setNormCalories(calories);
  }

  const handleNormaSave = async () => {
    try {
      await request("/api/users/normalise", "POST", {
        norma: normCalories
      }, {
        Authorization: `Bearer ${auth.token}`
      });
      auth.isNormal = true;
      console.log("Норматив сохранен")
    } catch (error) {
      console.log(error)
    }
  }

  function culcCaloriesForMen(weight, height, age) {
    return (66.5 + 13.75 * weight + 5.003 * height - 6.775 * age);
  }

  function culcCaloriesForWomen(weight, height, age) {
    return (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age);
  }

  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card blue-grey lighten-1">
          <div className="card-content white-text">
            <span
              className="card-title"
              style={{ textTransform: "uppercase" }}
            >
              Определить свою норму (калории)
            </span>
            <div className="row">
              <div className="input-field col s12">
                <p>Пол</p>
                <select
                  name="gender"
                  defaultValue="noGender"
                  onChange={handleChange}
                >
                  <option value="noGender" disabled>Выбрать</option>
                  <option value="men">Мужской</option>
                  <option value="women">Женский</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label>Вес, кг</label>
                <input
                  type="text"
                  name="weight"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label>Рост, см</label>
                <input
                  type="text"
                  name="height"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label>Возраст</label>
                <input
                  type="text"
                  name="age"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className="btn waves-effect waves-light light-blue"
              onClick={handleCulc}
            >
              Рассчитать
            </button>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              Ваша норма {normCalories} калорий в день
            </div>
            <button
              className="btn waves-effect waves-light"
              onClick={handleNormaSave}
            >
              Save and GO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NormaPage;