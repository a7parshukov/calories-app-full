// Основная страница с данными

import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import FoodJournal from "../components/FoodJournal";
import FoodInput from "../components/FoodInput";
import FoodStatusBar from "../components/FoodStatusBar";
import "./DataPage.css";

function DataPage() {
  const auth = useContext(AuthContext)
  const [updateFoodJournal, setUpdateFoodJournal] = useState(false);

  /*
  Когда в FoodInput добавляется пища, то вызывается onFoodAdded.
  DataPage обновляет updateFoodJournal.
  Передаем в компонент FoodJournal.
  */
  const handleFoodAdded = () => {
    setUpdateFoodJournal(!updateFoodJournal)
  }

  return (
    <>
      <div className="row" style={{ marginBottom: 0 }}>
        <FoodInput auth={auth} onFoodAdded={handleFoodAdded} />
        <FoodStatusBar auth={auth} userTodayCalories={userTodayCalories} />
      </div>
      <div className="row" style={{ marginBottom: 0 }}>
        <FoodJournal auth={auth} updateFoodJournal={updateFoodJournal} />
      </div>
    </>
  )
}

export default DataPage;