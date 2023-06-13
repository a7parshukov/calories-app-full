// Основная страница с данными

import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import FoodJournal from "../components/FoodJournal";
import FoodInput from "../components/FoodInput";
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
      <div className="row">
        <FoodInput auth={auth} onFoodAdded={handleFoodAdded} />
        <div className="col s12 m6">
          <div className="card blue-grey lighten-1">
            <div className="card-content white-text">
              <span className="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              <span className="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <FoodJournal auth={auth} updateFoodJournal={updateFoodJournal} />
      </div>
    </>
  )
}

export default DataPage;