import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import User from "../scheme/User.js";
import Food from "../scheme/Food.js";
import { v4 } from "uuid";

const router = Router();

// Резервная БД (потом удалить!)
// let FOODLIST = [
//   { _id: v4(), nameFood: "Хлеб", weightFood: 50, caloriesFood: 120 },
//   { _id: v4(), nameFood: "Колбаса", weightFood: 60, caloriesFood: 220 },
//   { _id: v4(), nameFood: "Сыр Гауда", weightFood: 40, caloriesFood: 80 }
// ]

// /api/users/normalise
router.put("/normalise", auth, async (req, res) => {
  try {
    // получить userID из tokena:
    const userID = req.user.userID;

    // найти пользователя в базе, добавить или заменить норму:
    const user = await User.findByIdAndUpdate(
      userID,
      { norma: req.body.norma },
      { new: true }
    );

    // сохранить:
    await user.save();

    res.status(200).json({ message: "Нормокалории успешно добалены к пользователю" });
  } catch (err) {
    res.status(500).json({ message: "Не могу добавить нормакалории к учетной записи" });
  }
})

// /api/users/
// метод GET для получения списка с сервера:
router.get("/", auth, async (req, res) => {
  try {
    // 1. получить userID из token:
    const userID = req.user.userID;
    // 2. по userID профильтровать БД, вернуть записи:
    const data = await Food.find({owner: userID});
    // 3. отправить на front:
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так..." })
  }
}
)

// /api/users/
// метод POST для отправки данных на сервер:
router.post("/", auth, async (req, res) => {
  try {
    // получить userID из tokena:
    const userID = req.user.userID;
    // 1. Принять с фронта:
    const { nameFood, weightFood } = req.body;
    const newFood = { nameFood, weightFood, caloriesFood: 150, owner: userID };
    // 2. Создать новую запись в базе данных
    const newData = new Food(newFood);
    // 3. Сохранить запись в базе данных
    await newData.save();
    // 4. Вернуть сохранённые данные:
    res.status(201).json(newData); // _id и так создается MongoDB!!!
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при добавлении данных" })
  }
})

export default router;