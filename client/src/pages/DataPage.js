// Основная страница с данными

import React, { useState } from "react";

function DataPage() {
  const [formData, setFormData] = useState({
    _id: new Date(), nameFood: "", weightFood: 0, caloriesFood: 10
  })

  const { nameFood, weightFood } = formData;

  const [data, setData] = useState([
    { _id: 1, nameFood: "Хлеб", weightFood: 50, caloriesFood: 120 },
    { _id: 2, nameFood: "Колбаса", weightFood: 60, caloriesFood: 220 }
  ])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  const addingFood = () => {
    const { ...food } = formData;
    setData([food, ...data]);
    setFormData({ _id: new Date(), nameFood: "", weightFood: 0, caloriesFood: 10 })
  }

  return (
    <div>
      <h1>Дневник питания</h1>
      <div>
        число-месяц-год (выбор)
      </div>
      <div>
        <h2>Поиск продуктов</h2>
        <form>
          <input
            type="text"
            placeholder="Выбрать продукт"
            name="nameFood"
            onChange={handleChange}
            value={nameFood}
          />
          <input
            type="text"
            placeholder="Количество, граммы"
            name="weightFood"
            onChange={handleChange}
            value={weightFood}
          />
          <button
            type="button"
            onClick={addingFood}>
            Добавить
          </button>
        </form>
      </div>
      <div>
        <h2>Таблица употребленной еды</h2>
        <table>
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Количество, гр.</th>
              <th>Калории, ccal</th>
            </tr>
          </thead>
          <tbody>
            {data.map(food => (
              <tr key={food._id}>
                <td>{food.nameFood}</td>
                <td>{food.weightFood}</td>
                <td>{food.caloriesFood}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>ИТОГО</td>
              <td>{sumCalories(data)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default DataPage;