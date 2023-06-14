import React, { useEffect, useState } from "react";
import useRequest from "../hooks/request.hook";

function FoodInput({ auth, onFoodAdded }) {
  const { request } = useRequest();

  const today = new Date().toISOString().substring(0, 10);

  // Основная форма для заполнения:
  const [formData, setFormData] = useState({
    nameFood: "", weightFood: 0, dateFood: today
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Вытащить список продуктов из базы данных для отображения в поле input:
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function dataProducts() {
      try {
        const data = await request("/api/products/name", "GET");
        if (data) {
          setProductList(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    dataProducts();
  }, []);

  // Отправить данные на back:
  const addingFood = async () => {
    try {
      const { ...food } = formData;
      await request(
        "/api/users/",
        "POST",
        food,
        { Authorization: `Bearer ${auth.token}` }
      );
      setFormData({ nameFood: "", weightFood: 0, dateFood: today });
      onFoodAdded()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="col s12 m6">
      <div className="card blue-grey lighten-1">
        <div className="card-content white-text">
          <span className="card-title">Внести продукт</span>
          <form>
            <input
              type="text"
              placeholder="Выбрать продукт"
              name="nameFood"
              list="product-list"
              onChange={handleChange}
              value={formData.nameFood}
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
              value={formData.weightFood}
            />
            <label>
              Дата:
              <input
                type="date"
                name="dateFood"
                onChange={handleChange}
                value={formData.dateFood}
              />
            </label>
            <button
              type="button"
              onClick={addingFood}
              className="btn waves-effect waves-light"
            >
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FoodInput;