// Страница для внесения продукта в базу данных

import React, { useState, useEffect } from "react";
import useRequest from "../hooks/request.hook";
import useMessage from "../hooks/message.hook";

function ProductPage() {
  const { request, error, clearError } = useRequest();
  const message = useMessage();

  // следить за ошибками и показать их при помощи M (Materialize)
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  // Форма для заполнения:
  const [productForm, setProductForm] = useState({
    nameProduct: "", caloriesPer100g: ""
  });
  const { nameProduct, caloriesPer100g } = productForm;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductForm({ ...productForm, [name]: value });
    if (name === "caloriesPer100g") {
      setProductForm({ ...productForm, [name]: parseInt(value) });
    }
  }

  // Отправить продукт в базу данных:
  const addProduct = async () => {
    try {
      const { ...product } = productForm;
      const data = await request("/api/products/add", "POST", product);
      alert(data.message);
      setProductForm({ nameProduct: "", caloriesPer100g: "" })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card blue-grey lighten-1">
          <div className="card-content white-text">
            <span
              className="card-title"
              style={{ textTransform: "uppercase" }}
            >
              Добавить продукт в базу данных
            </span>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="text"
                      placeholder="Название продукта"
                      name="nameProduct"
                      onChange={handleChange}
                      value={nameProduct}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="number"
                      pattern="^[0-9]+$"
                      min="0"
                      placeholder="Количество калорий на 100 гр."
                      name="caloriesPer100g"
                      onChange={handleChange}
                      value={caloriesPer100g}
                    />
                  </div>
                </div>
                <div className="row">
                  <button
                    className="btn waves-effect waves-light"
                    type="button"
                    onClick={addProduct}>
                    Добавить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ProductPage;