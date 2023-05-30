// Текущая страница это Single Page Application (SPA), использую react-router-dom
// https://www.npmjs.com/package/react-router-dom

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import DataPage from "./pages/DataPage.js";
import NormaPage from "./pages/NormaPage.js";
import ProductPage from "./pages/ProductPage.js";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function useRoutes(isAuthenticated) {

  // для авторизованного пользователя:
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<DataPage />} />
        <Route path="/norma" element={<NormaPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
  }

  // если пользователь не авторизован
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default useRoutes;