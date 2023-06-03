import React from "react";

function FoodInput({ productList, addingFood, setFormData, ...formData }) {

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <div className="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Внести продукт</span>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default FoodInput;