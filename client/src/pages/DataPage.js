// Основная страница с данными

import React, { useEffect, useState, useContext } from "react";
import useRequest from "../hooks/request.hook";
import AuthContext from "../context/AuthContext";

function DataPage() {
  const auth = useContext(AuthContext)
  const { request } = useRequest();

  const [formData, setFormData] = useState({
    nameFood: "", weightFood: 0
  })

  const { nameFood, weightFood } = formData;

  const [data, setData] = useState([]);


  const [productForm, setProductForm] = useState({
    nameProduct: "", caloriesPer100g: 0
  })

  const { nameProduct, caloriesPer100g } = productForm;

  const [productList, setProductList] = useState([]);

  // Получить данные пользователя с backend:
  useEffect(() => {
    async function startFetching() {
      try {
        const data = await request("/api/users/", "GET", null, {
          Authorization: `Bearer ${auth.token}`
        });
        if (data) {
          setData(data);
        }
        // ТУТ НАПИСАТЬ КРУТИЛКУ, ПОКА ЖДЕШЬ ПРОГРУЗА БД!
      } catch (error) {
        console.error(error)
      }
    }
    startFetching();
  }, [])

  useEffect(() => {
    async function dataProducts() {
      try {
        const data = await request("/api/products/name", "GET");
        if(data) {
          setProductList(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    dataProducts();
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleChange2 = (event) => {
    const { name, value } = event.target
    setProductForm({ ...productForm, [name]: value })
  }

  const sumCalories = (array) => array.reduce(
    (sum, obj) => sum + obj.caloriesFood, 0)

  // Отправить данные (только front)
  // const addingFood = () => {
  //   const { ...food } = formData;
  //   setData([food, ...data]);
  //   setFormData({ _id: new Date(), nameFood: "", weightFood: 0, caloriesFood: 10 })
  // }

  // Отправить данные на back:
  const addingFood = async () => {
    try {
      const { ...food } = formData;
      const newFood = await request(
        "/api/users/",
        "POST",
        food,
        { Authorization: `Bearer ${auth.token}` }
      );
      setData([newFood, ...data]);
      setFormData({ nameFood: "", weightFood: 0 });
    } catch (error) {
      console.error(error);
    }
  }

  const addProduct = async () => {
    try {
      const { ...product } = productForm;
      const data = await request("/api/products/add", "POST", product);
      alert(data.message);
      setProductForm({ nameProduct: "", caloriesPer100g: 0 })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Дневник питания</h1>
      <div>
        число-месяц-год (выбор)
      </div>
      <div>
        <h2>Добавить продукт в базу данных</h2>
        <form>
          <input
            type="text"
            placeholder="Добавить продукт"
            name="nameProduct"
            onChange={handleChange2}
            value={nameProduct}
          />
          <input
            type="text"
            placeholder="Количество калорий на 100 гр."
            name="caloriesPer100g"
            onChange={handleChange2}
            value={caloriesPer100g}
          />
          <button
            type="button"
            onClick={addProduct}>
            Добавить
          </button>
        </form>
      </div>
      <div>
        <h2>Поиск продуктов</h2>
        <form>
          <input
            type="text"
            placeholder="Выбрать продукт"
            name="nameFood"
            list="product-list"
            onChange={handleChange}
            value={nameFood}
          />
          <datalist id="product-list">
            {productList.map((elem, key) => (
              <option key={key} value={elem}></option>
            ))}
          </datalist>
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