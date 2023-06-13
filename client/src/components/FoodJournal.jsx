import React from "react";

function FoodJournal({ data }) {
  const dateToday = new Date();
  let dateUserChoise = undefined;
  const dateToPage = dateUserChoise ? getDateFormat(dateUserChoise) : getDateFormat(dateToday);

  function getDateFormat(date) {
    let dateDate = date.getDate();
    if (dateDate < 10) {
      dateDate = "0" + dateDate;
    }
    let dateMonth = date.getMonth() + 1;
    if (dateMonth < 10) {
      dateMonth = "0" + dateMonth;
    }
    let dateYear = date.getFullYear();
    return `${dateDate}.${dateMonth}.${dateYear}`;
  }

  // для подсчета суммы калорий в таблице:
  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  return (
    <div className="col s12 m12">
      <div className="card blue-grey lighten-1">
        <div className="card-content white-text">
          <span className="card-title">Дневник питания от {dateToPage}</span>
          <div>
            <label>
              Показать дневник от другой даты:
              <input
                type="date"
                name="dateUserChoise"
                value={dateToday}
              />
            </label>
            <button
              type="button"
              onClick={() => console.log("See")}
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