// Основная страница с данными

import React, { useEffect, useState } from "react";
import useRequest from "../hooks/request.hook";

function DataPage() {
  const { request } = useRequest();

  const [formData, setFormData] = useState({
    _id: new Date(), nameFood: "", weightFood: 0, caloriesFood: 0
  })

  const { nameFood, weightFood } = formData;

  const [data, setData] = useState([])

  useEffect(() => {
    async function startFetching() {
      const data = await request("/api/users/", "GET");
      if(data) {
        setData(data);
      }
    }
    startFetching();
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  // const addingFood = () => {
  //   const { ...food } = formData;
  //   setData([food, ...data]);
  //   setFormData({ _id: new Date(), nameFood: "", weightFood: 0, caloriesFood: 10 })
  // }
  const addingFood = async () => {
    const { ...food } = formData;
    const req = await request("/api/users/", "POST", food);
    setData([req, ...data]);
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