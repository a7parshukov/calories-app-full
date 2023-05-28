import { Router } from "express";
import Product from "../scheme/Product.js";


const router = Router();

// /api/products/name
router.get("/name", async (req, res) => {
  try {
    const data = await Product.find({});
    const arrayNameProduct = data.map(obj => obj.nameProduct);
    res.status(200).json(arrayNameProduct);
  } catch (error) {
    res.status(500).json({message: "Не смог получить данные продуктов"})
  }
});

// /api/products/add
router.post("/add", async (req, res) => {
  try {
    // Принять с фронта (с формы), закинуть в переменные, закинуть в БД.
    const product = req.body;
    await new Product(product).save();
    res.status(201).json({ message: "Продукт занесён в базу" })
  } catch (error) {
    res.status(500).json({ message: "Не смог добавить новый продукт" })
  }
});

export default router;

// const data = [{ _id: "6471cb97c3ddb502cf268c3f", nameProduct: "Рыба", caloriesPer100g: 200 }, { _id: "6471cca2e2d618bf782bd1f8", nameProduct: "Хлеб белый", caloriesPer100g: 250 }] 