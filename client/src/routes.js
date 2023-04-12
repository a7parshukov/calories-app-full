// Текущая страница это Single Page Application (SPA), использую react-router-dom
// https://www.npmjs.com/package/react-router-dom

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import DataPage from "./pages/DataPage.js";
import NormaPage from "./pages/NormaPage.js";


function useRoutes(isAuthenticated, isNormalized) {
  // если пользователь авторизован, но не выставил норматив:
  if (isAuthenticated && !isNormalized) {
    return (
      <Routes>
        <Route path="/norma" element={<NormaPage />} />
        <Route path="/*" element={<Navigate to="/norma" />} />
      </Routes>
    )
  }

  // если пользователь авторизован и выставил норматив
  if (isAuthenticated && isNormalized) {
    return (
      <Routes>
        <Route path="/data" element={<DataPage />} />
        <Route path="/*" element={<Navigate to="/data" />} />
      </Routes>
    )
  }

  // если пользователь не авторизован
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default useRoutes;