// Страница для подсчета норматива

// 66.5 + 13.75 * Weight (кг) + 5.003 * Height (см) - 6.775 * personAge (год) = для мужчин
// 655.1 + 9.563 * Weight (кг) + 1.85 * Height (см) - 4.676 * personAge (год) = для женщин

import React, { useState } from "react";
// для работы с select в React использую https://react-select.com/
import Select from "react-select";

function NormaPage() {
  const [normCalories, setNormCalories] = useState(0);
  const gender = [
    { value: "men", label: "Мужской" },
    { value: "women", label: "Женский" }
  ]

  function culcCaloriesForMen(weight, height, age) {
    let calories = 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
    return calories;
  }

  function culcCaloriesForWomen(weight, height, age) {
    let calories = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    return calories;
  }

  return (
    <div>
      <h1>Определить свою норму (калории)</h1>
      <div>
        <label>Пол
          <Select options={gender} />
        </label>
      </div>
      <div>
        <label>Вес, кг
          <input type="text" placeholder="Введите вес, кг" />
        </label>
      </div>
      <div>
        <label>Рост, см
          <input type="text" placeholder="Введите рост, см" />
        </label>
      </div>
      <div>
        <label>Возраст
          <input type="text" placeholder="Сколько Вам полных лет?" />
        </label>
      </div>
      <button>Рассчитать</button>
      <div>
        Ваша норма {normCalories} калорий в день
      </div>
      <button>В дневник</button>
    </div>
  )
}

export default NormaPage;