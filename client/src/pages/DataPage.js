// Основная страница с данными

import React, { useEffect, useState, useContext } from "react";
import useRequest from "../hooks/request.hook";
import AuthContext from "../context/AuthContext";
import FoodJournal from "../components/FoodJournal";
import FoodInput from "../components/FoodInput";

function DataPage() {
  const auth = useContext(AuthContext)
  const { request } = useRequest();

  // Основная форма для заполнения:
  const [formData, setFormData] = useState({
    nameFood: "", weightFood: 0
  })

  // Вытащить дневник пользователя из базы данных:
  const [data, setData] = useState([]);

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

  // Вытащить список продуктов из базы данных:
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

  return (
    <>
      <FoodInput
        productList={productList}
        addingFood={addingFood}
        setFormData={setFormData}
        {...formData}
      />
      <FoodJournal data={data} />
    </>
  )
}

export default DataPage;