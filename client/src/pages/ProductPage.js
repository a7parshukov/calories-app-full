import React from "react";

function ProductPage() {
  const namePrompt = () => {
    const nameProduct = prompt("Введите название продукта:");
  }

  const caloriesPer100gPrompt = () => {
    const caloriesPer100g = prompt("Сколько калорий в 100 граммах продукта?");
  }

  return(
    <h1>ProductPage</h1>
  )
}

export default ProductPage;