// Текущая страница это Single Page Application (SPA), использую react-router-dom
// https://www.npmjs.com/package/react-router-dom

import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DataPage from "./pages/DataPage";
import NormaPage from "./pages/NormaPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";

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