// Страница для внесения продукта в базу данных

import React, { useState, useContext } from "react";
import useRequest from "../hooks/request.hook";

function ProductPage() {
  const { request } = useRequest();

  // Форма для заполнения:
  const [productForm, setProductForm] = useState({
    nameProduct: "", caloriesPer100g: 0
  });
  const { nameProduct, caloriesPer100g } = productForm;

  const handleChange = (event) => {
    const { name, value } = event.target
    setProductForm({ ...productForm, [name]: value })
  }

  // Отправить продукт в базу данных:
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
    <>
      <h1>Добавить продукт в базу данных</h1>
      <form>
        <input
          type="text"
          placeholder="Добавить продукт"
          name="nameProduct"
          onChange={handleChange}
          value={nameProduct}
        />
        <input
          type="text"
          placeholder="Количество калорий на 100 гр."
          name="caloriesPer100g"
          onChange={handleChange}
          value={caloriesPer100g}
        />
        <button
          type="button"
          onClick={addProduct}>
          Добавить
        </button>
      </form>
    </>
  )
}

export default ProductPage;