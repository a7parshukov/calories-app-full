import React, { useState, useEffect } from "react";
import useRequest from "../hooks/request.hook";

function FoodJournal({ auth, updateFoodJournal }) {
  const { request } = useRequest();
  const [userDate, setUserDate] = useState(new Date());

  // Вытащить дневник пользователя из базы данных:
  // UPD: вытащить дневник пользователя ОТНОСИТЕЛЬНО ДАТЫ из базы пользователя:
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const data = await request(
        "/api/users/date",
        "POST",
        {
          date: userDate.toISOString().substring(0, 10),
        },
        {
          Authorization: `Bearer ${auth.token}`,
        });
      if (data) {
        setData(data);
      }
      // ТУТ НАПИСАТЬ КРУТИЛКУ, ПОКА ЖДЕШЬ ПРОГРУЗА БД!
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [updateFoodJournal])

  function getDateFormatForWindow(date) {
    // padStart - заполнитель нулями, если в числе менее 2 символов.
    let dateDate = date.getDate().toString().padStart(2, "0");
    let dateMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    let dateYear = date.getFullYear();
    return `${dateDate}.${dateMonth}.${dateYear}`;
  }

  function getDateFormatString(date) {
    return `${date.toISOString().substr(0, 10)}`;
  }

  function handleDateChange(event) {
    const selectedDate = new Date(event.target.value);
    setUserDate(selectedDate);
  }

  // для подсчета суммы калорий в таблице:
  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  return (
    <div className="col s12 m12">
      <div className="card blue-grey lighten-1">
        <div className="card-content white-text">
          <span className="card-title">Дневник питания от {getDateFormatForWindow(userDate)}</span>
          <div>
            <label>
              Показать дневник от другой даты:
              <input
                type="date"
                name="getUserDate"
                onChange={handleDateChange}
                value={getDateFormatString(userDate)}
              />
            </label>
            <button
              type="button"
              onClick={() => fetchData()}
              className="btn waves-effect waves-light"
            >
              Показать
            </button>
            <button
              type="button"
              onClick={() => console.log("save")}
              className="btn waves-effect waves-light"
            >
              Сегодня
            </button>
          </div>
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
    </div>
  )
}

export default FoodJournal;