// Страница для подсчета норматива

// 66.5 + 13.75 * Weight (кг) + 5.003 * Height (см) - 6.775 * personAge (год) = для мужчин
// 655.1 + 9.563 * Weight (кг) + 1.85 * Height (см) - 4.676 * personAge (год) = для женщин

import React from "react";

function NormaPage() {
  return (
    <div>
      <h1>Определить свою норму (калории)</h1>
      <div>
        <label>Пол
          <select name="" id="">
            <option value="">Мужской</option>
            <option value="">Женский</option>
          </select>
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
        Ваша норма ххх калорий в день
      </div>
    </div>
  )
}

export default NormaPage;