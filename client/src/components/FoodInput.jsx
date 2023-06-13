import React from "react";

function FoodInput({ productList, addingFood, setFormData, ...formData }) {

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
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
                // new Date().toISOString().substr(0,10)
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