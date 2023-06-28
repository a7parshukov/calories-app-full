import { Router } from "express";
import Product from "../scheme/Product.js";
import { body, validationResult } from "express-validator";

const router = Router();

// /api/products/name
router.get("/name", async (req, res) => {
  try {
    const data = await Product.find({});
    const arrayNameProduct = data.map(obj => obj.nameProduct);
    res.status(200).json(arrayNameProduct);
  } catch (error) {
    res.status(500).json({ message: "Не смог получить данные продуктов" })
  }
});

// /api/products/add
router.post("/add",
  body("nameProduct").notEmpty(),
  body("caloriesPer100g")
    .notEmpty()
    .isInt()
    .custom(async value => {
      if (value < 0) throw new Error("Число должно быть положительным")
    }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные в поле ввода продукта"
      })
    }

    try {
      // Принять с фронта (с формы), закинуть в переменные, закинуть в БД.
      const { nameProduct, caloriesPer100g } = req.body;
      // Проверить наличие в БД:
      const findProduct = await Product.findOne({ nameProduct });
      if (findProduct) {
        return res.status(400).json({ message: "Такой продукт уже есть в базе" })
      }

      await new Product({ nameProduct, caloriesPer100g }).save();
      res.status(201).json({ message: "Продукт занесён в базу" })
    } catch (error) {
      res.status(500).json({ message: "Не смог добавить новый продукт" })
    }
  });

export default router;