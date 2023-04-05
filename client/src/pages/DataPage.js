// Основная страница с данными

import React from "react";

function DataPage() {
  return (
    <div>
      <h1>Дневник питания</h1>
      <div>
        число-месяц-год (выбор)
      </div>
      <div>
        <h2>Поиск продуктов</h2>
        <input type="text" placeholder="Выбрать продукт" />
        <input type="text" placeholder="Количество, граммы" />
        <button>Добавить</button>
      </div>
      <div>
        <h2>Таблица употребленной еды</h2>
        <table></table>
      </div>
    </div>
  )
}

export default DataPage;