// Страница для подсчета норматива

/* TODO:
- Валидация значений данных возраста, роста и т.п.
- округлить норматив
- Кнопка "В дневник" появляется только при условии расчета
*/

import React, { useState, useContext } from "react";
import useRequest from "../hooks/request.hook.js";
import AuthContext from "../context/AuthContext.js";

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
      await request("/api/users/normalise", "PUT", {
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
    <div>
      <h1>Определить свою норму (калории)</h1>
      <div>
        <label>Пол
          <div className="">
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
        </label>
      </div>
      <div>
        <label>Вес, кг
          <input
            type="text"
            placeholder="Введите вес, кг"
            name="weight"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>Рост, см
          <input
            type="text"
            placeholder="Введите рост, см"
            name="height"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>Возраст
          <input
            type="text"
            placeholder="Сколько Вам полных лет?"
            name="age"
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={handleCulc}>Рассчитать</button>
      <div>
        Ваша норма {normCalories} калорий в день
      </div>
      <button onClick={handleNormaSave}>Save and GO</button>
    </div>
  )
}

export default NormaPage;