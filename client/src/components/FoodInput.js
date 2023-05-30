import React from "react";

function FoodInput({ productList, addingFood, setFormData, ...formData }) {

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <section>
      <h2>Употреблено?</h2>
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
        <div>Дата:</div>
        <button
          type="button"
          onClick={addingFood}>
          Добавить
        </button>
      </form>
    </section>
  )
}

export default FoodInput;