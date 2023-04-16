// Страница для подсчета норматива

/* TODO:
- Валидация значений данных возраста, роста и т.п.
- Кнопка "В дневник" появляется только при условии расчета

*/

import React, { useState } from "react";
import useRequest from "../hooks/request.hook.js";

function NormaPage() {
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


  const handlerChange = (event) => {
    setNormaForm({ ...normaForm, [event.target.name]: event.target.value })
  }

  const handleCulc = () => {
    const calories = (gender === "men") ? culcCaloriesForMen(weight, height, age) : culcCaloriesForWomen(weight, height, age);
    setNormCalories(calories);
  }

  const handleNormaSave = async () => {
    try {
      const data = await request("/api/auth/add", "POST", { norma: normCalories });
      console.log(data);
    } catch (error) { }
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
              onChange={handlerChange}
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
            onChange={handlerChange}
          />
        </label>
      </div>
      <div>
        <label>Рост, см
          <input
            type="text"
            placeholder="Введите рост, см"
            name="height"
            onChange={handlerChange}
          />
        </label>
      </div>
      <div>
        <label>Возраст
          <input
            type="text"
            placeholder="Сколько Вам полных лет?"
            name="age"
            onChange={handlerChange}
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