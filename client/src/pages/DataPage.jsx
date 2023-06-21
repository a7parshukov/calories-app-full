// Основная страница с данными

import React, { useContext, useState, useEffect } from "react";
import useRequest from "../hooks/request.hook";
import useMessage from "../hooks/message.hook";
import AuthContext from "../context/AuthContext";
import FoodJournal from "../components/FoodJournal";
import FoodInput from "../components/FoodInput";
import FoodStatusBar from "../components/FoodStatusBar";
import "./DataPage.css";

function DataPage() {
  const { request } = useRequest();
  const auth = useContext(AuthContext)
  const [updateFoodJournal, setUpdateFoodJournal] = useState(false);

  const [userNormaCalories, setUserNormaCalories] = useState(0);

  // получить норматив калорий из базы данных:
  const handleUserData = async () => {
    try {
      const data = await request("/api/users/normalise", "GET", null, {
        Authorization: `Bearer ${auth.token}`
      });
      if (data) {
        setUserNormaCalories(data.norma)
      }
    } catch (err) {
      console.error()
    }
  }

  useEffect(() => { 
    handleUserData();
  }, []);

  const [userDate, setUserDate] = useState("");
  const [userTodayCalories, setUserTodayCalories] = useState(0);

  const updateUserDate = (value) => {
    setUserDate(value);
  }

  const updateUserTodayCalories = (value) => {
    setUserTodayCalories(value);
  }

  const handleFoodAdded = () => {
    setUpdateFoodJournal(!updateFoodJournal)
  }

  return (
    <>
      <div className="row" style={{ marginBottom: 0 }}>
        <FoodInput
          auth={auth}
          onFoodAdded={handleFoodAdded} 
        />
        <FoodStatusBar
          auth={auth}
          userDate={userDate}
          userTodayCalories={userTodayCalories}
          userNormaCalories={userNormaCalories}
        />
      </div>
      <div className="row" style={{ marginBottom: 0 }}>
        <FoodJournal 
          auth={auth}
          updateFoodJournal={updateFoodJournal}
          updateUserDate={updateUserDate}
          updateUserTodayCalories={updateUserTodayCalories}
        />
      </div>
    </>
  )
}

export default DataPage;