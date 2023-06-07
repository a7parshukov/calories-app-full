import React from "react";

function FoodJournal({ data }) {
  const date = new Date().getDate();

  // для подсчета суммы калорий в таблице:
  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  return (
    <div className="col s12 m12">
      <div className="card blue-grey lighten-1">
        <div className="card-content white-text">
          <span className="card-title">Дневник питания за {date}</span>
          <p>Выбрать другую дату: (календарь)</p>
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