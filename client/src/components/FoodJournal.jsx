import React from "react";

function FoodJournal({ data }) {
  const date = new Date().getDate();

  // для подсчета суммы калорий в таблице:
  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  return (
    <section>
      <h2>Дневник питания за {date}</h2>
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
    </section>
  )
}

export default FoodJournal;